
from fastapi import HTTPException, Query
from fastapi.responses import StreamingResponse
from pytube import YouTube
import os
import urllib.parse


from io import BytesIO




async def download_complete_playlist(links: list[str] = Query(...)):
    for link in links:
        if link:
            await download_video(link)
        else:
            print("Invalid link provided")
    return {"status": "Download completed"}


#Single Video Downlaoder function
async def download_video(URL: str):
    try:
        # Fetch the YouTube video
        yt = YouTube(URL)
        stream = yt.streams.get_highest_resolution()

        # Stream the video content into a buffer
        buffer = BytesIO()
        stream.stream_to_buffer(buffer)
        buffer.seek(0)  # Reset buffer position to the beginning

        # Properly encode the filename to handle special characters
        filename = f"{yt.title}.mp4"
        encoded_filename = urllib.parse.quote(filename)

        # Return the buffer content as a streaming response
        return StreamingResponse(
            buffer,
            media_type='video/mp4',
            headers={"Content-Disposition": f"attachment; filename*=UTF-8''{encoded_filename}"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error downloading video from {URL}: {e}")



#Personal use
# Function to download a single video
def download_video_local(link, save_path):
    try:
        yt = YouTube(link)
        stream = yt.streams.get_highest_resolution()
        if not os.path.exists(save_path):
            os.makedirs(save_path)
        stream.download(output_path=save_path)
        print(f"Downloaded: {yt.title}")
    except Exception as e:
        print(f"Error downloading {link}: {e}")

# Function to download complete playlist
def download_complete_playlist_local(links):
    home_directory = os.path.expanduser("~")
    save_path = os.path.join(home_directory, "Downloads", "bingetube_videos")
    for link in links:
        if link:
            download_video_local(link, save_path)
        else:
            print("Invalid link provided")