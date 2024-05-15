from transformers import pipeline

from fastapi import FastAPI, Body
from mangum import Mangum
from typing import List
from pydantic import BaseModel

from datetime import datetime

from tweety import Twitter
import emoji

app = FastAPI()

classifier = pipeline(
    task="text-classification", model="SamLowe/roberta-base-go_emotions", top_k=None
)

classifier_2 = pipeline(
    task="text-classification", model="distilbert-base-uncased-finetuned-sst-2-english"
)


class Sentences(BaseModel):
    sentences: List[str]


def convert_emojis_to_text(text):
    return emoji.demojize(text)


emoji_library = {
    "😢": "sad",
    "😂": "happy",
    "😡": "angry",
    "😊": "happy",
    "😒": "unamused",
    "😱": "surprised",
    "😔": "sad",
    "😓": "worried",
    "😁": "grinning",
    "😅": "relieved",
    "😎": "cool",
    "😍": "loving",
    "😤": "frustrated",
    "😜": "playful",
    "😠": "angry",
    "😇": "innocent",
    "😨": "fearful",
    "😞": "disappointed",
    "😷": "sick",
    "😈": "mischievous",
    "😏": "smirking",
    "😌": "relieved",
    "😰": "anxious",
    "😖": "confused",
    "😭": "crying",
    "😵": "dizzy",
    "😳": "embarrassed",
    "😋": "satisfied",
    "😆": "laughing",
    "😩": "weary",
    "😐": "neutral",
    "😕": "confused",
    "😲": "astonished",
    "😑": "expressionless",
    "😧": "anguished",
    "😦": "frowning",
    "😪": "sleepy",
    "😯": "surprised",
    "😴": "sleeping",
    "😬": "grimacing",
    "😟": "worried",
    "😣": "persevering",
    "😮": "open-mouthed",
    "😫": "tired",
    "😙": "kissing",
    "😗": "kissing",
    "😘": "kissing",
    "😚": "kissing",
    "😽": "kissing",
    "😻": "loving",
    "😹": "joyful",
    "😿": "sad",
    "😾": "pouting",
    "🙀": "weary",
    "😸": "grinning",
    "😺": "grinning",
    "😼": "mischievous",
    "😃": "happy",
    "😄": "happy",
    "😅": "happy",
    "😆": "happy",
    "😇": "happy",
    "😈": "happy",
    "😉": "happy",
    "😊": "happy",
    "😋": "happy",
    "😌": "happy",
    "😍": "happy",
    "😎": "happy",
    "😏": "happy",
    "😐": "neutral",
    "😑": "neutral",
    "😒": "unamused",
    "😓": "sad",
    "😔": "sad",
    "😕": "confused",
    "😖": "confused",
    "😗": "neutral",
    "😘": "happy",
    "😙": "happy",
    "😚": "happy",
    "😛": "playful",
    "😜": "playful",
    "😝": "playful",
    "😞": "sad",
    "😟": "worried",
    "😠": "angry",
    "😡": "angry",
    "😢": "sad",
    "😣": "persevering",
    "😤": "frustrated",
    "😥": "sad",
    "😦": "frowning",
    "😧": "anguished",
    "😨": "fearful",
    "😩": "weary",
    "😪": "sleepy",
    "😫": "tired",
    "😬": "grimacing",
    "😭": "crying",
    "😮": "surprised",
    "😯": "surprised",
    "😰": "worried",
    "😱": "surprised",
    "😲": "surprised",
    "😳": "embarrassed",
    "😴": "sleepy",
    "😵": "dizzy",
    "😶": "speechless",
    "😷": "sick",
    "😸": "grinning",
    "😹": "joyful",
    "😺": "grinning",
    "😻": "loving",
    "😼": "mischievous",
    "😽": "kissing",
    "😾": "pouting",
    "😿": "sad",
    "🙀": "weary",
    "🙂": "happy",
    "🙁": "sad",
    "🙃": "playful",
    "🙄": "unamused",
    "🙅": "no",
    "🙆": "ok",
    "🙇": "bowing",
    "🙈": "no-see",
    "🙉": "no-hear",
    "🙊": "no-speak",
    "🙋": "raising_hand",
    "🙌": "celebrating",
    "🙍": "frowning",
    "🙎": "pouting",
    "🙏": "praying",
    "💔": "heart-broken",
}


@app.get("/")
async def hello():
    return {"message": "Hello from deep purple webscraper and AI"}


@app.post("/predict")
async def predict(sentences: Sentences):

    sentences_without_emojis = []
    for sentence in sentences.sentences:
        for emoji, emotion in emoji_library.items():
            sentence = sentence.replace(emoji, emotion + " ")
        sentences_without_emojis.append(sentence)

    model_outputs = classifier(sentences_without_emojis)
    model_outputs_2 = classifier_2(sentences_without_emojis)
    result = []
    print(sentences_without_emojis)
    for i, output in enumerate(model_outputs):
        text = sentences.sentences[i]
        emotions_list = [
            emotion["label"] for emotion in output if emotion["score"] >= 0.2
        ]
        emotions = emotions_list[0] if emotions_list else None

        sentiment = model_outputs_2[i].get("label")
        result.append({"text": text, "emotions": emotions, "sentiment": sentiment})

    return result


@app.get("/tweets/{username}")
async def get_tweets(username: str):
    user_tweets = {}

    app = Twitter("session")
    app.sign_in("edwardphyoo", "35571559")
    target_username = username

    user_info = app.get_user_info(target_username)
    all_tweets = app.get_tweets(target_username, pages=1)

    user_tweets["name"] = user_info.name
    user_tweets["username"] = user_info.username
    user_tweets["tweets"] = []
    for tweet in all_tweets:
        try:
            date = tweet.created_on.strftime("%Y/%m/%d")
            user_tweet = {
                "tweet-id": tweet.id,
                "tweet": tweet.text,
                "date": date,
                "likes": tweet.likes,
                "views": tweet.views,
                "reply_count": tweet.reply_counts,
                "replies": [],
            }
            stop = False
            for thread in tweet.get_comments(pages=1, wait_time=2):
                if stop:
                    break
                for reply in thread.tweets:
                    user_comment = {
                        "author": reply.author.username,
                        "comment": reply.text,
                    }
                    user_tweet.get("replies").append(user_comment)

                    if len(user_tweet.get("replies")) >= 2:
                        stop = True
                        break
            user_tweets.get("tweets").append(user_tweet)
        except Exception as e:
            print(f"An error occurred: {e}")
            continue

    return user_tweets


@app.get("/getUserInfo/{username}")
async def get_user_info(username: str):
    app = Twitter("session")
    app.sign_in("edwardphyoo", "35571559")
    user_info = app.get_user_info(username)

    return user_info
