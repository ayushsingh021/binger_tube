from typing import List
from fastapi import FastAPI,HTTPException, File, UploadFile
from scraperplaylist import get_video_links;
from fastapi.middleware.cors import CORSMiddleware
from playlist_downloader import download_complete_playlist
from playlist_downloader import single_video_downloader
from pydantic import BaseModel
from typing import List





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
    
@app.get("/api/get-videos/")
async def get_videos(url: str):
    video_info = get_video_links(url)
    return {"video_info": video_info}

@app.post("/api/download_playlist/")
async def download_playlist(request: PlaylistRequest):
    links = request.links
    download_complete_playlist(links)

@app.get("/api/download_single_video/")
async def download_single_video(link:str):
    single_video_downloader(link)


@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}
