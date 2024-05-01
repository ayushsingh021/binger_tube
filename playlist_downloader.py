# from pytube import YouTube

# # video download function
# def Download(link):
#     youtubeObject = YouTube(link)
#     youtubeObject = youtubeObject.streams.get_highest_resolution()
#     try:
#         youtubeObject.download()
#     except:
#         print("An error has occurred")
#     print("Download is completed successfully")

# def download_complete_playlist(links):
#     for link in links:
#         if link:
#             print("Download started of video : " + link)
#             Download(link)
#         else:
#             print("Failed to download")



from pytube import YouTube
import os

# Function to download a single video
def download_video(link, save_path):
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
def download_complete_playlist(links):
    home_directory = os.path.expanduser("~")
    save_path = os.path.join(home_directory, "Downloads", "bingetube_videos")
    for link in links:
        if link:
            download_video(link, save_path)
        else:
            print("Invalid link provided")

def single_video_downloader(link):
    home_directory = os.path.expanduser("~")
    save_path = os.path.join(home_directory, "Downloads", "bingetube_videos")
    
    if link:
        download_video(link, save_path)
    else:
        print("Invalid link provided")

