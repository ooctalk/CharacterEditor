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

      <ListboxOption value="zh-TW">
        <ListboxLabel>繁体中文</ListboxLabel>
      </ListboxOption>

      <ListboxOption value="fr">
        <ListboxLabel>Français</ListboxLabel>
      </ListboxOption>

      <ListboxOption value="ja">
        <ListboxLabel>日本語</ListboxLabel>
      </ListboxOption>

      <ListboxOption value="es">
        <ListboxLabel>Español</ListboxLabel>
      </ListboxOption>

      <ListboxOption value="de">
        <ListboxLabel>Deutsch</ListboxLabel>
      </ListboxOption>

      <ListboxOption value="ru">
        <ListboxLabel>Русский</ListboxLabel>
      </ListboxOption>

      <ListboxOption value="ko">
        <ListboxLabel>한국어</ListboxLabel>
      </ListboxOption>

      <ListboxOption value="pt">
        <ListboxLabel>Português</ListboxLabel>
      </ListboxOption>

      <ListboxOption value="it">
        <ListboxLabel>Italiano</ListboxLabel>
      </ListboxOption>
    </Listbox>
  );
};

export default LanguageSwitcher;
