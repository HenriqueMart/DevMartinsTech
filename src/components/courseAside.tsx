import Image from "next/image";

interface CourseAllVideoProps {
    position: number,
    title: string,
    thumbnail: string,
}

export default function CourseAside({position, title, thumbnail}:CourseAllVideoProps){
    return (
        <div className="flex justify-center items-center gap-3">

        <Image 
            src={thumbnail}
            alt="Imagens ilustrativa"
            loading="eager"
            width={50}
            height={50}
            className="w-auto h-auto rounded-lg"/>
            <p>{position}. {title}</p>

        </div>
    )
}