import React from "react";
import { Input, Textarea } from "@nextui-org/react";
import { useChara } from "../../_lib/utils";
import { useTranslations } from "next-intl";

export default function Depth_Prompt() {
  const t = useTranslations();
  const { chara, setChara } = useChara();

  return (
    <div className="md:p-4 p-2 w-full flex flex-col gap-2">
      <label className="block text-sm font-medium leading-6">
        {t("Character.characternote")}
      </label>
      <Textarea
        variant="underlined"
        labelPlacement="outside"
        placeholder="Character's Note"
        value={chara.data.extensions.depth_prompt.prompt}
        onChange={(e) =>
          setChara((prevChara) => ({
            ...prevChara,
            data: {
              ...prevChara.data,
              extensions: {
                ...prevChara.data.extensions,
                depth_prompt: {
                  ...prevChara.data.extensions.depth_prompt,
                  prompt: e.target.value,
                },
              },
            },
          }))
        }
        maxRows={100}
      />
      <div className="max-w-sm">
        <Input
          label={t("WorldBook.depth")}
          value={chara.data.extensions.depth_prompt.depth}
          onChange={(e) =>
            setChara((prevChara) => ({
              ...prevChara,
              data: {
                ...prevChara.data,
                extensions: {
                  ...prevChara.data.extensions,
                  depth_prompt: {
                    ...prevChara.data.extensions.depth_prompt,
                    depth: e.target.value,
                  },
                },
              },
            }))
          }
          step={1}
          max={999}
          min={0}
          autoComplete="off"
          type="number"
        />
      </div>
    </div>
  );
}
