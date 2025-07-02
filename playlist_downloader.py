from fastapi import HTTPException
from fastapi.responses import StreamingResponse
from pytubefix import YouTube , Playlist
import urllib.parse
from io import BytesIO
from starlette.responses import StreamingResponse
from zipfile import ZipFile
import re




async def download_playlist(link:str):
    try:
        playlist = Playlist(link)
        if not playlist.video_urls:
            raise HTTPException(status_code=400, detail="No videos found in playlist")

        zip_buffer = BytesIO()
        with ZipFile(zip_buffer, "w") as zip_file:
            for url in playlist.video_urls:
                try:
                    yt = YouTube(url)
                    stream = yt.streams.get_highest_resolution()

                    video_buffer = BytesIO()
                    stream.stream_to_buffer(video_buffer)
                    video_buffer.seek(0)

                    # Sanitize filename
                    filename = re.sub(r'[\\/*?:"<>|]', "_", yt.title) + ".mp4"

                    # Write to zip
                    zip_file.writestr(filename, video_buffer.read())
                    print(f"Added: {filename}")

                except Exception as e:
                    print(f"Skipping video due to error: {e}")

        zip_buffer.seek(0)
        zip_filename = "youtube_playlist.zip"
        encoded_filename = urllib.parse.quote(zip_filename)

        return StreamingResponse(
            zip_buffer,
            media_type="application/zip",
            headers={
                "Content-Disposition": f"attachment; filename*=UTF-8''{encoded_filename}"
            }
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Download error: {str(e)}")

# working single video downlaoder function with updated pytubefix    
async def download_video(link: str):
    try:
        yt = YouTube(link)
        stream = yt.streams.get_highest_resolution()

        # Stream video to in-memory buffer
        buffer = BytesIO()
        stream.stream_to_buffer(buffer)
        buffer.seek(0)

        # Sanitize and encode filename
        filename = re.sub(r'[\\/*?:"<>|]', "_", yt.title) + ".mp4"
        encoded_filename = urllib.parse.quote(filename)

        # Stream the buffer with correct headers
        return StreamingResponse(
            buffer,
            media_type="video/mp4",
            headers={
                "Content-Disposition": f"attachment; filename*=UTF-8''{encoded_filename}"
            }
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Download error: {str(e)}")