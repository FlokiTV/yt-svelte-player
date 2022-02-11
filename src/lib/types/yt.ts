export interface YT {
  originalQuery: string;
  correctedQuery: string;
  results: number;
  activeFilters: ActiveFilter[];
  refinements: any[];
  items: YTItem[];
  continuation: null;
}

export interface ActiveFilter {
  name: string;
  active: boolean;
  url: null;
  description: string;
}

export interface YTItem {
  type: Type;
  title?: string;
  id?: string;
  url?: string;
  bestThumbnail?: BestAvatar;
  thumbnails?: BestAvatar[];
  isUpcoming?: boolean;
  upcoming?: null;
  isLive?: boolean;
  badges?: string[];
  author?: Author;
  description?: null;
  views?: number;
  duration?: string;
  uploadedAt?: null | string;
  items?: ItemItem[];
  playlistID?: string;
  firstVideo?: FirstVideo;
  owner?: Owner;
  publishedAt?: null;
  length?: number;
  name?: string;
  channelID?: string;
  bestAvatar?: BestAvatar;
  avatars?: BestAvatar[];
  verified?: boolean;
  subscribers?: string;
  descriptionShort?: string;
  videos?: number;
}

export interface Author {
  name: string;
  channelID: string;
  url: string;
  bestAvatar: BestAvatar;
  avatars: BestAvatar[];
  ownerBadges: OwnerBadge[];
  verified: boolean;
}

export interface BestAvatar {
  url: string;
  width: number;
  height: number;
}

export enum OwnerBadge {
  CanalOficialDoArtista = "Canal oficial do artista",
  Verificado = "Verificado",
}

export interface FirstVideo {
  id: string;
  shortURL: string;
  url: string;
  title?: string;
  length: string;
  thumbnails: BestAvatar[];
  bestThumbnail: BestAvatar;
  text?: string;
}

export interface ItemItem {
  type: Type;
  title: string;
  id: string;
  url: string;
  bestThumbnail: BestAvatar;
  thumbnails: BestAvatar[];
  isUpcoming: boolean;
  upcoming: null;
  isLive: boolean;
  badges: string[];
  author: Author;
  description: null;
  views: number;
  duration: string;
  uploadedAt: string;
}

export enum Type {
  Channel = "channel",
  Mix = "mix",
  Playlist = "playlist",
  Shelf = "shelf",
  Video = "video",
}

export interface Owner {
  name: string;
  channelID: string;
  url: string;
  ownerBadges: any[];
  verified: boolean;
}
export interface MP3 {
  url: string;
  duration: number;
}
export function getThumbnail(song) {
  if (!song) return "no-image.png";
  if (song.bestThumbnail) return song.bestThumbnail.url;
  if (song.thumbnails) return song.thumbnails[0].url;
  else return "no-image.png";
}
