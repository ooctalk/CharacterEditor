import React from "react";
import { Heading, Subheading } from "../Catalyst/heading";
import { Divider } from "../Catalyst/divider";
import ThemeSwitcher from "../Reuse/ThemeSwitcher";
import LanguageSwitcher from "../Reuse/LanguageSwitcher";
import { useTranslations } from "next-intl";
import {
  CharacterBackUp,
  CharacterClear,
  CharacterImport,
} from "../Reuse/CharacterSettingsButton";

function WorkSpaceSettings() {
  const t = useTranslations("Workspaces/Settings");
  return (
    <>
      {/* Title  */}
      <Heading>{t("settings")}</Heading>
      <Divider className="my-10 mt-6" />

      {/* Theme  */}
      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>{t("theme")}</Subheading>
        </div>
        <div className="justify-self-end">
          <ThemeSwitcher />
        </div>
      </section>

      <Divider className="my-10 mt-6" />

      {/* Language  */}
      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>{t("language")}</Subheading>
        </div>
        <div className="justify-self-end">
          <LanguageSwitcher />
        </div>
      </section>

      <Divider className="my-10 mt-6" />

      {/* Backup  */}
      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>{t("backup-data")}</Subheading>
        </div>
        <div className="justify-self-end">
          <CharacterBackUp />
        </div>
      </section>

      <Divider className="my-10 mt-6" />

      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>{t("import-data")}</Subheading>
        </div>
        <div className="justify-self-end">
          <CharacterImport />
        </div>
      </section>

      <Divider className="my-10 mt-6" />

      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>{t("delete-data")}</Subheading>
        </div>
        <div className="justify-self-end">
          <CharacterClear />
        </div>
      </section>
    </>
  );
}

export default WorkSpaceSettings;
