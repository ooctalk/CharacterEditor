import React from "react";
import { Heading } from "../Catalyst/heading";
import { Divider } from "../Catalyst/divider";
import CharacterGreetingsEdit from "../Reuse/CharacterGreetingsEdit";
import CharacterGreetingsButton, {
  CharacterGreetingsDeleteButton,
  CharacterGreetingsNewButton,
} from "../Reuse/CharacterGreetingsButton";
import { useTranslations } from "next-intl";

function CharacterGreetings() {
  const t = useTranslations('Workspaces/Greetings')
  return (
    <>
      {/* Title  */}

      <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <Heading>{t('character-greetings')}</Heading>
        <div className="flex gap-4 sm:justify-self-end text-nowrap">
          <CharacterGreetingsDeleteButton />
          <CharacterGreetingsNewButton />
          <CharacterGreetingsButton />
        </div>
      </div>

      <Divider className="my-10 mt-5" />

      {/* Content */}
      <CharacterGreetingsEdit />
    </>
  );
}

export default CharacterGreetings;
