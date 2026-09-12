'use client';

import CardCourse from "@/components/cardCourse";
import { Search } from "@/components/search";

import {useCourses} from "@/data/hooks/useCourses"

export default function Home (){

  const {courses, error, isLoading} = useCourses();

  return (
    <main className="flex flex-col gap-5 py-[50px]">
      <div className="w-full flex justify-center items-center" >
        <Search />
      </div>
      <section className="grid grid-cols-3 gap-6 justify-center items-center">

        {isLoading && (
          <p className="text-center">Carregando Cursos...</p>
        )}

        {courses.map((course) => (
          <CardCourse key={course.id} {...course}/>
        ))}
        
      </section>
    </main>
  )
}