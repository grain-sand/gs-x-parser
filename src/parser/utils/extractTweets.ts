import { ITweet } from '../../type';

/**
 * 从数据中提取推文
 * @param data 任意对象
 * @returns ITweet数组
 */
export function extractTweets(data: any): ITweet[] {
  const tweets: ITweet[] = [];
  const tweetIds = new Set<string>();

  // 处理 globalObjects.tweets 结构
  if (data?.globalObjects?.tweets) {
    Object.values(data.globalObjects.tweets).forEach((tweet: any) => {
      if (tweet && tweet.id_str && !tweetIds.has(tweet.id_str)) {
        // 添加 __typename 字段以保持一致性
        tweet.__typename = 'Tweet';
        tweet.rest_id = tweet.id_str;
        tweetIds.add(tweet.id_str);
        tweets.push(tweet);
      }
    });
  }

  // 递归搜索推文
  const searchTweets = (obj: any, entryId?: string, clientEventInfo?: any) => {
    if (obj && typeof obj === 'object') {
      // 保存entryId和clientEventInfo
      if (obj.entryId) {
        entryId = obj.entryId;
      }
      if (obj.clientEventInfo) {
        clientEventInfo = obj.clientEventInfo;
      }

      if (obj.__typename === 'Tweet' && obj.rest_id && !tweetIds.has(obj.rest_id)) {
        // 保存推文的上下文信息
        if (entryId) {
          (obj as any).entryId = entryId;
        }
        if (clientEventInfo) {
          (obj as any).clientEventInfo = clientEventInfo;
        }
        tweetIds.add(obj.rest_id);
        tweets.push(obj);
      }

      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          searchTweets(obj[key], entryId, clientEventInfo);
        }
      }
    } else if (Array.isArray(obj)) {
      obj.forEach(item => searchTweets(item, entryId, clientEventInfo));
    }
  };

  searchTweets(data);
  return tweets;
}
