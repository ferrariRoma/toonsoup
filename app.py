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
db = client.dbtoonsoup

@app.route('/', methods=["GET"])
def home():
    return render_template('index.html')

@app.route('/naver_webtoon', methods=["GET"])
def get_naver():
    return render_template('naver.html')

@app.route('/kakao_webtoon', methods=["GET"])
def get_kakao():
    return render_template('kakao.html')

@app.route('/ktoon_webtoon', methods=['GET'])
def get_ktoon():
    return render_template('ktoon.html')

@app.route('/kakao_webtoon/post', methods=["POST"])
def post_kakao():
    url_receive = request.form['give_url']
    # star_receive = request.form['give_star']
    # comment_receive = request.form['give_comment']

    # bs4 and requests
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
    data = requests.get(url_receive, headers=headers)
    soup = BeautifulSoup(data.text, 'html.parser')
    webtoons = soup.select_one('#root > div.jsx-3157985592.mainContents.mainContents_pc > div.css-1sna24c > div.css-1saqd06 > div')
    dates = soup.select_one('#root > div.jsx-3157985592.mainContents.mainContents_pc > div.css-1sna24c > ul')
    first_toon = {
        'title' : webtoons.select_one('a:nth-child(2) > li > div > div > div > img')['alt'],
        'image' : "https:"+webtoons.select_one('a:nth-child(2) > li > div > div > div > img')['data-src'],
        'date' : dates.select_one('li.css-wntfxn.e1201h8a0 > div').text
    }
    second_toon = {
        'title': webtoons.select_one('a:nth-child(3) > li > div > div > div > img')['alt'],
        'image': "https:" + webtoons.select_one('a:nth-child(3) > li > div > div > div > img')['data-src'],
        'date': dates.select_one('li.css-wntfxn.e1201h8a0 > div').text
    }
    third_toon = {
        'title': webtoons.select_one('a:nth-child(4) > li > div > div > div > img')['alt'],
        'image': "https:" + webtoons.select_one('a:nth-child(4) > li > div > div > div > img')['data-src'],
        'date': dates.select_one('li.css-wntfxn.e1201h8a0 > div').text
    }
    db.kakao.insert_one(first_toon)
    db.kakao.insert_one(second_toon)
    db.kakao.insert_one(third_toon)
    return jsonify({'msg': '등록 완료!'})

@app.route('/ktoon_comment/post', methods=['POST'])
def comment_ktoon():
    url_receive = request.form['url_give']
    star_receive = request.form['star_give']
    comment_receive = request.form['comment_give']

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
    data = requests.get(url_receive, headers=headers)

    soup = BeautifulSoup(data.text, 'html.parser')

    image = soup.select_one('meta[property="og:image"]')['content']
    title = soup.select_one('meta[property="og:title"]')['content']

    doc = {
        'url': url_receive,
        'image': image,
        'title': title,
        'star': star_receive,
        'comment': comment_receive
    }
    db.ktoon_comments.insert_one(doc)

    return jsonify({'msg': '등록 완료!'})

@app.route('/ktoon/recommend', methods=["GET"])
def post_ktoon():
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
    data = requests.get('https://www.myktoon.com/web/webtoon/works_list.kt', headers=headers)
    soup = BeautifulSoup(data.text, 'html.parser')


    first_webtoon = {
        'date' : soup.select_one('#container > section > div > article.col.selected > div > h4').text,
        'title' : soup.select_one('#container > section > div > article.col.selected > div > ul > li:nth-child(1) > a > div.info > strong').text,
        'image' : soup.select_one('#container > section > div > article.col.selected > div > ul > li:nth-child(1) > a > div.thumb > img')['src'],
        'url' : soup.select_one('#container > section > div > article.col.selected > div > ul > li:nth-child(1) > a')['href']
    }
    second_webtoon = {
        'date': soup.select_one('#container > section > div > article.col.selected > div > h4').text,
        'title': soup.select_one('#container > section > div > article.col.selected > div > ul > li:nth-child(2) > a > div.info > strong').text,
        'image': soup.select_one('#container > section > div > article.col.selected > div > ul > li:nth-child(2) > a > div.thumb > img')['src'],
        'url': soup.select_one('#container > section > div > article.col.selected > div > ul > li:nth-child(2) > a')['href']
    }
    third_webtoon = {
        'date': soup.select_one('#container > section > div > article.col.selected > div > h4').text,
        'title': soup.select_one('#container > section > div > article.col.selected > div > ul > li:nth-child(3) > a > div.info > strong').text,
        'image': soup.select_one('#container > section > div > article.col.selected > div > ul > li:nth-child(3) > a > div.thumb > img')['src'],
        'url': soup.select_one('#container > section > div > article.col.selected > div > ul > li:nth-child(3) > a')['href']
    }
    # container > section > div > article.col.selected > div > ul > li:nth-child(2) > a
    # container > section > div > article.col.selected > div > ul > li:nth-child(1) > a
    doc = [first_webtoon,second_webtoon,third_webtoon]

    # container > section > div > article.col.selected > div > h4 요일

    # container > section > div > article.col.selected > div > ul > li:nth-child(1) > a > div.thumb > img 섬네일

    # container > section > div > article.col.selected > div > ul > li:nth-child(1) > a > div.info > strong 제목
    return jsonify({'webtoons':doc})

@app.route('/ktoon_comment/get', methods=["GET"])
def comment_show_ktoon():
    comment_list = list(db.ktoon_comments.find({}, {'_id':False}))
    return jsonify({'comment':comment_list})

@app.route('/kakao_webtoon/get', methods=["GET"])
def kakao():
    webtoons = list(db.kakao.find({}, {'_id':False}))
    return jsonify({'webtoons':webtoons})

@app.route('/ktoon_webtoon/get', methods=["GET"])
def ktoon():
    webtoon_list = list(db.ktoon.find({}, {'_id':False}))
    return jsonify({'webtoons':webtoon_list})

if __name__ == '__main__':
    app.run('0.0.0.0', port=4000, debug=True)