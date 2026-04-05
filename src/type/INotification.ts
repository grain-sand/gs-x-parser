import {IUserEntities} from './IUser';
import {IBindingValue, ICardPlatform, IExtendedEntities, ITweetEntities} from './ITweet';
import {IOk} from './IMessage';

export interface INotificationResponse {
  globalObjects?: IGlobalObjects;
}

export interface IGlobalObjects {
  users?: Record<string, IUserObject>;
  tweets?: Record<string, ITweetObject>;
}

export interface IUserObject {
  id?: number;
  id_str?: string;
  name?: string;
  screen_name?: string;
  location?: string | null;
  description?: string | null;
  url?: string | null;
  entities?: IUserEntities;
  protected?: boolean;
  followers_count?: number;
  friends_count?: number;
  listed_count?: number;
  created_at?: string;
  favourites_count?: number;
  utc_offset?: number | null;
  time_zone?: string | null;
  geo_enabled?: boolean;
  verified?: boolean;
  statuses_count?: number;
  lang?: string | null;
  contributors_enabled?: boolean;
  is_translator?: boolean;
  is_translation_enabled?: boolean;
  profile_background_color?: string;
  profile_background_image_url?: string | null;
  profile_background_image_url_https?: string | null;
  profile_background_tile?: boolean;
  profile_image_url?: string;
  profile_image_url_https?: string;
  profile_banner_url?: string;
  profile_link_color?: string;
  profile_sidebar_border_color?: string;
  profile_sidebar_fill_color?: string;
  profile_text_color?: string;
  profile_use_background_image?: boolean;
  default_profile?: boolean;
  default_profile_image?: boolean;
  following?: boolean | null;
  follow_request_sent?: boolean | null;
  notifications?: boolean | null;
  blocking?: boolean | null;
  blocked_by?: boolean | null;
  want_retweets?: boolean;
  profile_interstitial_type?: string;
  translator_type?: string;
  withheld_in_countries?: string[];
  followed_by?: boolean | null;
  ext_is_blue_verified?: boolean;
  ext_highlighted_label?: Record<string, unknown>;
}

export interface ITweetObject {
  created_at?: string;
  id?: number;
  id_str?: string;
  full_text?: string;
  truncated?: boolean;
  display_text_range?: number[];
  entities?: ITweetEntities;
  source?: string;
  in_reply_to_status_id?: number | null;
  in_reply_to_status_id_str?: string | null;
  in_reply_to_user_id?: number | null;
  in_reply_to_user_id_str?: string | null;
  in_reply_to_screen_name?: string | null;
  user_id?: number;
  user_id_str?: string;
  geo?: any | null;
  coordinates?: any | null;
  place?: any | null;
  contributors?: any | null;
  is_quote_status?: boolean;
  quoted_status_id?: number | null;
  quoted_status_id_str?: string | null;
  retweet_count?: number;
  favorite_count?: number;
  reply_count?: number;
  quote_count?: number;
  conversation_id?: number;
  conversation_id_str?: string;
  conversation_muted?: boolean;
  favorited?: boolean;
  retweeted?: boolean;
  possibly_sensitive?: boolean;
  card?: ITweetCard;
  lang?: string;
  ext?: INotificationExt;
  extended_entities?: IExtendedEntities;
}

export interface IHashtag {
  text?: string;
  indices?: number[];
}

export interface IUserMention {
  screen_name?: string;
  name?: string;
  id?: number;
  id_str?: string;
  indices?: number[];
}

export interface IExtMedia {
  mediaStats?: INotificationMediaStats;
}

export interface INotificationMediaStats {
  r?: IOk;
  ttl?: number;
}

export interface IViewCount {
  viewCount?: string;
}

export interface ITweetCard {
  name?: string;
  url?: string;
  card_type_url?: string;
  binding_values?: Record<string, IBindingValue>;
  card_platform?: ICardPlatform;
}

export interface INotificationExt {
  superFollowMetadata?: ISuperFollowMetadata;
}

export interface ISuperFollowMetadata {
  r?: IOk;
  ttl?: number;
}
