import { clsx } from "clsx";
import { IconCheck, IconChevronDown } from "icons";
import {
  SdsDescription,
  SdsField,
  SdsFieldError,
  SdsLabel,
  SdsListBox,
  SdsListBoxItem,
  SdsSharedFieldProps,
  type SdsListBoxItemProps,
} from "primitives";
import {
  Button as RACButton,
  Popover as RACPopover,
  Select as RACSelect,
  SelectValue as RACSelectValue,
  type SelectProps as RACSelectProps,
} from "react-aria-components";
import "./select.css";

export interface SelectFieldProps<T extends object>
  extends Omit<SelectProps<T>, "children">,
    SdsSharedFieldProps {
  items?: Iterable<T>;
  children: React.ReactNode | ((item: T) => React.ReactNode);
}
export function SelectField<T extends object>({
  className,
  label,
  description,
  errorMessage,
  children,
  items,
  ...props
}: SelectFieldProps<T>) {
  const classNames = clsx(className, "select-container");
  return (
    <Select className={classNames} {...props}>
      <SdsField>
        {label && <SdsLabel>{label}</SdsLabel>}
        <RACButton className="select">
          <RACSelectValue className="select-value" />
          <IconChevronDown aria-hidden="true" />
        </RACButton>
        <RACPopover>
          <SdsListBox items={items}>{children}</SdsListBox>
        </RACPopover>
        {description && <SdsDescription>{description}</SdsDescription>}
        <SdsFieldError>{errorMessage}</SdsFieldError>
      </SdsField>
    </Select>
  );
}

export type SelectProps<T extends object> = RACSelectProps<T>;
export function Select<T extends object>({ ...props }: SelectProps<T>) {
  return <RACSelect<T> {...props} />;
}

export type SelectItemProps = SdsListBoxItemProps;
export function SelectItem({ children, className, ...props }: SelectItemProps) {
  const classNames = clsx(className, "select-item");
  const textValue = typeof children === "string" ? children : "";
  return (
    <SdsListBoxItem textValue={textValue} className={classNames} {...props}>
      <>
        <IconCheck className="select-item-check" />
        {children}
      </>
    </SdsListBoxItem>
  );
}
