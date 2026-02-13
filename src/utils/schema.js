import z from "zod";

export const ticketFormSchema = z.object({
  fullName: z.string().min(1, "This field is Required"),
  email: z.string().email("Please enter a valid email address"),
  github: z.string().startsWith("@", "Must start with @").min(2, "Invalid username"),
  avatar: z.any().refine((file) => file !== null, "Please upload an avatar.")
});