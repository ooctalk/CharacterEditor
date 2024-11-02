import { Divider } from "../Catalyst/divider";
import { Heading } from "../Catalyst/heading";
import React from "react";
import CharacterRegexSelect, {
  CharacterRegexAddButton,
  CharacterRegexDeleteButton,
} from "../Reuse/CharacterRegexButton";
import CharacterRegexEdit from "../Reuse/CharacterRegexEdit";
import { useTranslations } from "next-intl";

function CharacterWorldBooks() {
  const t = useTranslations('Workspaces/Regex')
  return (
    <>
      {/* Title  */}
      <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <Heading>{t('character-regex')}</Heading>
        <div className="flex gap-4 sm:justify-self-end text-nowrap">
          <CharacterRegexDeleteButton />
          <CharacterRegexAddButton />
          <CharacterRegexSelect />
        </div>
      </div>

      <Divider className="my-10 mt-5" />

      {/* Content */}
      <CharacterRegexEdit />
    </>
  );
}

export default CharacterWorldBooks;
