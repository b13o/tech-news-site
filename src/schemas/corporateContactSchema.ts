import * as z from "zod";

export const CorporateContactSchema = z.object({
  contactName: z
    .string()
    .min(2, { message: "お名前は2文字以上で入力してください" }),
  email: z
    .string()
    .email({ message: "有効なメールアドレスを入力してください" }),
  inquiry: z
    .string()
    .min(10, { message: "お問い合わせ内容は10文字以上で入力してください" }),
  categories: z
    .string()
    .array()
    .min(1, { message: "少なくとも1つのカテゴリーを選択してください" }),
});

export type CorporateContactValues = z.infer<typeof CorporateContactSchema>;
