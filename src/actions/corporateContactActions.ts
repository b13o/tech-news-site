"use server";

import { parseWithZod } from "@conform-to/zod";
import type { SubmissionResult } from "@conform-to/react";
import { CorporateContactSchema } from "@/schemas/corporateContactSchema";

export async function submitCorporateContactForm(
  prevState: SubmissionResult | undefined,
  formData: FormData
): Promise<SubmissionResult> {
  // バリデーション
  const submission = parseWithZod(formData, {
    schema: CorporateContactSchema,
  });

  // バリデーションエラーがある場合は早期リターン
  if (submission.status !== "success") {
    return submission.reply();
  }

  try {
    // 成功時のログ
    console.log("サーバー上の処理は正常に完了", submission.value);

    // 実際のアプリケーションでは、ここでデータベースへの保存や
    // メール送信などの処理を実装します

    // 成功レスポンスを返す
    return submission.reply({});
  } catch (error) {
    // エラーをログに記録
    console.error("Server Action Error:", error);

    // クライアントにエラーを返す
    return submission.reply({
      formErrors: [
        "サーバーでエラーが発生しました。後ほど再度お試しください。",
      ],
    });
  }
}
