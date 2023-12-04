"use client";
import React from "react";
import { useChara, useCharacterBook } from "../../_lib/utils";
import {
  Image,
  Accordion,
  AccordionItem,
} from "@nextui-org/react";
import { useCover } from "../../_lib/utils";
import { useTranslations } from "next-intl";

function CharacterPreviews() {
  const t = useTranslations();
  const { cover } = useCover();
  const { chara } = useChara();
  return (
    <>
      <Accordion variant="shadow" selectionMode="multiple">
        <AccordionItem key="1" aria-label="Accordion 1" title={t('Character.cover')}>
          <Image src={cover} height={192} width={192}></Image>
        </AccordionItem>
        <AccordionItem key="2" aria-label="Accordion 2" title={t('Character.information')}>
          <label className="block text-sm font-medium leading-6">
            {t("Character.charactername")}
            <span className="text-red-500">*</span>
          </label>
          <p className="text-gray-500">{chara.data.name}</p>
          <label className="block text-sm font-medium leading-6">
            {t("Character.createdby")}
          </label>
          <p className="text-gray-500">{chara.data.creator}</p>
          <label className="block text-sm font-medium leading-6">
            {t("Character.characterversion")}
          </label>
          <p className="text-gray-500">{chara.data.character_version}</p>
          <label className="block text-sm font-medium leading-6">
            {t("Character.tagstoembed")}
          </label>
          <p className="text-gray-500">{chara.data.tags}</p>
          <label className="block text-sm font-medium leading-6">
            {t("Character.creatorsnotes")}
          </label>
          <p className="text-gray-500">{chara.data.creator_notes}</p>
          <label className="block text-sm font-medium leading-6">
            {t("Character.personalitysummary")}
          </label>
          <p className="text-gray-500">{chara.data.personality}</p>
          <label className="block text-sm font-medium leading-6">
            {t("Character.scenario")}
          </label>
          <p className="text-gray-500">{chara.data.scenario}</p>
        </AccordionItem>
        <AccordionItem
          key="3"
          aria-label="Accordion 3"
          title={t('Character.description')}
        ><p className="text-gray-500">{chara.data.description}</p></AccordionItem>
        <AccordionItem
          key="4"
          aria-label="Accordion 4"
          title={t('Character.firstmessage')}
        ><p className="text-gray-500">{chara.data.first_mes}</p></AccordionItem>
        <AccordionItem
          key="5"
          aria-label="Accordion 5"
          title={t('Character.mainprompt')}
        ><p className="text-gray-500">{chara.data.system_prompt}</p>
        </AccordionItem>
        <AccordionItem
          key="6"
          aria-label="Accordion 6"
          title={t('Character.jailbreak')}
        ><p className="text-gray-500">{chara.data.post_history_instructions}</p></AccordionItem>
         <AccordionItem
          key="7"
          aria-label="Accordion 7"
          title={t('Character.mesexample')}
        ><p className="text-gray-500">{chara.data.mes_example}</p></AccordionItem>
      </Accordion>
    </>
  );
}

export default CharacterPreviews;
