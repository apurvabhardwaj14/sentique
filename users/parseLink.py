import re  # regular expression
from textblob import TextBlob  # text analysis module



def parseLink():

    returnObj = {'postweets': [], 'negtweets': []}
    # calling function to get tweets
    # tweets = api.get_tweets(query=query, count=count)

    # # picking positive tweets from tweets
    # ptweets = [tweet for tweet in tweets if tweet['sentiment'] == 'positive']
    # # percentage of positive tweets
    # print("Positive tweets percentage: {} %".format(
    #     100*len(ptweets)/len(tweets)))
    # returnObj['positive'] = 100*len(ptweets)/len(tweets)
    #  # picking negative tweets from tweets
    # ntweets = [tweet for tweet in tweets if tweet['sentiment'] == 'negative']
    #   # percentage of negative tweets
    # print("Negative tweets percentage: {} %".format(
    #     100*len(ntweets)/len(tweets)))
    # returnObj['negative'] = 100*len(ntweets)/len(tweets)
    #  # percentage of neutral tweets
    # print("Neutral tweets percentage: {} % ".format(
    #     100*(len(tweets) - (len(ntweets)+len(ptweets)))/len(tweets)))
    # returnObj['neutral'] = 100 * \
    #     (len(tweets) - (len(ntweets)+len(ptweets)))/len(tweets)

    # # printing first 5 positive tweets
    # print("\n\nPositive tweets:");
    # for tweet in ptweets[:10]:
    #     print(tweet['text'])
    #     returnObj['postweets'].append(tweet['text'])

    # # printing first 5 negative tweets
    # print("\n\nNegative tweets:")
    # for tweet in ntweets[:10]:
    #     print(tweet['text'])
    #     returnObj['negtweets'].append(tweet['text'])

    return returnObj