import sharp from "sharp";

export async function POST(request: Request) {
  const extract = require("png-chunks-extract");
  const encode = require("png-chunks-encode");
  const text = require("png-chunk-text");

  const data = await request.formData();
  const card = data.get("card");
  const ccselect = data.get("ccselect");
  let CC = "CC BY-NC 4.0";
  let CCweb = "https://creativecommons.org/licenses/by-nc/4.0/deed.zh-hans";
  
  if (ccselect === "BY") {
    CC = "CC BY 4.0";
    CCweb = "https://creativecommons.org/licenses/by/4.0/legalcode.zh-hans";
  } else if (ccselect === "BYNC") {
    CC = "CC BY-NC 4.0";
    CCweb = "https://creativecommons.org/licenses/by-nc/4.0/legalcode.zh-hans";
  } else if (ccselect === "BYNCND") {
    CC = "CC BY-NC-ND 4.0";
    CCweb = "https://creativecommons.org/licenses/by-nc-nd/4.0/legalcode.zh-hans";
  } else if (ccselect === "BYNCSA") {
    CC = "CC BY-NC-SA 4.0";
    CCweb = "https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode.zh-hans";
  } else if (ccselect === "BYND") {
    CC = "CC BY-ND 4.0";
    CCweb = "https://creativecommons.org/licenses/by-nd/4.0/legalcode.zh-hans";
  } else if (ccselect === "BYSA") {
    CC = "CC BY-SA 4.0";
    CCweb = "https://creativecommons.org/licenses/by-sa/4.0/legalcode.zh-hans";
  }
  
  //Edit FirstMes
  if (card instanceof File) {
    const buffer = await card.arrayBuffer();
    const cardBuffer = Buffer.from(buffer);
    const chunks = extract(cardBuffer);
    const tEXtChunks = chunks.filter(
      (chunk: { name: string }) => chunk.name === "tEXt"
    );
    const charaChunks = tEXtChunks.map((tEXtChunk: any) => {
      return {
        chara: text.decode(tEXtChunk), 
      };
    });
    const charaTextBase64 = charaChunks[0].chara.text;
    const decodedCharaText = new TextDecoder("utf-8").decode(Buffer.from(atob(charaTextBase64), 'binary'));
    const charaData = JSON.parse(decodedCharaText);
    charaData.data.alternate_greetings.unshift(charaData.data.first_mes);
    charaData.data.first_mes = "<div style='text-align:center; background: linear-gradient(to right, #C9D6FF, #E2E2E2); background-size: cover;'><hr/><h1>{{char}}</h1><h3 style='margin-top:24px'>本内容依据“"+CC+"”许可证进行授权：<a href='"+CCweb+"'>点击查阅该许可证</a></h3><h3 style='text-align: right;margin-top: 48px'>点击右箭头开始正文内容→&nbsp; &nbsp; </h3><hr/></div>";
    const updatedCharaDataJSON = JSON.stringify(charaData);
    const updatedCharaDataBase64 = Buffer.from(updatedCharaDataJSON, "utf8").toString("base64");
    for (let tEXtChunk of tEXtChunks) {
      chunks.splice(chunks.indexOf(tEXtChunk), 1);
    }
    chunks.splice(-1, 0, text.encode("chara", updatedCharaDataBase64));
    const BufferChunk = Buffer.from(encode(chunks));
    const pngbase64 = BufferChunk.toString("base64");
    const charBase64Data = `data:image/png;base64,${pngbase64}`;
    return new Response(charBase64Data);
  }

  return new Response("Invalid input", { status: 200 });
}
