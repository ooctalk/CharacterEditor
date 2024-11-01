import { Heading } from "../Catalyst/heading";
import React from "react";
import { Divider } from "../Catalyst/divider";
import CharacterDescriptionEdit from "../Reuse/CharacterDescriptionEdit";
import { useTranslations } from "next-intl";

function CharacterDescription() {
  const t = useTranslations('Workspaces/Description')
  return (
    <>
      {/* Title  */}
      <Heading>{t('character-description')}</Heading>
      <Divider className="my-10 mt-6" />

      {/* Content */}
      <CharacterDescriptionEdit />
    </>
  );
}

export default CharacterDescription;
