import React from "react";
import { useTranslations } from "next-intl";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { Link } from "@/navigation";

function LanguageSwitcher() {
    const t = useTranslations();
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            <>
              <ModalHeader className="flex flex-col gap-1"> {t('Settings.changelanguage')}</ModalHeader>
              <ModalBody>
                <Button color="primary" variant="light">
                  <Link href='/settings' locale='en'>English</Link>
                </Button>
                <Button color="primary" variant="light">
                  <Link href='/settings' locale='zh-CN'>简体中文</Link>
                </Button>
                <Button color="primary" variant="light">
                  <Link href='/settings' locale='zh-TW'>繁體中文</Link>
                </Button>
                <Button color="primary" variant="light">
                  <Link href='/settings' locale='ja'>日本語</Link>
                </Button>
                <Button color="primary" variant="light">
                  <Link href='/settings' locale='kr'>한국어</Link>
                </Button>
                <Button color="primary" variant="light">
                  <Link href='/settings' locale='fr'>Français</Link>
                </Button>
                <Button color="primary" variant="light">
                  <Link href='/settings' locale='es'>Lengua española</Link>
                </Button>
                <Button color="primary" variant="light">
                  <Link href='/settings' locale='pt'>Português</Link>
                </Button>
                <Button color="primary" variant="light">
                  <Link href='/settings' locale='ru'>Русский</Link>
                </Button>
                <Button color="primary" variant="light">
                  <Link href='/settings' locale='it'>Italiano</Link>
                </Button>
                <Button color="primary" variant="light">
                  <Link href='/settings' locale='de'>Deutsch</Link>
                </Button>
              </ModalBody>
            </>
          </ModalContent>
        </Modal>
      <button
        onClick={onOpen}
        type="button"
        className="font-semibold text-indigo-600 hover:text-indigo-500"
      >
        {t('Settings.changelanguage')}
      </button>
    </>
  );
}

export default LanguageSwitcher;
