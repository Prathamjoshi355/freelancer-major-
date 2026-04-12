"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";
import { contractsAPI, normalizeApiError } from "@/services/apiService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


export default function ContractsPage() {
  const router = useRouter();
  const { user, loading, isAuthenticated } = useAuth();
  const [contracts, setContracts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
      return;
    }
    void (async () => {
      try {
        const response = await contractsAPI.list();
        setContracts(response.data.results ?? []);
      } catch (loadError) {
        setError(normalizeApiError(loadError));
      }
    })();
  }, [isAuthenticated, loading, router]);

  if (loading || !user) {
    return <div className="py-16 text-center text-slate-500">Loading contracts...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-4xl">Contracts</h1>
        <p className="text-slate-600">Every chat and payment workflow hangs off a contract.</p>
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <div className="grid gap-4">
        {contracts.map((contract) => (
          <Card key={contract.id}>
            <CardHeader>
              <CardTitle className="font-serif text-2xl">Contract {contract.id.slice(-6)}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-700">
              <p>Status: {contract.status}</p>
              <p>Payment: {contract.payment_status}</p>
              <p>Amount: INR {contract.agreed_amount}</p>
              <Link href={`/contracts/${contract.id}`}>
                <Button variant="outline">Open Contract</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
