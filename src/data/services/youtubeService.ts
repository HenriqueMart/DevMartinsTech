import axios from 'axios'
import { Course } from '../@types/course';
import { YouTubePlaylistsResponse } from '../@types/youtube';

import {
  YouTubePlaylistItemsResponse,
} from "@/data/@types/youtube";

import { Lesson } from "@/data/@types/Lesson";


const youtubeApi = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3"
})

export async function getPlaylist(): Promise<Course[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;

  const response = await youtubeApi.get<YouTubePlaylistsResponse>("/playlists",
    {
      params: {
        part: "snippet,contentDetails",
        channelId,
        maxResults: 50,
        key: apiKey,
      },
    }
  );

  return response.data.items.map((playlist) => ({
    id: playlist.id,
    title: playlist.snippet.title,
    description: playlist.snippet.description,
     thumbnail:
      playlist.snippet.thumbnails.high?.url ??
      playlist.snippet.thumbnails.medium?.url ??
      playlist.snippet.thumbnails.default?.url ??
      "",
    totalLessons: playlist.contentDetails.itemCount,
  }));
  
}

export async function getPlayListItems(
  playlistId: string
): Promise<Lesson[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;

  const response = await youtubeApi.get<YouTubePlaylistItemsResponse>(
  "playlistItems",
  {
    params: {
        part: "snippet,contentDetails",
        playlistId,
        maxResults: 50,
        key: apiKey,
      },
  }
  )
  return response.data.items.map((item) => ({
    id: item.id,
    title: item.snippet.title,
    description: item.snippet.description,
    videoId: item.contentDetails.videoId,
    thumbnail:
      item.snippet.thumbnails.high?.url ??
      item.snippet.thumbnails.medium?.url ??
      item.snippet.thumbnails.default?.url ??
      "",
    position: item.snippet.position,
  }))
}


