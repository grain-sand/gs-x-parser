/**
 * 简单推文类型，仅保留必须的标识字段、核心数据字段、用于显示的字段
 */
import { ISimplePhoto, ISimpleVideo, ISimpleGif } from './ISimpleMedia';
import { IUrlEntity } from './IUserBase';
import { ISimpleUser } from './ISimpleUser';
import { TweetQuality } from './ITypes';
import { ITweet } from './ITweet';

export interface ISimpleTweet {
  /** 推文REST ID */
  rest_id: string;
  /** 推文完整文本 */
  full_text: string;
  /** 显示文本范围，对应原始数据的 display_text_range */
  text_range?: number[];
  /** 原始 ITweet 数据（可选，根据解析选项决定是否包含） */
  original_tweet?: ITweet;
  /** 创建时间（Unix时间戳，毫秒） */
  created_at: number;
  /** 用户信息 */
  user: ISimpleUser;
  /** 转发数 */
  retweet_count?: number;
  /** 点赞数 */
  favorite_count?: number;
  /** 回复数 */
  reply_count?: number;
  /** 引用数 */
  quote_count?: number;
  /** 语言 */
  lang?: string;
  /** 会话ID */
  conversation_id?: string;
  /** 是否敏感内容 */
  possibly_sensitive?: boolean;
  /** 是否为转发 */
  is_retweet?: boolean;
  /** 被转发的推文ID */
  retweeted_status_id?: string | null;
  /** 被引用的推文ID */
  quoted_status_id?: string | null;
  /** 图片媒体数组 */
  photos?: ISimplePhoto[];
  /** 视频媒体数组 */
  videos?: ISimpleVideo[];
  /** 动态图片媒体数组 */
  gifs?: ISimpleGif[];
  /** URL数组 */
  urls?: IUrlEntity[];
  /** 推文质量 */
  quality?: TweetQuality;
  /** Note推文文本，对应 note_tweet.note_tweet_results.result.text */
  note_text?: string;
  /** Note推文中的URL数组 */
  note_urls?: IUrlEntity[];
  /** Grok翻译数据（简化版） */
  grok_translated?: {
    /** 翻译文本 */
    text: string;
    /** 源语言 */
    source_lang?: string;
    /** 目标语言 */
    dest_lang?: string;
  };
}
