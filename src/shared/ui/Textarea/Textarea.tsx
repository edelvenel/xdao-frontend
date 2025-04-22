import cn from "classnames";
import css from "./styles.module.scss";

interface ITextareaProps
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  value: string;
}

export function Textarea({ value, className, ...props }: ITextareaProps) {
  return (
    <textarea className={cn(css.textarea, className)} {...props}>
      {value}
    </textarea>
  );
}
