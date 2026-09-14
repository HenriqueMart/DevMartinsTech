"use client"

//React
import { useEffect, useState } from "react";
//axios
import axios from "axios";
//types
import { Video } from "../@types/video";

interface VideoResponse {
  data: Video[]
}

export function useVideo(playlistId: string){
  const [video, setVideo] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVideo() {
      try {
        setIsLoading(true);
        setError(null);

        //Busca pela vídeo da playlist
        const response = await axios.get<VideoResponse>(
          `/api/courses/${playlistId}/videos`
        );

        setVideo(response.data.data);
      } catch (error) {
        console.error("Erro ao carregar Aula:", error);

        setError("Não foi possível carregar os Aula.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchVideo();
  }, [playlistId]);

  return {
    video,
    isLoading,
    error,
  };
}