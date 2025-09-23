"use client";

import AuthLayout from "./components/AuthLayout/AuthLayout";
import AuthForm from "./components/AuthLayout/SignIn";

export default function Home() {
  return (
    <AuthLayout>
      <AuthForm />
    </AuthLayout>
  );
}
