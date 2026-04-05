import { IUser, IUrlEntity } from './IUser';

export interface ITweet {
  __typename: string;
  rest_id: string;
  has_birdwatch_notes?: boolean;
  core?: ITweetCore;
  unmention_data?: Record<string, unknown>;
  edit_control?: IEditControl;
  previous_counts?: IPreviousCounts;
  is_translatable?: boolean;
  views?: ITweetViews;
  source?: string;
  card?: ICard;
  legacy?: ITweetLegacy;
  quick_promote_eligibility?: IQuickPromoteEligibility;
  quoted_status_result?: IQuotedStatusResult;
  retweeted_status_result?: IRetweetedStatusResult;
  superFollowsReplyUserResult?: ISuperFollowsReplyUserResult;
}

export interface ITweetCore {
  user_results?: IUserResults;
}

export interface IUserResults {
  result?: IUser;
}

export interface IEditControl {
  initial_tweet_id?: string;
  edit_control_initial?: IEditControlInitial;
  edit_tweet_ids?: string[];
  editable_until_msecs?: string;
  is_edit_eligible?: boolean;
  edits_remaining?: string;
}

export interface IEditControlInitial {
  edit_tweet_ids?: string[];
  editable_until_msecs?: string;
  is_edit_eligible?: boolean;
  edits_remaining?: string;
}

export interface IPreviousCounts {
  bookmark_count?: number;
  favorite_count?: number;
  quote_count?: number;
  reply_count?: number;
  retweet_count?: number;
}

export interface ITweetViews {
  count?: string;
  state?: string;
}

export interface ITweetLegacy {
  bookmark_count?: number;
  bookmarked?: boolean;
  created_at?: string;
  conversation_id_str?: string;
  display_text_range?: number[];
  entities?: ITweetEntities;
  extended_entities?: IExtendedEntities;
  favorite_count?: number;
  favorited?: boolean;
  full_text?: string;
  is_quote_status?: boolean;
  lang?: string;
  possibly_sensitive?: boolean;
  possibly_sensitive_editable?: boolean;
  quote_count?: number;
  reply_count?: number;
  retweet_count?: number;
  retweeted?: boolean;
  user_id_str?: string;
  id_str?: string;
  in_reply_to_screen_name?: string;
  in_reply_to_status_id_str?: string;
  in_reply_to_user_id_str?: string;
  quoted_status_id_str?: string;
  quoted_status_permalink?: IQuotedStatusPermalink;
}

export interface ITweetEntities {
  hashtags?: IHashtagEntity[];
  media?: IMediaEntity[];
  symbols?: any[];
  timestamps?: any[];
  urls?: IUrlEntity[];
  user_mentions?: IUserMentionEntity[];
}

export interface IExtendedEntities {
  media?: IMediaEntity[];
}

export interface IHashtagEntity {
  indices?: number[];
  text?: string;
}

export interface IMediaEntity {
  display_url?: string;
  expanded_url?: string;
  id_str?: string;
  indices?: number[];
  media_key?: string;
  media_url_https?: string;
  type?: string;
  url?: string;
  additional_media_info?: IAdditionalMediaInfo;
  ext_media_availability?: IExtMediaAvailability;
  sizes?: IMediaSizes;
  original_info?: IOriginalInfo;
  allow_download_status?: IAllowDownloadStatus;
  video_info?: IVideoInfo;
  media_results?: IMediaResults;
  features?: IMediaFeatures;
}

export interface IAdditionalMediaInfo {
  monetizable?: boolean;
}

export interface IExtMediaAvailability {
  status?: string;
}

export interface IMediaSizes {
  large?: IMediaSize;
  medium?: IMediaSize;
  small?: IMediaSize;
  thumb?: IMediaSize;
}

export interface IMediaSize {
  h?: number;
  w?: number;
  resize?: string;
}

export interface IOriginalInfo {
  height?: number;
  width?: number;
  focus_rects?: IFocusRect[];
}

export interface IFocusRect {
  x?: number;
  y?: number;
  w?: number;
  h?: number;
}

export interface IAllowDownloadStatus {
  allow_download?: boolean;
}

export interface IVideoInfo {
  aspect_ratio?: number[];
  duration_millis?: number;
  variants?: IVideoVariant[];
}

export interface IVideoVariant {
  bitrate?: number;
  content_type?: string;
  url?: string;
}

export interface IMediaResults {
  result?: IMediaResult;
}

export interface IMediaResult {
  media_key?: string;
}

export interface IMediaFeatures {
  large?: IMediaFeature;
  medium?: IMediaFeature;
  small?: IMediaFeature;
  orig?: IMediaFeature;
}

export interface IMediaFeature {
  faces?: any[];
}

export interface IUserMentionEntity {
  id_str?: string;
  name?: string;
  screen_name?: string;
  indices?: number[];
}

export interface IQuickPromoteEligibility {
  eligibility?: string;
}

export interface IQuotedStatusResult {
  result?: ITweet;
}

export interface ISuperFollowsReplyUserResult {
  result?: IUser;
}

export interface IRetweetedStatusResult {
  result?: ITweet;
}

export interface IQuotedStatusPermalink {
  url?: string;
  expanded?: string;
  display?: string;
}

export interface ICard {
  rest_id?: string;
  legacy?: ICardLegacy;
}

export interface ICardLegacy {
  binding_values?: IBindingValue[];
  card_platform?: ICardPlatform;
  name?: string;
  url?: string;
  user_refs_results?: IUserRefResult[];
}

export interface IBindingValue {
  key?: string;
  value?: IBindingValueContent;
}

export interface IBindingValueContent {
  image_value?: IImageValue;
  string_value?: string;
  type?: string;
  image_color_value?: IImageColorValue;
  scribe_key?: string;
  user_value?: IUserValue;
}

export interface IImageValue {
  height?: number;
  width?: number;
  url?: string;
}

export interface IImageColorValue {
  palette?: IColorPalette[];
}

export interface IExtMediaColor {
  palette?: IColorPalette[];
}

export interface IColorPalette {
  rgb?: IColorRGB;
  percentage?: number;
}

export interface IColorRGB {
  blue?: number;
  green?: number;
  red?: number;
}

export interface ICardPlatform {
  platform?: IPlatform;
}

export interface IPlatform {
  audience?: IAudience;
  device?: IDevice;
}

export interface IAudience {
  name?: string;
}

export interface IDevice {
  name?: string;
  version?: string;
}

export interface IUserRefResult {
  result?: IUser;
}

export interface IUserValue {
  id_str?: string;
  path?: string[];
}
