"use client";

import { startTransition } from "react";
import { useForm, Form } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle } from "lucide-react";
// import { subscribeToNewsletter } from "@/actions/newsletterActions";
import {
  NewsletterFormValues,
  newsletterSchema,
} from "@/schemas/newsletterSchema";
import FormMessage from "@/components/form-message";
import { cn } from "@/lib/utils";

export default function NewsletterPage() {
  // Server Actionの状態管理
  // const [state, formAction, isPending] = useActionState(subscribeToNewsletter, {
  //   // 初期状態
  //   status: null,
  //   message: "",
  // });

  const {
    register,
    control,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
    },
  });

  return (
    <div className="container mx-auto min-h-screen px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="mb-10 text-center space-y-6">
          <div className="inline-block bg-[#7c9070]/10 p-2 px-4 rounded-full text-[#7c9070] font-medium text-sm">
            Tech News Letter
          </div>
          <h1 className="text-4xl font-bold">ニュースレター購読</h1>
          <p className="text-neutral-600">
            最新の開発インタビュー、厳選された技術レポート、実用的なサンプルコードを
            <br />
            定期的にお届けします。 業界のトレンドを見逃しません。
          </p>
        </div>

        <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm">
          {/* RHF/Formコンポーネント */}
          <Form
            control={control}
            onSubmit={({ formData }) =>
              startTransition(() => console.log(formData))
            }
          >
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-neutral-700 mb-1"
                >
                  メールアドレス <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  className={cn(
                    "w-full rounded-md border px-3 py-2 text-neutral-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-0 transition-colors duration-200",
                    errors.email
                      ? "border-red-300 focus:border-red-300 focus:ring-red-100"
                      : "border-neutral-300 focus:border-[#7c9070] focus:ring-[#7c9070]/20"
                  )}
                  placeholder="example@email.com"
                  {...register("email")}
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
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
                    購読処理中...
                  </>
                ) : (
                  <>
                    ニュースレターを購読する{" "}
                    <CheckCircle className="ml-2 h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </Form>

          <div className="mt-4">
            {isSubmitSuccessful && (
              <FormMessage
                type="success"
                message={"ニュースレターの購読ありがとうございます！"}
              />
            )}
            {/* {state?.status === "error" && (
              <FormMessage
                type="error"
                message={
                  state.message ||
                  "エラーが発生しました。お手数ですが、再度お試しください。"
                }
              />
            )} */}
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-neutral-500">
          <p>
            ご登録いただいたメールアドレスは、ニュースレター配信の目的にのみ使用します。
            <br />
            いつでも購読解除することができます。
          </p>
        </div>
      </div>
    </div>
  );
}
