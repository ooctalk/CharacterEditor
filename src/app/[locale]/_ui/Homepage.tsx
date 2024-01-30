"use client";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Link } from "@/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";

function Homepage() {
  const t = useTranslations();
  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-20">
      <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
        <div className="md:mt-24 sm:mt-32 lg:mt-16">
          <a href="#" className="inline-flex space-x-6">
            <span className="rounded-full bg-amber-600/10 px-3 py-1 text-sm font-semibold leading-6 text-amber-600 dark:text-amber-400 ring-1 ring-inset ring-indigo-600/10">
              {t("HomePage.version")}
            </span>
            <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-600 dark:text-gray-400">
              <span>Updated on 2024/01/30 不要使用无痕模式 </span>
              <ChevronRightIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </a>
        </div>
        <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl">
          {t("HomePage.1")}
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
          {t("HomePage.2")}
        </p>
        <p>Dont use the no-trace mode</p>
        <div className="mt-10 flex items-center gap-x-6">
          <Link
            href="/character"
            className="rounded-md bg-amber-600 dark:bg-gray-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 dark:hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {t("HomePage.3")}
          </Link>
        </div>
      </div>
      <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32 ">
        <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none ">
          <div className="-m-2 rounded-xl bg-gray-900/5 dark:bg-gray-200/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4 ">
            <Image
              src="/hero.webp"
              alt="Cyberwaifu.org"
              width={1000}
              height={667}
              className="md:w-[48rem] w-[80vw] rounded-md shadow-2xl ring-1 ring-gray-900/10  block dark:hidden"
            />
            <Image
              src="/hero-dark.webp"
              alt="Cyberwaifu.org"
              width={1000}
              height={667}
              className="md:w-[48rem] w-[80vw] rounded-md shadow-2xl ring-1 ring-gray-900/10 hidden dark:block"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
