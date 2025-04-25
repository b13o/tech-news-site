import * as z from "zod";

// バリデーションスキーマの定義
export const PersonalContactSchema = z.object({
  name: z
    .string()
    .min(2, { message: "お名前は2文字以上で入力してください" })
    .max(50, { message: "お名前は50文字以内で入力してください" }),
  email: z
    .string()
    .email({ message: "有効なメールアドレスを入力してください" }),
  message: z
    .string()
    .min(10, { message: "お問い合わせ内容は10文字以上で入力してください" })
    .max(1000, { message: "お問い合わせ内容は1000文字以内で入力してください" }),
});

// 型定義のエクスポート
export type PersonalContactValues = z.infer<typeof PersonalContactSchema>;
