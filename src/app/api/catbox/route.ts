export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const reqType = data.get("reqtype");
    const fileToUpload = data.get("fileToUpload");
    if (reqType !== "fileupload" || !(fileToUpload instanceof File)) {
      return new Response("Err Type", { status: 200 });
    }
    const formData = new FormData();
    formData.append("reqtype", reqType);
    formData.append("fileToUpload", fileToUpload);
    const res = await fetch("https://catbox.moe/user/api.php", {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      const resBody = await res.json();
      return new Response(JSON.stringify(resBody), { status: 200 });
    }
    return new Response("Error: Upload failed", { status: 200 });
  } catch (error) {
    return new Response("OK", { status: 200 });
  }
}
