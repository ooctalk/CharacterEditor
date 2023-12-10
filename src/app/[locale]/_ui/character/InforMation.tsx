
import React from "react";
import Image from "next/image";
import { useChara,useCover,useCoverHandler } from "../../_lib/utils";
import { Button, Input } from "@nextui-org/react";
import { useTranslations } from "next-intl";

function InforMation() {
  const t = useTranslations();
  const { chara , setChara } = useChara();
  const { cover , setCover } = useCover();
  const { isReplacingTheCoverLoding, handleReplacingTheCover } = useCoverHandler();
  return (
      <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <h2 className="text-base font-semibold leading-7">
            {t('Character.information')}
          </h2>
          <p className="mt-1 text-sm leading-6">
            {t('Character.modifythebasicinsormationofthecharactercard')}
          </p>
        </div>
        <div className="md:col-span-2">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
            <div className="col-span-full flex items-center gap-x-8">
              <Image
                src={cover}
                width={384}
                height={384}
                alt=""
                className="h-64 w-48 flex-none rounded-lg object-cover"
              />
              <div>
              <input
                  accept=".jpg,.jpeg,.png,.webp,.gif"
                  type="file"
                  id="ReplacingTheCover"
                  style={{ display: 'none' }}
                  onChange={(e) => handleReplacingTheCover(e, setCover)}
                />
                <Button
                  isLoading={isReplacingTheCoverLoding}
                  onClick={() => {
                    const ReplacingTheCover = document.getElementById("ReplacingTheCover");
                    if (ReplacingTheCover) {
                      ReplacingTheCover.click();
                    }
                  }}
                  type="button"
                  color="default"
                  variant="flat"
                >
                  {t('Character.replacementofthecover')}
                </Button>
                <p className="mt-2 text-xs leading-5">
                  {t('Character.zipcover')}
                </p>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                className="block text-sm font-medium leading-6"
              >
                {t('Character.charactername')}<span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <Input
                  color="warning"
                  autoComplete="off"
                  value={chara.data.name}
                  onChange={(e) => setChara((prevChara) => ({ ...prevChara, data: { ...prevChara.data, name: e.target.value } }))}
                  maxLength={64}
                  type="text"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                className="block text-sm font-medium leading-6"
              >
                {t('Character.createdby')}
              </label>
              <div className="mt-2">
                <Input
                  color="secondary"
                  value={chara.data.creator}
                  onChange={(e) => setChara((prevChara) => ({ ...prevChara, data: { ...prevChara.data, creator: e.target.value } }))}
                  maxLength={64}
                  autoComplete="off"
                  type="text"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                className="block text-sm font-medium leading-6"
              >
                {t('Character.characterversion')}
              </label>
              <div className="mt-2">
                <Input
                  value={chara.data.character_version}
                  onChange={(e) => setChara((prevChara) => ({ ...prevChara, data: { ...prevChara.data, character_version: e.target.value } }))}
                  maxLength={64}
                  autoComplete="off"
                  type="text"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                className="block text-sm font-medium leading-6"
              >
                {t('Character.tagstoembed')}
              </label>
              <div className="mt-2">
                <Input
                  value={chara.data.tags}
                  onChange={(e) => setChara((prevChara) => ({ ...prevChara, data: { ...prevChara.data, tags: e.target.value } }))}
                  maxLength={256}
                  autoComplete="off"
                  type="text"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                className="block text-sm font-medium leading-6"
              >
                {t('Character.creatorsnotes')}
              </label>
              <div className="mt-2">
                <Input
                  value={chara.data.creator_notes}
                  onChange={(e) => setChara((prevChara) => ({ ...prevChara, data: { ...prevChara.data, creator_notes: e.target.value } }))}
                  maxLength={256}
                  autoComplete="off"
                  type="text"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                className="block text-sm font-medium leading-6"
              >
                {t('Character.talkativeness')}
              </label>
              <div className="mt-2">
                <Input
                  value={chara.data.extensions.talkativeness}
                  onChange={(e) => setChara((prevChara) => ({...prevChara,data: {...prevChara.data,extensions: {...prevChara.data.extensions,talkativeness: e.target.value}}}))}
                  step={0.1}
                  max={1}
                  min={0}
                  autoComplete="off"
                  type="number"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label
                className="block text-sm font-medium leading-6"
              >
                {t('Character.personalitysummary')}
              </label>
              <div className="mt-2">
                <Input
                  value={chara.data.personality}
                  onChange={(e) => setChara((prevChara) => ({ ...prevChara, data: { ...prevChara.data, personality: e.target.value } }))}
                  maxLength={256}
                  autoComplete="off"
                  type="text"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label
                className="block text-sm font-medium leading-6"
              >
                {t('Character.scenario')}
              </label>
              <div className="mt-2">
                <Input
                  value={chara.data.scenario}
                  onChange={(e) => setChara((prevChara) => ({ ...prevChara, data: { ...prevChara.data, scenario: e.target.value } }))}
                  maxLength={256}
                  autoComplete="off"
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default InforMation;
