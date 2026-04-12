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

  // 处理通知时间线结构
  if (data?.data?.viewer_v2?.user_results?.result?.notification_timeline?.timeline?.instructions) {
    data.data.viewer_v2.user_results.result.notification_timeline.timeline.instructions.forEach((instruction: any) => {
      if (instruction.entries) {
        instruction.entries.forEach((entry: any) => {
          if (entry.content?.itemContent?.template?.target_objects) {
            entry.content.itemContent.template.target_objects.forEach((targetObject: any) => {
              if (targetObject?.tweet_results?.result) {
                const tweet = targetObject.tweet_results.result;
                if (tweet && tweet.rest_id && !tweetIds.has(tweet.rest_id)) {
                  // 添加 __typename 字段以保持一致性
                  tweet.__typename = 'Tweet';
                  // 保存推文的上下文信息
                  if (entry.entryId) {
                    (tweet as any).entryId = entry.entryId;
                  }
                  if (entry.content.clientEventInfo) {
                    (tweet as any).clientEventInfo = entry.content.clientEventInfo;
                  }
                  tweetIds.add(tweet.rest_id);
                  tweets.push(tweet);
                }
              }
            });
          }
        });
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

      // 处理直接的推文对象
      if ((obj.__typename === 'Tweet' || (!obj.__typename && obj.rest_id && obj.legacy?.full_text)) && obj.rest_id && !tweetIds.has(obj.rest_id)) {
        // 添加 __typename 字段以保持一致性
        obj.__typename = 'Tweet';
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

      // 处理 TweetWithVisibilityResults 结构
      if (obj.__typename === 'TweetWithVisibilityResults' && obj.tweet && obj.tweet.rest_id && !tweetIds.has(obj.tweet.rest_id)) {
        const tweet = obj.tweet;
        // 添加 __typename 字段以保持一致性
        tweet.__typename = 'Tweet';
        // 保存推文的上下文信息
        if (entryId) {
          (tweet as any).entryId = entryId;
        }
        if (clientEventInfo) {
          (tweet as any).clientEventInfo = clientEventInfo;
        }
        tweetIds.add(tweet.rest_id);
        tweets.push(tweet);
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
