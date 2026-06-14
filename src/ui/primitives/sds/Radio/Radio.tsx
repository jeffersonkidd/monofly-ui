import { clsx } from "clsx";
import { SdsDescription, SdsFieldError, SdsLabel, SdsSharedFieldProps } from "primitives";
import {
  Radio as RACRadio,
  RadioGroup as RACRadioGroup,
  type RadioGroupProps as RACRadioGroupProps,
  type RadioProps as RACRadioProps,
} from "react-aria-components";
import "./radio.css";

export interface RadioGroupProps
  extends Omit<RACRadioGroupProps, "children">,
    SdsSharedFieldProps {
  children?: React.ReactNode;
}

export function RadioGroup({
  className,
  label,
  description,
  errorMessage,
  children,
  ...props
}: RadioGroupProps) {
  const classNames = clsx(className, "radio-group");
  return (
    <RACRadioGroup {...props} className={classNames}>
      {label && <SdsLabel>{label}</SdsLabel>}
      {description && <SdsDescription>{description}</SdsDescription>}
      {errorMessage && <SdsFieldError>{errorMessage}</SdsFieldError>}
      {children}
    </RACRadioGroup>
  );
}

export type RadioFieldProps = RACRadioProps & SdsSharedFieldProps;
export function RadioField({
  children,
  className,
  label,
  description,
  errorMessage,
  ...props
}: RadioFieldProps) {
  const classNames = clsx(className, "radio-field");
  const labelText: string | undefined =
    label || (typeof children === "string" ? children : undefined);
  return (
    <RACRadio className={classNames} {...props}>
      <>
        <SdsLabel>{labelText}</SdsLabel>
        <Radio />
        {description && <SdsDescription>{description}</SdsDescription>}
        <SdsFieldError>{errorMessage}</SdsFieldError>
        {labelText !== children && children}
      </>
    </RACRadio>
  );
}

export type RadioProps = React.ComponentPropsWithoutRef<"div">;
export function Radio({ className, ...props }: RadioProps) {
  const classNames = clsx(className, "radio");
  return (
    <div className={classNames} {...props}>
      <span aria-hidden="true" className="radio-check" />
    </div>
  );
}
