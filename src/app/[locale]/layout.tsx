import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";

// next-intl
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "../../i18n/routing";

// Mi-Sans
const MiSans = localFont({
  src: "./_fonts/MiSans VF.ttf",
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: "Character Editor | OoCTalk",
  description: "Create and edit AI character",
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body
        className={`${MiSans.className} antialiased bg-zinc-100 dark:bg-zinc-900 lg:dark:bg-zinc-950 text-black dark:text-white`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
