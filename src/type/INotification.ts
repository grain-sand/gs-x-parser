import {IBindingValue, ICardPlatform, IExtendedEntities, IOk, ITweetBase, IUserBase} from './index';

export interface INotificationResponse {
  globalObjects?: IGlobalObjects;
}

export interface IGlobalObjects {
  users?: Record<string, IUserObject>;
  tweets?: Record<string, ITweetObject>;
}

export interface IUserObject extends IUserBase {
  id?: number;
  id_str?: string;
  protected?: boolean;
  utc_offset?: number | null;
  time_zone?: string | null;
  geo_enabled?: boolean;
  lang?: string | null;
  contributors_enabled?: boolean;
  is_translation_enabled?: boolean;
  profile_background_color?: string;
  profile_background_image_url?: string | null;
  profile_background_image_url_https?: string | null;
  profile_background_tile?: boolean;
  profile_image_url?: string;
  profile_banner_url?: string;
  profile_link_color?: string;
  profile_sidebar_border_color?: string;
  profile_sidebar_fill_color?: string;
  profile_text_color?: string;
  profile_use_background_image?: boolean;
  follow_request_sent?: boolean | null;
  notifications?: boolean | null;
  blocking?: boolean | null;
  blocked_by?: boolean | null;
  profile_interstitial_type?: string;
  followed_by?: boolean | null;
  ext_is_blue_verified?: boolean;
  ext_highlighted_label?: Record<string, unknown>;
}

export interface ITweetObject extends ITweetBase {
  id?: number;
  in_reply_to_status_id?: number | null;
  in_reply_to_user_id?: number | null;
  user_id?: number;
  user_id_str?: string;
  quoted_status_id?: number | null;
  conversation_id?: number;
  conversation_muted?: boolean;
  card?: ITweetCard;
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
