"use client";
import { useLiveQuery } from "dexie-react-hooks";
import db, { Character } from "../../_lib/db";
import Image from "next/image";
import useStore from "../../_lib/store";
import { CircleAlertIcon, EllipsisVerticalIcon, XIcon } from "lucide-react";
import { enqueueSnackbar } from "notistack";
import {
  WorkSpacesExportCharacterButton,
  WorkSpacesExportCharacterSpecV2Button,
} from "../Reuse/WorkSpacesButton";
import { useTranslations } from "next-intl";
import { ChangeEvent } from "react";
import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from "../Catalyst/dialog";
import { Button } from "../Catalyst/button";
import { Field, Label } from "../Catalyst/fieldset";
import { Input } from "../Catalyst/input";
export default function WorkSpacesCharactersGallery() {
  const t = useTranslations("Workspaces");
  const characters = useLiveQuery(() => db.characters.toArray());
  const {
    selectedCid,
    selectCharacterDialogID,
    setSelectCharacterDialogID,
    selectCharacterDialogOpen,
    setSelectCharacterDialogOpen,
  } = useStore();
  if (!characters) {
    return (
      <div className="animate-pulse grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
        <div className="relative">
          <div
            className="relative bg-gray-200 rounded-xl overflow-hidden shadow-md 
                 transition-transform duration-300 hover:scale-105 w-full h-80"
          >
            <div className="object-cover z-0"></div>
            <div />
            <div className="absolute bottom-0 left-0 right-0 p-4"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
        {characters.map((character) => (
          <div key={character.cid} className="relative">
            <Button
              onClick={() => {
                if (typeof character.cid === "number") {
                  setSelectCharacterDialogID(character.cid);
                  setSelectCharacterDialogOpen(true);
                }
              }}
              className="relative bg-gray-200 rounded-xl overflow-hidden shadow-md 
                 transition-transform duration-300 hover:scale-105 w-full md:h-80 h-56 "
            >
              <Image
                src={character.cover}
                alt={character.json.name}
                layout="fill"
                className={`object-cover z-0 ${
                  character.cid === selectedCid ? "animate-pulse" : ""
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h2 className="text-white font-bold drop-shadow-md text-left">
                  {character.json.data.name}
                </h2>
                <p className="text-zinc-300 drop-shadow-sm text-left">
                  {character.json.data.character_version}
                </p>
              </div>
            </Button>
          </div>
        ))}
      </div>
      {selectCharacterDialogOpen && <SelectCharacterDialog />}
    </>
  );
}

function SelectCharacterDialog() {
  const [deleteCharacterDialog, setDeleteCharacterDialog] = useState(false);
  const t = useTranslations("Workspaces");
  const {
    setSelectedCid,
    selectCharacterDialogOpen,
    setSelectCharacterDialogOpen,
    selectCharacterDialogID,
  } = useStore();

  const selectedCharacter = useLiveQuery(() =>
    selectCharacterDialogID !== null
      ? db.characters.where("cid").equals(selectCharacterDialogID).first()
      : undefined
  ) as Character | undefined;

  const handleCoverChange = async (
    event: ChangeEvent<HTMLInputElement>,
    cid: number | null
  ) => {
    const file = event.target.files?.[0];
    if (!file || cid === null) return;
    const reader = new FileReader();
    reader.onload = async (e) => {
      const result = e.target?.result;
      if (typeof result === "string") {
        const img = new window.Image();
        img.src = result;
        img.onload = async () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          if (ctx) {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const base64String = canvas.toDataURL("image/png");

            try {
              await db.characters.update(cid, { cover: base64String });
              enqueueSnackbar(t("change-cover-done"), { variant: "success" });
            } catch (error) {
              console.error("Failed to update cover:", error);
            }
          }
        };
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDelete = async () => {
    if (selectedCharacter?.cid) {
      await db.characters.delete(selectedCharacter?.cid);
      setDeleteCharacterDialog(false);
      setSelectCharacterDialogOpen(false);
      enqueueSnackbar(t("delte-it") + selectedCharacter?.json?.data?.name, {
        variant: "success",
      });
    }
  };

  return (
    <>
      {selectedCharacter && (
        <Dialog
          open={selectCharacterDialogOpen}
          onClose={() => setSelectCharacterDialogOpen(false)}
        >
          <DialogTitle className="flex justify-between items-center">
            <span>
              {selectedCharacter?.json?.data?.name ||
                t("characterpppp") + selectedCharacter.cid}
            </span>
            <button onClick={() => setSelectCharacterDialogOpen(false)}>
              <XIcon />
            </button>
          </DialogTitle>
          <DialogDescription>
            {selectedCharacter?.json?.data?.creator || null}
          </DialogDescription>
          <DialogBody>
            <Field>
              <button
                onClick={() =>
                  document
                    .getElementById(`fileInput-${selectedCharacter.cid}`)
                    ?.click()
                }
              >
                <Image
                  src={selectedCharacter.cover}
                  height={384}
                  width={192}
                  alt="Character Image"
                />
                <input
                  id={`fileInput-${selectedCharacter.cid}`}
                  type="file"
                  accept="image/jpeg, image/jpg, image/png, image/webp"
                  className="hidden"
                  onChange={(e) =>
                    handleCoverChange(e, selectCharacterDialogID)
                  }
                />
              </button>
            </Field>
          </DialogBody>
          <DialogActions className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <WorkSpacesExportCharacterSpecV2Button />
            <WorkSpacesExportCharacterButton />
            <Button
              onClick={() => {
                setSelectedCid(selectCharacterDialogID);
                setSelectCharacterDialogOpen(false);
                enqueueSnackbar(
                  t("select") + selectedCharacter?.json?.data?.name,
                  { variant: "success" }
                );
              }}
            >
              {t("edit-character")}
            </Button>
            <Button color="red" onClick={() => setDeleteCharacterDialog(true)}>
              {t("delete")}
            </Button>
          </DialogActions>
        </Dialog>
      )}
      <Dialog
        open={deleteCharacterDialog}
        onClose={() => setDeleteCharacterDialog(false)}
      >
        <DialogTitle>
          <div className="text-red-600">{t("irretrievability")}</div>
        </DialogTitle>
        <DialogActions>
          <Button outline onClick={() => setDeleteCharacterDialog(false)}>
            {t("cancel")}
          </Button>
          <Button color="red" onClick={handleDelete}>
            {t("delete")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
