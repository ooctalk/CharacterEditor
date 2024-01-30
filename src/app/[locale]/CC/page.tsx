import React from 'react'
import { NextIntlClientProvider,useMessages } from "next-intl";
import CC from '../_ui/CC/CC';

export default function CCPage() {
  const messages = useMessages();
  return (
    <div className="flex w-full flex-col">
      <NextIntlClientProvider messages={messages}>
        <CC/>
      </NextIntlClientProvider>
    </div>
  )
}

