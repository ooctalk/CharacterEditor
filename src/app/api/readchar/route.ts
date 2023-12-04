import sharp from "sharp";

export async function POST(request: Request) {
  const extract = require("png-chunks-extract");
  const text = require("png-chunk-text");
  const data = await request.arrayBuffer();

  const image = sharp(Buffer.from(data));

  image.resize(384, 384, { fit: "inside", withoutEnlargement: true });

  image.toFormat("png");

  const processedImageBuffer = await image.toBuffer();

  const base64Data = processedImageBuffer.toString("base64");

  const fullBase64Data = `data:image/png;base64,${base64Data}`;

  const imageBuffer = Buffer.from(data);
  const chunks = extract(imageBuffer);
  const tEXtChunks = chunks.filter(
    (chunk: { name: string }) => chunk.name === "tEXt"
  );
  const charaChunks = tEXtChunks.map((tEXtChunk: any) => {
    return {
      chara: text.decode(tEXtChunk), 
    };
  });

  const charaText = charaChunks[0].chara.text;
  const decodedCharaText = JSON.parse(Buffer.from(charaText, "base64").toString("utf8"));

  decodedCharaText.CyberWaifu_ORG_cover = fullBase64Data;

  const modifiedCharaText = JSON.stringify(decodedCharaText);
  
  return new Response(modifiedCharaText);
}
