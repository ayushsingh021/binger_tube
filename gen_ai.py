import pathlib
import textwrap
import os
import google.generativeai as genai


GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')
genai.configure(api_key=GOOGLE_API_KEY)



model = genai.GenerativeModel('gemini-1.5-flash')

# prompt = "Create a list of five best youtube channel on the topic DSA formatted as title of that channel and link of that channel. Each video should be given as object of the array of size five where each object contains channel title and channel link,These videos are for an course and video suggesting platforms,  and should be suitable for a diverse audience specially for india and must be available on youtube. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured correctly with correct links of channel"
prompt = "Give 5 top shoes of any type with links from amazon to buy them"
response = model.generate_content(prompt)
print(response.text)