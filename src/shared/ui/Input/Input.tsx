import css from "./styles.module.scss";

export function Input({
  ...props
}: React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>) {
  return <input className={css.input} {...props} />;
}
