import clsx from "clsx";
import {
  SdsButton as Button,
  SdsButtonDanger,
  SdsButtonDangerProps,
  type SdsButtonProps as ButtonProps,
} from "primitives";
import { ForwardedRef, forwardRef } from "react";
import "./iconButton.css";

export type IconButtonProps = Omit<ButtonProps, "aria-label"> & {
  "aria-label": string;
};
export const IconButton = forwardRef(function IconButton(
  { className, ...props }: IconButtonProps,
  ref: ForwardedRef<HTMLElement>,
) {
  const classNames = clsx(className, "icon-button");
  return <Button {...props} ref={ref} className={classNames} />;
});

export type DestructiveIconButtonProps = Omit<
  SdsButtonDangerProps,
  "aria-label"
> & {
  "aria-label": string;
};
export const DestructiveIconButton = forwardRef(function IconButton(
  props: DestructiveIconButtonProps,
  ref: ForwardedRef<HTMLElement>,
) {
  return <SdsButtonDanger {...props} ref={ref} className="icon-button" />;
});
