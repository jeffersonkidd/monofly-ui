import clsx from "clsx";
import { SdsForm, type SdsFormProps } from "primitives";
import "./forms.css";

export type FormBoxProps = SdsFormProps;
export function FormBox({ className, ...props }: FormBoxProps) {
  const classNames = clsx(className, "form-box");
  return <SdsForm className={classNames} {...props} />;
}
