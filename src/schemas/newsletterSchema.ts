import * as z from "zod";

export const newsletterSchema = z.object({
  email: z
    .string()
    .email({ message: "有効なメールアドレスを入力してください" }),
});

export type NewsletterFormValues = z.infer<typeof newsletterSchema>;
