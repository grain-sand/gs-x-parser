import { IUrlEntity, IMediaEntity } from './index';

// 推文基础类型，包含所有推文相关类型共有的字段
export interface ITweetBase {
  created_at?: string;
  id_str?: string;
  full_text?: string;
  truncated?: boolean;
  display_text_range?: number[];
  entities?: ITweetEntities;
  source?: string;
  in_reply_to_status_id_str?: string | null;
  in_reply_to_user_id_str?: string | null;
  in_reply_to_screen_name?: string | null;
  geo?: any | null;
  coordinates?: any | null;
  place?: any | null;
  contributors?: any | null;
  is_quote_status?: boolean;
  quoted_status_id_str?: string | null;
  retweet_count?: number;
  favorite_count?: number;
  reply_count?: number;
  quote_count?: number;
  conversation_id_str?: string;
  favorited?: boolean;
  retweeted?: boolean;
  possibly_sensitive?: boolean;
  lang?: string;
}

export interface ITweetEntities {
  hashtags?: IHashtagEntity[];
  media?: IMediaEntity[];
  symbols?: any[];
  timestamps?: any[];
  urls?: IUrlEntity[];
  user_mentions?: IUserMentionEntity[];
}

export interface IHashtagEntity {
  indices?: number[];
  text?: string;
}

export interface IUserMentionEntity {
  id_str?: string;
  name?: string;
  screen_name?: string;
  indices?: number[];
}
