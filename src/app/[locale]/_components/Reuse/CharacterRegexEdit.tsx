"use client";
import React from "react";
import useStore from "../../_lib/store";
import { useLiveQuery } from "dexie-react-hooks";
import db from "../../_lib/db";
import { Character } from "../../_lib/db";
import { Subheading } from "../Catalyst/heading";
import { Input } from "../Catalyst/input";
import { Field, Label } from "../Catalyst/fieldset";
import { Checkbox, CheckboxField } from "../Catalyst/checkbox";
import { Textarea } from "../Catalyst/textarea";
import NoSelectCharacterCTA from "./NoSelectCharacterCTA";
import { useTranslations } from "next-intl";

function CharacterRegexEdit() {
  const t = useTranslations("Workspaces/Regex");
  const { selectedCid, selectedRegexIndex } = useStore();
  const selectedCharacter = useLiveQuery(() =>
    selectedCid ? db.characters.where("cid").equals(selectedCid).toArray() : []
  );

  const handleUpdate = async (cid: number, field: string, value: any) => {
    await db.characters.update(cid, { [field]: value });
  };

  return (
    <>
      {selectedCharacter && selectedCharacter.length > 0 ? (
        selectedCharacter.map((character: Character) => {
          const regexs = character.json.data.extensions.regex_scripts || [];

          const selectedRegex =
            selectedRegexIndex !== null &&
            selectedRegexIndex >= 0 &&
            selectedRegexIndex < regexs.length
              ? regexs[selectedRegexIndex]
              : null;

          return selectedRegex ? (
            <div key={selectedRegex.id}>
              <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                <div className="space-y-1">
                  <Subheading>{t("regex-setting")}</Subheading>
                </div>
                <div className="space-y-4">
                  <CheckboxField>
                    <Checkbox
                      checked={selectedRegex.disabled}
                      onChange={(checked: boolean) => {
                        if (character.cid !== undefined) {
                          handleUpdate(
                            character.cid,
                            `json.data.extensions.regex_scripts.${selectedRegexIndex}.disabled`,
                            checked
                          );
                        }
                      }}
                    />
                    <Label>{t("disable-this-script")}</Label>
                  </CheckboxField>
                  <Field>
                    <Label>{t("script-name")}</Label>
                    <Input
                      defaultValue={selectedRegex.scriptName}
                      onChange={(e) => {
                        if (character.cid !== undefined) {
                          handleUpdate(
                            character.cid,
                            `json.data.extensions.regex_scripts.${selectedRegexIndex}.scriptName`,
                            e.target.value
                          );
                        }
                      }}
                    />
                  </Field>

                  <Field>
                    <Label>{t("find-regular-expression")}</Label>
                    <Input
                      defaultValue={selectedRegex.findRegex}
                      onChange={(e) => {
                        if (character.cid !== undefined) {
                          handleUpdate(
                            character.cid,
                            `json.data.extensions.regex_scripts.${selectedRegexIndex}.findRegex`,
                            e.target.value
                          );
                        }
                      }}
                    />
                  </Field>

                  <Field>
                    <Label>{t("place-here")}</Label>
                    <Textarea
                      rows={4}
                      value={selectedRegex.replaceString}
                      onChange={(e) => {
                        if (character.cid !== undefined) {
                          handleUpdate(
                            character.cid,
                            `json.data.extensions.regex_scripts.${selectedRegexIndex}.replaceString`,
                            e.target.value
                          );
                        }
                      }}
                    />
                  </Field>

                  <Field>
                    <Label>{t("replace-with")}</Label>
                    <Textarea
                      rows={4}
                      value={selectedRegex.trimStrings}
                      onChange={(e) => {
                        if (character.cid !== undefined) {
                          handleUpdate(
                            character.cid,
                            `json.data.extensions.regex_scripts.${selectedRegexIndex}.trimStrings`,
                            e.target.value
                          );
                        }
                      }}
                    />
                  </Field>

                  <CheckboxField>
                    <Checkbox
                      checked={selectedRegex.placement.includes(1)}
                      onChange={(checked: boolean) => {
                        if (character.cid !== undefined) {
                          const updatedPlacement = [...selectedRegex.placement];

                          if (checked) {
                            if (!updatedPlacement.includes(1)) {
                              updatedPlacement.push(1);
                            }
                          } else {
                            const index = updatedPlacement.indexOf(1);
                            if (index > -1) {
                              updatedPlacement.splice(index, 1);
                            }
                          }

                          handleUpdate(
                            character.cid,
                            `json.data.extensions.regex_scripts.${selectedRegexIndex}.placement`,
                            updatedPlacement
                          );
                        }
                      }}
                    />
                    <Label>{t("user-input")}</Label>
                  </CheckboxField>

                  <CheckboxField>
                    <Checkbox
                      checked={selectedRegex.placement.includes(2)}
                      onChange={(checked: boolean) => {
                        if (character.cid !== undefined) {
                          const updatedPlacement = [...selectedRegex.placement];

                          if (checked) {
                            if (!updatedPlacement.includes(2)) {
                              updatedPlacement.push(2);
                            }
                          } else {
                            const index = updatedPlacement.indexOf(2);
                            if (index > -1) {
                              updatedPlacement.splice(index, 1);
                            }
                          }

                          handleUpdate(
                            character.cid,
                            `json.data.extensions.regex_scripts.${selectedRegexIndex}.placement`,
                            updatedPlacement
                          );
                        }
                      }}
                    />
                    <Label>{t("ai-output")}</Label>
                  </CheckboxField>

                  <CheckboxField>
                    <Checkbox
                      checked={selectedRegex.placement.includes(3)}
                      onChange={(checked: boolean) => {
                        if (character.cid !== undefined) {
                          const updatedPlacement = [...selectedRegex.placement];

                          if (checked) {
                            if (!updatedPlacement.includes(3)) {
                              updatedPlacement.push(3);
                            }
                          } else {
                            const index = updatedPlacement.indexOf(3);
                            if (index > -1) {
                              updatedPlacement.splice(index, 1);
                            }
                          }

                          handleUpdate(
                            character.cid,
                            `json.data.extensions.regex_scripts.${selectedRegexIndex}.placement`,
                            updatedPlacement
                          );
                        }
                      }}
                    />
                    <Label>{t("shortcut-command")}</Label>
                  </CheckboxField>

                  <CheckboxField>
                    <Checkbox
                      checked={selectedRegex.placement.includes(5)}
                      onChange={(checked: boolean) => {
                        if (character.cid !== undefined) {
                          const updatedPlacement = [...selectedRegex.placement];

                          if (checked) {
                            if (!updatedPlacement.includes(5)) {
                              updatedPlacement.push(5);
                            }
                          } else {
                            const index = updatedPlacement.indexOf(5);
                            if (index > -1) {
                              updatedPlacement.splice(index, 1);
                            }
                          }

                          handleUpdate(
                            character.cid,
                            `json.data.extensions.regex_scripts.${selectedRegexIndex}.placement`,
                            updatedPlacement
                          );
                        }
                      }}
                    />
                    <Label>{t("world-information")}</Label>
                  </CheckboxField>

                  <Field>
                    <Label>{t("minimum-depth")}</Label>
                    <Input
                      type="number"
                      step={1}
                      min={0}
                      max={999}
                      defaultValue={
                        selectedRegex.minDepth !== null
                          ? selectedRegex.minDepth
                          : 0
                      }
                      onChange={(e) => {
                        if (character.cid !== undefined) {
                          handleUpdate(
                            character.cid,
                            `json.data.extensions.regex_scripts.${selectedRegexIndex}.minDepth`,
                            Number(e.target.value)
                          );
                        }
                      }}
                    />
                  </Field>

                  <Field>
                    <Label>{t("maximum-depth")}</Label>
                    <Input
                      type="number"
                      step={1}
                      min={0}
                      max={999}
                      defaultValue={
                        selectedRegex.maxDepth !== null
                          ? selectedRegex.maxDepth
                          : 999
                      }
                      onChange={(e) => {
                        if (character.cid !== undefined) {
                          handleUpdate(
                            character.cid,
                            `json.data.extensions.regex_scripts.${selectedRegexIndex}.maxDepth`,
                            Number(e.target.value)
                          );
                        }
                      }}
                    />
                  </Field>

                  <CheckboxField>
                    <Checkbox
                      checked={selectedRegex.runOnEdit}
                      onChange={(checked: boolean) => {
                        if (character.cid !== undefined) {
                          handleUpdate(
                            character.cid,
                            `json.data.extensions.regex_scripts.${selectedRegexIndex}.runOnEdit`,
                            checked
                          );
                        }
                      }}
                    />
                    <Label>{t("run-while-editing")}</Label>
                  </CheckboxField>

                  <CheckboxField>
                    <Checkbox
                      checked={selectedRegex.substituteRegex}
                      onChange={(checked: boolean) => {
                        if (character.cid !== undefined) {
                          handleUpdate(
                            character.cid,
                            `json.data.extensions.regex_scripts.${selectedRegexIndex}.substituteRegex`,
                            checked
                          );
                        }
                      }}
                    />
                    <Label>{t("substitute-regular-expression")}</Label>
                  </CheckboxField>

                  <CheckboxField>
                    <Checkbox
                      checked={selectedRegex.markdownOnly}
                      onChange={(checked: boolean) => {
                        if (character.cid !== undefined) {
                          handleUpdate(
                            character.cid,
                            `json.data.extensions.regex_scripts.${selectedRegexIndex}.markdownOnly`,
                            checked
                          );
                        }
                      }}
                    />
                    <Label>{t("format-only-display")}</Label>
                  </CheckboxField>

                  <CheckboxField>
                    <Checkbox
                      checked={selectedRegex.promptOnly}
                      onChange={(checked: boolean) => {
                        if (character.cid !== undefined) {
                          handleUpdate(
                            character.cid,
                            `json.data.extensions.regex_scripts.${selectedRegexIndex}.promptOnly`,
                            checked
                          );
                        }
                      }}
                    />
                    <Label>{t("format-prompt-words-only")}</Label>
                  </CheckboxField>
                </div>
              </section>
            </div>
          ) : (
            <p>{t("select-the-regular-expression-you-want-to-edit")}</p>
          );
        })
      ) : (
        <NoSelectCharacterCTA />
      )}
    </>
  );
}

export default CharacterRegexEdit;
