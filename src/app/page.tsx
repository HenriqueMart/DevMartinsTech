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
//loader
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
//pagination
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

//hook personalizado
import {useCourses} from "@/data/hooks/useCourses"

//Propriedade do Next e React
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FileSearchIcon, MagnifyingGlassIcon } from "@phosphor-icons/react";
import { SealCheckIcon } from "@phosphor-icons/react/dist/ssr";

export default function Home (){

  //Variável do Slides
  const [apiCarousel, setApiCorousel] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  //Variável AutoPlay
  const autoPlayPlugin = Autoplay({delay: 8000, stopOnInteraction: true})
  //retorno do Hook Personalizado
  const {courses, error, isLoading} = useCourses();
  //Search
  const [search, setSearch] = useState("");
  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemforPage = 3;
  //Cálculo para Busca por index
  const indexOfLastItem = currentPage * itemforPage
  const indexOfFirstItem = indexOfLastItem - itemforPage; 
  //Realizando a filtragem utilizando o UseMemo de forma otimizado para lista grande
  const filteredCourses = React.useMemo(() => {
    if(!courses) return [];

    if(search.trim() === ""){
      return courses;
    }

    return courses.filter((item) => item.title.toLowerCase().includes(search.toLocaleLowerCase()))
  }, [search, courses])
  
  //Aplicando paginação no cursos filtrados
  const displayedCourse = filteredCourses.slice(indexOfFirstItem, indexOfLastItem)
  
  //Realizando a contagem de página por conteúdo
  const totalPages = Math.ceil(filteredCourses.length / itemforPage);

  //Efeitos colaterais com base na mudança na Status da ApiCarousel
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
 
    //Evento de listening 
    apiCarousel.on("select", onSelect);
    apiCarousel.on("reInit", onSelect);
  }, [apiCarousel])

  //Carregamento da Página
  if(isLoading){
    return (
    <div className="w-full min-h-[calc(100vh-4rem)] flex justify-center items-center">
      <Button disabled size="sm" variant="ghost">
        <Spinner data-icon="inline-start" />
          Carregando cursos
      </Button>
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
  
  //recebimento do texto de Pesquisa Search
  function handleSearch(value: string){
    setSearch(value);
    setCurrentPage(1);
    
  }

  return (
    <main className=" w-full flex flex-col justify-center items-center gap-5 sm:py-[25px]">
      <div className="max-w-[1440px] flex flex-col gap-6">
        <div >
          <Carousel 
            //Dados do Slides
            setApi={setApiCorousel} 
            //AutoPlay
            plugins={[autoPlayPlugin]} 
            className="max-w-[1200px] p-0">
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

                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/90" />
                        
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


        <div className="w-full flex justify-end items-center" >
          <Search onSearch={handleSearch}/>
        </div>
        <div className="w-full flex flex-col gap-3">
          <h2 className="text-2xl font-bold">Todos os cursos</h2>
          <span className="w-full h-[1px] border " />
        </div>  
        {displayedCourse.length > 0 ? (
          <div className="flex flex-col gap-6">
            <section className="grid grid-cols-3 gap-6 justify-center items-center">
              {displayedCourse.map((course) => (
                
                  
                  <CardCourse key={course.id} {...course}/>
                  
                
            ))}
            </section>
            {totalPages >= 1 && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      
                      onClick={(e) => {
                        e.preventDefault(); //Não execuntado recurso padrão do navegador
                        setCurrentPage(prev => Math.max(prev - 1, 1))
                      }}
                      text="Página Anterior"/>
                    </PaginationItem>

                    {Array.from({length: totalPages}, (_, index) => {
                      const pageNumber = index + 1;
                      return (
                        <PaginationItem key={pageNumber}>
                          <PaginationLink isActive={currentPage === pageNumber} onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(pageNumber)
                          }}>
                            {pageNumber}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    })}

                      <PaginationItem>
                        <PaginationNext onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(prev => Math.min(prev + 1, totalPages))
                        }}
                          text="Próxima Página"/>
                      </PaginationItem>
                  </PaginationContent>
              </Pagination>
            )}
            
            </div>
        ):(
          <div className="h-[200px] sm:h-[400px] flex flex-col gap-2 justify-center items-center w-full">
            <MagnifyingGlassIcon  className="size-16" />
            <p className="text-2xl font-bold ">Curso  {search} não encontrado!</p>
            
          </div>
        )}
      </div>
    </main>
  )
}