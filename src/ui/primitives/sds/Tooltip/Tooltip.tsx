import clsx from "clsx";
import { SdsDialog } from "primitives";
import {
  OverlayArrow as RACOverlayArrow,
  Popover as RACPopover,
  type OverlayArrowProps as RACOverlayArrowProps,
  type PopoverProps as RACPopoverProps,
} from "react-aria-components";
import "./tooltip.css";

export interface TooltipProps extends Omit<RACPopoverProps, "children"> {
  children: React.ReactNode;
}

export function Tooltip({
  children,
  className,
  offset = 16,
  ...props
}: TooltipProps) {
  const classNames = clsx(className, "tooltip");
  return (
    <RACPopover className={classNames} offset={offset} {...props}>
      <TooltipOverlayArrow />
      <SdsDialog>{children}</SdsDialog>
    </RACPopover>
  );
}

export type TooltipOverlayArrowProps = RACOverlayArrowProps;
export function TooltipOverlayArrow({
  className,
  ...props
}: TooltipOverlayArrowProps) {
  const classNames = clsx(className, "tooltip-overlay-arrow");
  return (
    <RACOverlayArrow {...props} className={classNames}>
      <svg viewBox="0 0 10 5">
        <path d="M0 0 L5 5 L10 0" />
      </svg>
      <svg viewBox="0 0 10 5">
        <path d="M0 0 L5 5 L10 0" />
      </svg>
    </RACOverlayArrow>
  );
}
