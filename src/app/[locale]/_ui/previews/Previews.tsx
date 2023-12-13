"use client";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import React, { useState } from "react";
import { useChara, usePostChara,useCharacterBook } from "../../_lib/utils";
import { useCover } from "../../_lib/utils";
import { useTranslations } from "next-intl";
import CharacterPreviews from "./CharacterPreviews";

function Previews() {
  const [isReadCharLoding, setIsReadCharLoding] = useState(false);
  const [isMakeCharLoding, setIsMakeCharLoding] = useState(false);
  const t = useTranslations();
  const {chara,setChara} = useChara();
  const {character_book,setCharacter_Book} =  useCharacterBook()
  const {cover,setCover} = useCover();
  const {updateChara} = usePostChara();
  const handleMakeChar = async (e: any) => {
    setIsMakeCharLoding(true)
    const charData = {
      cover: cover,
      chara: updateChara,
    };
    if (!chara?.data?.name) {
      alert(t("Previews.charactercardnamesmust"));
      setIsMakeCharLoding(false)
      return;
    }
    try {
      const charDataRes = await fetch("/api/makechar", {
        method: "POST",
        body: JSON.stringify(charData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (charDataRes.ok) {
        const res = await charDataRes.text();
        const blob = await fetch(res).then((r) => r.blob());
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = chara.data.name + chara.data.character_version + ".png";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        setIsMakeCharLoding(false)
      } else {
        console.error("Failed to generate image");
        setIsMakeCharLoding(false)
      }
    } catch (error) {
      console.error("Error:", error);
      setIsMakeCharLoding(false)
    }
    setIsMakeCharLoding(false)
  };

    const handleReadChar = async(e:any) =>{
      if(typeof window !== "undefined"){
        setIsReadCharLoding(true);
        const file = e.target.files[0];
        const res = await fetch("/api/readchar",{
          method:"POST",
          body:file,          
        });
        if(res.ok){
          const data = await res.json();
          if(data.data.character_book){
            setCharacter_Book(data.data.character_book)
          }
          setCover(data.CyberWaifu_ORG_cover)
          delete data.data.character_book;
          delete data.CyberWaifu_ORG_cover;
          data.data.extensions.world = '';
          setChara(data)
          setIsReadCharLoding(false)
          alert(t('Previews.importok'));
        }else{
          setIsReadCharLoding(false)
        }
      }else{
        setIsReadCharLoding(false)
      }
    }
  return (
    <>
      
      <div className="grid gap-4">
      <Popover placement="bottom" color="primary">
          <PopoverTrigger>
            <Button isLoading={isMakeCharLoding} color="success">{t('Previews.exportingcharactercards')}</Button>
          </PopoverTrigger>
          <PopoverContent>
            <Popover placement="bottom" color="primary">
              <PopoverTrigger>
                <Button isLoading={isMakeCharLoding} color="primary">{t('Previews.isitalldone')}</Button>
              </PopoverTrigger>
              <PopoverContent>
                <Button isLoading={isMakeCharLoding} onClick={handleMakeChar} color="primary">{t('Previews.export')}</Button>
              </PopoverContent>
            </Popover>
          </PopoverContent>
        </Popover>



        <CharacterPreviews/>
        <Popover placement="top" color="danger">
          <PopoverTrigger>
            <Button isLoading={isReadCharLoding} color="default">{t('Previews.importingcharactercards')}</Button>
          </PopoverTrigger>
          <PopoverContent>
            <Popover placement="top" color="warning">
              <PopoverTrigger>
                <Button isLoading={isReadCharLoding} color="danger">
                  {t('Previews.thisoperationoverwritesthedata')}
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <input
                    accept=".png"
                    type="file"
                    id="ReadChar"
                    style={{ display: 'none' }}
                    onChange={handleReadChar}
                  />
                <Button                   
                  isLoading={isReadCharLoding}
                  onClick={() => {
                    const ReadChar = document.getElementById("ReadChar");
                    if (ReadChar) {
                      ReadChar.click();
                    }
                  }} color="warning">{t('Previews.import')}</Button>
              </PopoverContent>
            </Popover>
          </PopoverContent>
        </Popover>


      </div>
    </>
  );
}

export default Previews;
