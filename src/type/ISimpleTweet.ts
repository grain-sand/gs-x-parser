/**
 * 简单推文类型，仅保留必须的标识字段、核心数据字段、用于显示的字段
 */
import { ISimplePhoto, ISimpleVideo, ISimpleUrl } from './ISimpleMedia';

export interface ISimpleTweet {
  /** 推文REST ID */
  rest_id: string;
  /** 推文完整文本 */
  full_text: string;
  /** 创建时间 */
  created_at: string;
  /** 用户ID */
  user_id: string;
  /** 用户屏幕名称 */
  user_screen_name: string;
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
  /** URL数组 */
  urls?: ISimpleUrl[];
}
