export function getDefaultCharacterJson() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const milliseconds = String(now.getMilliseconds()).padStart(3, "0");
  const timestamp = `${year}-${month}-${day} @${hours}h ${minutes}m ${seconds}s ${milliseconds}ms`;

  return {
    name: "OoCTalk",
    description: "",
    personality: "",
    scenario: "",
    first_mes: "",
    mes_example: "",
    creatorcomment: "",
    avatar: "none",
    chat: `OoCTalk - ${timestamp}`,
    talkativeness: "0.5",
    fav: false,
    tags: [],
    spec: "chara_card_v3",
    spec_version: "3.0",
    data: {
      name: "OoCTalk",
      description: "",
      personality: "",
      scenario: "",
      first_mes: "",
      mes_example: "",
      creator_notes: "",
      system_prompt: "",
      post_history_instructions: "",
      tags: [],
      creator: "ce.ooctalk.com",
      character_version: `${timestamp}`,
      alternate_greetings: [],
      extensions: {
        talkativeness: "0.5",
        fav: false,
        world: "",
        depth_prompt: {
          prompt: "",
          depth: 4,
          role: "system",
        },
      },
      group_only_greetings: [],
    },
    create_date: timestamp,
  };
}
