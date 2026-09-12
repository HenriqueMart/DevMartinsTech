'use client';

//Componentes
import CardCourse from "@/components/cardCourse";
import { Search } from "@/components/search";
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay";

//hook personalizado
import {useCourses} from "@/data/hooks/useCourses"

//Propriedade do Next e React
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Home (){

  
  


  //Variável do Slides
  const [apiCarousel, setApiCorousel] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  //Variável AutoPlay
  const autoPlayPlugin = Autoplay({delay: 8000, stopOnInteraction: true})

  React.useEffect(() => {
    if (!apiCarousel) {
      return
    }
 
    //Atualização do Slides
    const onSelect = () => {
      setCurrent(apiCarousel.selectedScrollSnap() + 1);
    };

    //Definindo o Slide inicial
    onSelect();
 
    apiCarousel.on("select", onSelect);
    apiCarousel.on("reInit", onSelect);
  }, [apiCarousel])


  //retorno do Hook Personalizado
  const {courses, error, isLoading} = useCourses();

  //Carregamento da Página
  if(isLoading){
    return (
    <div className="w-full min-h-[calc(100vh-4rem)] flex justify-center items-center">
      <p className="text-center">Carregando Cursos...</p>
    </div>
    )
  }

  //Tratamento de Erro
  if(error){
    return (
    <div className="w-full min-h-[calc(100vh-4rem)] flex justify-center items-center">
      <p className="text-center">Algo inesperado aconteceu: Erro: {error}</p>
    </div>
    )
  }

  return (
    <main className=" w-full flex flex-col gap-5 sm:py-[25px]">
      <div className="lg:mx-auto max-w-[1440px]">
      <Carousel setApi={setApiCorousel} plugins={[autoPlayPlugin]} className="max-w-[1200px] p-0">
        <CarouselContent>
          {courses.map((course, index) => (
            <CarouselItem key={index}>
              <Card className="m-px p-0">

                <div className="relative w-full overflow-hidden rounded-xl">
                <Link href={`/courses/${course.id}`}>
                  <CardContent className="h-[200px] sm:h-[400px] flex items-center justify-center px-0 ">
                    <Image 
                      src={course.thumbnail}
                      alt="Exemplo"
                      width={500}
                      height={500}
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/30 to-black/70" />
                    
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 gap-4 z-10">
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white uppercase tracking-wide max-w-2xl drop-shadow-md">
                        {course.title}
                      </h2>
                      </div>
                  </CardContent>
                </Link>
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="py-2 text-center text-sm text-muted-foreground">
        Destaque {current} de {courses.length}
      </div>
    </div>


      <div className="w-full flex justify-center items-center" >
        <Search />
      </div>
      <section className="grid grid-cols-3 gap-6 justify-center items-center">

        

        {courses.map((course) => (
          <CardCourse key={course.id} {...course}/>
        ))}
        
      </section>
    </main>
  )
}