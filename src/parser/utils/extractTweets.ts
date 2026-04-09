import { ITweet } from '../../type';

/**
 * 从数据中提取推文
 * @param data 任意对象
 * @returns ITweet数组
 */
export function extractTweets(data: any): ITweet[] {
  const tweets: ITweet[] = [];

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

      if (obj.__typename === 'Tweet' && obj.rest_id) {
        // 保存推文的上下文信息
        if (entryId) {
          (obj as any).entryId = entryId;
        }
        if (clientEventInfo) {
          (obj as any).clientEventInfo = clientEventInfo;
        }
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
