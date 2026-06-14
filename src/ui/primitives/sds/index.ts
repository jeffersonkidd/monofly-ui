// SDS primitive lineage — react-aria-components, co-located *.css, --sds-* tokens.
// Every export is namespaced Sds* so the shadcn lineage can own the bare
// names (Button, Dialog, Input, …). Source files keep bare names; the aliasing
// lives here. For the shadcn counterparts import bare from "primitives/shadcn".

export {
  Accordion as SdsAccordion,
  AccordionItem as SdsAccordionItem,
  type AccordionItemProps as SdsAccordionItemProps,
  type AccordionProps as SdsAccordionProps,
} from "./Accordion/Accordion";

export {
  Avatar as SdsAvatar,
  AvatarBlock as SdsAvatarBlock,
  AvatarButton as SdsAvatarButton,
  AvatarGroup as SdsAvatarGroup,
  type AvatarBlockProps as SdsAvatarBlockProps,
  type AvatarButtonProps as SdsAvatarButtonProps,
  type AvatarGroupProps as SdsAvatarGroupProps,
  type AvatarProps as SdsAvatarProps,
} from "./Avatar/Avatar";

export {
  Button as SdsButton,
  ButtonDanger as SdsButtonDanger,
  ButtonGroup as SdsButtonGroup,
  type ButtonDangerProps as SdsButtonDangerProps,
  type ButtonGroupProps as SdsButtonGroupProps,
  type ButtonProps as SdsButtonProps,
} from "./Button/Button";

export {
  Checkbox as SdsCheckbox,
  CheckboxField as SdsCheckboxField,
  CheckboxGroup as SdsCheckboxGroup,
  type CheckboxFieldProps as SdsCheckboxFieldProps,
  type CheckboxGroupProps as SdsCheckboxGroupProps,
  type CheckboxProps as SdsCheckboxProps,
} from "./Checkbox/Checkbox";

export {
  Dialog as SdsDialog,
  DialogBody as SdsDialogBody,
  DialogButton as SdsDialogButton,
  DialogClose as SdsDialogClose,
  DialogDescription as SdsDialogDescription,
  DialogModal as SdsDialogModal,
  DialogTitle as SdsDialogTitle,
  DialogTrigger as SdsDialogTrigger,
  type DialogBodyProps as SdsDialogBodyProps,
  type DialogButtonProps as SdsDialogButtonProps,
  type DialogCloseProps as SdsDialogCloseProps,
  type DialogDescriptionProps as SdsDialogDescriptionProps,
  type DialogModalProps as SdsDialogModalProps,
  type DialogProps as SdsDialogProps,
  type DialogTitleProps as SdsDialogTitleProps,
  type DialogTriggerProps as SdsDialogTriggerProps,
} from "./Dialog/Dialog";

export {
  Description as SdsDescription,
  Field as SdsField,
  FieldError as SdsFieldError,
  FieldGroup as SdsFieldGroup,
  Fieldset as SdsFieldset,
  Form as SdsForm,
  Keyboard as SdsKeyboard,
  Label as SdsLabel,
  Legend as SdsLegend,
  formEventTargetToFormData as SdsFormEventTargetToFormData,
  type DescriptionProps as SdsDescriptionProps,
  type FieldErrorProps as SdsFieldErrorProps,
  type FieldGroupProps as SdsFieldGroupProps,
  type FieldProps as SdsFieldProps,
  type FieldsetProps as SdsFieldsetProps,
  type FormDataValue as SdsFormDataValue,
  type FormProps as SdsFormProps,
  type KeyboardProps as SdsKeyboardProps,
  type LabelProps as SdsLabelProps,
  type LegendProps as SdsLegendProps,
  type SharedFieldProps as SdsSharedFieldProps,
} from "./Fieldset/Fieldset";

export {
  Icon as SdsIcon,
  type IconProps as SdsIconProps,
  type IconSize as SdsIconSize,
} from "./Icon/Icon";

export {
  DestructiveIconButton as SdsDestructiveIconButton,
  IconButton as SdsIconButton,
  type DestructiveIconButtonProps as SdsDestructiveIconButtonProps,
  type IconButtonProps as SdsIconButtonProps,
} from "./IconButton/IconButton";

export {
  Image as SdsImage,
  Picture as SdsPicture,
  PictureSource as SdsPictureSource,
  type ImageProps as SdsImageProps,
  type PictureProps as SdsPictureProps,
  type PictureSourceProps as SdsPictureSourceProps,
} from "./Image/Image";

export {
  Input as SdsInput,
  InputField as SdsInputField,
  type InputFieldProps as SdsInputFieldProps,
  type InputProps as SdsInputProps,
} from "./Input/Input";

export {
  Link as SdsLink,
  type LinkProps as SdsLinkProps,
} from "./Link/Link";

export {
  ListBox as SdsListBox,
  ListBoxItem as SdsListBoxItem,
  type ListBoxItemProps as SdsListBoxItemProps,
  type ListBoxProps as SdsListBoxProps,
} from "./ListBox/ListBox";

export {
  Logo as SdsLogo,
  type LogoProps as SdsLogoProps,
} from "./Logo/Logo";

export {
  Menu as SdsMenu,
  MenuButton as SdsMenuButton,
  MenuDescription as SdsMenuDescription,
  MenuHeader as SdsMenuHeader,
  MenuHeading as SdsMenuHeading,
  MenuItem as SdsMenuItem,
  MenuLabel as SdsMenuLabel,
  MenuPopover as SdsMenuPopover,
  MenuSection as SdsMenuSection,
  MenuSeparator as SdsMenuSeparator,
  MenuShortcut as SdsMenuShortcut,
  MenuTrigger as SdsMenuTrigger,
  type MenuButtonProps as SdsMenuButtonProps,
  type MenuDescriptionProps as SdsMenuDescriptionProps,
  type MenuHeaderProps as SdsMenuHeaderProps,
  type MenuHeadingProps as SdsMenuHeadingProps,
  type MenuItemProps as SdsMenuItemProps,
  type MenuLabelProps as SdsMenuLabelProps,
  type MenuPopoverProps as SdsMenuPopoverProps,
  type MenuProps as SdsMenuProps,
  type MenuSectionProps as SdsMenuSectionProps,
  type MenuSeparatorProps as SdsMenuSeparatorProps,
  type MenuShortcutProps as SdsMenuShortcutProps,
  type MenuTriggerProps as SdsMenuTriggerProps,
} from "./Menu/Menu";

export {
  Navigation as SdsNavigation,
  NavigationButton as SdsNavigationButton,
  NavigationPill as SdsNavigationPill,
  type NavigationButtonProps as SdsNavigationButtonProps,
  type NavigationPillProps as SdsNavigationPillProps,
  type NavigationProps as SdsNavigationProps,
} from "./Navigation/Navigation";

export {
  Notification as SdsNotification,
  type NotificationProps as SdsNotificationProps,
} from "./Notification/Notification";

export {
  Pagination as SdsPagination,
  PaginationGap as SdsPaginationGap,
  PaginationList as SdsPaginationList,
  PaginationNext as SdsPaginationNext,
  PaginationPage as SdsPaginationPage,
  PaginationPrevious as SdsPaginationPrevious,
  type PaginationProps as SdsPaginationProps,
} from "./Pagination/Pagination";

export {
  Radio as SdsRadio,
  RadioField as SdsRadioField,
  RadioGroup as SdsRadioGroup,
  type RadioFieldProps as SdsRadioFieldProps,
  type RadioGroupProps as SdsRadioGroupProps,
  type RadioProps as SdsRadioProps,
} from "./Radio/Radio";

export {
  Search as SdsSearch,
  type SearchProps as SdsSearchProps,
} from "./Search/Search";

export {
  Select as SdsSelect,
  SelectField as SdsSelectField,
  SelectItem as SdsSelectItem,
  type SelectFieldProps as SdsSelectFieldProps,
  type SelectItemProps as SdsSelectItemProps,
  type SelectProps as SdsSelectProps,
} from "./Select/Select";

export {
  Slider as SdsSlider,
  SliderField as SdsSliderField,
  SliderOutput as SdsSliderOutput,
  SliderThumb as SdsSliderThumb,
  SliderTrack as SdsSliderTrack,
  type SliderFieldProps as SdsSliderFieldProps,
  type SliderOutputProps as SdsSliderOutputProps,
  type SliderProps as SdsSliderProps,
  type SliderThumbProps as SdsSliderThumbProps,
  type SliderTrackProps as SdsSliderTrackProps,
} from "./Slider/Slider";

export {
  Switch as SdsSwitch,
  SwitchField as SdsSwitchField,
  SwitchGroup as SdsSwitchGroup,
  type SwitchFieldProps as SdsSwitchFieldProps,
  type SwitchGroupProps as SdsSwitchGroupProps,
  type SwitchProps as SdsSwitchProps,
} from "./Switch/Switch";

export {
  Tab as SdsTab,
  TabList as SdsTabList,
  TabPanel as SdsTabPanel,
  Tabs as SdsTabs,
  type TabListProps as SdsTabListProps,
  type TabPanelProps as SdsTabPanelProps,
  type TabProps as SdsTabProps,
  type TabsProps as SdsTabsProps,
} from "./Tab/Tab";

export {
  Table as SdsTable,
  TableBody as SdsTableBody,
  TableCell as SdsTableCell,
  TableColumn as SdsTableColumn,
  TableHead as SdsTableHead,
  TableRow as SdsTableRow,
  type TableBodyProps as SdsTableBodyProps,
  type TableCellProps as SdsTableCellProps,
  type TableColumnProps as SdsTableColumnProps,
  type TableHeadProps as SdsTableHeadProps,
  type TableProps as SdsTableProps,
  type TableRowProps as SdsTableRowProps,
} from "./Table/Table";

export {
  Tag as SdsTag,
  TagButton as SdsTagButton,
  TagToggle as SdsTagToggle,
  TagToggleGroup as SdsTagToggleGroup,
  TagToggleList as SdsTagToggleList,
  type TagButtonProps as SdsTagButtonProps,
  type TagProps as SdsTagProps,
  type TagToggleGroupProps as SdsTagToggleGroupProps,
  type TagToggleListProps as SdsTagToggleListProps,
  type TagToggleProps as SdsTagToggleProps,
} from "./Tag/Tag";

export {
  Text as SdsText,
  TextCode as SdsTextCode,
  TextContentHeading as SdsTextContentHeading,
  TextContentTitle as SdsTextContentTitle,
  TextEmphasis as SdsTextEmphasis,
  TextHeading as SdsTextHeading,
  TextInput as SdsTextInput,
  TextLink as SdsTextLink,
  TextLinkList as SdsTextLinkList,
  TextList as SdsTextList,
  TextListItem as SdsTextListItem,
  TextPrice as SdsTextPrice,
  TextSmall as SdsTextSmall,
  TextSmallStrong as SdsTextSmallStrong,
  TextStrong as SdsTextStrong,
  TextSubheading as SdsTextSubheading,
  TextSubtitle as SdsTextSubtitle,
  TextTitleHero as SdsTextTitleHero,
  TextTitlePage as SdsTextTitlePage,
  type TextCodeProps as SdsTextCodeProps,
  type TextContentHeadingProps as SdsTextContentHeadingProps,
  type TextContentTitleProps as SdsTextContentTitleProps,
  type TextEmphasisProps as SdsTextEmphasisProps,
  type TextHeadingProps as SdsTextHeadingProps,
  type TextInputProps as SdsTextInputProps,
  type TextLinkListProps as SdsTextLinkListProps,
  type TextLinkProps as SdsTextLinkProps,
  type TextListItemProps as SdsTextListItemProps,
  type TextListProps as SdsTextListProps,
  type TextPriceProps as SdsTextPriceProps,
  type TextProps as SdsTextProps,
  type TextSmallProps as SdsTextSmallProps,
  type TextSmallStrongProps as SdsTextSmallStrongProps,
  type TextStrongProps as SdsTextStrongProps,
  type TextSubheadingProps as SdsTextSubheadingProps,
  type TextSubtitleProps as SdsTextSubtitleProps,
  type TextTitleHeroProps as SdsTextTitleHeroProps,
  type TextTitlePageProps as SdsTextTitlePageProps,
} from "./Text/Text";

export {
  Textarea as SdsTextarea,
  TextareaField as SdsTextareaField,
  type SharedTextareaProps as SdsSharedTextareaProps,
  type TextareaFieldProps as SdsTextareaFieldProps,
  type TextareaProps as SdsTextareaProps,
} from "./Textarea/Textarea";

export {
  Tooltip as SdsTooltip,
  TooltipOverlayArrow as SdsTooltipOverlayArrow,
  type TooltipOverlayArrowProps as SdsTooltipOverlayArrowProps,
  type TooltipProps as SdsTooltipProps,
} from "./Tooltip/Tooltip";
