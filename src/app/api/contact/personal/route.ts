import { PersonalContactSchema } from "@/schemas/personalContactSchema";
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";

export async function POST(request: NextRequest) {
  try {
    // リクエストボディを取得
    const body = await request.json();

    // コンソールにリクエストデータを出力
    console.log("APIリクエスト受信:", body);

    // バリデーション
    const validatedData = PersonalContactSchema.parse(body);
    console.log("バリデーション成功:", validatedData);

    // 実際のアプリケーションでは、ここでデータベースへの保存や
    // メール送信などの処理を実装します

    // 処理成功のレスポンスを返す
    return NextResponse.json(
      {
        success: true,
        message: "お問い合わせを受け付けました",
        data: validatedData,
      },
      { status: 200 }
    );
  } catch (error) {
    // エラーをコンソールに出力
    console.error("APIエラー:", error);

    // Zodバリデーションエラーの場合
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "バリデーションエラー",
        },
        { status: 400 }
      );
    }

    // その他のエラー
    return NextResponse.json(
      { success: false, error: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
}
