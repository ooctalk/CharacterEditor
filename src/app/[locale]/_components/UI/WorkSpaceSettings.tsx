import React from "react";
import { Heading, Subheading } from "../Catalyst/heading";
import { Divider } from "../Catalyst/divider";
import ThemeSwitcher from "../Reuse/ThemeSwitcher";
import LanguageSwitcher from "../Reuse/LanguageSwitcher";
import { useTranslations } from "next-intl";

function WorkSpaceSettings() {
  const t = useTranslations('Workspaces/Settings')
  return (
    <>
      {/* Title  */}
      <Heading>{t('settings')}</Heading>
      <Divider className="my-10 mt-6" />

      {/* Theme  */}
      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>{t('theme')}</Subheading>
        </div>
        <div className="justify-self-end">
          <ThemeSwitcher />
        </div>
      </section>

      <Divider className="my-10 mt-6" />

      {/* Language  */}
      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>{t('language')}</Subheading>
        </div>
        <div className="justify-self-end">
          <LanguageSwitcher />
        </div>
      </section>
    </>
  );
}

export default WorkSpaceSettings;
