"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";
import {
  chatAPI,
  contractsAPI,
  normalizeApiError,
  paymentsAPI,
} from "@/services/apiService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";


type ContractPageProps = {
  params: Promise<{ contractId: string }>;
};


async function ensureRazorpayScript() {
  if (typeof window === "undefined") return false;
  const customWindow = window as Window & { Razorpay?: any };
  if (customWindow.Razorpay) return true;

  return new Promise<boolean>((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}


export default function ContractDetailPage({ params }: ContractPageProps) {
  const router = useRouter();
  const { user, loading, isAuthenticated } = useAuth();
  const [contractId, setContractId] = useState("");
  const [contractData, setContractData] = useState<any | null>(null);
  const [conversation, setConversation] = useState<any | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [messageDraft, setMessageDraft] = useState("");
  const [selectedAttachment, setSelectedAttachment] = useState<File | null>(null);
  const [reviewRating, setReviewRating] = useState("5");
  const [reviewComment, setReviewComment] = useState("");
  const [clientRating, setClientRating] = useState("5");
  const [clientComment, setClientComment] = useState("");
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    Promise.resolve(params).then((resolved) => setContractId(resolved.contractId));
  }, [params]);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
      return;
    }
    if (!contractId) return;
    void loadContract();
  }, [contractId, isAuthenticated, loading, router]);

  async function loadContract() {
    try {
      const [contractResponse, chatResponse] = await Promise.all([
        contractsAPI.get(contractId),
        chatAPI.getConversation(contractId),
      ]);
      setContractData(contractResponse.data);
      setConversation(chatResponse.data.conversation);
      setMessages(chatResponse.data.messages ?? []);
    } catch (loadError) {
      setError(normalizeApiError(loadError));
    }
  }

  async function sendMessage() {
    setError(null);
    try {
      const response = await chatAPI.sendMessage(contractId, {
        content: messageDraft,
        file: selectedAttachment,
      });
      setMessages((current) => [...current, response.data.message]);
      setMessageDraft("");
      setSelectedAttachment(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (sendError) {
      setError(normalizeApiError(sendError));
      await loadContract();
    }
  }

  async function payContract() {
    setError(null);
    try {
      const response = await paymentsAPI.createOrder(contractId);
      const payment = response.data.payment;
      const checkout = response.data.checkout;

      if (checkout.mode === "mock") {
        await paymentsAPI.verify(payment.id, {
          razorpay_order_id: checkout.order.id,
          razorpay_payment_id: `pay_mock_${Date.now()}`,
          razorpay_signature: "mock_signature",
        });
        await loadContract();
        return;
      }

      const hasScript = await ensureRazorpayScript();
      if (!hasScript) {
        setError("Unable to load Razorpay checkout script.");
        return;
      }

      const customWindow = window as Window & { Razorpay?: any };
      const razorpay = new customWindow.Razorpay({
        key: checkout.key_id,
        amount: checkout.order.amount,
        currency: checkout.order.currency,
        name: "ForgeMarket",
        description: contractData?.job?.title ?? "Contract payment",
        order_id: checkout.order.id,
        handler: async (gatewayResponse: any) => {
          await paymentsAPI.verify(payment.id, gatewayResponse);
          await loadContract();
        },
      });
      razorpay.open();
    } catch (paymentError) {
      setError(normalizeApiError(paymentError));
    }
  }

  async function completeContract() {
    setError(null);
    try {
      await contractsAPI.complete(contractId, {
        rating: Number(reviewRating),
        comment: reviewComment,
      });
      await loadContract();
    } catch (completeError) {
      setError(normalizeApiError(completeError));
    }
  }

  async function submitClientReview() {
    setError(null);
    try {
      await contractsAPI.reviewClient(contractId, {
        client_rating: Number(clientRating),
        client_comment: clientComment,
      });
      await loadContract();
    } catch (reviewError) {
      setError(normalizeApiError(reviewError));
    }
  }

  if (loading || !user || !contractData) {
    return <div className="py-16 text-center text-slate-500">Loading contract...</div>;
  }

  const contract = contractData.contract;
  const canPay = user.role === "client" && contract.payment_status !== "paid";
  const canReview = user.role === "client" && contract.payment_status === "paid" && !contractData.review;
  const canReviewClient = user.role === "freelancer" && contract.status === "completed" && contractData.review && !contractData.review.client_rating;

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="font-serif text-4xl">{contractData.job.title}</h1>
        <p className="text-slate-600">
          Contract status: {contract.status} | Payment: {contract.payment_status}
        </p>
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-2xl">Contract Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-slate-700">
            <p>Agreed Amount: INR {contract.agreed_amount}</p>
            {canPay ? <Button onClick={payContract}>Pay Inside Platform</Button> : null}

            {canReview ? (
              <div className="space-y-3 rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <Input value={reviewRating} onChange={(event) => setReviewRating(event.target.value)} type="number" min={1} max={5} />
                <Textarea value={reviewComment} onChange={(event) => setReviewComment(event.target.value)} placeholder="Project review" />
                <Button onClick={completeContract}>Complete and Review</Button>
              </div>
            ) : null}

            {canReviewClient ? (
              <div className="space-y-3 rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-slate-700">Review this client for communication and platform reliability.</p>
                <Input value={clientRating} onChange={(event) => setClientRating(event.target.value)} type="number" min={1} max={5} />
                <Textarea value={clientComment} onChange={(event) => setClientComment(event.target.value)} placeholder="Client review" />
                <Button onClick={submitClientReview}>Submit Client Review</Button>
              </div>
            ) : null}

            {contractData.review ? (
              <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-4">
                <p className="font-medium text-emerald-900">Final Review Submitted</p>
                <p className="text-sm text-emerald-800">Rating: {contractData.review.rating}</p>
                <p className="text-sm text-emerald-800">{contractData.review.comment}</p>
                {contractData.review.client_rating ? (
                  <>
                    <p className="mt-3 font-medium text-emerald-900">Client Review</p>
                    <p className="text-sm text-emerald-800">Rating: {contractData.review.client_rating}</p>
                    <p className="text-sm text-emerald-800">{contractData.review.client_comment}</p>
                  </>
                ) : null}
              </div>
            ) : null}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-2xl">Job Chat</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="max-h-[420px] space-y-3 overflow-y-auto rounded-3xl border border-slate-200 bg-slate-50 p-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`rounded-2xl px-4 py-3 text-sm ${
                    message.status === "blocked"
                      ? "border border-red-200 bg-red-50 text-red-700"
                      : message.sender_id === user.id
                        ? "ml-auto max-w-[80%] bg-slate-900 text-white"
                        : "mr-auto max-w-[80%] bg-white text-slate-800"
                  }`}
                >
                  {message.content ? <p>{message.content}</p> : null}
                  {message.attachment_url ? (
                    <a
                      href={message.attachment_url}
                      target="_blank"
                      rel="noreferrer"
                      className={`mt-2 block underline ${message.sender_id === user.id && message.status !== "blocked" ? "text-slate-200" : "text-current"}`}
                    >
                      {message.attachment_name || "Open attachment"}
                    </a>
                  ) : message.attachment_name ? (
                    <p className="mt-2 text-xs uppercase tracking-[0.2em]">
                      Attachment: {message.attachment_name}
                    </p>
                  ) : null}
                  {message.status === "blocked" ? (
                    <p className="mt-2 text-xs uppercase tracking-[0.25em]">
                      Blocked: {(message.moderation_flags ?? []).join(", ")}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
            <div className="grid gap-3">
              <Textarea
                value={messageDraft}
                onChange={(event) => setMessageDraft(event.target.value)}
                placeholder="Write a message. Off-platform payment or contact info will be blocked."
              />
              <Input
                ref={fileInputRef}
                type="file"
                accept="image/*,.pdf,.txt,.csv,.log"
                onChange={(event) => setSelectedAttachment(event.target.files?.[0] ?? null)}
              />
              {selectedAttachment ? (
                <p className="text-xs text-slate-500">
                  Attachment ready: {selectedAttachment.name}
                </p>
              ) : null}
              <Button onClick={sendMessage} disabled={!messageDraft.trim() && !selectedAttachment}>
                Send Message
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
