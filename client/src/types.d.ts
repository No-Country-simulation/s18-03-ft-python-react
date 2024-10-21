export interface Artist {
    id: string;
    name: string;
    popularity: number;
    images: ArtistImage[];
    genres: string[];
    followers: {
      total: number;
    };
}

 export interface ArtistImage {
    height: number;
    url: string;
    width: number;
}

export interface Song {
  name: string;
  id: string;
  songName: string;
  albumName: string;
  album: SongAlbum;
  albumImageUrl: string;
  artists: string;
  popularity: number;
  external_urls: {
    spotify: string;
  };
  preview_url: string | null;
}

export interface songAlbum {              
  images: ArtistImage[]
  name: string
  release_date: string
}


export interface Playlist {
  id: string;
  name: string;
  description: string;
  href: string;
  images: Array<{
    url: string;
    height: number;
    width: number;
  }>;
  track: Song;
}

export interface UserTopArtistList {
  items: Artist[];
  total: number;
  limit: number;
  offset: number;
  href: string;
}