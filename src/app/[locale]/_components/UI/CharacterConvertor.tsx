"use client";
import React, { useState } from "react";
import { Heading } from "../Catalyst/heading";
import { Divider } from "../Catalyst/divider";
import {
  CopyCharacterJsonButton,
  ImportCharacterConvertorButton,
} from "../Reuse/CharacterConvertorButton";
import { useTranslations } from "next-intl";
import useStore from "../../_lib/store";

function CharacterConvertor() {
  const t = useTranslations("Workspaces/Convertor");
  const convertorContent = useStore((state) => state.convertorContent);
  return (
    <>
      {/* Title  */}
      <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <Heading>{t("character-convertor")}</Heading>
        <div className="flex gap-4 sm:justify-self-end justify-self-auto">
          <CopyCharacterJsonButton />
          <ImportCharacterConvertorButton />
        </div>
      </div>

      <Divider className="my-10 mt-5" />

      {/* Content */}
      <div>
        <pre className="md:m-8 sm:m-4 whitespace-pre-wrap text-black dark:text-white">
          {convertorContent
            ? JSON.stringify(JSON.parse(convertorContent), null, 2)
            : ""}
        </pre>
      </div>
    </>
  );
}

export default CharacterConvertor;
