import React from "react";
import Character from "../_ui/character/Character";
import { NextIntlClientProvider,useMessages } from "next-intl";

export default function CharacterPage() {
  const messages = useMessages();
  return (
    <>
      <div className="flex w-full flex-col">
        <NextIntlClientProvider messages={messages}>
          <Character/>
        </NextIntlClientProvider>
      </div>
    </>
  );
}
