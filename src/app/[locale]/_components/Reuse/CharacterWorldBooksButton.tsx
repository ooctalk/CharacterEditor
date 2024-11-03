"use client";
import React from "react";
import { Select } from "../Catalyst/select";
import useStore from "../../_lib/store";
import { useLiveQuery } from "dexie-react-hooks";
import db from "../../_lib/db";
import { Character } from "../../_lib/db";
import { Button } from "../Catalyst/button";
import { useTranslations } from "next-intl";
import { enqueueSnackbar } from "notistack";

function CharacterWorldBooksSelect() {
  const t = useTranslations("Workspaces/Worldbook");
  const { selectedCid, setSelectedWorldBooks } = useStore();
  const selectedCharacter = useLiveQuery(() =>
    selectedCid ? db.characters.where("cid").equals(selectedCid).toArray() : []
  );

  return (
    <>
      {selectedCharacter && selectedCharacter.length > 0
        ? selectedCharacter.map((character: Character) => {
            const characterBookList =
              character.json.data.character_book?.entries || [];

            return (
              <Select
                key={character.cid}
                onChange={(e) => setSelectedWorldBooks(Number(e.target.value))}
              >
                <option>{t("select-a-world-book")}</option>
                {characterBookList.map((book, index) => (
                  <option key={index} value={index}>
                    {book.comment}
                  </option>
                ))}
              </Select>
            );
          })
        : null}
    </>
  );
}

export default CharacterWorldBooksSelect;

export function CharacterBookAddButton() {
  const t = useTranslations("Workspaces/Worldbook");
  const { selectedCid } = useStore();
  const selectedCharacter = useLiveQuery(() =>
    selectedCid ? db.characters.where("cid").equals(selectedCid).toArray() : []
  );

  if (!selectedCharacter || selectedCharacter.length === 0) {
    return null;
  }

  const handleAddBook = async () => {
    if (
      !selectedCharacter ||
      selectedCharacter.length === 0 ||
      selectedCid === null
    )
      return;

    const character = selectedCharacter[0];
    const entries = character.json.data.character_book?.entries || [];

    const newEntry = {
      id: entries.length + 1,
      keys: [],
      secondary_keys: [],
      comment: "ooctalk.com",
      content: "",
      constant: false,
      selective: true,
      insertion_order: 100,
      enabled: true,
      position: "before_char",
      use_regex: true,
      extensions: {
        position: 0,
        exclude_recursion: false,
        display_index: entries.length + 1,
        probability: 100,
        useProbability: true,
        depth: 4,
        selectiveLogic: 0,
        group: "",
        group_override: false,
        group_weight: 0,
        prevent_recursion: false,
        delay_until_recursion: false,
        scan_depth: null,
        match_whole_words: null,
        use_group_scoring: false,
        case_sensitive: null,
        automation_id: "",
        role: 0,
        vectorized: false,
        sticky: 0,
        cooldown: 0,
        delay: 0,
      },
    };

    if (character.cid !== undefined) {
      await db.characters.update(character.cid, {
        json: {
          ...character.json,
          data: {
            ...character.json.data,
            character_book: {
              name:
                character.json.data.character_book?.name || "Default Book Name",
              entries: [...entries, newEntry],
            },
          },
        },
      });
      enqueueSnackbar("Add It", { variant: "info" });
    }
  };

  return <Button onClick={handleAddBook}>{t("add")}</Button>;
}

export function CharacterBookDeleteButton() {
  const t = useTranslations("Workspaces/Worldbook");
  const { selectedCid, selectedWorldBooks } = useStore();
  const selectedCharacter = useLiveQuery(() =>
    selectedCid ? db.characters.where("cid").equals(selectedCid).toArray() : []
  );

  if (!selectedCharacter || selectedCharacter.length === 0) {
    return null;
  }

  const handleDeleteBook = async () => {
    if (
      !selectedCharacter ||
      selectedCharacter.length === 0 ||
      selectedCid === null ||
      selectedWorldBooks === null
    )
      return;

    const character = selectedCharacter[0];
    const entries = character.json.data.character_book?.entries || [];

    if (character.cid !== undefined) {
      const updatedEntries = entries.filter(
        (entry) => entry.id !== selectedWorldBooks
      );

      await db.characters.update(character.cid, {
        json: {
          ...character.json,
          data: {
            ...character.json.data,
            character_book: {
              name:
                character.json.data.character_book?.name || "Default Book Name",
              entries: updatedEntries,
            },
          },
        },
      });
      enqueueSnackbar("Delete It", { variant: "error" });
    } else {
      console.error("Character cid is undefined");
    }
  };

  return (
    <Button color="red" onClick={handleDeleteBook}>
      {t("delete")}
    </Button>
  );
}
