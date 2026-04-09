import {IMediaEntity, ISimplePhoto, ISimpleTweet, ISimpleUrl, ISimpleVideo, ITweet, IUser} from '../../type';
import {convertToSimpleUser} from './convertToSimpleUser';

/**
 * 将ITweet转换为ISimpleTweet
 * @param tweet ITweet对象
 * @param user IUser对象（可选）
 * @returns ISimpleTweet
 */
export function convertToSimpleTweet(tweet: ITweet, user?: IUser): ISimpleTweet {
  const legacy = tweet.legacy;
  // 提取推文质量
  let tweetQuality;
  if (tweet.visibility_results?.tweet_visibility_annotations) {
    const annotation = tweet.visibility_results.tweet_visibility_annotations.find(
      (item) => item.tweet_quality
    );
    tweetQuality = annotation?.tweet_quality as any;
  } else if (tweet.clientEventInfo?.details?.conversationDetails?.conversationSection) {
    // 从 clientEventInfo 中提取质量信息
    tweetQuality = tweet.clientEventInfo?.details?.conversationDetails?.conversationSection as any;
  }

  // 如果质量信息不存在，默认为高质量
  if (!tweetQuality) {
    tweetQuality = 'HighQuality';
  }

  const simpleTweet: ISimpleTweet = {
    rest_id: tweet.rest_id,
    full_text: legacy?.full_text || '',
    created_at: legacy?.created_at || '',
    user: user ? convertToSimpleUser(user) : {
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
    quoted_status_id: legacy?.quoted_status_id_str,
    quality: tweetQuality
  };

  // 提取媒体
  if (legacy?.extended_entities?.media) {
    const photos: ISimplePhoto[] = [];
    const videos: ISimpleVideo[] = [];

    legacy.extended_entities.media.forEach((media: IMediaEntity) => {
      if (media.type === 'photo') {
        // 处理图片尺寸
        let simpleSizes: any;
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
