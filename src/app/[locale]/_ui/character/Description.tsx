import React from "react";
import { Textarea } from "@nextui-org/react";
import { useChara } from "../../_lib/utils";
import { useTranslations } from "next-intl";

export default function Description() {
  const t = useTranslations();
  const { chara, setChara } = useChara();
  const [descriptionValue, setdescriptionValue] = React.useState(chara.data.description);

  const handleDescriptionChange = (e:any) => {
    const newValue = e.target.value;
    setChara((prevChara) => ({
      ...prevChara,
      data: { ...prevChara.data, description: newValue },
    }));
    setdescriptionValue(newValue);
  };

  return (
    <div className="md:p-4 p-2 w-full flex flex-col gap-2">
      <Textarea
        variant="underlined"
        labelPlacement="outside"
        placeholder="Description"
        value={descriptionValue}
        onChange={handleDescriptionChange}
        onValueChange={setdescriptionValue}
        maxRows={100}
      />
      <p className="text-default-500 text-small">{t('Character.descriptiontoken')}: {descriptionValue.length}</p>
    </div>
  );
}
