import React from "react";
import { Textarea } from "@nextui-org/react";
import { useChara } from "../../_lib/utils";
import { useTranslations } from "next-intl";

export default function Prompt_Overrides() {
  const t = useTranslations();
  const { chara, setChara } = useChara();
  const [system_promptValue, setSystem_PromptValue] = React.useState(chara.data.system_prompt);
  const [post_history_instructionsValue, setPost_History_InstructionsValue] = React.useState(chara.data.post_history_instructions);

  const handleSystem_PromptChange = (e:any) => {
    const newValue = e.target.value;
    setChara((prevChara) => ({
      ...prevChara,
      data: { ...prevChara.data, system_prompt: newValue },
    }));
    setSystem_PromptValue(newValue);
  };

  const handlePost_History_InstructionsChange = (e:any) => {
    const newValue = e.target.value;
    setChara((prevChara) => ({
      ...prevChara,
      data: { ...prevChara.data, post_history_instructions: newValue },
    }));
    setPost_History_InstructionsValue(newValue);
  };
  

  return (
    <>

    <div className="md:p-4 p-2 w-full flex flex-col gap-2">
    <label
    className="block text-sm font-medium leading-6"
    >
    {t('Character.mainprompt')}
    </label>
      <Textarea
        variant="underlined"
        labelPlacement="outside"
        placeholder="System Prompt"
        value={system_promptValue}
        onChange={handleSystem_PromptChange}
        onValueChange={setSystem_PromptValue}
        maxRows={100}
      />
      <p className="text-default-500 text-small">{t('Character.mainprompttoken')}: {system_promptValue.length}</p>
    </div>



    <div className="md:p-4 p-2 w-full flex flex-col gap-2">
    <label
    className="block text-sm font-medium leading-6"
    >
    {t('Character.jailbreak')}
    </label>
      <Textarea
        variant="underlined"
        labelPlacement="outside"
        placeholder="Post history instructions"
        value={post_history_instructionsValue}
        onChange={handlePost_History_InstructionsChange}
        onValueChange={setPost_History_InstructionsValue}
        maxRows={100}
      />
      <p className="text-default-500 text-small">{t('Character.jailbreaktoken')}: {post_history_instructionsValue.length}</p>
    </div>
    </>
  );
}
