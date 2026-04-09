import {IOriginalResult, ISimpleResult, IUser} from '../type';
import {filterTweets} from './utils/filterTweets';
import {extractUsers} from './utils/extractUsers';
import {extractTweets} from './utils/extractTweets';
import {extractCursors} from './utils/extractCursors';
import {convertToSimpleUser} from './utils/convertToSimpleUser';
import {convertToSimpleTweet} from './utils/convertToSimpleTweet';
import {IXParserOptions} from "./IXParserOptions";


export class XParser {
  /**
   * 解析任意对象为ISimpleResult
   * @param data 任意对象
   * @param options 解析选项
   * @returns ISimpleResult
   */
  static parseSimple(data: any, options: IXParserOptions = {}): ISimpleResult {
    const result: ISimpleResult = {
      users: [],
      tweets: [],
      ads: [],
      exploreMore: [],
      recommendations: [],
      photos: [],
      videos: [],
      urls: []
    };

    // 提取用户和推文
    const users = extractUsers(data);
    const tweets = extractTweets(data);

    // 构建用户映射
    const userMap = new Map<string, IUser>();
    users.forEach(user => {
      userMap.set(user.rest_id, user);
    });

    // 转换用户并添加到结果
    result.users = users.map(user => convertToSimpleUser(user));

    // 提取推文
    if (tweets.length > 0) {
      // 转换所有推文
      const allTweets = tweets.map(tweet => {
        const userId = tweet.legacy?.user_id_str || tweet.user_id_str;
        const user = userMap.get(userId || '');
        return convertToSimpleTweet(tweet, user);
      });

      // 分类推文
      const { tweets: filteredTweets, ads, exploreMore, recommendations } = filterTweets(allTweets, tweets, options);

      result.tweets = filteredTweets;
      result.ads = ads;
      result.exploreMore = exploreMore;
      result.recommendations = recommendations;

      // 分类媒体推文
      result.photos = result.tweets.filter(tweet => tweet.photos && tweet.photos.length > 0);
      result.videos = result.tweets.filter(tweet => tweet.videos && tweet.videos.length > 0);
      result.urls = result.tweets.filter(tweet => tweet.urls && tweet.urls.length > 0);
    }

    // 提取游标
    extractCursors(data, result);

    return result;
  }

  /**
   * 解析任意对象为IOriginalResult
   * @param data 任意对象
   * @param options 解析选项
   * @returns IOriginalResult
   */
  static parseOriginal(data: any, options: IXParserOptions = {}): IOriginalResult {
    const result: IOriginalResult = {
      users: [],
      tweets: [],
      ads: [],
      exploreMore: [],
      recommendations: [],
      photos: [],
      videos: [],
      urls: []
    };

    // 提取用户和推文
    const users = extractUsers(data);
    const tweets = extractTweets(data);

    // 添加用户到结果
    result.users = users;
    if (tweets.length > 0) {
      // 分类推文
      const { tweets: filteredTweets, ads, exploreMore, recommendations } = filterTweets(tweets, tweets, options);

      result.tweets = filteredTweets;
      result.ads = ads;
      result.exploreMore = exploreMore;
      result.recommendations = recommendations;

      // 分类媒体推文
      result.photos = result.tweets.filter(tweet => {
        const legacy = tweet.legacy;
        return legacy && legacy.extended_entities && legacy.extended_entities.media &&
               legacy.extended_entities.media.some((media: any) => media.type === 'photo');
      });

      result.videos = result.tweets.filter(tweet => {
        const legacy = tweet.legacy;
        return legacy && legacy.extended_entities && legacy.extended_entities.media &&
               legacy.extended_entities.media.some((media: any) =>
                 media.type === 'video' || media.type === 'animated_gif');
      });

      result.urls = result.tweets.filter(tweet => {
        const legacy = tweet.legacy;
        return legacy && legacy.entities && legacy.entities.urls && legacy.entities.urls.length > 0;
      });
    }

    // 提取游标
    extractCursors(data, result);

    return result;
  }
}
