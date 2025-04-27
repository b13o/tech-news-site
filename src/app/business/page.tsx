"use client";

import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { CheckCircle, Loader2 } from "lucide-react";
// import { submitCorporateContactForm } from "@/actions/corporateContactActions";
import {
  CorporateContactSchema,
  type CorporateContactValues,
} from "@/schemas/corporateContactSchema";
import { useFormStatus } from "react-dom";
import { useState } from "react";
import FormMessage from "@/components/form-message";
import { cn } from "@/lib/utils";

// カテゴリーの定義
const CATEGORIES = [
  { id: "research", label: "リサーチ依頼について" },
  { id: "development", label: "開発について" },
  { id: "sponsorship", label: "スポンサーについて" },
  { id: "other", label: "その他" },
];

// 共通のフォームフィールドスタイル関数
const getFieldStyles = (hasError: boolean) => {
  return cn(
    "w-full rounded-md border px-3 py-2 text-neutral-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-0 transition-colors duration-200",
    hasError
      ? "border-red-300 focus:border-red-300 focus:ring-red-100"
      : "border-neutral-300 focus:border-[#7c9070] focus:ring-[#7c9070]/20"
  );
};

// 送信ボタンコンポーネント
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        "px-5 py-2 rounded-lg bg-[#7c9070] text-white font-medium",
        "hover:bg-[#6a7b5f] active:bg-[#5c6c52] focus:outline-none focus:ring-2",
        "focus:ring-[#7c9070]/20 focus:ring-offset-2 transition-all inline-flex",
        "items-center shadow-sm",
        pending && "opacity-70 cursor-not-allowed"
      )}
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          送信中...
        </>
      ) : (
        <>
          送信する
          <CheckCircle className="ml-2 h-4 w-4" />
        </>
      )}
    </button>
  );
}

export default function CorporateContactPage() {
  // const [lastResult, action] = useActionState(
  //   submitCorporateContactForm,
  //   undefined
  // );

  const [success, setSuccess] = useState(false);

  const [form, fields] = useForm<CorporateContactValues>({
    id: "contact-form",
    onSubmit: async (values) => {
      console.log("送信データ:", values);
      setSuccess(true);
    },
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: CorporateContactSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const formErrors = form.errors;
  const categoryFieldErrors = fields.categories.errors;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold mb-4">法人のお客様</h1>
          <p className="text-neutral-600">
            ご質問や要望について、お気軽にお問い合わせください。
          </p>
        </div>

        <div className="rounded-lg border border-neutral-200 p-6 shadow-sm bg-white">
          {/* 成功・エラーメッセージ表示 */}
          {success && (
            <FormMessage
              type="success"
              message="お問い合わせを受け付けました。担当者より折り返しご連絡いたします。"
            />
          )}

          {formErrors && formErrors.length > 0 && (
            <FormMessage
              type="error"
              message="入力内容に問題があります。各項目をご確認ください。"
            />
          )}

          <form
            id={form.id}
            onSubmit={form.onSubmit}
            // action={action}
            noValidate
            className="space-y-6"
          >
            {/* お名前フィールド */}
            <div>
              <label
                htmlFor={fields.contactName.id}
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                お名前 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                key={fields.contactName.key}
                id={fields.contactName.id}
                name={fields.contactName.name}
                defaultValue={fields.contactName.initialValue}
                aria-invalid={Boolean(fields.contactName.errors)}
                aria-describedby={
                  fields.contactName.errors
                    ? `${fields.contactName.id}-error`
                    : undefined
                }
                className={getFieldStyles(Boolean(fields.contactName.errors))}
                placeholder="山田 太郎"
              />
              {fields.contactName.errors && (
                <p
                  className="mt-1 text-sm text-red-600"
                  id={`${fields.contactName.id}-error`}
                >
                  {fields.contactName.errors}
                </p>
              )}
            </div>

            {/* メールアドレスフィールド */}
            <div>
              <label
                htmlFor={fields.email.id}
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                メールアドレス <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                key={fields.email.key}
                id={fields.email.id}
                name={fields.email.name}
                defaultValue={fields.email.initialValue}
                aria-invalid={Boolean(fields.email.errors)}
                aria-describedby={
                  fields.email.errors ? `${fields.email.id}-error` : undefined
                }
                className={getFieldStyles(Boolean(fields.email.errors))}
                placeholder="example@company.co.jp"
              />
              {fields.email.errors && (
                <p
                  className="mt-1 text-sm text-red-600"
                  id={`${fields.email.id}-error`}
                >
                  {fields.email.errors}
                </p>
              )}
            </div>

            {/* カテゴリーフィールド */}
            <fieldset>
              <legend className="block text-sm font-medium text-neutral-700 mb-2">
                カテゴリー <span className="text-red-500">*</span>
              </legend>
              <div
                className="space-y-2"
                aria-describedby={
                  categoryFieldErrors ? "category-error" : undefined
                }
                aria-invalid={Boolean(categoryFieldErrors)}
              >
                {CATEGORIES.map((category) => (
                  <div key={category.id} className="flex items-start">
                    <input
                      type="checkbox"
                      name={fields.categories.name}
                      value={category.id}
                      defaultChecked={fields.categories.initialValue?.includes(
                        category.id
                      )}
                      id={`category-${category.id}`}
                      className={cn(
                        "rounded border-neutral-300 text-[#7c9070]",
                        "focus:ring-[#7c9070]/20 h-4 w-4 mt-1"
                      )}
                    />
                    <label
                      htmlFor={`category-${category.id}`}
                      className="ml-2 block text-sm text-neutral-700"
                    >
                      {category.label}
                    </label>
                  </div>
                ))}
              </div>
              {categoryFieldErrors && (
                <p className="mt-1 text-sm text-red-600" id="category-error">
                  {categoryFieldErrors}
                </p>
              )}
            </fieldset>

            {/* お問い合わせ内容フィールド */}
            <div>
              <label
                htmlFor={fields.inquiry.id}
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                お問い合わせ内容 <span className="text-red-500">*</span>
              </label>
              <textarea
                key={fields.inquiry.key}
                id={fields.inquiry.id}
                name={fields.inquiry.name}
                defaultValue={fields.inquiry.initialValue}
                rows={5}
                aria-invalid={Boolean(fields.inquiry.errors)}
                aria-describedby={
                  fields.inquiry.errors
                    ? `${fields.inquiry.id}-error`
                    : undefined
                }
                className={getFieldStyles(Boolean(fields.inquiry.errors))}
                placeholder="ご質問やご要望を詳しくお聞かせください..."
              />
              {fields.inquiry.errors && (
                <p
                  className="mt-1 text-sm text-red-600"
                  id={`${fields.inquiry.id}-error`}
                >
                  {fields.inquiry.errors}
                </p>
              )}
            </div>

            {/* 送信ボタン */}
            <div className="flex justify-end pt-4">
              <SubmitButton />
            </div>
          </form>
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
