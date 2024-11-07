"use client";
import React, { useRef } from "react";
import useStore from "../../_lib/store";
import { useLiveQuery } from "dexie-react-hooks";
import db from "../../_lib/db";
import { Character } from "../../_lib/db";
import NoSelectCharacterCTA from "./NoSelectCharacterCTA";

function CharacterDescriptionEdit() {
  const { selectedCid } = useStore();
  const selectedCharacter = useLiveQuery(() =>
    selectedCid ? db.characters.where("cid").equals(selectedCid).toArray() : []
  );

  const handleUpdate = async (cid: number, field: string, value: any) => {
    await db.characters.update(cid, { [field]: value });
  };

  return (
    <div>
      {selectedCharacter && selectedCharacter.length > 0 ? (
        selectedCharacter.map((character: Character) => {
          const cid = character.cid;
          if (cid === undefined) return null;
          return (
            <div key={cid}>
              <div className="mt-2">
                <textarea
                  id="description"
                  name="description"
                  rows={20}
                  className="block w-full rounded-md border-0 p-4 text-black dark:text-white shadow-sm ring-1 ring-inset bg-zinc-50 dark:bg-zinc-950 ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-600 "
                  defaultValue={character.json.data.description}
                  onChange={(e) =>
                    handleUpdate(cid, "json.data.description", e.target.value)
                  }
                />
              </div>
            </div>
          );
        })
      ) : (
        <NoSelectCharacterCTA />
      )}
    </div>
  );
}

export default CharacterDescriptionEdit;
