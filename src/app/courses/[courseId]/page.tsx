"use client"

//Componentes
import CourseAside from "@/components/courseAside";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { YoutubePlayer } from "@/components/YoutubePlayer";
//Tipos
import { Video } from "@/data/@types/video";
//Hooks
import { useVideo } from "@/data/hooks/useVideos";
import { useState } from "react";

//Url do Next
import { useParams } from "next/navigation";


export default function Course (){
    //Pegando o Parâmetro enviado na url
    const params = useParams();
    const courseId = params.courseId as string;

    const [videoSelected, setVideoSelected] = useState<Video | null> (null);
    //Hook personalizado dos vídeos da API
    const {
        video,
        isLoading,
        error
    } = useVideo(courseId);

    const currentVideo = videoSelected ?? video[0];

    const currentIndex = video.findIndex(
    (item) => item.id === currentVideo?.id
    );

    //Lógica para Próxima Aula
    const handleNextVideo = () => {
        if(currentIndex !== -1 && currentIndex < video.length - 1){
            const nextVideo = video[currentIndex + 1];
            if(nextVideo){
                setVideoSelected(nextVideo);
            }
        }
        
    }

    if(isLoading){
    return (
    <div className="w-full min-h-[calc(100vh-4rem)] flex justify-center items-center">
      <Button disabled size="sm" variant="ghost">
        <Spinner data-icon="inline-start" />
          Carregando Aula...
      </Button>
    </div>
    )
  }

    if(error){
        return (
        <div className="w-full min-h-[calc(100vh-4rem)] flex justify-center items-center">
            <p className="text-center">Algo inesperado aconteceu: Erro: {error}</p>
        </div>
        )
    }

    return (
        <div className="w-full flex flex-col-reverse sm:flex-row px-5 lg:px-0 sm:min-h-[calc(100vh-4rem)] ">
            <aside  className="flex flex-col items-center py-5 gap-2 sm:w-75 border-r">
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
            <main className="w-full flex flex-col py-5 items-center gap-6">
                <div className="w-full sm:w-[90%] lg:w-175 xl:w-250">
                     <YoutubePlayer
                        videoId={currentVideo.videoId}
                        title={currentVideo.title}
                     />
                </div>
                <div className="flex flex-col gap-5 sm:px-10">
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between ">
                            <h1 className="font-bold text-lg sm:text-2xl">
                                {currentVideo.position}.{" "}
                                {currentVideo.title}
                            </h1>
                            {currentIndex < (video.length - 1) ? (
                                <Button 
                                className="cursor-pointer"
                                onClick={(e) => (
                                    e.preventDefault(),
                                    handleNextVideo()
                                )}
                                >
                                Próxima Aula
                            </Button>
                            ): (
                                <p className="font-bold text-sm sm:text-lg">Curso finalizado!</p>
                            )}
                            
                        </div>
                        
                        
                        <span className="w-full h-px  bg-foreground/15"/>
                    </div>
                    
                    <p className="font-light text-[12px] sm:text-sm">{currentVideo.description !== "" ?
                     currentVideo.description : 
                     "Esta aula não possui uma descrição cadastrada no YouTube. Assista ao vídeo completo no player acima para acompanhar o conteúdo, as explicações e todos os detalhes abordados nesta etapa do curso."
                     }
                     </p>
                </div>
               
            </main>
            
        </div>
    )
}