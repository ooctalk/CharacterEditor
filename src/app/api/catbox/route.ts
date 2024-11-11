export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const reqtype = formData.get("reqtype");
    if (reqtype !== "fileupload") {
      return new Response("Invalid request type", { status: 200 });
    }
    const file = formData.get("fileToUpload") as File | null;
    if (!file) {
      return new Response("No file uploaded", { status: 200 });
    }
    if (!file.name.endsWith(".webp")) {
      return new Response("File must be a .webp", { status: 200 });
    }
    const maxSizeInBytes = 1 * 1024 * 1024; // 1MB
    if (file.size > maxSizeInBytes) {
      return new Response("File size exceeds 1MB", { status: 200 });
    }
    const res = await fetch("https://catbox.moe/user/api.php", {
      method: "POST",
      body: formData,
    });

    const responseText = await res.text();
    return new Response(responseText);
  } catch (error) {
    console.error(error);
    return new Response("error", { status: 200 });
  }
}
