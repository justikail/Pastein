import { supabase } from "@/libs/createClient";

export async function GET(request) {
  const url = new URL(request.url);
  const query = url.searchParams.get("p");

  if (query) {
    const { data } = await supabase.from("pastein").select("*").eq("endPoint", query).single();
    if (data) {
      return new Response(data.content, {
        status: 200,
        headers: {
          "Content-Type": "text/plain",
        },
      });
    } else {
      return new Response(JSON.stringify({ error: "Paste not found." }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  }

  return new Response("Hello World!.", {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
