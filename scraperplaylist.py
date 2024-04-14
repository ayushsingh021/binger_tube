from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options

from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common import TimeoutException

#video download
from pytube import YouTube
# initialize a web driver instance to control a Chrome window
# in headless mode

# options = Options()
# # options.add_argument('--headless=new')

# driver = webdriver.Chrome(
#     service=ChromeService(ChromeDriverManager().install()),
#     options=options
# )



# url = input("Enter playlist link : ")
# # url = 'https://www.youtube.com/playlist?list=PLS025GDZpC8yg_enf30jPA-stzA4By7Qe'

# driver.get(url)


# #video download function
# # def Download(link):
# #     youtubeObject = YouTube(link)
# #     youtubeObject = youtubeObject.streams.get_highest_resolution()
# #     try:
# #         youtubeObject.download()
# #     except:
# #         print("An error has occurred")
# #     print("Download is completed successfully")


# links = [];
# try:
#     # Wait for elements to be present (increased timeout duration)
#     elems = WebDriverWait(driver, 30).until(EC.presence_of_all_elements_located((By.XPATH, "//a[contains(@class, 'yt-simple-endpoint') and contains(@class, 'ytd-playlist-video-renderer')]")))

#     # Print the found elements
#     for elem in elems:
#         href = elem.get_attribute('href')

#         if href:
#             links.append(href)
                    
# except TimeoutException:
#     print("Timed out waiting for elements to be located")


# # for link in links:
# #     if link:
# #         print("Download started of video : " + link)
# #         Download(link)
# #     else:
# #         print("Failed to download")


# driver.quit()



def get_video_links(url):
    options = Options()
    # options.add_argument('--headless=new')

    driver = webdriver.Chrome(
        service=ChromeService(ChromeDriverManager().install()),
        options=options
    )

    driver.get(url)

    links = []
    try:
        elems = WebDriverWait(driver, 30).until(EC.presence_of_all_elements_located((By.XPATH, "//a[contains(@class, 'yt-simple-endpoint') and contains(@class, 'ytd-playlist-video-renderer')]")))
        print(elems)
        for elem in elems:
            href = elem.get_attribute('href')
            if href:
                links.append(href)
                    
    except TimeoutException:
        print("Timed out waiting for elements to be located")

    driver.quit()
    
    return links

# url = input("Enter playlist link : ")
# video_links = get_video_links(url)
# for link in video_links:
#     print(link)