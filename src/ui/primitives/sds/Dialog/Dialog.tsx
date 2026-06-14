import clsx from "clsx";
import { IconX } from "icons";
import {
  SdsButton as Button,
  SdsButtonProps as ButtonProps,
  SdsIconButton,
  SdsIconButtonProps,
  SdsText,
  SdsTextHeading,
  type SdsTextHeadingProps,
  type SdsTextProps,
} from "primitives";
import {
  Dialog as RACDialog,
  DialogTrigger as RACDialogTrigger,
  Modal as RACModal,
  ModalOverlay as RACModalOverlay,
  type DialogProps as RACDialogProps,
  type DialogTriggerProps as RACDialogTriggerProps,
  type ModalOverlayProps as RACModalOverlayProps,
} from "react-aria-components";
import "./dialog.css";

export type DialogProps = RACDialogProps & {
  type?: "sheet" | "card";
};
export function Dialog({ className, type = "card", ...props }: DialogProps) {
  const classNames = clsx(className, "dialog", `dialog-type-${type}`);
  return <RACDialog className={classNames} {...props} />;
}

export type DialogCloseProps = Pick<SdsIconButtonProps, "onPress">;
export const DialogClose = ({ onPress }: DialogCloseProps) => (
  <SdsIconButton
    className="dialog-close"
    aria-label="Dismiss dialog"
    onPress={onPress}
    variant="subtle"
    size="small"
  >
    <IconX />
  </SdsIconButton>
);

export type DialogTriggerProps = RACDialogTriggerProps;
export function DialogTrigger({ ...props }: DialogTriggerProps) {
  return <RACDialogTrigger {...props} />;
}

export interface DialogButtonProps
  extends DialogProps,
    Omit<DialogTriggerProps, "children"> {
  label: string;
  variant?: ButtonProps["variant"];
  icon?: React.ReactNode;
}
export function DialogButton({
  label,
  icon,
  variant,
  children,
  ...props
}: DialogButtonProps) {
  return (
    <DialogTrigger>
      {icon ? (
        <SdsIconButton variant={variant} aria-label={label}>
          {icon}
        </SdsIconButton>
      ) : (
        <Button variant={variant}>{label}</Button>
      )}
      <DialogModal isDismissable>
        <Dialog {...props}>{children}</Dialog>
      </DialogModal>
    </DialogTrigger>
  );
}

export type DialogTitleProps = SdsTextHeadingProps;
export function DialogTitle({ className, ...props }: DialogTitleProps) {
  const classNames = clsx(className, "dialog-title");
  return <SdsTextHeading {...props} slot="title" className={classNames} />;
}

export type DialogDescriptionProps = SdsTextProps;
export function DialogDescription({
  className,
  ...props
}: DialogDescriptionProps) {
  const classNames = clsx(className, "dialog-description");
  return <SdsText {...props} className={classNames} />;
}

export type DialogBodyProps = {
  bleed?: boolean;
} & React.ComponentPropsWithoutRef<"div">;
export function DialogBody({ bleed, className, ...props }: DialogBodyProps) {
  const classNames = clsx(
    className,
    "dialog-body",
    bleed && "dialog-body-bleed",
  );
  return <div {...props} className={classNames} />;
}

export type DialogModalProps = RACModalOverlayProps;
export function DialogModal({
  children,
  className,
  isDismissable,
  ...props
}: DialogModalProps) {
  const classNames = clsx(className, "dialog-backdrop");
  return (
    <RACModalOverlay className={classNames} {...props}>
      <RACModal className={"dialog-container"}>{children}</RACModal>
    </RACModalOverlay>
  );
}
