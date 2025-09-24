"use client";

import { FormEvent, useState } from "react";
import {
  AuthButton,
  AuthFields,
  AuthHeader,
  FieldBox,
  StyledInput,
} from "@/app/styles/AuthStyles/Auth.styles";
import { ErrorText } from "../errorText";
import { showErrorToast, showSuccessToast } from "@/app/utils/toast";
import { useRouter } from "next/navigation";

const VERIFY_ACCESS_QUERY = `
  query VerifyAccess($email: String!, $eventId: String!, $securityCode: String!) {
    verifyAccess(email: $email, eventId: $eventId, securityCode: $securityCode)
  }
`;

const verifyAccess = async (
  email: string,
  eventId: string,
  securityCode: string
): Promise<boolean> => {
  const res = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: VERIFY_ACCESS_QUERY,
      variables: { email, eventId, securityCode },
    }),
  });

  const json = await res.json();

  if (json.errors) {
    throw new Error(json.errors[0].message);
  }

  return json.data.verifyAccess;
};

const AuthForm = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    eventId: "",
    email: "",
    secretKey: "",
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formSubmitting, setFormSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setFormErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitting(true);

    try {
      const isVerified = await verifyAccess(
        formData.email,
        formData.eventId,
        formData.secretKey
      );

      if (isVerified) {
        showSuccessToast("Access granted!");

        // ✅ Save access in sessionStorage
        sessionStorage.setItem(
          "verifiedEventAccess",
          JSON.stringify({
            eventId: formData.eventId,
            email: formData.email,
            granted: true,
          })
        );

        // redirect to tickets
        router.push(`/tickets/${formData.eventId}`);
      } else {
        showErrorToast("Access denied. Invalid credentials.");
        setFormErrors({ secretKey: "Invalid credentials provided" });
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        showErrorToast("Error verifying access: " + err.message);
      } else {
        showErrorToast("An unexpected error occurred.");
      }
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <AuthHeader>Enter Your Event Details</AuthHeader>

      <AuthFields>
        <FieldBox>
          <label>Event ID</label>
          <StyledInput
            type="text"
            name="eventId"
            placeholder="Enter Event ID"
            value={formData.eventId}
            onChange={handleChange}
            required
          />
          {formErrors.eventId && <ErrorText>{formErrors.eventId}</ErrorText>}
        </FieldBox>

        <FieldBox>
          <label>Email</label>
          <StyledInput
            type="email"
            name="email"
            placeholder="example@gmail.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {formErrors.email && <ErrorText>{formErrors.email}</ErrorText>}
        </FieldBox>

        <FieldBox>
          <label>Secret Key</label>
          <StyledInput
            type="password"
            name="secretKey"
            placeholder="Enter Secret Key"
            value={formData.secretKey}
            onChange={handleChange}
            required
          />
          {formErrors.secretKey && (
            <ErrorText>{formErrors.secretKey}</ErrorText>
          )}
        </FieldBox>

        <AuthButton type="submit" disabled={formSubmitting}>
          {formSubmitting ? "Submitting..." : "Continue"}
        </AuthButton>
      </AuthFields>
    </form>
  );
};

export default AuthForm;
