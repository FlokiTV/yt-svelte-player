import ytsr from "ytsr";

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ request, url }) {
  const searchResults = await ytsr(url.searchParams.get("q"), {
    limit: 10,
  });

  return {
    body: searchResults,
  };
}
