import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "terracotta" | "outline" | "outline-light" | "ghost" | "light";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-limestone hover:bg-charcoal-700",
  terracotta: "bg-terracotta text-white hover:bg-terracotta-600",
  outline: "border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-limestone",
  "outline-light": "border border-white/40 text-white hover:bg-white hover:text-ink",
  ghost: "text-ink hover:bg-ink/5",
  light: "bg-limestone text-ink hover:bg-white",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-[0.8125rem]",
  md: "h-12 px-6 text-sm",
  lg: "h-14 px-8 text-[0.9375rem]",
};

type BaseProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  icon?: ReactNode;
};

type ButtonProps = BaseProps & ({ href: string; external?: boolean } & Omit<ComponentProps<"a">, "href" | "className" | "children">);
type NativeButtonProps = BaseProps & Omit<ComponentProps<"button">, "className" | "children">;

function isLink(props: ButtonProps | NativeButtonProps): props is ButtonProps {
  return "href" in props && typeof props.href === "string";
}

const OWN_PROPS = ["variant", "size", "className", "icon", "children", "href", "external"] as const;

/** Strips component-only props so the rest can be spread onto the DOM element. */
function domProps<T extends object>(props: T) {
  const rest = { ...props } as Record<string, unknown>;
  for (const key of OWN_PROPS) delete rest[key];
  return rest;
}

/** Primary CTA element. Renders <Link>, <a> (external) or <button>. */
export function Button(props: ButtonProps | NativeButtonProps) {
  const { variant = "primary", size = "md", className, children, icon } = props;
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-[0.01em] whitespace-nowrap transition-colors duration-200 select-none",
    variants[variant],
    sizes[size],
    className,
  );

  if (isLink(props)) {
    const { href, external } = props;
    const rest = domProps(props);
    if (external) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...rest}>
          {children}
          {icon}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
        {icon}
      </Link>
    );
  }

  const { type = "button" } = props;
  const rest = domProps(props);
  return (
    <button type={type} className={classes} {...rest}>
      {children}
      {icon}
    </button>
  );
}
