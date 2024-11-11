"use client";
import React, { useEffect, useRef, useState } from "react";
import useStore from "../../_lib/store";
import { useLiveQuery } from "dexie-react-hooks";
import db from "../../_lib/db";
import { Character } from "../../_lib/db";
import { Heading } from "../Catalyst/heading";
import { Divider } from "../Catalyst/divider";
import Image from "next/image";
import { Button } from "../Catalyst/button";
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from "../Catalyst/dialog";
import { Field, Label } from "../Catalyst/fieldset";
import { Input } from "../Catalyst/input";
import Compressor from "compressorjs";
import { useTranslations } from "next-intl";
import { enqueueSnackbar } from "notistack";
export default function Inset() {
  const t = useTranslations("Inset");
  const { selectedCid, proceedingList, setProceedingList, openDialog } =
    useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selectedCharacter = useLiveQuery(() =>
    selectedCid ? db.characters.where("cid").equals(selectedCid).toArray() : []
  );

  useEffect(() => {
    const updateCharacter = async () => {
      if (selectedCharacter && selectedCharacter.length > 0) {
        const proceedingList = selectedCharacter
          .map((character: Character) => {
            const entry = character.json.data.character_book?.entries.find(
              (entry) =>
                entry.comment ===
                  "[CautionEdit]CharacterInsetGallery[ooctalk.com]",
            );
            return entry;
          })
          .filter(Boolean);

        if (proceedingList.length === 0) {
          const character = selectedCharacter[0];
          const entries = character.json.data.character_book?.entries || [];
          const newEntry = {
            id: entries.length + 1,
            keys: [],
            secondary_keys: [],
            comment: "[CautionEdit]CharacterInsetGallery[ooctalk.com]",
            content: "<proceeding_list>\n</proceeding_list>",
            constant: true,
            selective: true,
            insertion_order: 996,
            enabled: true,
            position: "after_char",
            use_regex: true,
            extensions: {
              position: 4,
              exclude_recursion: false,
              display_index: entries.length + 1,
              probability: 100,
              useProbability: true,
              depth: 1,
              selectiveLogic: 0,
              group: "",
              group_override: false,
              group_weight: 100,
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
          if (character.cid !== undefined && newEntry) {
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
          }
        }

        const proceedingListRule = selectedCharacter
          .map((character: Character) => {
            const entry = character.json.data.character_book?.entries.find(
              (entry) =>
                entry.comment ===
                  "[CautionEdit]CharacterInsetGalleryRule[ooctalk.com]",
            );
            return entry;
          })
          .filter(Boolean);

        if (proceedingListRule.length === 0) {
          const character = selectedCharacter[0];
          const entries = character.json.data.character_book?.entries || [];
          const newEntry = {
            id: entries.length + 1,
            keys: [],
            secondary_keys: [],
            comment: "[CautionEdit]CharacterInsetGalleryRule[ooctalk.com]",
            content:
              "<!-- <proceeding> is the rule for inserting proceedings -->\n<proceeding>Assistant should insert an proceeding at the end of the response that matches {{char}} inner feelings or the current scene Depending on the content of the plotAssistant must output the filenames in the “<proceeding_list>” exactly and completely And tag it with <Inset></Inset> XML tags It is not allowed to fabricate non-existent filenames Format: <Inset>{{filename}}</Inset></proceeding>",
            constant: true,
            selective: true,
            insertion_order: 998,
            enabled: true,
            position: "after_char",
            use_regex: true,
            extensions: {
              position: 4,
              exclude_recursion: false,
              display_index: entries.length + 1,
              probability: 100,
              useProbability: true,
              depth: 1,
              selectiveLogic: 0,
              group: "",
              group_override: false,
              group_weight: 100,
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
          if (character.cid !== undefined && newEntry) {
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
          }
        }

        const proceedingRegex = selectedCharacter
          .map((character: Character) => {
            const entry = character.json.data.extensions.regex_scripts?.find(
              (entry) =>
                entry.scriptName ===
                  "[CautionEdit]CharacterInsetGalleryRegex[ooctalk.com]",
            );
            return entry;
          })
          .filter(Boolean);

        if (proceedingRegex.length === 0) {
          const character = selectedCharacter[0];
          const entries = character.json.data.extensions.regex_scripts || [];

          const newEntry = {
            scriptName: "[CautionEdit]CharacterInsetGalleryRegex[ooctalk.com]",
            findRegex:
              "/<(?:Inset)>.*[^A-Za-z0-9\\.\\s<\\/>]+(.*?)<\\/(?:Inset)>/g",
            replaceString:
              "<center><img src=https://files.catbox.moe/$1 width=50% /></center>",
            trimStrings: [],
            placement: [2],
            disabled: false,
            markdownOnly: true,
            promptOnly: false,
            runOnEdit: true,
            substituteRegex: false,
            minDepth: null,
            maxDepth: null,
            id: "00000000-0000-0000-0000-ceooctalkcom",
          };

          if (character.cid !== undefined && newEntry) {
            await db.characters.update(character.cid, {
              json: {
                ...character.json,
                data: {
                  ...character.json.data,
                  extensions: {
                    ...character.json.data.extensions,
                    regex_scripts: [...entries, newEntry],
                  },
                },
              },
            });
          }
        }
        if (proceedingList.length > 0) {
          const proceedingContent = proceedingList[0]?.content;
          if (proceedingContent) {
            const matches = proceedingContent.matchAll(
              /(?<=\n)([^_]+)_(\w+)\.(png|jpg|webp|jpeg)/g,
            );
            const items = Array.from(matches).map((match) => ({
              name: match[1].trim(),
              url: `${match[2]}.${match[3]}`,
            }));
            console.log(items);
            setProceedingList(items);
          }
        }
      }
    };

    updateCharacter();
  }, [selectedCharacter]);
  selectedCharacter;
  const list = proceedingList;
  return (
    <>
      {/* Title  */}

      <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <Heading>{t("inset")}</Heading>
        <div className="flex gap-4 sm:justify-self-end text-nowrap">
          {selectedCid != null && <InsetNewButton />}
        </div>
      </div>

      <Divider className="my-10 mt-5" />

      {/* Content */}
      <div>
        {list && list.length > 0 && selectedCharacter != null && (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 xl:gap-x-8">
            {list.map((item, index) => (
              <button
                onClick={() => {
                  setSelectedIndex(index);
                  setIsOpen(true);
                }}
                key={index}
                className="group"
              >
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <Image
                    height={1000}
                    width={1000}
                    alt={item.name}
                    src={"https://files.catbox.moe/" + item.url}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-4 text-sm text-black dark:text-white">
                  {item.name}
                </h3>
                <p className="mt-1 text-lg font-medium text-zinc-800 dark:text-zinc-300">
                  {item.url}
                </p>
              </button>
            ))}
          </div>
        )}
        <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
          <DialogTitle>{t("edit-keyword")}</DialogTitle>
          <DialogBody>
            <Field>
              <Label>{t("key-word")}</Label>
              <Input
                defaultValue={selectedIndex !== null &&
                    list &&
                    selectedIndex >= 0 &&
                    selectedIndex < list.length
                  ? list[selectedIndex].name
                  : ""}
                onChange={(e) => {
                  if (
                    selectedIndex !== null &&
                    list &&
                    selectedIndex >= 0 &&
                    selectedIndex < list.length
                  ) {
                    const updatedList = [...list];
                    updatedList[selectedIndex].name = e.target.value;
                    setProceedingList(updatedList);
                  }
                }}
              />
            </Field>
            <Field>
              <Label>URL</Label>
              <Input
                disabled
                defaultValue={selectedIndex !== null && list &&
                    selectedIndex < list.length
                  ? list[selectedIndex].url
                  : ""}
              />
            </Field>
          </DialogBody>
          <DialogActions>
            <Button plain onClick={() => setIsOpen(false)}>
              {t("close")}
            </Button>
            <Button
              color="red"
              onClick={async () => {
                if (
                  selectedIndex !== null &&
                  list &&
                  selectedCharacter &&
                  selectedCharacter.length > 0
                ) {
                  const character = selectedCharacter[0];
                  const entries = character.json.data.character_book?.entries ||
                    [];
                  const insetEntry = entries.find(
                    (entry) =>
                      entry.comment ===
                        "[CautionEdit]CharacterInsetGallery[ooctalk.com]",
                  );

                  if (insetEntry) {
                    const itemToDelete = list[selectedIndex];
                    const insetString =
                      `${itemToDelete.name}_${itemToDelete.url}`;

                    insetEntry.content = insetEntry.content.replace(
                      `${insetString}\n`,
                      "",
                    );

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
                              entries,
                            },
                          },
                        },
                      });
                    } else {
                      console.error("character.cid is undefined");
                    }
                    const updatedList = list.filter(
                      (_, i) => i !== selectedIndex,
                    );
                    setProceedingList(updatedList);
                    setSelectedIndex(null);
                    setIsOpen(false);
                  }
                }
              }}
            >
              {t("delete")}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

function InsetNewButton() {
  const t = useTranslations("Inset");
  const { isDialogOpen, openDialog, closeDialog, selectedCid } = useStore();
  const [tempFile, setTempFile] = useState<File | null>(null);
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const selectedCharacter = useLiveQuery(() =>
    selectedCid ? db.characters.where("cid").equals(selectedCid).toArray() : []
  );

  const handleFileChange = async (event: any) => {
    const file = event.target.files[0];
    if (!file) return;

    new Compressor(file, {
      quality: 0.8,
      maxWidth: 1000,
      mimeType: "image/webp",
      success(result) {
        if (result.size > 1 * 1024 * 1024) {
          console.error("File size exceeds 1MB after compression");
          setTempFile(null);
          return;
        }
        const webpFile = new File([result], `${file.name.split(".")[0]}.webp`, {
          type: "image/webp",
        });
        setTempFile(webpFile);
      },
      error(err) {
        console.error("Compression error:", err);
      },
    });
  };

  const handleSubmit = async () => {
    if (tempFile && selectedCharacter && selectedCharacter.length > 0) {
      const character = selectedCharacter[0];
      const entries = character.json.data.character_book?.entries || [];
      const isKeywordDuplicate = entries.some((entry) =>
        entry.content.includes(keyword)
      );

      if (isKeywordDuplicate) {
        enqueueSnackbar("{t('keyword-already-exists')}", { variant: "error" });
        return;
      }

      setIsLoading(true);
      try {
        const formData = new FormData();
        formData.append("reqtype", "fileupload");
        formData.append("fileToUpload", tempFile);

        const response = await fetch("/api/catbox", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Network error");
        }

        const result = await response.text();
        const fileName = result.replace("https://files.catbox.moe/", "");
        if (keyword && fileName) {
          const newInsetStr = `${keyword}_${fileName}`;
          const insetEntry = entries.find(
            (entry) =>
              entry.comment ===
                "[CautionEdit]CharacterInsetGallery[ooctalk.com]",
          );
          if (insetEntry) {
            insetEntry.content = insetEntry.content.replace(
              "</proceeding_list>",
              `${newInsetStr}\n</proceeding_list>`,
            );
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
                      entries,
                    },
                  },
                },
              });
              closeDialog();
              enqueueSnackbar("Added successfully", { variant: "success" });
            } else {
              console.error("character.cid is undefined");
            }
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const isSubmitDisabled = !keyword || !tempFile || isLoading;

  return (
    <>
      <Button type="button" onClick={openDialog}>
        {t("new")}
      </Button>
      <Dialog open={isDialogOpen} onClose={closeDialog}>
        <DialogTitle>{t("add-inset")}</DialogTitle>
        <DialogDescription>
          {t("the-picture-will-be-compressed")}
        </DialogDescription>
        <DialogBody>
          <Field>
            <Label>{t("key-word-0")}</Label>
            <Input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </Field>
          <Field>
            <Label>{t("upload-image")}</Label>
            <Input type="file" accept="image/*" onChange={handleFileChange} />
            {tempFile && (
              <Image
                src={URL.createObjectURL(tempFile)}
                alt="Uploaded Preview"
                height={1000}
                width={1000}
              />
            )}
          </Field>
        </DialogBody>
        <DialogActions>
          {!isLoading
            ? (
              <>
                <Button plain onClick={closeDialog}>
                  {t("cancel")}
                </Button>
                <Button onClick={handleSubmit} disabled={isSubmitDisabled}>
                  {t("submit")}
                </Button>
              </>
            )
            : (
              <button
                type="button"
                className="text-black dark:text-white rounded px-4 py-2 flex items-center"
                disabled
              >
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-black dark:text-white "
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                {t("uploading")}
              </button>
            )}
        </DialogActions>
      </Dialog>
    </>
  );
}
