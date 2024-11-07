export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const res = await fetch("https://catbox.moe/user/api.php", {
      method: "POST",
      body: formData,
    });
    return new Response(JSON.stringify(res))
  } catch (error) {
    console.log(error)
    return new Response("error", { status: 200 });
  }
}