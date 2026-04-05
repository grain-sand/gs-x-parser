import {IMediaEntity, ITweetBase, IUser} from './index';

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

export interface ITweetLegacy extends ITweetBase {
  bookmark_count?: number;
  bookmarked?: boolean;
  extended_entities?: IExtendedEntities;
  possibly_sensitive_editable?: boolean;
  user_id_str?: string;
  quoted_status_permalink?: IQuotedStatusPermalink;
}

export interface IExtendedEntities {
  media?: IMediaEntity[];
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
