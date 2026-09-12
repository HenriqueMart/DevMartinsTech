import { NextResponse } from "next/server";

import { getPlaylist } from "@/data/services/youtubeService";


export async function GET(){
  try{
    const courses = await getPlaylist();

    return NextResponse.json({
      data: courses,
    });
  } catch (error){
    console.error("Erro ao buscar cursos:", error);

    return NextResponse.json(
      {
        error: "Não foi possível carregar os cursos.",
      },
      {
        status: 500,
      }
    )
  }
}