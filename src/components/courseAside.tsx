import Image from "next/image";
import Link from "next/link";

export default function CourseAside(){
    return (
        <div className="flex justify-center items-center">
            <Link href="/" className="flex gap-4 justify-center items-center">
                <Image 
                    src="https://images.pexels.com/photos/1102797/pexels-photo-1102797.png"
                    alt="Imagens ilustrativa"
                    loading="eager"
                    width={50}
                    height={50}
                    className="w-auto h-auto rounded-lg"/>
                    <p>Aula 2</p>
            </Link>
        </div>
    )
}