// 简单推文类型，仅保留必须的标识字段、核心数据字段、用于显示的字段
import { ISimplePhoto, ISimpleVideo, ISimpleUrl } from './ISimpleMedia';

export interface ISimpleTweet {
  id: string;
  rest_id: string;
  full_text: string;
  created_at: string;
  user_id: string;
  user_screen_name: string;
  retweet_count?: number;
  favorite_count?: number;
  reply_count?: number;
  quote_count?: number;
  lang?: string;
  possibly_sensitive?: boolean;
  is_retweet?: boolean;
  retweeted_status_id?: string;
  quoted_status_id?: string;
  photos?: ISimplePhoto[]; // 图片媒体数组
  videos?: ISimpleVideo[]; // 视频媒体数组
  urls?: ISimpleUrl[]; // URL数组
}
