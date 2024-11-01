import React from "react";
import { Heading } from "../Catalyst/heading";
import { Divider } from "../Catalyst/divider";
import CharacterFirstMessageEdit from "../Reuse/CharacterFirstMessageEdit";
import { useTranslations } from "next-intl";

function CharacterFirstMessage() {
  const t = useTranslations('Workspaces/Firstmessages')
  return (
    <>
      {/* Title  */}
      <Heading>{t('character-first-message')}</Heading>
      <Divider className="my-10 mt-6" />

      {/* Content */}
      <CharacterFirstMessageEdit />
    </>
  );
}

export default CharacterFirstMessage;
