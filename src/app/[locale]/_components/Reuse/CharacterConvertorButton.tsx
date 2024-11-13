"use client";
import React, { useRef, useState } from "react";
import { Button } from "../Catalyst/button";
import { enqueueSnackbar } from "notistack";
import extract from "png-chunks-extract";
import text from "png-chunk-text";
import { useTranslations } from "next-intl";
import useStore from "../../_lib/store";

export function ImportCharacterConvertorButton() {
  const setConvertorContent = useStore((state) => state.setConvertorContent);
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
          (chunk: { name: string }) => chunk.name === "tEXt",
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
          if (characterConvertorJson) {
            setConvertorContent(characterConvertorJson);
          }
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
  const { convertorContent } = useStore();
  const t = useTranslations("Workspaces/Convertor");

  const copyCharacterJson = () => {
    const characterConvertorJson = convertorContent;
    if (!characterConvertorJson) {
      return;
    }
    const formattedJson = JSON.stringify(
      JSON.parse(characterConvertorJson),
      null,
      2,
    );

    navigator.clipboard
      .writeText(formattedJson)
      .then(() => {
        enqueueSnackbar("Copied to clipboard!", {
          variant: "success",
        });
        console.log("Character JSON copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy JSON to clipboard:", err);
      });
  };

  return (
    <Button onClick={copyCharacterJson} outline>
      {t("copy")}
    </Button>
  );
}
