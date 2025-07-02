from typing import List
from fastapi import FastAPI
from scraperplaylist import get_video_links;
from fastapi.middleware.cors import CORSMiddleware
# from playlist_downloader import download_all_videos
from playlist_downloader import download_video
from playlist_downloader import download_playlist

from pydantic import BaseModel
from typing import List
from fastapi import FastAPI
from pydantic import BaseModel



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

#scraps and get the video information  -- OK  
@app.get("/api/get-videos/")
async def get_videos(url: str):
    video_info = get_video_links(url)
    return {"video_info": video_info}


# downlaod complete Playlist -- ok
@app.get("/api/download_playlist/")
async def download_youtube_playlist(link: str):
    return await download_playlist(link)


#single video downloading --working
@app.get("/api/download_video/")
async def download_youtube_video(link: str):
    return await download_video(link)




# TestCode
# from pytubefix import YouTube
# @app.get("/api/download_playlist_test/")
# async def Download(link: str):
#     try:
#         yt = YouTube(link)
#         stream = yt.streams.get_highest_resolution()
#         print(f"Downloading: {yt.title}")

#         stream.download()
#         print("Download completed successfully")

#     except Exception as e:
#         print(f"An error occurred: {e}") 
    







#local personal use
@app.post("/api/download_playlist_local/")
async def download_playlist_local(request: PlaylistRequest):
    links = request.links
    download_complete_playlist_local(links)

@app.get("/api/test")
async def test():
        return "The testing is successful"

