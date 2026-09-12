import CourseAside from "@/components/courseAside";
import Image from "next/image";

export default function Course (){
    return (
        <div className="min-h-[calc(100vh-4rem)] w-full flex">
            <aside className="flex flex-col  items-center py-5 gap-6 w-[300px] border-r">
                <h3 className="text-center font-bold text-muted-foreground">
                    Próximas Aulas
                </h3>
                <CourseAside />
                <span className="w-[200px] h-[1px]  bg-foreground/15"/>
                <CourseAside />
                <span className="w-[200px] h-[1px]  bg-foreground/15"/>
                <CourseAside />
                <span className="w-[200px] h-[1px]  bg-foreground/15"/>
                <CourseAside />
            </aside>
            <main className="flex flex-col py-5 items-center w-full gap-6">
                <div>
                     <Image 
                                    src="https://images.pexels.com/photos/1102797/pexels-photo-1102797.png"
                                    alt="Imagens ilustrativa"
                                    loading="eager"
                                    width={600}
                                    height={600}
                                    className="w-auto h-auto rounded-lg"/>
                </div>
                <div className="px-10">
                    <p className="font-light text-sm">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate dolor repudiandae quia quisquam, numquam recusandae deleniti voluptatum sapiente fugit, temporibus eveniet obcaecati cupiditate explicabo tenetur ab cumque beatae ullam eaque.</p>
                </div>
               
            </main>
            
        </div>
    )
}