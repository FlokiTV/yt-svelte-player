import ytsr from "ytsr";

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ request, url }) {
  const q = url.searchParams.get("q");
  const searchResults = await ytsr(q, {
    hl: "pt-BR",
    gl: "BR",
    limit: 15,
  });

  return {
    body: searchResults,
  };
}
