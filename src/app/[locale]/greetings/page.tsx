import React from "react";
import { NextIntlClientProvider, useMessages } from "next-intl";
import dynamic from 'next/dynamic';

const Greetings = dynamic(() => import('../_ui/greetings/Greetings'), {
  ssr: false
});

export default function WorldBookPage() {
  const messages = useMessages();

  return (
    <div className="flex w-full flex-col">
      <NextIntlClientProvider messages={messages}>
        <Greetings/>
      </NextIntlClientProvider>
    </div>
  );
}