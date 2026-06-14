import clsx from "clsx";
import { useAuth } from "data";
import { useMediaQuery } from "hooks";
import { IconChevronDown, IconMenu, IconX } from "icons";
import { Flex, FlexItem, Section, type SectionProps } from "layout";
import {
  SdsAvatar as Avatar,
  SdsAvatarBlock,
  SdsButton as Button,
  SdsButtonGroup,
  SdsDialog,
  SdsDialogModal,
  SdsIconButton,
  SdsLabel,
  SdsLogo,
  SdsMenu,
  SdsMenuItem,
  SdsMenuPopover,
  SdsMenuTrigger,
  SdsNavigation,
  SdsNavigationPill,
} from "primitives";
import { useState } from "react";
import { AnchorOrButton } from "utils";
import "./headers.css";

export function HeaderAuth() {
  const { user, login, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState("pricing");

  const userButtons = (
    <>
      <Button
        variant="subtle"
        size="small"
        onPress={() =>
          login({
            email: "Charlie Brown",
            password: "snooptroupe",
          })
        }
      >
        Log in
      </Button>
      <Button
        size="small"
        onPress={() =>
          login({
            email: "Charlie Brown",
            password: "snooptroupe",
          })
        }
      >
        Register
      </Button>
    </>
  );

  const { isTabletDown } = useMediaQuery();

  const navItems = [
    "Pricing",
    "Solutions",
    "Community",
    "Resources",
    "Contact",
  ];

  const navigation = (
    <SdsNavigation direction={isTabletDown ? "column" : "row"}>
      {navItems.map((item) => (
        <SdsNavigationPill
          key={item}
          onPress={() => setPage(item.toLowerCase())}
          isSelected={page === item.toLowerCase()}
        >
          {item}
        </SdsNavigationPill>
      ))}
    </SdsNavigation>
  );

  return (
    <Flex
      direction="column"
      gap="300"
      alignPrimary="center"
      alignSecondary="center"
    >
      <FlexItem>
        {isTabletDown ? (
          <Flex alignPrimary="center">
            <SdsIconButton
              variant="subtle"
              aria-label="Toggle navigation menu"
              onPress={() => setOpen(true)}
            >
              <IconMenu />
            </SdsIconButton>
            <SdsDialogModal isOpen={open}>
              <SdsDialog className={clsx("navigation-dialog")}>
                <SdsIconButton
                  className={clsx("navigation-dialog-close")}
                  variant="subtle"
                  aria-label="Close navigation menu"
                  onPress={() => setOpen(false)}
                >
                  <IconX />
                </SdsIconButton>
                <Flex
                  direction="column"
                  alignPrimary="space-between"
                  alignSecondary="center"
                >
                  {navigation}
                  {user ? (
                    <Flex alignSecondary="center" gap="200" direction="column">
                      <FlexItem>
                        <Flex alignPrimary="center">
                          <Avatar
                            src={user.avatar}
                            initials={user.name.charAt(0)}
                          />
                        </Flex>
                      </FlexItem>
                      <FlexItem>
                        <Flex alignPrimary="center">
                          <SdsLabel>{user.name}</SdsLabel>
                        </Flex>
                      </FlexItem>
                      <FlexItem>
                        <Flex alignPrimary="center">
                          <Button
                            variant="subtle"
                            size="small"
                            onPress={logout}
                          >
                            Log out
                          </Button>
                        </Flex>
                      </FlexItem>
                    </Flex>
                  ) : (
                    <SdsButtonGroup align="center">{userButtons}</SdsButtonGroup>
                  )}
                </Flex>
              </SdsDialog>
            </SdsDialogModal>
          </Flex>
        ) : (
          <Flex gap="400" alignSecondary="center">
            {navigation}
            {user ? (
              <SdsMenuTrigger>
                <AnchorOrButton className={clsx("header-auth-avatar-button")}>
                  <Avatar src={user.avatar} initials={user.name.charAt(0)} />
                  <IconChevronDown />
                </AnchorOrButton>
                <SdsMenuPopover placement="bottom right">
                  <SdsMenu>
                    <SdsMenuItem>
                      <SdsAvatarBlock title={user.name} description="View profile">
                        <Avatar
                          src={user.avatar}
                          initials={user.name.charAt(0)}
                        />
                      </SdsAvatarBlock>
                    </SdsMenuItem>
                    <SdsMenuItem onAction={logout}>Log out</SdsMenuItem>
                  </SdsMenu>
                </SdsMenuPopover>
              </SdsMenuTrigger>
            ) : (
              <SdsButtonGroup className={clsx("header-auth-avatar-button")}>
                {userButtons}
              </SdsButtonGroup>
            )}
          </Flex>
        )}
      </FlexItem>
    </Flex>
  );
}

export type HeaderProps = Omit<SectionProps, "variant" | "padding" | "src">;
export function Header({ className, ...props }: HeaderProps) {
  return (
    <Section
      className="header"
      elementType="header"
      variant="stroke"
      padding={"600"}
      {...props}
    >
      <Flex container alignPrimary="space-between" alignSecondary="center">
        <FlexItem size="minor">
          <SdsLogo />
        </FlexItem>
        <FlexItem size="major">
          <Flex gap="600" alignPrimary="end" alignSecondary="center">
            <HeaderAuth />
          </Flex>
        </FlexItem>
      </Flex>
    </Section>
  );
}