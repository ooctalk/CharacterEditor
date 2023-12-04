export async function POST(request:Request) {
    const extract = require('png-chunks-extract')  
    const encode = require('png-chunks-encode')  
    const text = require('png-chunk-text')  
  
    const data = await request.json();
    const char = (data.chara) || {};  
  
    const base64Data = data.cover.replace(/^data:image\/\w+;base64,/, '');  
      const imageBuffer = Buffer.from(base64Data, 'base64');  
      const chunks = extract(imageBuffer);  
  
      const tEXtChunks = chunks.filter((chunk: { name: string }) => chunk.name === 'tEXt');
  
      for (let tEXtChunk of tEXtChunks) {  
          chunks.splice(chunks.indexOf(tEXtChunk), 1);  
      }  


      const charString = JSON.stringify(char);
      const base64EncodedData = Buffer.from(charString, 'utf8').toString('base64');
      chunks.splice(-1, 0, text.encode('chara', base64EncodedData));
  
      const BufferChunk = Buffer.from(encode(chunks))
      const pngbase64 = BufferChunk.toString('base64');

      const charBase64Data = `data:image/png;base64,${pngbase64}`;
        
      return new Response(charBase64Data);  
  }