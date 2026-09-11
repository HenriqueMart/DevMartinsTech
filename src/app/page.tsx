import CardCourse from "@/components/cardCourse";
import { Search } from "@/components/search";


export default function Home (){
  return (
    <main className="flex flex-col gap-5 py-[50px]">
      <div className="w-full flex justify-center items-center" >
        <Search />
      </div>
      <section>
        <CardCourse />
      </section>
    </main>
  )
}