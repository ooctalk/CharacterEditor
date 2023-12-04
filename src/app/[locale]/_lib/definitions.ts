export type TypeChara = {
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
  fav: Boolean;
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
    tags: string;
    creator: string;
    character_version: string;
    alternate_greetings: string[];
    extensions: {
      talkativeness: string;
      fav: Boolean;
      world: string;
      depth_prompt: {
        prompt: string;
        depth: Number;
      };
    };
    // character_book: {
    //   entries: [
    //     {
    //       id: number;
    //       keys: string[];
    //       scondary_keys: string[];
    //       comment: string;
    //       content: string;
    //       constant: boolean;
    //       selective: boolean;
    //       insertion_order: number;
    //       enable: boolean;
    //       position: string;
    //       extensions: {
    //         position: number;
    //         exclude_recursion: boolean;
    //         display_index: number;
    //         probability: number;
    //         useProbability: boolean;
    //         depth: number;
    //         selectiveLogic: number;
    //       };
    //     }
    //   ];
    // };
  };
  create_date: string;
};

export type TypeCharacterBook = {
  entries: (Iterable<any> & any[]) | undefined;
  character_book: {
    entries: [
      {
        id: Number;
        key: string[];
        secondary_keys: string[];
        comment: string;
        content: string;
        constant: Boolean;
        selective: Boolean;
        insertion_order: Number;
        enabled: Boolean;
        position: string;
        extensions: {
          position: Number;
          exclude_recursion: Boolean;
          display_index: Number;
          probability: Number;
          useProbability: Boolean;
          depth: Number;
        };
      }
    ];
    name: string;
  };
};
