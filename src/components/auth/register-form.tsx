"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { authAPI, normalizeApiError } from "@/services/apiService";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


export function RegisterForm({ role }: { role: "client" | "freelancer" }) {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [faceImage, setFaceImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch {
      setError("Camera access failed. You can still upload a face image manually.");
    }
  }

  function stopCamera() {
    const stream = videoRef.current?.srcObject as MediaStream | null;
    stream?.getTracks().forEach((track) => track.stop());
  }

  function captureFace() {
    if (!videoRef.current || !canvasRef.current) return;
    const context = canvasRef.current.getContext("2d");
    if (!context) return;
    context.drawImage(videoRef.current, 0, 0, 320, 240);
    setFaceImage(canvasRef.current.toDataURL("image/jpeg"));
    stopCamera();
  }

  function uploadFace(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setFaceImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!faceImage) {
      setError("Face verification is required for every account.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await authAPI.register({
        email,
        password,
        role,
        face_image: faceImage,
      });
      await login(
        response.data.user,
        response.data.access,
        response.data.refresh
      );
      router.push("/dashboard");
    } catch (submitError) {
      setError(normalizeApiError(submitError));
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-xl border-white/70 bg-white/90 shadow-[0_24px_80px_rgba(15,23,42,0.10)]">
      <CardHeader>
        <CardTitle className="font-serif text-3xl">
          Register as {role === "client" ? "Client" : "Freelancer"}
        </CardTitle>
        <CardDescription>
          Face verification happens at registration. Profile completion comes next.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@company.com"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              minLength={8}
              required
            />
          </div>

          <div className="space-y-3 rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <div>
              <p className="text-sm font-medium text-slate-900">Face Verification</p>
              <p className="text-sm text-slate-600">
                Capture or upload one face image. Duplicate accounts are rejected.
              </p>
            </div>

            {!faceImage ? (
              <div className="space-y-3">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="aspect-[4/3] w-full rounded-2xl bg-slate-950 object-cover"
                />
                <canvas ref={canvasRef} width={320} height={240} className="hidden" />
                <div className="flex flex-wrap gap-3">
                  <Button type="button" variant="outline" onClick={startCamera}>
                    Start Camera
                  </Button>
                  <Button type="button" onClick={captureFace}>
                    Capture
                  </Button>
                  <label className="inline-flex cursor-pointer items-center rounded-full border px-4 py-2 text-sm font-medium text-slate-700 hover:bg-white">
                    Upload Image
                    <input type="file" accept="image/*" className="hidden" onChange={uploadFace} />
                  </label>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <img src={faceImage} alt="Face capture preview" className="aspect-[4/3] w-full rounded-2xl object-cover" />
                <Button type="button" variant="outline" onClick={() => setFaceImage(null)}>
                  Retake / Replace
                </Button>
              </div>
            )}
          </div>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating account..." : "Create account"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
