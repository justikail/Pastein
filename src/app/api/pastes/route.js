import { supabase } from "@/libs/createClient";

const validTypes = ["text", "python", "cpp", "php", "go", "html", "css", "javascript", "perl", "java", "ruby"];

export async function GET(request) {
  const url = new URL(request.url);
  const query = url.searchParams.get("p");

  if (query) {
    const { data } = await supabase.from("pastein").select("*").eq("endPoint", query).single();
    if (data) {
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
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

  return new Response("Hello World!", {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
}

export async function POST(request) {
  try {
    const { title, content, type, situation, endPoint, expiredIn } = await request.json();

    if (!title) {
      return new Response(JSON.stringify({ error: "Title is missing" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    if (!content) {
      return new Response(JSON.stringify({ error: "Content is missing" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    if (!type) {
      return new Response(JSON.stringify({ error: "Type is missing" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    if (!validTypes.includes(type)) {
      return new Response(JSON.stringify({ error: "Invalid type" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    let data, error;
    const expired_at = expiredIn ? new Date(Date.now() + expiredIn * 60 * 1000).toISOString() : null;

    if (situation == "insert") {
      ({ data, error } = await supabase.from("pastein").insert([{ title, content, type, expired_at }]).select("*").single());
    } else if (situation == "update") {
      if (!endPoint) {
        return new Response(JSON.stringify({ error: "endPoint is missing for update" }), {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
      ({ data, error } = await supabase.from("pastein").update({ title, content, type }).eq("endPoint", endPoint).select("*").single());
    } else {
      return new Response(JSON.stringify({ error: "Invalid situation" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    if (error) {
      throw error;
    }

    return new Response(JSON.stringify(data), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
