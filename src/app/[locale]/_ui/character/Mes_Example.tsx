import React from "react";
import { Textarea } from "@nextui-org/react";
import { useChara } from "../../_lib/utils";
import { useTranslations } from "next-intl";

export default function Mes_Example() {
  const t = useTranslations();
  const { chara, setChara } = useChara();

  return (
    <div className="md:p-4 p-2 w-full flex flex-col gap-2">
      <Textarea
        variant="underlined"
        labelPlacement="outside"
        placeholder="<START>"
        value={chara.data.mes_example}
        onChange={(e) => setChara((prevChara) => ({ ...prevChara, data: { ...prevChara.data, mes_example: e.target.value } }))}
        maxRows={100}
      />
    </div>
  );
}
