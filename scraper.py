from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options

from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common import TimeoutException

# initialize a web driver instance to control a Chrome window
# in headless mode
options = Options()
# options.add_argument('--headless=new')

driver = webdriver.Chrome(
    service=ChromeService(ChromeDriverManager().install()),
    options=options
)

# # the URL of the target page
# url = 'https://www.youtube.com/playlist?list=PLMfAHlb5o1xFNN0YqoqTTK2Lw7Jx5XECQ'

# the URL of the target page
# url = 'https://www.youtube.com/watch?v=kuDuJWvho7Q'
url = 'https://www.youtube.com/watch?v=AnPSaU6Zpjc'
#

# visit the target page in the controlled browser
driver.get(url)



# wait for YouTube to load the page data
WebDriverWait(driver, 15).until(
        EC.visibility_of_element_located((By.CSS_SELECTOR, 'h1.ytd-watch-metadata'))
)
# dictionary where to store the channel info
channel = {}

# scrape the channel info attributes
channel_element = driver \
    .find_element(By.ID, 'owner')

channel_url = channel_element \
              .find_element(By.CSS_SELECTOR, 'a.yt-simple-endpoint') \
              .get_attribute('href')
channel_name = channel_element \
              .find_element(By.ID, 'channel-name') \
              .text
channel_image = channel_element \
              .find_element(By.ID, 'img') \
              .get_attribute('src')
channel_subs = channel_element \
              .find_element(By.ID, 'owner-sub-count') \
              .text \
              .replace(' subscribers', '')

channel['url'] = channel_url
channel['name'] = channel_name
channel['image'] = channel_image
channel['subs'] = channel_subs

print(channel)
# close the browser and free up the resources
driver.quit()