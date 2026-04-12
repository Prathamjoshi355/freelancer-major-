import { RegisterForm } from "@/components/auth/register-form";


export default function RegisterFreelancerPage() {
  return (
    <div className="grid min-h-[70vh] place-items-center">
      <RegisterForm role="freelancer" />
    </div>
  );
}
