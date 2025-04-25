"use server";

import { newsletterSchema } from "@/schemas/newsletterSchema";
import * as z from "zod";

// レスポンスの型定義
type ActionState = {
  status: "success" | "error" | null;
  message: string;
};

/**
 * ニュースレター購読のServer Action
 * FormDataを受け取り、バリデーション後に処理を行う
 */
export async function subscribeToNewsletter(
  prevState: ActionState | null,
  formData: FormData
): Promise<ActionState> {
  console.log("Server Action実行: subscribeToNewsletter");

  try {
    // FormDataからデータを取得
    const email = formData.get("email") as string;

    // 送信データをコンソール出力
    console.log("送信データ:", { email });

    // Zodでバリデーション
    const validatedData = newsletterSchema.parse({
      email,
    });

    console.log("バリデーション成功:", validatedData);

    // 実際のアプリケーションでは、ここでデータベースへの保存や
    // ニュースレターサービスへのAPI呼び出しなどを行います

    // 処理を遅延させてローディング状態を確認（開発時のみ）
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // 成功レスポンスを返す
    return {
      status: "success",
      message: "ニュースレターの購読ありがとうございます！",
    };
  } catch (error) {
    // エラーをコンソールに出力
    console.error("Server Actionエラー:", error);

    // Zodバリデーションエラーの場合
    if (error instanceof z.ZodError) {
      return {
        status: "error",
        message: `バリデーションエラー: ${error.errors
          .map((e) => e.message)
          .join(", ")}`,
      };
    }

    // その他のエラー
    return {
      status: "error",
      message:
        "処理中にエラーが発生しました。お手数ですが、再度お試しください。",
    };
  }
}
