import React from "react";
import { Heading } from "../Catalyst/heading";
import { Divider } from "../Catalyst/divider";
import {
  WorkSpacesAddCharacterButton,
  WorkSpacesImportCharacterButton,
} from "../Reuse/WorkSpacesButton";
import WorkSpacesCharactersGallery from "./WorkSpacesCharactersGallery";
import { useTranslations } from "next-intl";

function WorkSpaces() {
  const t = useTranslations("Workspaces");
  return (
    <>
      {/* Title  */}
      <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <Heading>{t('character-gallery')}</Heading>
        <div className="flex gap-4 sm:justify-self-end justify-self-auto">
          <WorkSpacesImportCharacterButton />
          <WorkSpacesAddCharacterButton />
        </div>
      </div>

      <Divider className="my-10 mt-5" />

      {/* Content */}
      <WorkSpacesCharactersGallery />
    </>
  );
}

export default WorkSpaces;
