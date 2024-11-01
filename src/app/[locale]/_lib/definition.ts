// Character
// interface RegexScript {
//   id: string;
//   scriptName: string;
//   findRegex: string;
//   replaceString: string;
//   trimStrings: string[];
//   placement: number[];
//   disabled: boolean;
//   markdownOnly: boolean;
//   promptOnly: boolean;
//   runOnEdit: boolean;
//   substituteRegex: boolean;
//   minDepth: number | null;
//   maxDepth: number | null;
// }

// interface DepthPrompt {
//   prompt: string;
//   depth: number;
//   role: string;
// }

// interface Extensions {
//   talkativeness: string;
//   fav: boolean;
//   world: string;
//   depth_prompt: DepthPrompt;
//   regex_scripts: RegexScript[];
// }

// interface CharacterBookEntry {
//   id: number;
//   keys: string[];
//   secondary_keys: string[];
//   comment: string;
//   content: string;
//   constant: boolean;
//   selective: boolean;
//   insertion_order: number;
//   enabled: boolean;
//   position: string;
//   use_regex: boolean;
//   extensions: {
//     position: number;
//     exclude_recursion: boolean;
//     display_index: number;
//     probability: number;
//     useProbability: boolean;
//     depth: number;
//     selectiveLogic: number;
//     group: string;
//     group_override: boolean;
//     group_weight: number;
//     prevent_recursion: boolean;
//     delay_until_recursion: boolean;
//     scan_depth: number;
//     match_whole_words: boolean | null;
//     use_group_scoring: boolean;
//     case_sensitive: boolean | null;
//     automation_id: string;
//     role: number;
//     vectorized: boolean;
//     sticky: number;
//     cooldown: number;
//     delay: number;
//   };
// }

// interface CharacterBook {
//   entries: CharacterBookEntry[];
//   name: string;
// }

// interface Data {
//   name: string;
//   description: string;
//   personality: string;
//   scenario: string;
//   first_mes: string;
//   mes_example: string;
//   creator_notes: string;
//   system_prompt: string;
//   post_history_instructions: string;
//   tags: string[];
//   creator: string;
//   character_version: string;
//   alternate_greetings: string[];
//   extensions: Extensions;
//   group_only_greetings: string[];
//   character_book: CharacterBook;
// }

// interface CharacterJSON {
//   name: string;
//   description: string;
//   personality: string;
//   scenario: string;
//   first_mes: string;
//   mes_example: string;
//   creatorcomment: string;
//   avatar: string;
//   chat: string;
//   talkativeness: string;
//   fav: boolean;
//   tags: string[];
//   spec: string;
//   spec_version: string;
//   data: Data;
//   create_date: string;
// }
