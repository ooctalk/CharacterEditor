"use client";
import React, { useRef } from "react";
import useStore from "../../_lib/store";
import { useLiveQuery } from "dexie-react-hooks";
import db from "../../_lib/db";
import { Character } from "../../_lib/db";
import NoSelectCharacterCTA from "./NoSelectCharacterCTA";
import { Subheading } from "../Catalyst/heading";
import { Field, Label } from "@headlessui/react";
import { Input } from "../Catalyst/input";
import { Textarea } from "../Catalyst/textarea";
import { Divider } from "../Catalyst/divider";
import { useTranslations } from "next-intl";

function CharacterAdvancedDefinitionsEdit() {
  const { selectedCid } = useStore();
  const t = useTranslations("Workspaces/AdvancedDefinitions");
  const selectedCharacter = useLiveQuery(() =>
    selectedCid ? db.characters.where("cid").equals(selectedCid).toArray() : []
  );

  const handleUpdate = async (cid: number, field: string, value: any) => {
    await db.characters.update(cid, { [field]: value });
  };

  return (
    <div>
      {selectedCharacter && selectedCharacter.length > 0
        ? (
          selectedCharacter.map((character: Character) => {
            const cid = character.cid;
            if (cid === undefined) return null;
            return (
              <div key={cid}>
                <section className="grid gap-x-8 gap-y-6">
                  <div className="space-y-1">
                    <Subheading>{t("prompt-overrides")}</Subheading>
                  </div>
                  <div className="space-y-4">
                    <Field>
                      <Label>{t("main-prompt-0")}</Label>
                      <Textarea
                        defaultValue={character.json.data.system_prompt}
                        onChange={(e) => {
                          if (character.cid !== undefined) {
                            handleUpdate(
                              character.cid,
                              `json.data.system_prompt`,
                              e.target.value,
                            );
                          }
                        }}
                      />
                    </Field>
                    <Field>
                      <Label>{t("post-history-instructions")}</Label>
                      <Textarea
                        defaultValue={character.json.data
                          .post_history_instructions}
                        onChange={(e) => {
                          if (character.cid !== undefined) {
                            handleUpdate(
                              character.cid,
                              `json.data.system_post_history_instructions`,
                              e.target.value,
                            );
                          }
                        }}
                      />
                    </Field>
                  </div>
                </section>

                <Divider className="my-10 mt-6" />

                <section className="grid gap-x-8 gap-y-6">
                  <div className="space-y-1">
                    <Subheading>{t("creators-metadata")}</Subheading>
                  </div>
                  <div className="space-y-4">
                    <Field>
                      <Label>{t("charactername")}</Label>
                      <Input
                        defaultValue={character.json.data.name}
                        onChange={(e) => {
                          if (character.cid !== undefined) {
                            handleUpdate(
                              character.cid,
                              `json.data.name`,
                              e.target.value,
                            );
                          }
                        }}
                      />
                    </Field>
                    <Field>
                      <Label>{t("created-by")}</Label>
                      <Textarea
                        rows={2}
                        defaultValue={character.json.data.creator}
                        onChange={(e) => {
                          if (
                            character.cid !== undefined
                          ) {
                            handleUpdate(
                              character.cid,
                              `json.data.creator`,
                              e.target.value,
                            );
                          }
                        }}
                      />
                    </Field>
                    <Field>
                      <Label>{t("character-version")}</Label>
                      <Textarea
                        rows={2}
                        defaultValue={character.json.data.character_version}
                        onChange={(e) => {
                          if (character.cid !== undefined) {
                            handleUpdate(
                              character.cid,
                              `json.data.character_version`,
                              e.target.value,
                            );
                          }
                        }}
                      />
                    </Field>
                    <Field>
                      <Label>{t("characterworldbookname")}</Label>
                      <Input
                        defaultValue={character.json.data.character_book?.name}
                        onChange={(e) => {
                          if (character.cid !== undefined) {
                            handleUpdate(
                              character.cid,
                              `json.data.character_book.name`,
                              e.target.value,
                            );
                          }
                        }}
                      />
                    </Field>
                    <Field>
                      <Label>{t("creators-notes")}</Label>
                      <Textarea
                        rows={2}
                        defaultValue={character.json.data.creator_notes}
                        onChange={(e) => {
                          if (character.cid !== undefined) {
                            handleUpdate(
                              character.cid,
                              `json.data.creator_notes`,
                              e.target.value,
                            );
                          }
                        }}
                      />
                    </Field>
                    <Field>
                      <Label>{t("tags-to-embed")}</Label>
                      <Input
                        defaultValue={character.json.data.tags}
                        onChange={(e) => {
                          if (character.cid !== undefined) {
                            handleUpdate(
                              character.cid,
                              `json.data.tags`,
                              e.target.value,
                            );
                          }
                        }}
                      />
                    </Field>

                    <Field>
                      <Label>{t("personality-summary")}</Label>
                      <Textarea
                        defaultValue={character.json.data.personality}
                        onChange={(e) => {
                          if (character.cid !== undefined) {
                            handleUpdate(
                              character.cid,
                              `json.data.personality`,
                              e.target.value,
                            );
                          }
                        }}
                      />
                    </Field>

                    <Field>
                      <Label>{t("scenario")}</Label>
                      <Textarea
                        defaultValue={character.json.data.scenario}
                        onChange={(e) => {
                          if (character.cid !== undefined) {
                            handleUpdate(
                              character.cid,
                              `json.data.scenario`,
                              e.target.value,
                            );
                          }
                        }}
                      />
                    </Field>

                    <Field>
                      <Label>{t("characters-note")}</Label>
                      <Textarea
                        defaultValue={character.json.data.extensions
                          .depth_prompt.prompt}
                        onChange={(e) => {
                          if (character.cid !== undefined) {
                            handleUpdate(
                              character.cid,
                              `json.data.extensions.depth_prompt.prompt`,
                              e.target.value,
                            );
                          }
                        }}
                      />
                    </Field>

                    <Field>
                      <Label>{t("examples-of-dialogue")}</Label>
                      <Textarea
                        defaultValue={character.json.data.mes_example}
                        rows={4}
                        onChange={(e) => {
                          if (character.cid !== undefined) {
                            handleUpdate(
                              character.cid,
                              `json.data.mes_example`,
                              e.target.value,
                            );
                          }
                        }}
                      />
                    </Field>
                  </div>
                </section>
              </div>
            );
          })
        )
        : <NoSelectCharacterCTA />}
    </div>
  );
}

export default CharacterAdvancedDefinitionsEdit;
