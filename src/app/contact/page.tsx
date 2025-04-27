"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle } from "lucide-react";
import Link from "next/link";
import {
  PersonalContactValues,
  PersonalContactSchema,
} from "@/schemas/personalContactSchema";
import FormMessage from "@/components/form-message";
import { cn } from "@/lib/utils";

// フォームステータスの型定義
type FormStatus = {
  state: "idle" | "submitting" | "success" | "error";
  message: string;
};

export default function ContactPage() {
  // フォームの通信状態を管理
  const [formStatus, setFormStatus] = useState<FormStatus>({
    state: "idle",
    message: "",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PersonalContactValues>({
    resolver: zodResolver(PersonalContactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: PersonalContactValues) => {
    // フォームの送信中状態に設定
    setFormStatus({ state: "submitting", message: "" });

    console.log("フォームデータ:", data);

    try {
      // const response = await fetch("/api/contact/personal", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(data),
      // });

      // const result = await response.json();

      setFormStatus({
        state: "success",
        message: "お問い合わせを受け付けました。折り返しご連絡いたします。",
      });
      console.log("送信成功:");
      reset();
    } catch (err) {
      console.error("例外エラー:", err);
      setFormStatus({
        state: "error",
        message: "エラーが発生しました。お手数ですが、再度お試しください。",
      });
    }
  };

  // 状態の判定を簡略化
  const isSubmitting = formStatus.state === "submitting";

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold mb-4">お問い合わせ</h1>
          <p className="text-neutral-600">
            ご質問やご意見がございましたら、お気軽にお問い合わせください。
          </p>
        </div>

        <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                お名前 <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                className={cn(
                  "w-full rounded-md border px-3 py-2 text-neutral-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-0 transition-colors duration-200",
                  errors.name
                    ? "border-red-300 focus:border-red-300 focus:ring-red-100"
                    : "border-neutral-300 focus:border-[#7c9070] focus:ring-[#7c9070]/20"
                )}
                placeholder="山田 太郎"
                {...register("name")}
                disabled={isSubmitting}
                aria-invalid={errors.name ? "true" : "false"}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <p id="name-error" className="mt-1 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                メールアドレス <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                className={cn(
                  "w-full rounded-md border px-3 py-2 text-neutral-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-0 transition-colors duration-200",
                  errors.email
                    ? "border-red-300 focus:border-red-300 focus:ring-red-100"
                    : "border-neutral-300 focus:border-[#7c9070] focus:ring-[#7c9070]/20"
                )}
                placeholder="example@email.com"
                {...register("email")}
                disabled={isSubmitting}
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                お問い合わせ内容 <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                rows={5}
                className={cn(
                  "w-full rounded-md border px-3 py-2 text-neutral-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-0 transition-colors duration-200",
                  errors.message
                    ? "border-red-300 focus:border-red-300 focus:ring-red-100"
                    : "border-neutral-300 focus:border-[#7c9070] focus:ring-[#7c9070]/20"
                )}
                placeholder="お問い合わせ内容を入力してください..."
                {...register("message")}
                disabled={isSubmitting}
                aria-invalid={errors.message ? "true" : "false"}
                aria-describedby={errors.message ? "message-error" : undefined}
              />
              {errors.message && (
                <p id="message-error" className="mt-1 text-sm text-red-600">
                  {errors.message.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="px-5 py-3 rounded-lg bg-[#7c9070] text-white font-medium hover:bg-[#6a7b5f] active:bg-[#5c6c52] focus:outline-none focus:ring-2 focus:ring-[#7c9070]/20 focus:ring-offset-2 transition-all duration-200 w-full flex items-center justify-center shadow-sm"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  送信中...
                </>
              ) : (
                <>
                  送信する <CheckCircle className="ml-2 h-4 w-4" />
                </>
              )}
            </button>
          </form>
          <div className="mt-6 text-center text-sm text-neutral-500">
            法人のお客様は
            <Link
              href="/business"
              className="text-[#7c9070] underline mt-4 hover:text-[#5c6c52] transition-colors duration-200"
            >
              こちら
            </Link>
            からお問い合わせください。
          </div>

          <div className="mt-4">
            {formStatus.state === "success" && (
              <FormMessage type="success" message={formStatus.message} />
            )}
            {formStatus.state === "error" && (
              <FormMessage type="error" message={formStatus.message} />
            )}
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-neutral-500">
          <p>
            ご提供いただいた情報は厳重に管理し、第三者に共有されることはありません。
          </p>
        </div>
      </div>
    </div>
  );
}
