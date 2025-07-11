type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "danger";
};

export const Button = ({ variant = "primary", className, ...props }: Props) => {
  const base = "px-4 py-2 rounded text-sm font-medium";
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
  };
  return <button {...props} className={`${base} ${variants[variant]} ${className}`} />;
};
