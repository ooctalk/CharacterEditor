import React from "react";
import { NextIntlClientProvider, useMessages } from "next-intl";
import dynamic from 'next/dynamic';

const WorldBook = dynamic(() => import('../_ui/worldbook/WorldBook'), {
  ssr: false
});

export default function WorldBookPage() {
  const messages = useMessages();

  return (
    <div className="flex w-full flex-col">
      <NextIntlClientProvider messages={messages}>
        <WorldBook />
      </NextIntlClientProvider>
    </div>
  );
}