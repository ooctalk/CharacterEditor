import React from "react";
import { Textarea } from "@nextui-org/react";
import { useChara } from "../../_lib/utils";

export default function First_Message() {
  const { chara, setChara } = useChara();
  const [first_messageValue, setFirst_MessageValue] = React.useState(chara.data.first_mes);

  const handleFirst_MessageChange = (e:any) => {
    const newValue = e.target.value;
    setChara((prevChara) => ({
      ...prevChara,
      data: { ...prevChara.data, first_mes: newValue },
    }));
    setFirst_MessageValue(newValue);
  };

  return (
    <div className="md:p-4 p-2 w-full flex flex-col gap-2">
      <Textarea
        variant="underlined"
        labelPlacement="outside"
        placeholder="First Message"
        value={first_messageValue}
        onChange={handleFirst_MessageChange}
        onValueChange={setFirst_MessageValue}
        maxRows={100}
      />
      <p className="text-default-500 text-small">First Message Token: {first_messageValue.length}</p>
    </div>
  );
}
