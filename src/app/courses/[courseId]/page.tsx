"use client"

import CourseAside from "@/components/courseAside";
import { YoutubePlayer } from "@/components/YoutubePlayer";
import { Video } from "@/data/@types/video";
import { useVideo } from "@/data/hooks/useVideos";

import { useParams } from "next/navigation";
import { useState } from "react";



export default function Course (){
    const params = useParams();

    const courseId = params.courseId as string;

    const [videoSelected, setVideoSelected] = useState<Video | null> (null);

    const {
        video,
        isLoading,
        error
    } = useVideo(courseId);

    const currentVideo = videoSelected ?? video[0];

    if(isLoading){
        return <p>Carregando Vídeo...</p>
    }

    if(error){
        return <p>Erro ao Carregar Cursos {error}</p>
    }

    return (
        <div className="min-h-[calc(100vh-4rem)] w-full flex">
            <aside  className="flex flex-col  items-center py-5 gap-2 w-[300px] border-r">
                <h3 className="text-center font-bold text-muted-foreground">
                    Todas as Aulas
                </h3>

                    {video?.map((video) => {
                        const isSelected =
                        videoSelected?.id === video.id;


                    return (
                    <button
                        key={video.id}
                        type="button"
                        onClick={() => setVideoSelected(video)}
                        className={`w-full rounded-lg border p-4 text-left transition ${
                        isSelected
                            ? "bg-muted"
                            : "hover:bg-muted-foreground"
                        }`}
                    >
                        <div className="font-medium">
                            <CourseAside position={video.position} title={video.title} thumbnail={video.thumbnail}/>
                        </div>
                    </button>
                    );
                })}
            </aside>
            <main className="flex flex-col py-5 items-center w-full gap-6">
                <div className="w-[1000px]">
                     <YoutubePlayer
                        videoId={currentVideo.videoId}
                        Title={currentVideo.title}
                     />
                </div>
                <div className="flex flex-col gap-5 px-10">
                    <div className="flex flex-col gap-2">
                        <h1 className="font-bold text-2xl">
                            {currentVideo.position}.{" "}
                            {currentVideo.title}
                        </h1>
                        <span className="w-full h-[1px]  bg-foreground/15"/>
                    </div>
                    
                    <p className="font-light text-sm">{currentVideo.description !== "" ?
                     currentVideo.description : 
                     "Esta aula não possui uma descrição cadastrada no YouTube. Assista ao vídeo completo no player acima para acompanhar o conteúdo, as explicações e todos os detalhes abordados nesta etapa do curso."
                     }
                     </p>
                </div>
               
            </main>
            
        </div>
    )
}