"use client";
import React, { useState } from "react";
import db from "../../_lib/db";
import { Button } from "../Catalyst/button";
import {
  Dialog,
  DialogActions,
  DialogDescription,
  DialogTitle,
} from "../Catalyst/dialog";
import { enqueueSnackbar } from "notistack";
import { useTranslations } from "next-intl";

const getFormattedDate = () => {
  const date = new Date();
  return `${date.getFullYear()}_${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}_${date.getDate().toString().padStart(2, "0")}_${date
    .getHours()
    .toString()
    .padStart(2, "0")}_${date.getMinutes().toString().padStart(2, "0")}_${date
    .getSeconds()
    .toString()
    .padStart(2, "0")}`;
};

export function CharacterBackUp() {
  const t = useTranslations("Workspaces/Settings");
  const backupDatabase = async () => {
    try {
      const characters = await db.characters.toArray();
      const backupData = { characters };
      const json = JSON.stringify(backupData, null, 2);
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `ce_ooctalk_com_character_bk_${getFormattedDate()}.json`;
      link.click();

      URL.revokeObjectURL(url);
      console.log("Backup done");
    } catch (error) {
      console.error("Err", error);
    }
  };

  return (
    <Button type="button" color="green" onClick={backupDatabase}>
      {t("backup-data")}
    </Button>
  );
}

export function CharacterImport() {
  const t = useTranslations("Workspaces/Settings");
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const importDatabase = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      const text = await file.text();
      const { characters } = JSON.parse(text);

      await db.characters.clear(); // 清空当前数据
      await db.characters.bulkAdd(characters); // 导入新数据

      enqueueSnackbar("Data Import it", { variant: "success" });
    } catch (error) {
      console.error("Err:", error);
    }
  };

  return (
    <>
      <Button
        type="button"
        color="sky"
        onClick={() => fileInputRef.current?.click()}
      >
        {t("import-data")}
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={importDatabase}
        style={{ display: "none" }}
      />
    </>
  );
}

export function CharacterClear() {
  const t = useTranslations("Workspaces/Settings");
  const [isOpen, setIsOpen] = useState(false);
  const deleteDatabase = async () => {
    try {
      await db.characters.clear();
      console.log("Delete it");
      enqueueSnackbar("Database Clear ALL", { variant: "error" });
      setIsOpen(false);
    } catch (error) {
      console.error("Err:", error);
    }
  };

  return (
    <>
      <Button color="red" onClick={() => setIsOpen(true)}>
        {t('delete-data')}
      </Button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogTitle>{t("irretrievability")}</DialogTitle>
        <DialogDescription>
          {t(
            "are-you-sure-you-want-to-empty-the-database-this-action-cannot-be-undone"
          )}
        </DialogDescription>
        <DialogActions>
          <Button plain onClick={() => setIsOpen(false)}>
            {t("cancel")}
          </Button>
          <Button color="red" onClick={deleteDatabase}>
            {t("delete")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
