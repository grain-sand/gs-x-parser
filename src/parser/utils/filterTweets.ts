/**
 * 过滤推文的工具函数
 */
import {IdPrefixes, ISimpleTweet, ITweet} from '../../type';
import {IXParserOptions} from "../IXParserOptions";

/**
 * 过滤推文
 * @param convertedTweets 转换后的推文数组
 * @param originalTweets 原始推文数组
 * @param options 解析选项
 * @returns 过滤后的推文及分类
 */
export function filterTweets<T extends ISimpleTweet | ITweet>(convertedTweets: T[], originalTweets: ITweet[], options: IXParserOptions): {
  tweets: T[];
  ads: T[];
  exploreMore: T[];
  recommendations: T[];
} {
  const tweets: T[] = [];
  const ads: T[] = [];
  const exploreMore: T[] = [];
  const recommendations: T[] = [];

  convertedTweets.forEach((tweet, index) => {
    const originalTweet = originalTweets[index];
    const restId = originalTweet?.rest_id || '';
    const entryId = (originalTweet as any)?.entryId || '';

    // 判断推文类型
    if (restId.startsWith(IdPrefixes.PromotedTweet) || entryId.startsWith(IdPrefixes.PromotedTweet)) {
      // 推广推文视为广告
      ads.push(tweet);
      if (options.includeAds) {
        tweets.push(tweet);
      }
    } else if (restId.includes('explore') || entryId.includes('tweetdetailrelatedtweets')) {
      // 探索更多内容，包括相关推文
      exploreMore.push(tweet);
      if (options.includeExploreMore) {
        tweets.push(tweet);
      }
    } else if (restId.includes('recommendation') || restId.includes('suggestion') || entryId.includes('pinned-tweets')) {
      // 推荐推文
      recommendations.push(tweet);
      if (options.includeRecommendations) {
        tweets.push(tweet);
      }
    } else {
      // 正常推文
      tweets.push(tweet);
    }
  });

  return { tweets, ads, exploreMore, recommendations };
}
