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

const AuthForm = () => {
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitting(true);

    console.log("Form submitted:", formData);
    setFormSubmitting(false);
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
