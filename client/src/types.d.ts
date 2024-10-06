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
  