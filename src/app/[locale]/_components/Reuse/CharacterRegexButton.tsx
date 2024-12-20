"use client";
import React, { useState } from "react";
import { Select } from "../Catalyst/select";
import useStore from "../../_lib/store";
import { useLiveQuery } from "dexie-react-hooks";
import db from "../../_lib/db";
import { Character } from "../../_lib/db";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../Catalyst/button";
import { useTranslations } from "next-intl";
import { enqueueSnackbar } from "notistack";
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from "../Catalyst/dialog";
import { Field, Label } from "../Catalyst/fieldset";
import { Input } from "../Catalyst/input";

export default function CharacterRegexSelect() {
  const t = useTranslations("Workspaces/Regex");
  const { selectedCid, setSelectedRegexIndex } = useStore();
  const selectedCharacter = useLiveQuery(() =>
    selectedCid ? db.characters.where("cid").equals(selectedCid).toArray() : []
  );

  return (
    <>
      {selectedCharacter && selectedCharacter.length > 0
        ? selectedCharacter.map((character: Character) => {
          const regexsList = character.json.data.extensions.regex_scripts || [];

          return (
            <Select
              key={character.cid}
              aria-label="Select Regex"
              name="Regex"
              onChange={(e) => setSelectedRegexIndex(Number(e.target.value))}
            >
              <option>{t("select-a-regex")}</option>
              {regexsList.map((regex, index) => (
                <option key={index} value={index}>
                  # {regex.scriptName}
                </option>
              ))}
            </Select>
          );
        })
        : null}
    </>
  );
}

export function CharacterRegexAddButton() {
  const { selectedCid } = useStore();
  const t = useTranslations("Workspaces/Regex");
  const selectedCharacter = useLiveQuery(() =>
    selectedCid ? db.characters.where("cid").equals(selectedCid).toArray() : []
  );

  if (!selectedCharacter || selectedCharacter.length === 0) {
    return null;
  }

  const handleAddRegex = async () => {
    if (
      !selectedCharacter ||
      selectedCharacter.length === 0 ||
      selectedCid === null
    ) {
      return;
    }

    const character = selectedCharacter[0];
    const regexsList = character.json.data.extensions.regex_scripts || [];

    const newRegex = {
      id: uuidv4(),
      scriptName: "ooctalk.com",
      findRegex: "",
      replaceString: "",
      trimStrings: [],
      placement: [],
      disabled: false,
      markdownOnly: false,
      promptOnly: false,
      runOnEdit: false,
      substituteRegex: false,
      minDepth: null,
      maxDepth: null,
    };

    regexsList.push(newRegex);

    if (character.cid !== undefined) {
      await db.characters.update(character.cid, {
        json: {
          ...character.json,
          data: {
            ...character.json.data,
            extensions: {
              ...character.json.data.extensions,
              regex_scripts: regexsList,
            },
          },
        },
      });
      enqueueSnackbar("Add It", { variant: "info" });
    } else {
      console.error("Character cid is undefined");
    }
  };

  return <Button onClick={handleAddRegex}>{t("add")}</Button>;
}

export function CharacterRegexDeleteButton() {
  const [regexDeleteDialog, setRexDeleteDialog] = useState(false);
  const t = useTranslations("Workspaces/Regex");
  const { selectedCid, selectedRegexIndex } = useStore();

  const selectedCharacter = useLiveQuery(() =>
    selectedCid ? db.characters.where("cid").equals(selectedCid).toArray() : []
  );
  if (!selectedCharacter || selectedCharacter.length === 0) {
    return null;
  }

  const handleDeleteRegex = async () => {
    if (
      !selectedCharacter ||
      selectedCharacter.length === 0 ||
      selectedCid === null ||
      selectedRegexIndex === null
    ) {
      return;
    }

    const character = selectedCharacter[0];
    const regexsList = character.json.data.extensions.regex_scripts || [];

    if (selectedRegexIndex >= 0 && selectedRegexIndex < regexsList.length) {
      regexsList.splice(selectedRegexIndex, 1);

      if (character.cid !== undefined) {
        await db.characters.update(character.cid, {
          json: {
            ...character.json,
            data: {
              ...character.json.data,
              extensions: {
                ...character.json.data.extensions,
                regex_scripts: regexsList,
              },
            },
          },
        });
        setRexDeleteDialog(false);
        enqueueSnackbar("Delete It", { variant: "error" });
      } else {
        console.error("Character cid is undefined");
      }
    } else {
      console.error("Selected regex index is out of range");
    }
  };

  return (
    <>
      <Button color="red" onClick={() => setRexDeleteDialog(true)}>
        {t("delete")}
      </Button>
      <Dialog
        open={regexDeleteDialog}
        onClose={() => setRexDeleteDialog(false)}
      >
        <DialogTitle>{t("are-you-sure")}</DialogTitle>
        <DialogBody>
        </DialogBody>
        <DialogActions>
          <Button plain onClick={() => setRexDeleteDialog(false)}>
            {t("cancel")}
          </Button>
          <Button color="red" onClick={handleDeleteRegex}>{t("delete")}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
