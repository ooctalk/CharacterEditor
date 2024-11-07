"use client";

import { usePathname } from "../../../i18n/routing";
import { Link } from "../_components/Catalyst/link";
import { Navbar } from "../_components/Catalyst/navbar";
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarHeading,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
  SidebarSpacer,
} from "../_components/Catalyst/sidebar";
import { SidebarLayout } from "../_components/Catalyst/sidebar-layout";
import {
  CogIcon,
  LayoutGridIcon,
  IdCardIcon,
  RegexIcon,
  EarthIcon,
  StarIcon,
  FileJson2,
  MessageSquareQuoteIcon,
  MessagesSquareIcon,
  PencilRulerIcon,
  BookImageIcon,
  TentTree,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { SnackbarProvider } from "notistack";
import ScrollToTopButton from "../_components/Reuse/ScrollToTopButton";

export default function WorkSpacesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isCurrent = (href: string) => pathname === href;

  const t = useTranslations("SideBarLayout");

  return (
    <SnackbarProvider
      autoHideDuration={5000}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      <SidebarLayout
        sidebar={
          <Sidebar>
            {/* Logo */}
            <div className="mb-2 flex">
              <Link href="#" aria-label="Home"></Link>
            </div>

            {/* Header */}
            <SidebarHeader>
              <SidebarSection>
                <span className="inline-flex items-center rounded-md bg-yellow-100 px-1.5 py-0.5 text-xs font-medium text-yellow-800">
                  {t("preview-version")}
                </span>
                <SidebarItem
                  href="/workspaces"
                  current={isCurrent("/workspaces")}
                >
                  <LayoutGridIcon />
                  <SidebarLabel>{t("workbenches")}</SidebarLabel>
                </SidebarItem>
              </SidebarSection>
            </SidebarHeader>

            {/* Content */}
            <SidebarBody>
              <SidebarSection>
                <SidebarHeading>{t("character")}</SidebarHeading>
                <SidebarItem
                  href="/workspaces/description"
                  current={isCurrent("/workspaces/description")}
                >
                  <IdCardIcon />
                  <SidebarLabel>{t("character-description")}</SidebarLabel>
                </SidebarItem>
                <SidebarItem
                  href="/workspaces/firstmessage"
                  current={isCurrent("/workspaces/firstmessage")}
                >
                  <MessageSquareQuoteIcon />
                  <SidebarLabel>{t("firstmessage")}</SidebarLabel>
                </SidebarItem>
                <SidebarItem
                  href="/workspaces/greetings"
                  current={isCurrent("/workspaces/greetings")}
                >
                  <MessagesSquareIcon />
                  <SidebarLabel>{t("greeting")}</SidebarLabel>
                </SidebarItem>

                <SidebarItem
                  href="/workspaces/advancedDefinitions"
                  current={isCurrent("/workspaces/advancedDefinitions")}
                >
                  <PencilRulerIcon />
                  <SidebarLabel>{t("advanced")}</SidebarLabel>
                </SidebarItem>

                <SidebarItem
                  href="/workspaces/worldbook"
                  current={isCurrent("/workspaces/worldbook")}
                >
                  <EarthIcon />
                  <SidebarLabel>{t("worldBook")}</SidebarLabel>
                </SidebarItem>
                <SidebarItem
                  href="/workspaces/regex"
                  current={isCurrent("/workspaces/regex")}
                >
                  <RegexIcon />
                  <SidebarLabel>{t("regex")}</SidebarLabel>
                </SidebarItem>
              </SidebarSection>

              <SidebarSpacer />

              <SidebarSection>
                <SidebarHeading>{t("tools")}</SidebarHeading>
                {/* <SidebarItem
                  href="/workspaces/inset"
                  current={isCurrent("/workspaces/inset")}
                >
                  <BookImageIcon />
                  <SidebarLabel>
                    {t("inset")}{" "}
                    <span className="inline-flex items-center rounded-full bg-yellow-100 px-1.5 py-0.5 text-xs font-medium text-yellow-800">
                      Beta
                    </span>
                  </SidebarLabel>
                </SidebarItem> */}
                <SidebarItem
                  href="/workspaces/convertor"
                  current={isCurrent("/workspaces/convertor")}
                >
                  <FileJson2 />
                  <SidebarLabel>
                    {t("convertor")}{" "}
                    <span className="inline-flex items-center rounded-full bg-yellow-100 px-1.5 py-0.5 text-xs font-medium text-yellow-800">
                      Beta
                    </span>
                  </SidebarLabel>
                </SidebarItem>
              </SidebarSection>

              <SidebarSection>
                <SidebarHeading>{t("other")}</SidebarHeading>
                <SidebarItem
                  href="https://github.com/ooctalk/CharacterEditor"
                  target="_blank"
                >
                  <StarIcon />
                  <SidebarLabel>{t("project-address")}</SidebarLabel>
                </SidebarItem>
                <SidebarItem href="https://ooctalk.com" target="_blank">
                  <TentTree />
                  <SidebarLabel>{t("community")}</SidebarLabel>
                </SidebarItem>
              </SidebarSection>
            </SidebarBody>

            {/* Footer */}
            <SidebarFooter>
              <SidebarSection>
                <SidebarItem
                  href="/workspaces/settings"
                  current={isCurrent("/workspaces/settings")}
                >
                  <CogIcon />
                  <SidebarLabel>{t("settings")}</SidebarLabel>
                </SidebarItem>
              </SidebarSection>
            </SidebarFooter>
          </Sidebar>
        }
        navbar={<Navbar>{/* Navbar content */}</Navbar>}
      >
        <section>
          {/* Page content */}
          {children}

          <ScrollToTopButton />
        </section>
      </SidebarLayout>
    </SnackbarProvider>
  );
}
