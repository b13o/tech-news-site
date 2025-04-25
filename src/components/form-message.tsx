import { cn } from "@/lib/utils";

type FormMessageProps = {
  message: string | undefined;
  type: "success" | "error";
};

const FormMessage: React.FC<FormMessageProps> = ({ message, type }) => {
  if (!message) return null;

  return (
    <div
      className={cn(
        "p-3 rounded-md border",
        type === "success"
          ? "bg-green-50 text-green-700 border-green-200"
          : "bg-red-50 text-red-700 border-red-200"
      )}
    >
      <p>{message}</p>
    </div>
  );
};

export default FormMessage;
