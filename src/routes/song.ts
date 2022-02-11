import ytdl from "ytdl-core";

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ url }) {
  try {
    let info = await ytdl.getInfo(url.searchParams.get("id"));
    const audioFormats = ytdl.filterFormats(info.formats, "audioonly");
    const audMP4 = audioFormats[1];
    return {
      body: {
        duration: audMP4.approxDurationMs,
        url: audMP4.url,
      },
    };
  } catch (error) {
    return {
      status: 404,
      body: error.message,
    };
  }
}
