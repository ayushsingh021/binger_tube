from typing import List
from fastapi import FastAPI

from scraperplaylist import get_video_links;


app = FastAPI()

@app.get("/api/get-videos/")
async def get_videos(url: str):
    video_links = get_video_links(url)
    return {"video_links": video_links}

# @app.get("/items/{item_id}")
# def read_item(item_id: int, q: str = None):
#     return {"item_id": item_id, "q": q}
