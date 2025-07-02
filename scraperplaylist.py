
from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
import time

def get_video_links(url):
    options = Options()
    options.add_argument('--headless=new')  # Faster headless mode
    options.add_argument('--disable-gpu')
    options.add_argument('--window-size=800,600')

    # Disable images (other than YouTube lazy-loaded ones)
    prefs = {
        "profile.managed_default_content_settings.images": 2,
        "profile.managed_default_content_settings.stylesheets": 2,
    }
    options.add_experimental_option("prefs", prefs)

    driver = webdriver.Chrome(
        service=ChromeService(ChromeDriverManager().install()),
        options=options
    )

    driver.get(url)

    # Scroll to load all videos (lazy loading)
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    time.sleep(2)  # Allow lazy content to load

    video_info = []
    try:
        xpath_links = "//a[contains(@class, 'yt-simple-endpoint') and contains(@class, 'ytd-playlist-video-renderer')]"
        xpath_thumbs = "//img[contains(@class, 'yt-core-image')]"

        elems1 = WebDriverWait(driver, 10).until(
            EC.presence_of_all_elements_located((By.XPATH, xpath_links))
        )
        elems2 = WebDriverWait(driver, 10).until(
            EC.presence_of_all_elements_located((By.XPATH, xpath_thumbs))
        )

        for index, elem in enumerate(elems1):
            href = elem.get_attribute('href')
            title = elem.get_attribute('title')
            if href and title:
                src = elems2[index].get_attribute('src') if index < len(elems2) else None
                video_info.append({
                    "title": title,
                    "videoLink": href,
                    "src": src
                })

    except Exception as e:
        print(f"Error fetching videos: {e}")

    driver.quit()
    return video_info
