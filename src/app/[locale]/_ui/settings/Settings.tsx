"use client";
import { useState } from "react";
import { Switch } from "@headlessui/react";
import { useTranslations } from "next-intl";
import ThemeSwitcher from "./ThemeSwitcher";
import LanguageSwitcher from "./LanguageSwitcher";
import ClearLocalstorge from "./ClearLocalstorge";
import WorldBookPositionSet from "./WorldBookPositionSet";

export default function Settings() {
  const t = useTranslations();
  const [automaticTimezoneEnabled, setAutomaticTimezoneEnabled] =
    useState(true);

  return (
    <>
      <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
        <div>
          <h2 className="text-base font-semibold leading-7">
            {t("Settings.websitedisplaysettings")}
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-500">
            {t("Settings.settingthedisplayofthewebsite")}
          </p>

          <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
            <Switch.Group as="div" className="flex pt-6">
              <Switch.Label
                as="dt"
                className="flex-none pr-6 font-medium sm:w-64"
                passive
              >
                {t("Settings.displaylanguage")}
              </Switch.Label>
              <dd className="flex flex-auto items-center justify-end">
                <LanguageSwitcher />
              </dd>
            </Switch.Group>
            <Switch.Group as="div" className="flex pt-6">
              <Switch.Label
                as="dt"
                className="flex-none pr-6 font-medium sm:w-64"
                passive
              >
                {t("Settings.darkmode")}
              </Switch.Label>
              <dd className="flex flex-auto items-center justify-end">
                <ThemeSwitcher />
              </dd>
            </Switch.Group>
          </dl>
          <div className="pt-16">
            <h2 className="text-base font-semibold leading-7 text-red-500">
              {t("Settings.hazardousoperations")}
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-500">
              {t("Settings.ifyouhaveproblemsusingityoucantry")}
            </p>
            <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
              <Switch.Group as="div" className="flex pt-6">
                <Switch.Label
                  as="dt"
                  className="flex-none pr-6 font-medium sm:w-64"
                  passive
                >
                  {t("Settings.clearalldata")}
                </Switch.Label>
                <dd className="flex flex-auto items-center justify-end">
                  <ClearLocalstorge />
                </dd>
              </Switch.Group>
            </dl>
            <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
              <Switch.Group as="div" className="flex pt-6">
                <Switch.Label
                  as="dt"
                  className="flex-none pr-6 font-medium sm:w-64"
                  passive
                >
                  更改所有世界書位置{" "}
                  <span className="inline-flex items-center rounded-md bg-yellow-100 px-1.5 py-0.5 text-xs font-medium text-yellow-800">
                    Beta
                  </span>
                </Switch.Label>

                <dd className="flex flex-auto items-center justify-end">
                  <WorldBookPositionSet/>
                </dd>
              </Switch.Group>
            </dl>
          </div>
        </div>
      </div>
    </>
  );
}
