from typing import List
from fastapi import FastAPI,HTTPException, File, Response, UploadFile, requests
from scraperplaylist import get_video_links;
from fastapi.middleware.cors import CORSMiddleware
from playlist_downloader import download_complete_playlist

from playlist_downloader import download_all_videos
from playlist_downloader import download_video
from pydantic import BaseModel
from typing import List


from fastapi import FastAPI, HTTPException
from pytube import YouTube
from starlette.responses import StreamingResponse
import io



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

#scraps and get the video information   
@app.get("/api/get-videos/")
async def get_videos(url: str):
    video_info = get_video_links(url)
    return {"video_info": video_info}

#downloads complete playlist videos
@app.post("/api/download_playlist/")
async def download_playlist(request: PlaylistRequest):
    links = request.links
    await download_complete_playlist(links)
    return {"status": "Download started"}

#single video downloading
@app.get("/api/download_video/")
async def download_video_endpoint(link: str ):
    return await download_video(link)


@app.get("/api/download-all/")
async def download_on_chrome():
    return await download_all_videos();


@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}

