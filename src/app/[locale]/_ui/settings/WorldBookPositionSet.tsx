"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useCharacterBook } from "../../_lib/utils";
export default function WorldBookPositionSet() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { character_book, setCharacter_Book } = useCharacterBook();

  return (
    <>
      <button
        type="button"
        className="font-semibold text-indigo-600 hover:text-indigo-500"
        onClick={onOpen}
      >
        更改
      </button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                更改所有世界書位置
              </ModalHeader>
              <ModalBody>
                <Button
                  onClick={() => {
                    setCharacter_Book((prevChara) => ({
                      ...prevChara,
                      entries: (prevChara.entries || []).map((entry: any) => ({
                        ...entry,
                        extensions: {
                          ...entry.extensions,
                          position: 0,
                        },
                      })),
                    }));
                    onClose();
                  }}
                  color="primary"
                  variant="ghost"
                >
                  角色之前
                </Button>
                <Button
                  onClick={() => {
                    setCharacter_Book((prevChara) => ({
                      ...prevChara,
                      entries: (prevChara.entries || []).map((entry: any) => ({
                        ...entry,
                        extensions: {
                          ...entry.extensions,
                          position: 1,
                        },
                      })),
                    }));
                    onClose();
                  }}
                  color="primary"
                  variant="ghost"
                >
                  角色之后
                </Button>
                <Button
                  onClick={() => {
                    setCharacter_Book((prevChara) => ({
                      ...prevChara,
                      entries: (prevChara.entries || []).map((entry: any) => ({
                        ...entry,
                        extensions: {
                          ...entry.extensions,
                          position: 2,
                        },
                      })),
                    }));
                    onClose();
                  }}
                  color="primary"
                  variant="ghost"
                >
                  字符之前
                </Button>
                <Button
                  onClick={() => {
                    setCharacter_Book((prevChara) => ({
                      ...prevChara,
                      entries: (prevChara.entries || []).map((entry: any) => ({
                        ...entry,
                        extensions: {
                          ...entry.extensions,
                          position: 3,
                        },
                      })),
                    }));
                    onClose();
                  }}
                  color="primary"
                  variant="ghost"
                >
                  字符之后
                </Button>
                <Button
                  onClick={() => {
                    setCharacter_Book((prevChara) => ({
                      ...prevChara,
                      entries: (prevChara.entries || []).map((entry: any) => ({
                        ...entry,
                        extensions: {
                          ...entry.extensions,
                          position: 4,
                        },
                      })),
                    }));
                    onClose();
                  }}
                  color="primary"
                  variant="ghost"
                >
                  @D
                </Button>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
