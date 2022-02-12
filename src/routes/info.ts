import ytdl from "ytdl-core";

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ url }) {
  const id = url.searchParams.get("id");
  try {
    let info = await ytdl.getBasicInfo(id);
    let { videoDetails } = info;
    return {
      body: {
        id: id,
        title: videoDetails.title,
        description: videoDetails.description,
        lengthSeconds: videoDetails.lengthSeconds,
        author: videoDetails.author,
        thumbnails: videoDetails.thumbnails,
        bestThumbnail:
          videoDetails.thumbnails[videoDetails.thumbnails.length - 1],
      },
    };
  } catch (error) {
    return {
      status: 404,
      body: error.message,
    };
  }
}
