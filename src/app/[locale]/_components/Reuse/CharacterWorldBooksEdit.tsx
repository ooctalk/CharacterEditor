"use client";
import React from "react";
import useStore from "../../_lib/store";
import { useLiveQuery } from "dexie-react-hooks";
import db from "../../_lib/db";
import { Character } from "../../_lib/db";
import { Subheading } from "../Catalyst/heading";
import { Input } from "../Catalyst/input";
import { Divider } from "../Catalyst/divider";
import { Field, Label } from "../Catalyst/fieldset";
import { Select } from "../Catalyst/select";
import { Checkbox, CheckboxField } from "../Catalyst/checkbox";
import { Textarea } from "../Catalyst/textarea";
import { useTranslations } from "next-intl";
import NoSelectCharacterCTA from "./NoSelectCharacterCTA";

function CharacterWorldBooksEdit() {
  const t = useTranslations("Workspaces/Worldbook");
  const { selectedCid, selectedWorldBooks } = useStore();
  const selectedCharacter = useLiveQuery(() =>
    selectedCid ? db.characters.where("cid").equals(selectedCid).toArray() : []
  );

  const handleUpdate = async (cid: number, field: string, value: any) => {
    await db.characters.update(cid, { [field]: value });
  };

  return (
    <>
      {selectedCharacter && selectedCharacter.length > 0
        ? (
          selectedCharacter.map((character: Character) => {
            const entries = character.json.data.character_book?.entries || [];

            if (
              selectedWorldBooks === null ||
              selectedWorldBooks < 0 ||
              selectedWorldBooks >= entries.length
            ) {
              return <p>{t("please-select-a-valid-world-book")}</p>;
            }

            const selectedEntry = entries[selectedWorldBooks];

            return selectedEntry
              ? (
                <div key={selectedEntry.id}>
                  <section className="grid gap-x-8 gap-y-6">
                    <div className="space-y-1">
                      <Subheading>{t("basic-setup")}</Subheading>
                    </div>
                    <div className="space-y-4">
                      <CheckboxField>
                        <Checkbox
                          checked={selectedEntry.enabled}
                          onChange={(checked: boolean) => {
                            if (character.cid !== undefined) {
                              handleUpdate(
                                character.cid,
                                `json.data.character_book.entries.${selectedWorldBooks}.enabled`,
                                checked,
                              );
                            }
                          }}
                        />
                        <Label>{t("switch")}</Label>
                      </CheckboxField>

                      <Field>
                        <Label>{t("content")}</Label>
                        <Textarea
                          rows={8}
                          defaultValue={selectedEntry.content}
                          onChange={(e) => {
                            if (character.cid !== undefined) {
                              handleUpdate(
                                character.cid,
                                `json.data.character_book.entries.${selectedWorldBooks}.content`,
                                e.target.value,
                              );
                            }
                          }}
                        />
                      </Field>

                      <Field>
                        <Label>{t("tittle")}</Label>
                        <Input
                          type="text"
                          defaultValue={selectedEntry.comment}
                          onChange={(e) => {
                            if (character.cid !== undefined) {
                              handleUpdate(
                                character.cid,
                                `json.data.character_book.entries.${selectedWorldBooks}.comment`,
                                e.target.value,
                              );
                            }
                          }}
                        />
                      </Field>
                      <Field>
                        <Label>{t("key-word")}</Label>
                        <Input
                          type="text"
                          defaultValue={selectedEntry.keys.join(", ")}
                          onChange={(e) => {
                            if (character.cid !== undefined) {
                              const updatedKeys = e.target.value
                                .split(",")
                                .map((key) => key.trim());
                              handleUpdate(
                                character.cid,
                                `json.data.character_book.entries.${selectedWorldBooks}.keys`,
                                updatedKeys,
                              );
                            }
                          }}
                        />
                      </Field>

                      <Field>
                        <Label>{t("strategy")}</Label>
                        <Select
                          defaultValue={character.json.data.character_book
                              ?.entries[
                                selectedWorldBooks
                              ]?.constant
                            ? "true"
                            : "false"}
                          onChange={(e) => {
                            if (character.cid !== undefined) {
                              handleUpdate(
                                character.cid,
                                `json.data.character_book.entries.${selectedWorldBooks}.constant`,
                                e.target.value === "true",
                              );
                            }
                          }}
                          name="Strategy"
                        >
                          <option value="true">{t("constant")}</option>
                          <option value="false">{t("normal")}</option>
                        </Select>
                      </Field>

                      <Field>
                        <Label>{t("position")}</Label>
                        <Select
                          defaultValue={character.json.data.character_book
                            ?.entries[
                              selectedWorldBooks
                            ]?.extensions?.position}
                          onChange={(e) => {
                            if (character.cid !== undefined) {
                              const selectedPosition = Number(e.target.value);
                              if (selectedPosition === 0) {
                                // ↑Char
                                handleUpdate(
                                  character.cid,
                                  `json.data.character_book.entries.${selectedWorldBooks}.extensions.position`,
                                  0,
                                );
                                handleUpdate(
                                  character.cid,
                                  `json.data.character_book.entries.${selectedWorldBooks}.extensions.role`,
                                  0,
                                );
                              } else if (selectedPosition === 1) {
                                // ↓Char
                                handleUpdate(
                                  character.cid,
                                  `json.data.character_book.entries.${selectedWorldBooks}.extensions.position`,
                                  1,
                                );
                                handleUpdate(
                                  character.cid,
                                  `json.data.character_book.entries.${selectedWorldBooks}.extensions.role`,
                                  0,
                                );
                              } else if (selectedPosition === 2) {
                                // ↑AN
                                handleUpdate(
                                  character.cid,
                                  `json.data.character_book.entries.${selectedWorldBooks}.extensions.position`,
                                  2,
                                );
                                handleUpdate(
                                  character.cid,
                                  `json.data.character_book.entries.${selectedWorldBooks}.extensions.role`,
                                  0,
                                );
                              } else if (selectedPosition === 3) {
                                // ↓AN
                                handleUpdate(
                                  character.cid,
                                  `json.data.character_book.entries.${selectedWorldBooks}.extensions.position`,
                                  3,
                                );
                                handleUpdate(
                                  character.cid,
                                  `json.data.character_book.entries.${selectedWorldBooks}.extensions.role`,
                                  0,
                                );
                              } else if (selectedPosition === 4) {
                                // @D
                                handleUpdate(
                                  character.cid,
                                  `json.data.character_book.entries.${selectedWorldBooks}.extensions.position`,
                                  4,
                                );
                                handleUpdate(
                                  character.cid,
                                  `json.data.character_book.entries.${selectedWorldBooks}.extensions.role`,
                                  0,
                                );
                              } else if (selectedPosition === 7) {
                                // @D User
                                handleUpdate(
                                  character.cid,
                                  `json.data.character_book.entries.${selectedWorldBooks}.extensions.position`,
                                  4,
                                );
                                handleUpdate(
                                  character.cid,
                                  `json.data.character_book.entries.${selectedWorldBooks}.extensions.role`,
                                  1,
                                );
                              } else if (selectedPosition === 8) {
                                // @D AI
                                handleUpdate(
                                  character.cid,
                                  `json.data.character_book.entries.${selectedWorldBooks}.extensions.position`,
                                  4,
                                );
                                handleUpdate(
                                  character.cid,
                                  `json.data.character_book.entries.${selectedWorldBooks}.extensions.role`,
                                  2,
                                );
                              } else if (selectedPosition === 5) {
                                // ↑EM
                                handleUpdate(
                                  character.cid,
                                  `json.data.character_book.entries.${selectedWorldBooks}.extensions.position`,
                                  5,
                                );
                                handleUpdate(
                                  character.cid,
                                  `json.data.character_book.entries.${selectedWorldBooks}.extensions.role`,
                                  0,
                                );
                              } else if (selectedPosition === 6) {
                                // ↓EM
                                handleUpdate(
                                  character.cid,
                                  `json.data.character_book.entries.${selectedWorldBooks}.extensions.position`,
                                  6,
                                );
                                handleUpdate(
                                  character.cid,
                                  `json.data.character_book.entries.${selectedWorldBooks}.extensions.role`,
                                  0,
                                );
                              }
                            }
                          }}
                          name="position"
                        >
                          <option value={0}>↑Char</option>
                          <option value={1}>↓Char</option>
                          <option value={2}>↑AN</option>
                          <option value={3}>↓AN</option>
                          <option value={4}>@D</option>
                          <option value={7}>@D User</option>
                          <option value={8}>@D AI</option>
                          <option value={5}>↑EM</option>
                          <option value={6}>↓EM</option>
                        </Select>
                      </Field>
                    </div>
                  </section>

                  <Divider className="my-10 mt-6" />

                  <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div className="space-y-1">
                      <Subheading>{t("advanced-options")}</Subheading>
                    </div>
                    <div className="space-y-4">
                      <Field>
                        <Label>{t("second-key-word-logic")}</Label>
                        <Select
                          defaultValue={character.json.data.character_book
                            ?.entries[
                              selectedWorldBooks
                            ]?.extensions?.selectiveLogic}
                          onChange={(e) => {
                            if (character.cid !== undefined) {
                              handleUpdate(
                                character.cid,
                                `json.data.character_book.entries.${selectedWorldBooks}.extensions.selectiveLogic`,
                                e.target.value,
                              );
                            }
                          }}
                        >
                          <option value={0}>{t("anywherewith")}</option>
                          <option value={1}>{t("notany")}</option>
                          <option value={2}>{t("nonpossession")}</option>
                          <option value={3}>{t("with-all")}</option>
                        </Select>
                      </Field>

                      <Field>
                        <Label>{t("second-key-word-0")}</Label>
                        <Input
                          type="text"
                          defaultValue={selectedEntry.secondary_keys.join(", ")}
                          onChange={(e) => {
                            if (character.cid !== undefined) {
                              const updatedSecondaryKeys = e.target.value
                                .split(",")
                                .map((key) => key.trim());
                              handleUpdate(
                                character.cid,
                                `json.data.character_book.entries.${selectedWorldBooks}.secondary_keys`,
                                updatedSecondaryKeys,
                              );
                            }
                          }}
                        />
                      </Field>

                      <Field>
                        <Label>{t("order")}</Label>
                        <Input
                          type="number"
                          step={1}
                          min={0}
                          max={9999}
                          defaultValue={selectedEntry.insertion_order}
                          onChange={(e) => {
                            if (character.cid !== undefined) {
                              handleUpdate(
                                character.cid,
                                `json.data.character_book.entries.${selectedWorldBooks}.insertion_order`,
                                e.target.value,
                              );
                            }
                          }}
                        />
                      </Field>

                      <Field>
                        <Label>{t("depth")}</Label>
                        <Input
                          type="number"
                          step={1}
                          min={0}
                          max={999}
                          defaultValue={selectedEntry.extensions.depth}
                          onChange={(e) => {
                            if (character.cid !== undefined) {
                              handleUpdate(
                                character.cid,
                                `json.data.character_book.entries.${selectedWorldBooks}.extensions.depth`,
                                e.target.value,
                              );
                            }
                          }}
                        />
                      </Field>

                      <Field>
                        <Label>{t("probability")}</Label>
                        <Input
                          typeof="number"
                          step={1}
                          min={0}
                          max={100}
                          defaultValue={selectedEntry.extensions.probability}
                          onChange={(e) => {
                            if (character.cid !== undefined) {
                              handleUpdate(
                                character.cid,
                                `json.data.character_book.entries.${selectedWorldBooks}.extensions.probability`,
                                e.target.value,
                              );
                            }
                          }}
                        />
                      </Field>
                    </div>
                  </section>
                </div>
              )
              : <p>No entry found for the selected World Book.</p>;
          })
        )
        : <NoSelectCharacterCTA />}
    </>
  );
}

export default CharacterWorldBooksEdit;
