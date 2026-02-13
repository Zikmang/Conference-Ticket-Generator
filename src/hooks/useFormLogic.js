import { useState } from "react";
import { ticketFormSchema } from "../utils/schema";

export const useFormLogic = (avatar) => {
  const [formData, setFormData] = useState({ fullName: "", email: "", github: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Zod Validation 
    const result = ticketFormSchema.safeParse({ ...formData, avatar });

    if (!result.success) {
      const formattedErrors = result.error.flatten().fieldErrors;
      setErrors({
        nameError: formattedErrors.fullName?.[0],
        emailError: formattedErrors.email?.[0],
        gitError: formattedErrors.github?.[0],
        uploadError: formattedErrors.avatar?.[0]
      });
      return;
    }

    setSubmitted(true);
  };

  return { formData, errors, submitted, handleChange, handleSubmit };
};