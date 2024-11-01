"use client";
import React, { useRef } from "react";
import { Button } from "../Catalyst/button";
import db from "../../_lib/db";
import { getDefaultCharacterJson } from "../../_lib/utils";
import { enqueueSnackbar } from "notistack";
import { defaultCharacterCoverBase64Str } from "../../_lib/defaultCharacterCover";
import extract from "png-chunks-extract";
import text from "png-chunk-text";
import useStore from "../../_lib/store";
import { useLiveQuery } from "dexie-react-hooks";
import { useTranslations } from "next-intl";

export function WorkSpacesImportCharacterButton() {
  const t = useTranslations('Workspaces')
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImport = async () => {
    if (fileInputRef.current) {
      const file = fileInputRef.current.files?.[0];
      if (!file) {
        console.warn("User Cancel");
        return;
      }
      if (!file.type.startsWith("image/png")) {
        console.warn("Only Character PNG File");
        return;
      }

      try {
        const arrayBuffer = await file.arrayBuffer();
        const imageBuffer = new Uint8Array(arrayBuffer);
        const chunks = extract(imageBuffer);
        const tEXtChunks = chunks.filter(
          (chunk: { name: string }) => chunk.name === "tEXt"
        );
        const charaChunks = tEXtChunks.map((tEXtChunk: any) => ({
          chara: text.decode(tEXtChunk),
        }));
        const charaText = charaChunks[0]?.chara?.text;
        if (charaText) {
          const img = new Image();
          img.src = URL.createObjectURL(file);
          img.onload = async () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            const targetWidth = 300;
            const targetHeight = 500;
            canvas.width = targetWidth;
            canvas.height = targetHeight;
            ctx?.drawImage(img, 0, 0, targetWidth, targetHeight);
            const characterCoverbase64 = canvas.toDataURL("image/png");
            const decoder = new TextDecoder("utf-8");
            const base64Text = atob(charaText);
            const byteArray = new Uint8Array(base64Text.length);
            for (let i = 0; i < base64Text.length; i++) {
              byteArray[i] = base64Text.charCodeAt(i);
            }
            const characterJson = JSON.parse(decoder.decode(byteArray));
            const characterName = characterJson.name;
            const cid = await db.characters.add({
              cover: characterCoverbase64,
              json: characterJson,
            });
            enqueueSnackbar(characterName + " #" + cid, {
              variant: "success",
            });
          };
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <>
      <input
        type="file"
        accept="image/png"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleImport}
      />
      <Button
        type="button"
        outline
        onClick={() => fileInputRef.current?.click()}
      >
        {t('import')}
      </Button>
    </>
  );
}

export function WorkSpacesAddCharacterButton() {
  const t = useTranslations('Workspaces')
  const defaultCharacterJson = getDefaultCharacterJson();

  async function handleAddCharacter() {
    try {
      const cid = await db.characters.add({
        cover: defaultCharacterCoverBase64Str,
        json: defaultCharacterJson,
      });
      enqueueSnackbar("New Character Add it! #" + cid, {
        variant: "success",
      });
    } catch (error) {
      console.log("Error adding character:", error);
    }
  }

  return (
    <>
      <Button type="button" onClick={handleAddCharacter}>
        {t('new')}
      </Button>
    </>
  );
}

export function WorkSpacesExportCharacterButton() {
  const t = useTranslations('Workspaces')
  const { drawerCharacter } = useStore();
  const cid = drawerCharacter?.cid;

  const data = useLiveQuery(() => {
    if (cid) {
      return db.characters.where("cid").equals(cid).toArray();
    }
    return [];
  }, [cid]);

  if (data === undefined) {
    return <div>Loading...</div>;
  }

  if (data.length === 0) {
    return <div>No character found.</div>;
  }

  const character = data[0];
  const name = character.json.data.name;
  const version = character.json.data.character_version;
  const json = character.json;
  const cover = character.cover;

  const handleExport = async () => {
    const extract = require("png-chunks-extract");
    const encode = require("png-chunks-encode");
    const text = require("png-chunk-text");

    const base64Data = cover.replace(/^data:image\/\w+;base64,/, "");
    const imageBuffer = Buffer.from(base64Data, "base64");
    const chunks = extract(imageBuffer);

    const tEXtChunks = chunks.filter((chunk: any) => chunk.name === "tEXt");
    for (let tEXtChunk of tEXtChunks) {
      chunks.splice(chunks.indexOf(tEXtChunk), 1);
    }

    const charString = JSON.stringify(json);
    const base64EncodedData = Buffer.from(charString, "utf8").toString(
      "base64"
    );
    chunks.splice(-1, 0, text.encode("chara", base64EncodedData));

    const BufferChunk = Buffer.from(encode(chunks));
    const pngbase64 = BufferChunk.toString("base64");
    const charBase64Data = `data:image/png;base64,${pngbase64}`;
    const link = document.createElement("a");
    link.href = charBase64Data;
    link.download = name + " " + version + ".png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      type="button"
      className="inline-flex w-full flex-1 items-center justify-center rounded-md bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:ring-gray-600 dark:hover:bg-zinc-700"
      onClick={handleExport}
    >
      {t('export-character')}
    </button>
  );
}
