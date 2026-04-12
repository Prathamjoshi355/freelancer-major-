import { RegisterForm } from "@/components/auth/register-form";


export default function RegisterClientPage() {
  return (
    <div className="grid min-h-[70vh] place-items-center">
      <RegisterForm role="client" />
    </div>
  );
}
