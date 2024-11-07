"use client";
import { useLiveQuery } from "dexie-react-hooks";
import db from "../../_lib/db";
import Image from "next/image";
import {
  Button,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import useStore from "../../_lib/store";
import { CircleAlertIcon, EllipsisVerticalIcon, XIcon } from "lucide-react";
import { enqueueSnackbar } from "notistack";
import {
  WorkSpacesExportCharacterButton,
  WorkSpacesExportCharacterSpecV2Button,
} from "../Reuse/WorkSpacesButton";
import { useTranslations } from "next-intl";
import { ChangeEvent } from "react";

export default function WorkSpacesCharactersGallery() {
  const characters = useLiveQuery(() => db.characters.toArray());
  const { openDrawer } = useStore();
  if (!characters) {
    return (
      <div>
        <div className="loader">Loading...</div>
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
                  openDrawer({
                    cid: character.cid,
                    cover: character.cover,
                    json: {
                      name: character.json.name,
                      data: {
                        creator: character.json.data.creator,
                        character_version:
                          character.json.data.character_version,
                      },
                    },
                  });
                }
              }}
              className="relative bg-gray-200 rounded-xl overflow-hidden shadow-md 
                 transition-transform duration-300 hover:scale-105 w-full h-80"
            >
              <Image
                src={character.cover}
                alt={character.json.name}
                layout="fill"
                className="object-cover z-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h2 className="text-white font-bold drop-shadow-md text-left">
                  {character.json.name}
                </h2>
                <p className="text-zinc-300 drop-shadow-sm text-left">
                  {character.json.data.character_version}
                </p>
              </div>
            </Button>
          </div>
        ))}
      </div>

      <WorkSpacesCharactersDrawers />
      <WorkSpacesCharactersModalDialogs />
    </>
  );
}

function WorkSpacesCharactersDrawers() {
  const t = useTranslations("Workspaces");
  const { isOpen, closeDrawer, drawerCharacter, openDialog, setSelectedCid } =
    useStore();

  const handleCoverChange = async (
    event: ChangeEvent<HTMLInputElement>,
    cid: number | null
  ) => {
    const file = event.target.files?.[0];
    if (!file || cid === null) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64String = e.target?.result as string;

      try {
        await db.characters.update(cid, { cover: base64String });
        closeDrawer();
        enqueueSnackbar("Change Cover Done", { variant: "success" });
      } catch (error) {
        console.error("Failed to update cover:", error);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <Dialog open={isOpen} onClose={closeDrawer} className="relative z-10">
      <div className="fixed inset-0" />
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-2xl transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white dark:bg-zinc-800 shadow-xl">
                <div className="px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-base font-semibold leading-6 text-gray-900 dark:text-gray-100">
                      {t("characterpppp")} {drawerCharacter?.cid}
                    </DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={closeDrawer}
                        className="relative rounded-md bg-white dark:bg-zinc-800 text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-zinc-500"
                      >
                        <span className="absolute -inset-2.5" />
                        <span className="sr-only">Close panel</span>
                        <XIcon aria-hidden="true" className="h-6 w-6" />
                      </button>
                    </div>
                  </div>
                </div>
                {/* Main */}
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  <div className="pb-6">
                    <div className="h-24 bg-zinc-600 dark:bg-zinc-900  sm:h-20 lg:h-28" />
                    <div className="-mt-12 flow-root px-4 sm:-mt-8 sm:flex sm:items-end sm:px-6 lg:-mt-16">
                      <div>
                        <div className="-m-1 flex">
                          <div className="inline-flex overflow-hidden rounded-lg border-4 border-white">
                            {drawerCharacter?.cover ? (
                              <button
                                onClick={() =>
                                  document
                                    .getElementById(
                                      `fileInput-${drawerCharacter.cid}`
                                    )
                                    ?.click()
                                }
                              >
                                <Image
                                  alt=""
                                  src={drawerCharacter.cover}
                                  width={300}
                                  height={500}
                                  className="h-36 w-24 flex-shrink-0 sm:h-60 sm:w-40 lg:h-72 lg:w-48"
                                />
                                <input
                                  id={`fileInput-${drawerCharacter.cid}`}
                                  type="file"
                                  accept="image/png"
                                  className="hidden"
                                  onChange={(e) =>
                                    handleCoverChange(e, drawerCharacter.cid)
                                  }
                                />
                              </button>
                            ) : (
                              <div className="h-36 w-24 flex-shrink-0 sm:h-60 sm:w-40 lg:h-72 lg:w-48 bg-gray-200 dark:bg-zinc-600 flex items-center justify-center">
                                No Cover Available
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 sm:ml-6 sm:flex-1">
                        <div>
                          <div className="flex items-center">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 sm:text-2xl">
                              {drawerCharacter?.json.name}
                            </h3>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {drawerCharacter?.json.data.creator}
                          </p>
                        </div>
                        <div className="mt-5 flex flex-wrap space-y-3 sm:space-x-3 sm:space-y-0">
                          <button
                            onClick={() => {
                              if (drawerCharacter && drawerCharacter.cid) {
                                setSelectedCid(drawerCharacter.cid);
                                enqueueSnackbar(
                                  "Select " + drawerCharacter.cid
                                );
                              }
                            }}
                            type="button"
                            className="inline-flex w-full flex-shrink-0 items-center justify-center rounded-md bg-zinc-600 hover:bg-zinc-500 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-600 sm:flex-1"
                          >
                            {t("edit-character")}
                          </button>
                          <WorkSpacesExportCharacterButton />
                          <div className="ml-3 inline-flex sm:ml-0">
                            <Menu
                              as="div"
                              className="relative inline-block text-left"
                            >
                              <MenuButton className="relative inline-flex items-center rounded-md bg-white dark:bg-zinc-800 p-2 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:ring-gray-600 dark:hover:bg-zinc-700">
                                <span className="absolute -inset-1" />
                                <span className="sr-only">
                                  Open options menu
                                </span>
                                <EllipsisVerticalIcon
                                  aria-hidden="true"
                                  className="h-5 w-5"
                                />
                              </MenuButton>
                              <MenuItems
                                transition
                                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-zinc-800 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                              >
                                <div className="py-1">
                                  <MenuItem>
                                    <Button
                                      onClick={openDialog}
                                      className="w-full text-left block px-4 py-2 text-sm text-red-700 hover:text-red-600 dark:hover:text-red-200 dark:text-red-300"
                                    >
                                      {t("delete")}
                                    </Button>
                                  </MenuItem>
                                  <MenuItem>
                                    <WorkSpacesExportCharacterSpecV2Button />
                                  </MenuItem>
                                </div>
                              </MenuItems>
                            </Menu>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-5 sm:px-0 sm:py-0">
                    <dl className="space-y-8 sm:space-y-0 sm:divide-y sm:divide-gray-200 dark:divide-gray-700">
                      <div className="sm:flex sm:px-6 sm:py-5">
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 sm:w-40 sm:flex-shrink-0 lg:w-48">
                          {t("version")}
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:col-span-2 sm:ml-6 sm:mt-0">
                          <p>{drawerCharacter?.json.data.character_version}</p>
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

function WorkSpacesCharactersModalDialogs() {
  const t = useTranslations("Workspaces");
  const { isDialogOpen, closeDialog, drawerCharacter, closeDrawer } =
    useStore();
  const handleDelete = async () => {
    if (drawerCharacter?.cid) {
      await db.characters.delete(drawerCharacter.cid);
      closeDialog();
      closeDrawer();
      enqueueSnackbar("Delete It # " + drawerCharacter.cid, {
        variant: "success",
      });
    }
  };

  return (
    <Dialog open={isDialogOpen} onClose={closeDialog} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10">
                <CircleAlertIcon
                  aria-hidden="true"
                  className="h-6 w-6 text-red-600"
                />
              </div>
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <DialogTitle
                  as="h3"
                  className="text-base font-semibold text-gray-900 mt-2"
                >
                  {t("irretrievability")}
                </DialogTitle>
              </div>
            </div>
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                onClick={handleDelete}
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                {t("delete")}
              </button>
              <button
                type="button"
                data-autofocus
                onClick={closeDialog}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                {t("cancel")}
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
