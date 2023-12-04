import sharp from "sharp";

export async function POST(request: Request) {
    const data = await request.arrayBuffer();

    const image = sharp(Buffer.from(data));

    image.resize(384, 384, { fit: 'inside', withoutEnlargement: true });

    image.toFormat('png');

    const processedImageBuffer = await image.toBuffer();

    const base64Data = processedImageBuffer.toString('base64');

    const fullBase64Data = `data:image/png;base64,${base64Data}`;

    return new Response(fullBase64Data);
}
