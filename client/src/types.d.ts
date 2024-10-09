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
  id: string;
  name: string;
  album: SongAlbum;
  artists: Artist[];
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
  