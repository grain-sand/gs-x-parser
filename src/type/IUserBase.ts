/**
 * 用户基础类型，包含所有用户相关类型共有的字段
 */
export interface IUserBase {
  /** 用户名 */
  name?: string;
  /** 用户屏幕名称 */
  screen_name?: string;
  /** 位置 */
  location?: string | null;
  /** 个人简介 */
  description?: string | null;
  /** 个人网站 */
  url?: string | null;
  /** 实体 */
  entities?: IUserEntities;
  /** 粉丝数 */
  followers_count?: number;
  /** 关注数 */
  friends_count?: number;
  /** 列表数 */
  listed_count?: number;
  /** 创建时间 */
  created_at?: string;
  /** 收藏数 */
  favourites_count?: number;
  /** 推文数 */
  statuses_count?: number;
  /** 是否为翻译者 */
  is_translator?: boolean;
  /** 翻译者类型 */
  translator_type?: string;
  /** 头像URL */
  profile_image_url_https?: string;
  /** 是否默认个人资料 */
  default_profile?: boolean;
  /** 是否默认头像 */
  default_profile_image?: boolean;
  /** 是否可以直接消息 */
  can_dm?: boolean | null;
  /** 是否可以媒体标签 */
  can_media_tag?: boolean;
  /** 是否关注 */
  following?: boolean | null;
  /** 是否想要转发 */
  want_retweets?: boolean;
  /** 被限制的国家 */
  withheld_in_countries?: string[];
  /** 是否验证 */
  verified?: boolean;
}

/**
 * 用户实体接口
 */
export interface IUserEntities {
  /** 描述实体 */
  description?: IUserEntityUrls;
  /** URL实体 */
  url?: IUserEntityUrls;
}

/**
 * 用户实体URL接口
 */
export interface IUserEntityUrls {
  /** URL实体数组 */
  urls?: IUrlEntity[];
}

/**
 * URL实体接口
 */
export interface IUrlEntity {
  /** 显示URL */
  display_url?: string;
  /** 展开URL */
  expanded_url?: string;
  /** URL */
  url?: string;
  /** 索引 */
  indices?: number[];
}
