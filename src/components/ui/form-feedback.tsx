import { clsx } from "clsx";

export type FormFeedbackProps = {
  title?: string;
  message: string;
  variant?: "success" | "error" | "info";
};

const baseStyles = "rounded-3xl border px-4 py-3 text-sm leading-relaxed";

const variantStyles: Record<Required<FormFeedbackProps>["variant"], string> = {
  success: "border-gold/40 bg-gold/10 text-gold", 
  error: "border-red-400/40 bg-red-500/10 text-red-200",
  info: "border-ivory/20 bg-charcoal/60 text-ivory/80",
};

export function FormFeedback({ title, message, variant = "info" }: FormFeedbackProps) {
  return (
    <div className={clsx(baseStyles, variantStyles[variant])}>
      {title && <p className="font-semibold uppercase tracking-[0.22em]">{title}</p>}
      <p className={clsx("mt-1", !title && "mt-0")}>{message}</p>
    </div>
  );
}

export default FormFeedback;
