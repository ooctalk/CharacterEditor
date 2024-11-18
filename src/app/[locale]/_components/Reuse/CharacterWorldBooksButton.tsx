"use client";
import React, { useState } from "react";
import { Select } from "../Catalyst/select";
import useStore from "../../_lib/store";
import { useLiveQuery } from "dexie-react-hooks";
import db from "../../_lib/db";
import { Character } from "../../_lib/db";
import { Button } from "../Catalyst/button";
import { useTranslations } from "next-intl";
import { enqueueSnackbar } from "notistack";
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogTitle,
} from "../Catalyst/dialog";
import { Field, Fieldset, Label } from "../Catalyst/fieldset";
import { Input } from "../Catalyst/input";
import { Checkbox, CheckboxField, CheckboxGroup } from "../Catalyst/checkbox";
import { saveAs } from "file-saver";

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
    ) {
      return;
    }

    const character = selectedCharacter[0];
    const entries = character.json.data.character_book?.entries || [];

    const newEntry = {
      id: entries.length + 1,
      keys: [],
      secondary_keys: [],
      comment: "New Book",
      content: "",
      constant: false,
      selective: true,
      insertion_order: 100,
      enabled: true,
      position: "after_char",
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
              entries: [...entries, newEntry],
              name: character.json.data.character_book?.name ||
                character.json.data.name + "World Book",
            },
          },
        },
      });
      enqueueSnackbar("Add It", { variant: "success" });
    }
  };

  return <Button onClick={handleAddBook}>{t("add")}</Button>;
}

export function CharacterBookDeleteButton() {
  const [worldBookDeleteDialog, setWorldBookDeleteDialog] = useState(false);
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
    ) {
      return;
    }

    const character = selectedCharacter[0];
    const entries = character.json.data.character_book?.entries || [];

    if (selectedWorldBooks >= 0 && selectedWorldBooks < entries.length) {
      const deletedBookComment = entries[selectedWorldBooks].comment;

      entries.splice(selectedWorldBooks, 1);

      if (
        character.cid !== undefined &&
        character.json.data.character_book?.entries
      ) {
        await db.characters.update(character.cid, {
          json: {
            ...character.json,
            data: {
              ...character.json.data,
              character_book: {
                ...character.json.data.character_book,
                entries: entries,
              },
            },
          },
        });

        setWorldBookDeleteDialog(false);
        enqueueSnackbar(t("delete") + `: ${deletedBookComment}`, {
          variant: "error",
        });
      } else {
        console.error("Character cid is undefined");
      }
    } else {
      console.error("Invalid world book selection");
    }
  };

  return (
    <>
      <Button color="red" onClick={() => setWorldBookDeleteDialog(true)}>
        {t("delete")}
      </Button>
      <Dialog
        open={worldBookDeleteDialog}
        onClose={() => setWorldBookDeleteDialog(false)}
      >
        <DialogTitle>{t("are-you-sure")}</DialogTitle>
        <DialogBody></DialogBody>
        <DialogActions>
          <Button plain onClick={() => setWorldBookDeleteDialog(false)}>
            {t("cancel")}
          </Button>
          <Button color="red" onClick={handleDeleteBook}>
            {t("delete")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export function CharacterBookImportButton() {
  const t = useTranslations("Workspaces/Worldbook");
  const { selectedCid } = useStore();
  const [isUploading, setIsUploading] = useState(false);

  const selectedCharacter = useLiveQuery(() =>
    selectedCid ? db.characters.where("cid").equals(selectedCid).toArray() : []
  );

  if (!selectedCharacter || selectedCharacter.length === 0) {
    return null;
  }
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const fileContent = await file.text();
      const parsedData = JSON.parse(fileContent);
      if (!parsedData.entries || typeof parsedData.entries !== "object") {
        throw new Error(
          "The entries in the uploaded file are not in the correct format.",
        );
      }
      const character = selectedCharacter[0];
      const currentEntries = character.json.data.character_book?.entries || [];
      const newEntriesStartId = currentEntries.length > 0
        ? Math.max(...currentEntries.map((entry) => entry.id)) + 1
        : 1;
      const newEntries = Object.values(parsedData.entries).map(
        (entry: any, index: number) => ({
          id: newEntriesStartId + index,
          keys: entry.key || [],
          secondary_keys: entry.keysecondary || [],
          comment: entry.comment,
          content: entry.content,
          constant: entry.constant,
          selective: entry.selective,
          insertion_order: entry.order,
          enabled: !entry.disable,
          position: entry.position || "before_char",
          use_regex: entry.useProbability,
          extensions: {
            position: entry.extensions?.position || 0,
            exclude_recursion: entry.excludeRecursion,
            display_index: entry.displayIndex,
            probability: entry.probability,
            useProbability: entry.useProbability,
            depth: entry.depth,
            selectiveLogic: entry.selectiveLogic,
            group: entry.group || "",
            group_override: entry.groupOverride || false,
            group_weight: entry.groupWeight,
            prevent_recursion: entry.preventRecursion,
            delay_until_recursion: entry.delayUntilRecursion,
            scan_depth: entry.scanDepth || null,
            match_whole_words: entry.matchWholeWords || null,
            use_group_scoring: entry.useGroupScoring,
            case_sensitive: entry.caseSensitive || null,
            automation_id: entry.automationId || "",
            role: entry.role || 0,
            vectorized: entry.vectorized || false,
            sticky: entry.sticky || 0,
            cooldown: entry.cooldown || 0,
            delay: entry.delay || 0,
          },
        }),
      );
      const updatedEntries = [...currentEntries, ...newEntries];
      if (
        character.cid !== undefined &&
        character.json.data.character_book?.entries
      ) {
        await db.characters.update(character.cid, {
          json: {
            ...character.json,
            data: {
              ...character.json.data,
              character_book: {
                ...character.json.data.character_book,
                entries: updatedEntries,
              },
            },
          },
        });
        enqueueSnackbar(t("add-it"), { variant: "success" });
        console.log("Character book updated successfully!");
      } else {
        console.error("Character not found or CID is undefined.");
      }
    } catch (error) {
      console.error("Error uploading and parsing the file:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <Button
        color="yellow"
        onClick={() => document.getElementById("file-upload")?.click()}
      >
        {t("import")}
      </Button>
      <input
        id="file-upload"
        type="file"
        style={{ display: "none" }}
        accept=".json"
        onChange={handleFileChange}
      />
    </>
  );
}

export function CharacterBookExportButton() {
  const t = useTranslations("Workspaces/Worldbook");
  const [exportWordBookDialogisOpen, setExportWordBookDialogisOpen] = useState(
    false,
  );
  const [selectedExportBooks, setSelectedExportBooks] = useState<number[]>([]);
  const [exportWorldBookName, setExportWorldBookName] = useState("");
  const { selectedCid } = useStore();

  const selectedCharacter = useLiveQuery(() =>
    selectedCid ? db.characters.where("cid").equals(selectedCid).toArray() : []
  );

  if (!selectedCharacter || selectedCharacter.length === 0) {
    return null;
  }

  const handleCheckboxChange = (index: number) => {
    setSelectedExportBooks((prevSelected) => {
      if (prevSelected.includes(index)) {
        return prevSelected.filter((i) => i !== index);
      } else {
        return [...prevSelected, index];
      }
    });
  };

  const handleExport = () => {
    if (
      !selectedCharacter || selectedCharacter.length === 0 ||
      !exportWorldBookName
    ) return;

    const character = selectedCharacter[0];
    const characterBookList = character.json.data.character_book?.entries || [];

    const selectedBooks = characterBookList.filter((_, index) =>
      selectedExportBooks.includes(index)
    );

    const formattedEntries: { entries: Record<string, any> } = { entries: {} };

    selectedBooks.forEach((book, index) => {
      formattedEntries.entries[index.toString()] = {
        uid: index,
        key: book.keys,
        keysecondary: book.secondary_keys,
        comment: book.comment,
        content: book.content,
        constant: book.constant,
        vectorized: book.extensions.vectorized,
        selective: book.selective,
        selectiveLogic: book.extensions.selectiveLogic,
        addMemo: book.use_regex,
        order: book.insertion_order,
        position: book.extensions.position,
        disable: book.enabled,
        excludeRecursion: book.extensions.exclude_recursion,
        preventRecursion: book.extensions.prevent_recursion,
        delayUntilRecursion: book.extensions.delay_until_recursion,
        probability: 100,
        useProbability: book.extensions.useProbability,
        depth: book.extensions.depth,
        group: book.extensions.group,
        groupOverride: book.extensions.group_override,
        groupWeight: book.extensions.group_weight,
        scanDepth: book.extensions.scan_depth,
        caseSensitive: book.extensions.case_sensitive,
        matchWholeWords: book.extensions.match_whole_words,
        useGroupScoring: book.extensions.use_group_scoring,
        automationId: book.extensions.automation_id,
        role: book.extensions.role,
        sticky: book.extensions.sticky,
        cooldown: book.extensions.cooldown,
        delay: book.extensions.delay,
        displayIndex: book.extensions.display_index,
      };
    });

    const jsonBlob = new Blob([JSON.stringify(formattedEntries, null, 2)], {
      type: "application/json",
    });
    saveAs(jsonBlob, `${exportWorldBookName}.json`);
    setExportWordBookDialogisOpen(false);
    enqueueSnackbar(t("export") + exportWorldBookName, { variant: "success" });
  };

  return (
    <>
      <Button
        onClick={() => setExportWordBookDialogisOpen(true)}
        color="yellow"
      >
        {t("export")}
      </Button>
      {selectedCharacter && selectedCharacter.length > 0
        ? selectedCharacter.map((character) => {
          const characterBookList =
            character.json.data.character_book?.entries || [];

          return (
            <Dialog
              open={exportWordBookDialogisOpen}
              onClose={() => setExportWordBookDialogisOpen(false)}
              key={character.cid}
            >
              <DialogTitle>{t("export-worldbook")}</DialogTitle>
              <DialogBody>
                <Field>
                  <Label>
                    WordBook Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    className="mb-2"
                    value={exportWorldBookName}
                    onChange={(e) => setExportWorldBookName(e.target.value)}
                  />
                </Field>
                <Fieldset>
                  <CheckboxGroup>
                    {characterBookList.map((book, index) => (
                      <CheckboxField key={index}>
                        <Checkbox
                          checked={selectedExportBooks.includes(index)}
                          onChange={() =>
                            handleCheckboxChange(index)}
                        />
                        <Label>{book.comment}</Label>
                      </CheckboxField>
                    ))}
                  </CheckboxGroup>
                </Fieldset>
              </DialogBody>
              <DialogActions>
                <Button
                  plain
                  onClick={() => setExportWordBookDialogisOpen(false)}
                >
                  {t("cancel")}
                </Button>
                <Button onClick={handleExport} disabled={!exportWorldBookName}>
                  {t("export")}
                </Button>
              </DialogActions>
            </Dialog>
          );
        })
        : null}
    </>
  );
}
