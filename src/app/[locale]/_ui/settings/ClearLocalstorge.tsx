'use client'
import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Popover, PopoverTrigger, PopoverContent} from "@nextui-org/react";
import { useTranslations } from "next-intl";

export default function App() {
  const  t = useTranslations();
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const handleDelLocalestorge = () => {
    // Delete all items from localStorage
    localStorage.clear();
    onOpenChange();
    alert(t('Settings.DelDone'));
  };

  return (
    <>
      <Button color="danger" onPress={onOpen}>{t('Settings.idecidedtotry')}</Button>
      <Modal  isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent >
          {(onClose) => (
            <>
              <ModalHeader  className="flex flex-col gap-1 text-rose-500">{t('Settings.thisoperationsisirrevocable')}</ModalHeader>
              <ModalBody>
                <h1 className="text-red-500 text-xl font-extrabold">{t('Settings.haveyoureallythoughtthisthrough')}</h1>
              
              </ModalBody>
              <ModalFooter>
                <Button color="success" variant="light" onPress={onClose}>
                  {t('Settings.close')}
                </Button>
                <Popover placement="right" color="danger">
                <PopoverTrigger>
                  <Button color="danger">
                    {t('Settings.imsure')}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Button onClick={handleDelLocalestorge} color="danger">
                  {t('Settings.DELETE')}
                  </Button>
                </PopoverContent>
              </Popover>

              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
