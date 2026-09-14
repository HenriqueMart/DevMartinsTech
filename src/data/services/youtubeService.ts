//axios
import axios from 'axios'
//types
import { Course } from '../@types/course';
import { YouTubePlaylistsResponse } from '../@types/youtube';
import {
  YouTubePlaylistItemsResponse,
} from "@/data/@types/youtube";
import { Video } from '../@types/video';

//endpoint para pesquisa do youtube
const youtubeApi = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3"
})

//requisição da playlist
export async function getPlaylist(): Promise<Course[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;

  //Parâmetro de Envio para youtube
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

  const playlist = response.data.items.map((playlist) => ({
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

  return playlist.reverse();
  
}

//Busca dos vídeos do youtube da playlist selecionada
export async function getPlayListItems(
  playlistId: string
): Promise<Video[]> {
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

  const allVideos = response.data.items.length;

  const video = response.data.items.map((item) => ({
    id: item.id,
    title: item.snippet.title,
    description: item.snippet.description,
    videoId: item.contentDetails.videoId,
    thumbnail:
      item.snippet.thumbnails.high?.url ??
      item.snippet.thumbnails.medium?.url ??
      item.snippet.thumbnails.default?.url ??
      "",
    position: allVideos - item.snippet.position,
  }))

    return video.reverse();   
}