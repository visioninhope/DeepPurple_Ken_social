from flask import Flask, jsonify, request
from tweety import Twitter

app = Flask(__name__)


@app.route("/tweets/<username>", methods=["GET"])
def get_tweets(username):
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
            user_tweet = {
                "tweet-id": tweet.id,
                "tweet": tweet.text,
                "date": tweet.created_on,
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

    return jsonify(user_tweets), 200


if __name__ == "__main__":
    app.run(debug=True)
