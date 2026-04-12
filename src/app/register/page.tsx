import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


export default function RegisterPage() {
  return (
    <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
      <Link href="/register/client">
        <Card className="h-full border-amber-200 bg-amber-50/80 transition hover:-translate-y-1 hover:shadow-xl">
          <CardHeader>
            <CardTitle className="font-serif text-3xl">Client Account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-7 text-slate-700">
            Post jobs, compare verified bids, hire one freelancer, pay inside the
            platform, and finalize contracts with ratings.
          </CardContent>
        </Card>
      </Link>
      <Link href="/register/freelancer">
        <Card className="h-full border-sky-200 bg-sky-50/80 transition hover:-translate-y-1 hover:shadow-xl">
          <CardHeader>
            <CardTitle className="font-serif text-3xl">Freelancer Account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-7 text-slate-700">
            Verify identity, complete profile, pass skill tests, then compete for
            jobs inside a controlled marketplace.
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}
