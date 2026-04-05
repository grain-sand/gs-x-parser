// 用户基础类型，包含所有用户相关类型共有的字段
export interface IUserBase {
  name?: string;
  screen_name?: string;
  location?: string | null;
  description?: string | null;
  url?: string | null;
  entities?: IUserEntities;
  followers_count?: number;
  friends_count?: number;
  listed_count?: number;
  created_at?: string;
  favourites_count?: number;
  statuses_count?: number;
  is_translator?: boolean;
  translator_type?: string;
  profile_image_url_https?: string;
  default_profile?: boolean;
  default_profile_image?: boolean;
  can_dm?: boolean | null;
  can_media_tag?: boolean;
  following?: boolean | null;
  want_retweets?: boolean;
  withheld_in_countries?: string[];
  verified?: boolean;
}

export interface IUserEntities {
  description?: IUserEntityUrls;
  url?: IUserEntityUrls;
}

export interface IUserEntityUrls {
  urls?: IUrlEntity[];
}

export interface IUrlEntity {
  display_url?: string;
  expanded_url?: string;
  url?: string;
  indices?: number[];
}
