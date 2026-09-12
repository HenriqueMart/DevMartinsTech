export interface YouTubeThumbnail {
  url: string;
  width: number;
  height: number;
}

export interface YouTubePlaylist {
  id: string;

  snippet: {
    title: string;
    description: string;

    thumbnails: {
      default?: YouTubeThumbnail;
      medium?: YouTubeThumbnail;
      high?: YouTubeThumbnail;
      standard?: YouTubeThumbnail;
      maxres?: YouTubeThumbnail;
    };
  };

  contentDetails: {
    itemCount: number;
  };
}

export interface YouTubePlaylistsResponse {
  items: YouTubePlaylist[];

  nextPageToken?: string;

  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}

export interface YouTubePlaylistItem {
  id: string;

  snippet: {
    title: string;
    description: string;
    position: number;

    thumbnails: {
      default?: YouTubeThumbnail;
      medium?: YouTubeThumbnail;
      high?: YouTubeThumbnail;
      standard?: YouTubeThumbnail;
      maxres?: YouTubeThumbnail;
    };

    resourceId: {
      videoId: string;
    };
  };

  contentDetails: {
    videoId: string;
    videoPublishedAt?: string;
  };
}

export interface YouTubePlaylistItemsResponse {
  items: YouTubePlaylistItem[];

  nextPageToken?: string;

  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}