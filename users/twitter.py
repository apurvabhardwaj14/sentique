import re  # regular expression
import tweepy  # Twitter API Module
# Authentication using twitter developer credentials
from tweepy.auth import OAuthHandler
from textblob import TextBlob  # text analysis module


class TwitterClient(object):
    '''
    Generic Twitter Class for sentiment analysis.
    '''

    def __init__(self):
        '''
        Class constructor or initialization method.
        '''
        # keys and tokens from the Twitter Dev Console
        consumer_key = 'PZHKE4rYOTpoj0poKrXTTjLDV'
        consumer_secret = 'JBbSOOv1AquQdLRJnbfX25u8UK9pJnDfUD31jy8Ska7YnKMcP4'
        access_token = '3315758604-WVboOqY7JnGWkfAjwL5QrKlabbGRBwvxx8JEBVx'
        access_token_secret = 'e1UvptN2kJD8GolDt1wk8O0M6x5uflkmxGPmJAkYgWzTJ'

        # attempt authentication
        try:
            # create OAuthHandler object
            self.auth = OAuthHandler(consumer_key, consumer_secret)
            # set access token and secret
            self.auth.set_access_token(access_token, access_token_secret)
            # create tweepy API object to fetch tweets
            self.api = tweepy.API(self.auth)
        except:
            print("Error: Authentication Failed")

    def clean_tweet(self, tweet):
        '''
        Utility function to clean tweet text by removing links, special characters
        using simple regex statements.
        '''
        return ' '.join(re.sub("(@[A-Za-z0-9]+)|([^0-9A-Za-z \t])|(\w+:\/\/\S+)", " ", tweet).split())

    def get_tweet_sentiment(self, tweet):
        '''
        Utility function to classify sentiment of passed tweet
        using textblob's sentiment method
        '''
        # create TextBlob object of passed tweet text
        analysis = TextBlob(self.clean_tweet(tweet))
        # set sentiment
        if analysis.sentiment.polarity > 0:
            return 'positive'
        elif analysis.sentiment.polarity == 0:
            return 'neutral'
        else:
            return 'negative'

    def get_tweets(self, query, count=500):
        '''
        Main function to fetch tweets and parse them.
        '''
        # empty list to store parsed tweets
        tweets = []

        try:
            # call twitter api to fetch tweets
            fetched_tweets = self.api.search(q=query, count=count)

            # print(fetched_tweets)

            # parsing tweets one by one
            for tweet in fetched_tweets:
                # empty dictionary to store required params of a tweet
                parsed_tweet = {}

                # saving text of tweet
                parsed_tweet['text'] = tweet.text
                # saving sentiment of tweet
                parsed_tweet['sentiment'] = self.get_tweet_sentiment(
                    tweet.text)

                # appending parsed tweet to tweets list
                if tweet.retweet_count > 0:
                    # if tweet has retweets, ensure that it is appended only once
                    if parsed_tweet not in tweets:
                        tweets.append(parsed_tweet)
                else:
                    tweets.append(parsed_tweet)

            # return parsed tweets
            return tweets

        except tweepy.TweepError as e:
            # print error (if any)
            print("Error : " + str(e))


def twitter(query, count):
    # creating object of TwitterClient Class
    returnObj = {'postweets': [], 'negtweets': []}
    if count == "" or count == 0:
        count = 500
    else:
        count = int(count)
    print(count)
    api = TwitterClient()
    # calling function to get tweets
    tweets = api.get_tweets(query=query, count=count)

    # picking positive tweets from tweets
    ptweets = [tweet for tweet in tweets if tweet['sentiment'] == 'positive']
    # percentage of positive tweets
    print("Positive tweets percentage: {} %".format(
        100*len(ptweets)/len(tweets)))
    returnObj['positive'] = 100*len(ptweets)/len(tweets)
     # picking negative tweets from tweets
    ntweets = [tweet for tweet in tweets if tweet['sentiment'] == 'negative']
      # percentage of negative tweets
    print("Negative tweets percentage: {} %".format(
        100*len(ntweets)/len(tweets)))
    returnObj['negative'] = 100*len(ntweets)/len(tweets)
     # percentage of neutral tweets
    print("Neutral tweets percentage: {} % ".format(
        100*(len(tweets) - (len(ntweets)+len(ptweets)))/len(tweets)))
    returnObj['neutral'] = 100 * \
        (len(tweets) - (len(ntweets)+len(ptweets)))/len(tweets)

    # printing first 5 positive tweets
    print("\n\nPositive tweets:");
    for tweet in ptweets[:10]:
        print(tweet['text'])
        returnObj['postweets'].append(tweet['text'])

    # printing first 5 negative tweets
    print("\n\nNegative tweets:")
    for tweet in ntweets[:10]:
        print(tweet['text'])
        returnObj['negtweets'].append(tweet['text'])

    return returnObj


