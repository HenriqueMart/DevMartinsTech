import { NextResponse } from "next/server";

import { getPlayListItems } from "@/data/services/youtubeService";

interface RouteParams {
  params: Promise<{
    playlistId: string;
  }>;
}

export async function GET(
  request: Request,
  { params }: RouteParams
) {
  try {
    const { playlistId } = await params;

    if (!playlistId) {
      return NextResponse.json(
        {
          error: "Playlist ID não informado.",
        },
        {
          status: 400,
        }
      );
    }

    const lessons = await getPlayListItems(playlistId);

    return NextResponse.json({
      data: lessons,
    });
  } catch (error) {
    console.error("Erro ao buscar aulas:", error);

    return NextResponse.json(
      {
        error: "Não foi possível carregar as aulas.",
      },
      {
        status: 500,
      }
    );
  }
}