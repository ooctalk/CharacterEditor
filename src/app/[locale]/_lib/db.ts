// db.ts
import Dexie, { Table } from "dexie";

export interface Character {
  cid?: number;
  cover: string;
  json: {
    name: string;
    description: string;
    personality: string;
    scenario: string;
    first_mes: string;
    mes_example: string;
    creatorcomment: string;
    avatar: string;
    chat: string;
    talkativeness: string;
    fav: boolean;
    tags: string[];
    spec: string;
    spec_version: string;
    data: {
      name: string;
      description: string;
      personality: string;
      scenario: string;
      first_mes: string;
      mes_example: string;
      creator_notes: string;
      system_prompt: string;
      post_history_instructions: string;
      tags: string[];
      creator: string;
      character_version: string;
      alternate_greetings: string[];
      extensions: {
        talkativeness: string;
        fav: boolean;
        world: string;
        depth_prompt: {
          prompt: string;
          depth: number;
          role: string;
        };
        regex_scripts?: Array<{
          id: string;
          scriptName: string;
          findRegex: string;
          replaceString: string;
          trimStrings: string[];
          placement: number[];
          disabled: boolean;
          markdownOnly: boolean;
          promptOnly: boolean;
          runOnEdit: boolean;
          substituteRegex: boolean;
          minDepth: number | null;
          maxDepth: number | null;
        }>;
      };
      group_only_greetings: string[];
      character_book?: {
        entries: Array<{
          id: number;
          keys: string[];
          secondary_keys: string[];
          comment: string;
          content: string;
          constant: boolean;
          selective: boolean;
          insertion_order: number;
          enabled: boolean;
          position: string;
          use_regex: boolean;
          extensions: {
            position: number;
            exclude_recursion: boolean;
            display_index: number;
            probability: number;
            useProbability: boolean;
            depth: number;
            selectiveLogic: number;
            group: string;
            group_override: boolean;
            group_weight: number;
            prevent_recursion: boolean;
            delay_until_recursion: boolean;
            scan_depth: number | null;
            match_whole_words: boolean | null;
            use_group_scoring: boolean;
            case_sensitive: boolean | null;
            automation_id: string;
            role: number;
            vectorized: boolean;
            sticky: number;
            cooldown: number;
            delay: number;
          };
        }>;
        name?: string;
      };
    };
    create_date: string;
  };
}

class CharactersDB extends Dexie {
  characters!: Table<Character, number>;

  constructor() {
    super("ooctalk_com_Characters");
    this.version(1).stores({
      characters: "++cid",
    });
  }
}

const db = new CharactersDB();
export default db;
