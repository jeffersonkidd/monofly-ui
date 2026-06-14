import { clsx } from "clsx";
import { IconSearch, IconX } from "icons";
import { SdsIconButton, SdsInput, SdsLabel, SdsListBox, SdsListBoxItem } from "primitives";
import React, { useRef, useState } from "react";
import {
  ComboBox as RACComboBox,
  Popover as RACPopover,
  type InputProps as RACInputProps,
} from "react-aria-components";
import "./search.css";

export type SearchProps = Omit<RACInputProps, "results"> & {
  results?: string[];
  onSearch?: (search: string) => void;
};
export const Search = React.forwardRef(function Search(
  { className, results, onSearch, ...props }: SearchProps,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const onInputInput = (search: string) => {
    setSearchTerm(search);
    if (onSearch) {
      onSearch(search);
    }
  };

  const classNames = clsx(className, "search-input-container");

  return (
    <RACComboBox className={classNames}>
      <SdsLabel hidden>{props["aria-label"] || "Search"}</SdsLabel>
      <SdsInput
        type="search"
        className="search-input"
        value={searchTerm}
        onInput={(e) => onInputInput(e.currentTarget.value)}
        ref={(node) => {
          inputRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        {...props}
      />
      <span className="search-icon">
        {searchTerm ? (
          <SdsIconButton
            aria-label="Clear search"
            onPress={() => onInputInput("")}
            size="small"
            variant="subtle"
          >
            <IconX />
          </SdsIconButton>
        ) : (
          <SdsIconButton
            aria-label="Clear search"
            onPress={() => inputRef?.current?.focus()}
            size="small"
            variant="subtle"
          >
            <IconSearch />
          </SdsIconButton>
        )}
      </span>
      <RACPopover>
        <SdsListBox>
          {results?.map((a) => (
            <SdsListBoxItem key={a} onAction={() => onInputInput(a)}>
              {a}
            </SdsListBoxItem>
          ))}
        </SdsListBox>
      </RACPopover>
    </RACComboBox>
  );
});
