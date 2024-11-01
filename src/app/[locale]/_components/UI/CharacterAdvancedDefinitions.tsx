import { Heading } from "../Catalyst/heading";
import React from "react";
import { Divider } from "../Catalyst/divider";
import CharacterDescriptionEdit from "../Reuse/CharacterDescriptionEdit";
import { useTranslations } from "next-intl";
import CharacterAdvancedDefinitionsEdit from "../Reuse/CharacterAdvancedDefinitionsEdit";

function CharacterDescriptionDefinitions() {
  const t = useTranslations('Workspaces/AdvancedDefinitions')
  return (
    <>
      {/* Title  */}
      <Heading>{t('advanced-definitions')}</Heading>
      <Divider className="my-10 mt-6" />

      {/* Content */}
      <CharacterAdvancedDefinitionsEdit />
    </>
  );
}

export default CharacterDescriptionDefinitions;
