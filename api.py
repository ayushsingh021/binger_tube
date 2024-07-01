from typing import List
from fastapi import FastAPI,HTTPException
from scraperplaylist import get_video_links;
from fastapi.middleware.cors import CORSMiddleware


# from playlist_downloader import download_all_videos
from playlist_downloader import download_video

#personal use
from playlist_downloader import download_complete_playlist_local 

from pydantic import BaseModel
from typing import List



from pytube import YouTube
from starlette.responses import StreamingResponse


from fastapi.responses import StreamingResponse
from pytube import YouTube
from io import BytesIO
import zipfile
from pydantic import BaseModel
import urllib.parse


app = FastAPI()

# Set up CORS middleware
app.add_middleware(
    CORSMiddleware,
    # allow_origins=["http://localhost:5173"],  # Update this with your frontend's origin
    allow_origins=["*"],  # Allow all origins, you may want to restrict this in production
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


class PlaylistRequest(BaseModel):
    links: List[str]

class VideoLinksRequest(BaseModel):
    links: list[str]
#scraps and get the video information   
@app.get("/api/get-videos/")
async def get_videos(url: str):
    video_info = get_video_links(url)
    return {"video_info": video_info}

#helper functions for complete playlist downloader
def download_video_to_buffer(URL: str) -> BytesIO:
    """Downloads a YouTube video to a buffer and returns the buffer."""
    yt = YouTube(URL)
    stream = yt.streams.get_highest_resolution()
    buffer = BytesIO()
    stream.stream_to_buffer(buffer)
    buffer.seek(0)  # Reset buffer position to the beginning
    return buffer, yt.title

#downloads complete playlist videos
@app.post("/api/download_playlist/")
async def download_playlist(request: VideoLinksRequest):
    try:
        video_links = request.links
        zip_buffer = BytesIO()

        # Create a ZIP file in memory
        with zipfile.ZipFile(zip_buffer, "w", zipfile.ZIP_DEFLATED) as zipf:
            for URL in video_links:
                buffer, title = download_video_to_buffer(URL)
                filename = f"{title}.mp4"
                encoded_filename = urllib.parse.quote(filename)
                zipf.writestr(encoded_filename, buffer.getvalue())

        zip_buffer.seek(0)  # Reset buffer position to the beginning

        # Return the ZIP file as a streaming response
        return StreamingResponse(
            
            zip_buffer,
            media_type="application/zip",
            headers={"Content-Disposition": "attachment; filename=videos.zip"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error downloading videos: {e}")


#single video downloading
@app.get("/api/download_video/")
async def download_video_endpoint(link: str ):
    return await download_video(link)




#local personal use
@app.post("/api/download_playlist_local/")
async def download_playlist_local(request: PlaylistRequest):
    links = request.links
    download_complete_playlist_local(links)

@app.get("/api/test")
async def test():
        return "The testing is successful"

