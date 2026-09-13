import Image from "next/image";

interface CourseAllVideoProps {
    position: number,
    title: string,
    thumbnail: string,
}

export default function CourseAside({position, title, thumbnail}:CourseAllVideoProps){
    return (
        <div className="w-full  flex justify-start items-center gap-5">

            <Image 
                src={thumbnail}
                alt="Imagens ilustrativa"
                loading="eager"
                width={50}
                height={50}
                className="w-[100px] sm:w-auto sm:h-auto rounded-lg"/>
            <p className="text-sm sm:text-lg">{position}. {title}</p>

        </div>
    )
}