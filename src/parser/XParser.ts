/**
 * XParser 静态类，用于解析Twitter API响应
 */
import {
	IMediaEntity,
	IOriginalResult,
	ISimplePhoto,
	ISimpleResult,
	ISimpleTweet,
	ISimpleUrl,
	ISimpleUser,
	ISimpleVideo,
	ITweet,
	IUser
} from '../type';

export class XParser {
  /**
   * 解析任意对象为ISimpleResult
   * @param data 任意对象
   * @returns ISimpleResult
   */
  static parseSimple(data: any): ISimpleResult {
    const result: ISimpleResult = {};

    // 提取用户和推文
    const users = this.#extractUsers(data);
    const tweets = this.#extractTweets(data);

    // 构建用户映射
    const userMap = new Map<string, IUser>();
    users.forEach(user => {
      userMap.set(user.rest_id, user);
    });

    // 提取推文
    if (tweets.length > 0) {
      result.tweets = tweets.map(tweet => {
        const user = userMap.get(tweet.legacy?.user_id_str || '');
        return this.convertToSimpleTweet(tweet, user);
      });

      // 分类推文
      result.photos = result.tweets.filter(tweet => tweet.photos && tweet.photos.length > 0);
      result.videos = result.tweets.filter(tweet => tweet.videos && tweet.videos.length > 0);
      result.urls = result.tweets.filter(tweet => tweet.urls && tweet.urls.length > 0);
    }

    // 提取游标
    this.#extractCursors(data, result);

    return result;
  }

  /**
   * 解析任意对象为IOriginalResult
   * @param data 任意对象
   * @returns IOriginalResult
   */
  static parseOriginal(data: any): IOriginalResult {
    const result: IOriginalResult = {};

    // 提取推文
    const tweets = this.#extractTweets(data);
    if (tweets.length > 0) {
      result.tweets = tweets;

      // 分类推文
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
    this.#extractCursors(data, result);

    return result;
  }

  /**
   * 将IUser转换为ISimpleUser
   * @param user IUser对象
   * @returns ISimpleUser
   */
  static convertToSimpleUser(user: IUser): ISimpleUser {
	  return {
	    rest_id: user.rest_id,
	    name: user.legacy?.name || '',
	    screen_name: user.legacy?.screen_name || '',
	    profile_image_url_https: user.legacy?.profile_image_url_https || '',
	    verified: user.legacy?.verified,
	    followers_count: user.legacy?.followers_count,
	    friends_count: user.legacy?.friends_count,
	    statuses_count: user.legacy?.statuses_count,
	    description: user.legacy?.description,
	    location: user.legacy?.location,
	    url: user.legacy?.url,
	    userLabelType: user.affiliates_highlighted_label?.label?.userLabelType,
	    verified_type: user.legacy?.verified_type
    };
  }

  /**
   * 将ITweet转换为ISimpleTweet
   * @param tweet ITweet对象
   * @param user IUser对象（可选）
   * @returns ISimpleTweet
   */
  static convertToSimpleTweet(tweet: ITweet, user?: IUser): ISimpleTweet {
    const legacy = tweet.legacy;
    const simpleTweet: ISimpleTweet = {
      rest_id: tweet.rest_id,
      full_text: legacy?.full_text || '',
      created_at: legacy?.created_at || '',
      user: user ? this.convertToSimpleUser(user) : {
        rest_id: legacy?.user_id_str || '',
        name: '',
        screen_name: '',
        profile_image_url_https: ''
      },
      retweet_count: legacy?.retweet_count,
      favorite_count: legacy?.favorite_count,
      reply_count: legacy?.reply_count,
      quote_count: legacy?.quote_count,
      lang: legacy?.lang,
      conversation_id: legacy?.conversation_id_str,
      possibly_sensitive: legacy?.possibly_sensitive,
      is_retweet: !!legacy?.retweeted_status_id_str,
      retweeted_status_id: legacy?.retweeted_status_id_str,
      quoted_status_id: legacy?.quoted_status_id_str
    };

    // 提取媒体
    if (legacy?.extended_entities?.media) {
      const photos: ISimplePhoto[] = [];
      const videos: ISimpleVideo[] = [];

      legacy.extended_entities.media.forEach((media: IMediaEntity) => {
        if (media.type === 'photo') {
          // 处理图片尺寸
          let simpleSizes;
          if (media.sizes) {
            simpleSizes = {};
            if (media.sizes.thumb) {
              simpleSizes.thumb = {
                w: media.sizes.thumb.w || 0,
                h: media.sizes.thumb.h || 0,
                resize: media.sizes.thumb.resize || 'fit'
              };
            }
            if (media.sizes.small) {
              simpleSizes.small = {
                w: media.sizes.small.w || 0,
                h: media.sizes.small.h || 0,
                resize: media.sizes.small.resize || 'fit'
              };
            }
            if (media.sizes.medium) {
              simpleSizes.medium = {
                w: media.sizes.medium.w || 0,
                h: media.sizes.medium.h || 0,
                resize: media.sizes.medium.resize || 'fit'
              };
            }
            if (media.sizes.large) {
              simpleSizes.large = {
                w: media.sizes.large.w || 0,
                h: media.sizes.large.h || 0,
                resize: media.sizes.large.resize || 'fit'
              };
            }
          }

          // 处理原始信息
          let simpleOriginalInfo;
          if (media.original_info) {
            simpleOriginalInfo = {
              width: media.original_info.width || 0,
              height: media.original_info.height || 0
            };
          }

          photos.push({
            media_key: media.media_key || '',
            type: 'photo',
            media_url_https: media.media_url_https || '',
            display_url: media.display_url || '',
            expanded_url: media.expanded_url || '',
            sizes: simpleSizes,
            original_info: simpleOriginalInfo
          });
        } else if (media.type === 'video' || media.type === 'animated_gif') {
          // 处理视频信息
          let simpleVideoInfo;
          if (media.video_info) {
            simpleVideoInfo = {
              aspect_ratio: media.video_info.aspect_ratio,
              duration_millis: media.video_info.duration_millis,
              variants: media.video_info.variants?.map(variant => ({
                bitrate: variant.bitrate,
                content_type: variant.content_type || '',
                url: variant.url || ''
              }))
            };
          }

          videos.push({
            media_key: media.media_key || '',
            type: media.type as 'video' | 'animated_gif',
            media_url_https: media.media_url_https || '',
            display_url: media.display_url || '',
            expanded_url: media.expanded_url || '',
            video_info: simpleVideoInfo
          });
        }
      });

      if (photos.length > 0) simpleTweet.photos = photos;
      if (videos.length > 0) simpleTweet.videos = videos;
    }

    // 提取URL
    if (legacy?.entities?.urls) {
      const urls: ISimpleUrl[] = legacy.entities.urls.map((url: any) => ({
        url: url.url || '',
        expanded_url: url.expanded_url || '',
        display_url: url.display_url || ''
      }));

      if (urls.length > 0) simpleTweet.urls = urls;
    }

    return simpleTweet;
  }

  /**
   * 从数据中提取用户
   * @param data 任意对象
   * @returns IUser数组
   */
  static #extractUsers(data: any): IUser[] {
    const users: IUser[] = [];

    // 递归搜索用户
    const searchUsers = (obj: any) => {
      if (obj && typeof obj === 'object') {
        if (obj.__typename === 'User' && obj.rest_id) {
          users.push(obj);
        }

        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            searchUsers(obj[key]);
          }
        }
      } else if (Array.isArray(obj)) {
        obj.forEach(item => searchUsers(item));
      }
    };

    searchUsers(data);
    return users;
  }

  /**
   * 从数据中提取推文
   * @param data 任意对象
   * @returns ITweet数组
   */
  static #extractTweets(data: any): ITweet[] {
    const tweets: ITweet[] = [];

    // 递归搜索推文
    const searchTweets = (obj: any) => {
      if (obj && typeof obj === 'object') {
        if (obj.__typename === 'Tweet' && obj.rest_id) {
          tweets.push(obj);
        }

        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            searchTweets(obj[key]);
          }
        }
      } else if (Array.isArray(obj)) {
        obj.forEach(item => searchTweets(item));
      }
    };

    searchTweets(data);
    return tweets;
  }

  /**
   * 从数据中提取游标
   * @param data 任意对象
   * @param result 结果对象
   */
  static #extractCursors(data: any, result: any): void {
    // 递归搜索游标
    const searchCursors = (obj: any) => {
      if (obj && typeof obj === 'object') {
        // 检查游标字段
        if (obj.cursor_top) result.cursor_top = obj.cursor_top;
        if (obj.cursor_bottom) result.cursor_bottom = obj.cursor_bottom;
        if (obj.next_cursor) result.next_cursor = obj.next_cursor;
        if (obj.next_cursor_str) result.next_cursor_str = obj.next_cursor_str;
        if (obj.previous_cursor) result.previous_cursor = obj.previous_cursor;
        if (obj.previous_cursor_str) result.previous_cursor_str = obj.previous_cursor_str;

        // 检查其他可能的游标字段
        if (obj.entryId && (obj.entryId.startsWith('cursor-top-') || obj.entryId.startsWith('cursor-bottom-'))) {
          if (obj.entryId.startsWith('cursor-top-')) {
            result.cursor_top = obj.entryId.replace('cursor-top-', '');
          } else {
            result.cursor_bottom = obj.entryId.replace('cursor-bottom-', '');
          }
        }

        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            searchCursors(obj[key]);
          }
        }
      } else if (Array.isArray(obj)) {
        obj.forEach(item => searchCursors(item));
      }
    };

    searchCursors(data);
  }
}
