export const runtime = "nodejs"; // ✅ important!
import { authOptions } from "@/app/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import ytdl from "@distube/ytdl-core";



export async function POST(req: NextRequest) {
  // 🔐 Check user session
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { message: "You are not logged in" },
      { status: 400 }
    );
  }

  try {
    // 📥 Extract YouTube URL from request body
    const { url } = await req.json();

    // ⚠️ Validate URL
    if (!ytdl.validateURL(url)) {
      return NextResponse.json(
        { error: "Invalid YouTube URL" },
        { status: 400 }
      );
    }

    // 🧠 Get video information
    const info = await ytdl.getInfo(url);

    // 🎵 Pick the highest quality audio format
    const audioFormat = ytdl.chooseFormat(info.formats, {
      quality: "highestaudio",
    });

    console.log("✅ Extracted audio URL:", audioFormat.url);

    // 🚀 Return the signed GoogleVideo audio URL and title
    return NextResponse.json({
      streamUrl: audioFormat.url,
      title: info.videoDetails.title,
    });
  } catch (error) {
    console.error("❌ Audio extraction error:", error);
    return NextResponse.json(
      { error: "Failed to extract audio" },
      { status: 500 }
    );
  }
}



export async function GET(req: NextRequest) {
  const session= await getServerSession(authOptions);
  if(!session){
    return NextResponse.json({
      message:"you are not authenticated"
    },{
      status:400
    })
  }
  try {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get("url");

    console.log("Extract request for:", url);

    if (!url || !ytdl.validateURL(url)) {
      return new Response("Invalid YouTube URL", { status: 400 });
    }
    const cleanUrl=url.split("&")[0];
    const stream = ytdl(cleanUrl, {
       filter: "audioonly",
      quality: "lowestaudio",
      highWaterMark: 1 << 25,
      requestOptions: {
        headers: {
          // ✅ Add headers to pretend like a normal browser
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36',
          'Accept-Language': 'en-US,en;q=0.9',
        },
      },
    });
      console.log("the stream is ")
      console.log(stream)
    return new Response(stream as any, {
      headers: {
        "Content-Type": "audio/webm",
        "Cache-Control": "no-cache",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err) {
    console.error("Stream error:", err);
    return new Response("Failed to stream audio", { status: 500 });
  }
}

