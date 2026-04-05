/**
 * 推文基础类型，包含所有推文相关类型共有的字段
 */
import { IUrlEntity, IMediaEntity } from './index';

/**
 * 推文基础接口
 */
export interface ITweetBase {
  /** 创建时间 */
  created_at?: string;
  /** ID字符串 */
  id_str?: string;
  /** 完整文本 */
  full_text?: string;
  /** 是否截断 */
  truncated?: boolean;
  /** 显示文本范围 */
  display_text_range?: number[];
  /** 实体 */
  entities?: ITweetEntities;
  /** 来源 */
  source?: string;
  /** 回复的状态ID字符串 */
  in_reply_to_status_id_str?: string | null;
  /** 回复的用户ID字符串 */
  in_reply_to_user_id_str?: string | null;
  /** 回复的屏幕名称 */
  in_reply_to_screen_name?: string | null;
  /** 地理信息 */
  geo?: any | null;
  /** 坐标 */
  coordinates?: any | null;
  /** 地点 */
  place?: any | null;
  /** 贡献者 */
  contributors?: any | null;
  /** 是否为引用状态 */
  is_quote_status?: boolean;
  /** 引用状态ID字符串 */
  quoted_status_id_str?: string | null;
  /** 转发数 */
  retweet_count?: number;
  /** 点赞数 */
  favorite_count?: number;
  /** 回复数 */
  reply_count?: number;
  /** 引用数 */
  quote_count?: number;
  /** 对话ID字符串 */
  conversation_id_str?: string;
  /** 是否已收藏 */
  favorited?: boolean;
  /** 是否已转发 */
  retweeted?: boolean;
  /** 是否敏感内容 */
  possibly_sensitive?: boolean;
  /** 语言 */
  lang?: string;
}

/**
 * 推文实体接口
 */
export interface ITweetEntities {
  /** 话题标签实体数组 */
  hashtags?: IHashtagEntity[];
  /** 媒体实体数组 */
  media?: IMediaEntity[];
  /** 符号实体数组 */
  symbols?: any[];
  /** 时间戳实体数组 */
  timestamps?: any[];
  /** URL实体数组 */
  urls?: IUrlEntity[];
  /** 用户提及实体数组 */
  user_mentions?: IUserMentionEntity[];
}

/**
 * 话题标签实体接口
 */
export interface IHashtagEntity {
  /** 索引 */
  indices?: number[];
  /** 文本 */
  text?: string;
}

/**
 * 用户提及实体接口
 */
export interface IUserMentionEntity {
  /** ID字符串 */
  id_str?: string;
  /** 名称 */
  name?: string;
  /** 屏幕名称 */
  screen_name?: string;
  /** 索引 */
  indices?: number[];
}
