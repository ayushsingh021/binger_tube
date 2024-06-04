
from fastapi import HTTPException, Query, Response
from fastapi.responses import StreamingResponse
from pytube import YouTube
import os
import zipfile

import shutil
from io import BytesIO
import zipfile


async def download_complete_playlist(links: list[str] = Query(...)):
    for link in links:
        if link:
            await download_video(link)
        else:
            print("Invalid link provided")
    return {"status": "Download completed"}

#Single video Download
async def download_video(URL: str ):
    try:
        # Fetch the YouTube video
        yt = YouTube(URL)
        stream = yt.streams.get_highest_resolution()

        # Stream the video content into a buffer
        buffer = BytesIO()
        stream.stream_to_buffer(buffer)
        buffer.seek(0)  # Reset buffer position to the beginning

        # Return the buffer content as a streaming response
        return StreamingResponse(buffer, media_type='video/mp4', headers={"content-disposition": f"attachment; filename={yt.title}.mp4"})
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error downloading video from {URL}: {e}")




# async def download_all_videos():
#     """Download all video files in the video directory as a ZIP file"""
#     # Directory containing video files
#     VIDEO_DIR = "./temp/"
    
#     # List all files in the video directory
#     files = os.listdir(VIDEO_DIR)
    
#     # Check if the directory is empty
#     if not files:
#         raise HTTPException(404, detail="No video files found")
    
#     # Create a temporary buffer to store the ZIP file
#     buffer = BytesIO()
    
#     # Create a ZIP file
#     with zipfile.ZipFile(buffer, "w") as zipf:
#         for filename in files:
#             file_path = os.path.join(VIDEO_DIR, filename)
#             # Add each video file to the ZIP archive
#             zipf.write(file_path, filename)
#              # Delete the video file after adding it to the ZIP archive
#             os.remove(file_path)
    
#     # Reset the buffer position to the beginning
#     buffer.seek(0)
    
#     # Return the ZIP file as a streaming response
#     return StreamingResponse(buffer, media_type="application/octet-stream", headers={"Content-Disposition": "attachment; filename=videos.zip"})

