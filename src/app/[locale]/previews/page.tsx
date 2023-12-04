import React from "react";
import { NextIntlClientProvider, useMessages } from "next-intl";
import dynamic from 'next/dynamic';
import Previews from "../_ui/previews/Previews";


export default function WorldBookPage() {
  const messages = useMessages();

  return (
    <div className="flex w-full flex-col">
      <NextIntlClientProvider messages={messages}>
        <Previews/>
      </NextIntlClientProvider>
    </div>
  );
}