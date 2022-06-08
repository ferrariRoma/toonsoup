from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
from dotenv import load_dotenv
import os
import requests
from bs4 import BeautifulSoup

# Flask
app = Flask(__name__)
# .env
load_dotenv()
ID = os.environ.get('DB_ID')
PW = os.environ.get('DB_PW')
# DB
client = MongoClient("mongodb+srv://"+ID+":"+PW+"@cluster0.ye3qx.mongodb.net/?retryWrites=true&w=majority")
db = client.dbsparta

@app.route('/kakao_webtoon', methods=["POST"])
def post_kakao():
    # bs4 and requests
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
    data = requests.get('https://page.kakao.com/main?categoryUid=10&subCategoryUid=1002', headers=headers)
    soup = BeautifulSoup(data.text, 'html.parser')
    # 시작
    webtoons = soup.select_one('#root > div.jsx-3157985592.mainContents.mainContents_pc > div.css-1sna24c > div.css-1saqd06 > div > a:nth-child(1)')
    print(webtoons)
    return render_template('index.html')

@app.route('/kakao_webtoon', methods=["GET"])
def get_kakao():
    return render_template('index.html')