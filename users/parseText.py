import re  # regular expression
from textblob import TextBlob  # text analysis module

class TextClient(object):

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

    def get_tweets(self, query):
        '''
        Main function to fetch tweets and parse them.
        '''
        tweet = query
        try:
            parsed_tweet = {}
            # saving text of tweet
            parsed_tweet['text'] = tweet
            # saving sentiment of tweet
            parsed_tweet['sentiment'] = self.get_tweet_sentiment(
                tweet)
            # return parsed tweets
            return parsed_tweet

        except:
            # print error (if any)
            print("Error Occurred : ")
            return { "error": "error occurred" }


def parseText(query):

    api = TextClient()
    # calling function to get tweets

    tweet = api.get_tweets(query=query)

    return tweet