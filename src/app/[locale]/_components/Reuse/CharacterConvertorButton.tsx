"use client";
import React, { useRef } from "react";
import { Button } from "../Catalyst/button";
import { enqueueSnackbar } from "notistack";
import extract from "png-chunks-extract";
import text from "png-chunk-text";
import { useTranslations } from "next-intl";

export function ImportCharacterConvertorButton() {
  const t = useTranslations("Workspaces/Convertor");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleImport = async () => {
    if (fileInputRef.current) {
      const file = fileInputRef.current.files?.[0];
      if (!file) {
        console.warn("User Cancel");
        return;
      }
      if (file.type !== "image/png") {
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
          const decoder = new TextDecoder("utf-8");
          const base64Text = atob(charaText);
          const byteArray = new Uint8Array(base64Text.length);
          for (let i = 0; i < base64Text.length; i++) {
            byteArray[i] = base64Text.charCodeAt(i);
          }
          const characterConvertorJson = decoder.decode(byteArray);
          localStorage.setItem(
            "characterConvertorJson",
            characterConvertorJson
          );
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
      <Button type="button" onClick={() => fileInputRef.current?.click()}>
        {t("import")}
      </Button>
    </>
  );
}

export function CopyCharacterJsonButton() {
  const t = useTranslations("Workspaces/Convertor");
  const copyCharacterJson = () => {
    const characterConverJson = localStorage.getItem("characterConvertorJson");
    if (!characterConverJson) {
      console.warn("No character JSON found in localStorage.");
      return;
    }
    navigator.clipboard
      .writeText(characterConverJson)
      .then(() => {
        enqueueSnackbar("Copy it!", {
          variant: "success",
        });
        console.log("Character JSON copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy JSON to clipboard:", err);
      });
  };

  return (
    <>
      <Button onClick={copyCharacterJson} outline>
        {t("copy")}
      </Button>
    </>
  );
}
