import { clsx } from "clsx";
import { SdsDescription, SdsFieldError, SdsLabel, SdsSharedFieldProps } from "primitives";
import { forwardRef } from "react";
import {
  TextArea as RACTextArea,
  TextField as RACTextField,
  type TextAreaProps as RACTextAreaProps,
  type TextFieldProps as RACTextFieldProps,
} from "react-aria-components";
import "./textarea.css";

export type SharedTextareaProps = { isResizable?: boolean };

export type TextareaFieldProps = SdsSharedFieldProps &
  RACTextFieldProps &
  SharedTextareaProps;
export function TextareaField({
  className,
  placeholder,
  label,
  description,
  errorMessage,
  ...props
}: TextareaFieldProps) {
  const classNames = clsx(className, "field");
  return (
    <RACTextField className={classNames} {...props}>
      {label && <SdsLabel>{label}</SdsLabel>}
      <Textarea placeholder={placeholder} />
      {description && <SdsDescription>{description}</SdsDescription>}
      <SdsFieldError>{errorMessage}</SdsFieldError>
    </RACTextField>
  );
}

export type TextareaProps = SharedTextareaProps & RACTextAreaProps;
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ isResizable = true, ...props }, ref) {
    const classNames = clsx("text-area", isResizable && "text-area-resizable");
    return <RACTextArea ref={ref} className={classNames} {...props} />;
  },
);
