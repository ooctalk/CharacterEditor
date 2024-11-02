import { Divider } from "../Catalyst/divider";
import { Heading } from "../Catalyst/heading";
import React from "react";
import CharacterWorldBooksSelect, {
  CharacterBookAddButton,
  CharacterBookDeleteButton,
} from "../Reuse/CharacterWorldBooksButton";
import CharacterWorldBooksEdit from "../Reuse/CharacterWorldBooksEdit";
import { useTranslations } from "next-intl";

function CharacterWorldBooks() {
  const t = useTranslations('Workspaces/Worldbook')
  return (
    <>
      {/* Title  */}
      <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <Heading>{t('character-worldbooks')}</Heading>
        <div className="flex gap-4 sm:justify-self-end text-nowrap">
          <CharacterBookDeleteButton />
          <CharacterBookAddButton />
          <CharacterWorldBooksSelect />
        </div>
      </div>

      <Divider className="my-10 mt-5" />

      {/* Content */}
      <CharacterWorldBooksEdit />
    </>
  );
}

export default CharacterWorldBooks;
