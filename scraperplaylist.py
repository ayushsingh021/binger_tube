from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
import logging


#  functions  --- USEFUL ONE --
def get_video_links(url):
    options = Options()
    # options.add_argument('--headless=new')
  
    # options.add_argument('--headless')
    # options.add_argument('--disable-gpu')
    # options.add_argument('--no-sandbox')

    driver = webdriver.Chrome(
        service=ChromeService(ChromeDriverManager().install()),
        options=options
    )

    driver.get(url)

    video_info = []
    try:
        xpath_expression1 = "//a[contains(@class, 'yt-simple-endpoint') and contains(@class, 'ytd-playlist-video-renderer')]"
        xpath_expression2 = "//img[contains(@class, 'yt-core-image')]"

        elems1 = WebDriverWait(driver, 30).until(EC.presence_of_all_elements_located((By.XPATH, xpath_expression1))) #title and links
        elems2 = WebDriverWait(driver, 30).until(EC.presence_of_all_elements_located((By.XPATH, xpath_expression2))) #thumbnail

        # print(elems)
        for index, elem in enumerate(elems1):
            href = elem.get_attribute('href')
            title = elem.get_attribute('title')
            if href and title:
                src = elems2[index].get_attribute('src')
                video_info.append({"title": title, "videoLink": href, "src": src})
            
    except TimeoutException:
        print("Timed out waiting for elements to be located")

    driver.quit()
    
    return video_info


#work in progress  -- building up on this
# def get_video_links(url):

#     logging.basicConfig(level=logging.INFO)
#     logger = logging.getLogger(__name__)
    
#     options = Options()
#     options.add_argument('--headless')
#     options.add_argument('--disable-gpu')
#     options.add_argument('--no-sandbox')

#     chrome_driver_version = "73.0.3683.20" 
    
#     driver = webdriver.Chrome(
#         service=ChromeService(ChromeDriverManager(version=chrome_driver_version).install()),
#         options=options
#     )

#     driver.get(url)

#     video_info = []
#     try:
#       
#         xpath_expression1 = "//a[contains(@class, 'yt-simple-endpoint') and contains(@class, 'ytd-playlist-video-renderer')]"
#         xpath_expression2 = "//img[contains(@class, 'yt-core-image')]"

#         WebDriverWait(driver, 30).until(EC.presence_of_all_elements_located((By.XPATH, xpath_expression1))) # title and links
#         WebDriverWait(driver, 30).until(EC.presence_of_all_elements_located((By.XPATH, xpath_expression2))) # thumbnails

#         # Get the HTML of the page
#         html = driver.page_source
#         logger.info("Successfully retrieved page source")

#         # Parse the HTML with BeautifulSoup
#         soup = BeautifulSoup(html, 'html.parser')

#         # Find the video elements
#         video_elements = soup.select("a.yt-simple-endpoint.ytd-playlist-video-renderer")
#         thumbnail_elements = soup.select("img.yt-core-image")

#         for index, elem in enumerate(video_elements):
#             href = elem.get('href')
#             title = elem.get('title')
#             if href and title:
#                 src = thumbnail_elements[index].get('src')
#                 video_info.append({"title": title, "videoLink": href, "src": src})
#                 logger.info(f"Found video: {title}")

#     except TimeoutException:
#         logger.error("Timed out waiting for elements to be located")

#     finally:
#         driver.quit()
    
#     return video_info;
