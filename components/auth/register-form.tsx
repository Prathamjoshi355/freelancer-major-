"use client"
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import GoogleAuthButton from "../ui/google";
import api from "@/api";

export function RegisterForm({ role }: { role: "client" | "freelancer" }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] = useState<number>(0);
  const Router = useRouter();

  // ✅ Password Strength Checker (0–4 scale)
  const checkPasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  useEffect(() => {
    setPasswordStrength(checkPasswordStrength(password));
  }, [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (passwordStrength < 2) {
      setError("Password too weak. Please use a stronger password.");
      setLoading(false);
      return;
    }

    try {
      const payload =
        role === "client"
          ? { email, password, company_name: company, role }
          : { email, password, full_name: name, role };

      const res = await api.post("accounts/user/register/", payload);
      console.log("Registration success:", res.data);
      Router.push('/login');
    } catch (err: any) {
      console.error(err);
       setError(err.response?.data?.email?.[0] || err.response?.data?.message || "Email already in use in this role.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Text + color for strength level
  const getStrengthLabel = (level: number) => {
    switch (level) {
      case 0:
      case 1:
        return { text: "Weak", color: "bg-red-500" };
      case 2:
        return { text: "Medium", color: "bg-yellow-500" };
      case 3:
      case 4:
        return { text: "Strong", color: "bg-green-600" };
      default:
        return { text: "Passward Strength Check ", color: "bg-gray-300" };
    }
  };

  const strength = getStrengthLabel(passwordStrength);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Sign up as {role === "client" ? "Client" : "Freelancer"}</CardTitle>
        <CardDescription>
          {role === "client"
            ? "Hire top talent for your project."
            : "Showcase skills and land great gigs."}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {role === "client" ? (
            <div className="grid gap-2">
              <Label htmlFor="company">Company Name</Label>
              <Input
                id="company"
                placeholder="Acme Inc."
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
              />
            </div>
          ) : (
            <div className="grid gap-2">
              <Label htmlFor="fullname">Full name</Label>
              <Input
                id="fullname"
                placeholder="Jane Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* ✅ Password Field + Strength Bar */}
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {password && (
              <div className="mt-1">
                {/* Progress Bar */}
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-2 transition-all duration-300 ${strength.color}`}
                    style={{ width: `${(passwordStrength / 4) * 100}%` }}
                  ></div>
                </div>
                {/* Strength Label */}
                <p className="text-sm mt-1 font-medium text-gray-700">
                  Strength: <span className={`font-semibold ${strength.color.replace("bg", "text")}`}>{strength.text}</span>
                </p>
              </div>
            )}
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button
            type="submit"
            className="w-full"
            disabled={loading || passwordStrength < 2}
          >
            {loading ? "Creating account..." : "Create account"}
          </Button>

          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-500">or continue with</span>
            </div>
          </div>

          <GoogleAuthButton
            onClick={() => {
              window.location.href = `${api.defaults.baseURL}/auth/google`;
            }}
            disabled={loading}
            loading={loading}
            className="w-full bg-white text-slate-700 hover:bg-slate-50 border rounded-lg font-medium shadow-sm transition-all"
          />
        </form>
      </CardContent>
    </Card>
  );
}
