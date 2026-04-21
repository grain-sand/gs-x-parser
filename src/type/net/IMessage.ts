import {IExtMediaColor, IMediaSizes, IMediaStats, IOriginalInfo} from "./IMediaEntity";
import {IColorPalette} from "./ITweet";
import {IUrlEntity, IUserBase} from "./IUserBase";

export interface IConversationTimeline {
  status?: string;
  min_entry_id?: string;
  max_entry_id?: string;
  entries?: IEntry[];
  users?: Record<string, IMessageUser>;
  conversations?: Record<string, IConversation>;
}

export interface IEntry {
  message?: IMessage;
}

export interface IMessage {
  id?: string;
  time?: string;
  request_id?: string;
  conversation_id?: string;
  message_data?: IMessageData;
}

export interface IMessageData {
  id?: string;
  time?: string;
  recipient_id?: string;
  sender_id?: string;
  text?: string;
  entities?: IMessageEntities;
  attachment?: IAttachment;
}

export interface IMessageEntities {
  hashtags?: any[];
  symbols?: any[];
  user_mentions?: any[];
  urls?: IUrlEntity[];
}

export interface IAttachment {
  photo?: IPhoto;
}

export interface IPhoto {
  id?: number;
  id_str?: string;
  indices?: number[];
  media_url?: string;
  media_url_https?: string;
  url?: string;
  display_url?: string;
  expanded_url?: string;
  type?: string;
  original_info?: IOriginalInfo;
  sizes?: IMediaSizes;
  features?: Record<string, unknown>;
  ext_media_color?: IExtMediaColor;
  ext_alt_text?: string | null;
  ext?: IExt;
  audio_only?: boolean;
}

export interface IExt {
  mediaColor?: IMediaColor;
  mediaStats?: IMediaStats;
  altText?: IAltText;
}

export interface IMediaColor {
  r?: IOk;
  ttl?: number;
}

export interface IOk {
  palette?: IColorPalette[];
}

export interface IAltText {
  r?: string;
  ttl?: number;
}

export interface IMessageUser extends IUserBase {
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
  profile_link_color?: string;
  profile_sidebar_border_color?: string;
  profile_sidebar_fill_color?: string;
  profile_text_color?: string;
  profile_use_background_image?: boolean;
  can_secret_dm?: boolean | null;
  follow_request_sent?: boolean;
  notifications?: boolean;
  blocking?: boolean;
  subscribed_by?: boolean;
  blocked_by?: boolean;
  business_profile_state?: string;
  followed_by?: boolean;
}

export interface IUrlEntities {
  urls?: IUrlEntity[];
}

export interface IConversation {
  conversation_id?: string;
  type?: string;
  sort_event_id?: string;
  sort_timestamp?: string;
  participants?: IParticipant[];
  nsfw?: boolean;
  notifications_disabled?: boolean;
  mention_notifications_disabled?: boolean;
  last_read_event_id?: string;
  read_only?: boolean;
  trusted?: boolean;
  low_quality?: boolean;
  muted?: boolean;
}

export interface IParticipant {
  user_id?: string;
  last_read_event_id?: string;
}
