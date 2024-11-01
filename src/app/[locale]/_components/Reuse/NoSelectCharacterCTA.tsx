import Image from "next/image";
import { Link } from "../../../../i18n/routing";
import { useTranslations } from "next-intl";
export default function NoSelectCharacterCTA() {
  const t = useTranslations("");
  return (
    <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
      <h2 className="max-w-2xl text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
        {t("please-select-character")}
      </h2>
      <div className="mt-10 flex items-center gap-x-6">
        <Link
          href="/workspaces"
          className="rounded-md bg-zinc-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-zinc-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-600"
        >
          {t("workspaces")}
        </Link>
      </div>
    </div>
  );
}
