"use client";
import { useEffect, useState } from "react";
import { TypeChara, TypeCharacterBook } from "./definitions";
import defaultCoverBase64 from "./defalutCover";
export function useChara() {
    const [chara, setChara] = useState<TypeChara>(() => {
      const defaultChara = {
        name: "",
        description: "",
        personality: "",
        scenario: "",
        first_mes: "",
        mes_example: "",
        creatorcomment: "",
        avatar: "none",
        chat: "",
        talkativeness: "0.5",
        fav: false,
        spec: "chara_card_v2",
        spec_version: "2.0",
        data: {
          name: "",
          description: "",
          personality: "",
          scenario: "",
          first_mes: "",
          mes_example: "",
          creator_notes: "",
          system_prompt: "",
          post_history_instructions: "",
          tags: [],
          creator: "",
          character_version: "",
          alternate_greetings: [],
          extensions: {
            talkativeness: "0.5",
            fav: false,
            world: "",
            depth_prompt: { prompt: "", depth: 4 },
          },
        },
        create_date: "",
      };
      if (typeof window !== "undefined") {
        const charaed = localStorage.getItem("chara");
        return charaed ? JSON.parse(charaed) || defaultChara : defaultChara;
      }
      return defaultChara;
    });
    useEffect(() => {
      if (typeof window !== "undefined") {
        localStorage.setItem("chara", JSON.stringify(chara));
      }
    }, [chara]);
    return { chara, setChara };
  }

  export function useCharacterBook() {
    const {chara} = useChara()
    const [ character_book , setCharacter_Book ] = useState<TypeCharacterBook>(() => {
      const defaultCharacterBook = {
        entries:[
          {
            "id": 1,
            "keys": [],
            "secondary_keys": [],
            "comment": "CyberWaifu.org",
            "content": "",
            "constant": true,
            "selective": true,
            "insertion_order": 100,
            "enabled": true,
            "position": "after_char",
            "extensions": {
              "position": 3,
              "exclude_recursion": false,
              "display_index": 1,
              "probability": 100,
              "useProbability": true,
              "depth": 4
            }
          }
        ],
        name:chara.data.name + chara.data.character_version
      };
      if(typeof window !== "undefined" ){
        const character_booked = localStorage.getItem('character_book');
        return character_booked ? JSON.parse(character_booked) || defaultCharacterBook : defaultCharacterBook;
      }
      return defaultCharacterBook;
    });
    useEffect(() => {
      if(typeof window !== "undefined") {
        localStorage.setItem("character_book",JSON.stringify(character_book))
      }
    },[character_book])
    return { character_book , setCharacter_Book }
  }

  export function useCover() {
    const [cover, setCover] = useState(() => {
      if (typeof window !== "undefined") {
        return localStorage.getItem("cover") || defaultCoverBase64;
      }
      return defaultCoverBase64;
    });
  
    useEffect(() => {
      if (typeof window !== "undefined") {
        localStorage.setItem("cover", cover);
      }
    }, [cover]);
  
    return { cover, setCover };
  }
  

  export const useCoverHandler = () => {

    const [isReplacingTheCoverLoding, setIsReplacingTheCoverLoding] = useState(false);
    const handleReplacingTheCover = async (e: any, setCover: (data: string) => void) => {
      setIsReplacingTheCoverLoding(true);
      if(typeof window !== "undefined"){
        const file = e.target.files[0];
        const res = await fetch("/api/upcover", {
          method: "POST",
          body: file,
        });
        if(res.ok){
          const data = await res.text();
          localStorage.setItem("cover", data);
          setCover(data);
          setIsReplacingTheCoverLoding(false);
        }else{
          setIsReplacingTheCoverLoding(false);
          alert("Failed to upload: please make sure you are uploading an image");
        }
      }else{
        setIsReplacingTheCoverLoding(false);
        alert('Please change your browser');
      }
    };
  
    return { isReplacingTheCoverLoding, handleReplacingTheCover };
  };

  export const useReadChar = () => {
    const [isReadCharLoding, setIsReadCharLoding] = useState(false);
    const handleReadChar = async(e:any) =>{
      setIsReadCharLoding(true);
      if(typeof window !== "undefined"){
        const file = e.target.files[0];
        const res = await fetch("/api/readchar",{
          method:"POST",
          body:file,          
        });
        if(res.ok){
          const data = await res
          console.log(data)
          setIsReadCharLoding(false)
        }else{
          setIsReadCharLoding(false)
        }
      }else{
        setIsReadCharLoding(false)
      }
    }
    setIsReadCharLoding(false)
  }

  export const usePostChara = () => {
    const { chara , setChara} = useChara();
    const { character_book, setCharacter_Book } = useCharacterBook();
  
  
    const updatedCharacterBook = {
      ...character_book,
      name : chara.data.name + chara.data.character_version,
    };
    
    const updateChara = {
      ...chara,
      data: {
        ...chara.data,
        character_book: updatedCharacterBook,
        ...chara.data.extensions,
        world: chara.data.name + chara.data.character_version,
      }
    };
    
    
    return {updateChara}
    
  };
