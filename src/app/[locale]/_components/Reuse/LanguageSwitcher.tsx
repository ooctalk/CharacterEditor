"use client";
import { Listbox, ListboxLabel, ListboxOption } from "../Catalyst/listbox";
import React from "react";
import { useLocale } from "next-intl";
import { useRouter } from "../../../../i18n/routing";

const LanguageSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();

  const handleRouterPush = (value: string) => {
    router.replace("/workspaces/settings", { locale: value });
  };

  return (
    <Listbox name="language" defaultValue={locale} onChange={handleRouterPush}>
      <ListboxOption value="en">
        <ListboxLabel>English</ListboxLabel>
      </ListboxOption>

      <ListboxOption value="zh-CN">
        <ListboxLabel>简体中文</ListboxLabel>
      </ListboxOption>
    </Listbox>
  );
};

export default LanguageSwitcher;
