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

export default function CharacterGreetingsSelect() {
  const t = useTranslations("Workspaces/Greetings");
  const { selectedCid, setSelectGreetingsIndex } = useStore();
  const selectedCharacter = useLiveQuery(() =>
    selectedCid ? db.characters.where("cid").equals(selectedCid).toArray() : []
  );

  return (
    <>
      {selectedCharacter && selectedCharacter.length > 0
        ? selectedCharacter.map((character: Character) => {
            const greetingsList = character.json.data.alternate_greetings;
            return (
              <Select
                key={character.cid}
                aria-label="Select Greeting"
                name="greeting"
                onChange={(e) =>
                  setSelectGreetingsIndex(Number(e.target.value))
                }
              >
                <option>Select a Greeting</option>
                {greetingsList.map((greeting, index) => (
                  <option key={index} value={index}>
                    # {index + 1}
                  </option>
                ))}
              </Select>
            );
          })
        : ""}
    </>
  );
}

export function CharacterGreetingsDeleteButton() {
  const t = useTranslations("Workspaces/Greetings");
  const { selectedCid, selectedGreetingsIndex } = useStore();

  const selectedCharacter = useLiveQuery(() =>
    selectedCid ? db.characters.where("cid").equals(selectedCid).toArray() : []
  );

  if (!selectedCharacter || selectedCharacter.length === 0) {
    return null;
  }

  const handleDelete = async () => {
    if (selectedCharacter && selectedCharacter.length > 0) {
      const character = selectedCharacter[0];
      const greetingsList = character.json.data.alternate_greetings;

      if (
        selectedGreetingsIndex !== null &&
        selectedGreetingsIndex >= 0 &&
        selectedGreetingsIndex < greetingsList.length
      ) {
        const updatedGreetings = greetingsList.filter(
          (_, index) => index !== selectedGreetingsIndex
        );

        if (character.cid !== undefined) {
          await db.characters.update(character.cid, {
            "json.data.alternate_greetings": updatedGreetings,
          });
          enqueueSnackbar("Delete It", { variant: "error" });
        } else {
          console.error("Character ID is undefined");
        }
      }
    }
  };

  return (
    <Button onClick={handleDelete} color="red">
      {t("delete")}
    </Button>
  );
}

export function CharacterGreetingsNewButton() {
  const t = useTranslations("Workspaces/Greetings");
  const { selectedCid } = useStore();

  const selectedCharacter = useLiveQuery(() =>
    selectedCid ? db.characters.where("cid").equals(selectedCid).toArray() : []
  );

  if (!selectedCharacter || selectedCharacter.length === 0) {
    return null;
  }

  const handleAddGreeting = async () => {
    const character = selectedCharacter[0];
    const greetingsList = character.json.data.alternate_greetings;
    const updatedGreetings = [...greetingsList, ""];

    if (character.cid !== undefined) {
      await db.characters.update(character.cid, {
        "json.data.alternate_greetings": updatedGreetings,
      });
      enqueueSnackbar("Add It", { variant: "info" });
    } else {
      console.error("Character ID is undefined");
    }
  };

  return <Button onClick={handleAddGreeting}>{t("add")}</Button>;
}
