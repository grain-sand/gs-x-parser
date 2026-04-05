import {IUserBase} from './index';

export interface IUser {
  __typename: string;
  id: string;
  rest_id: string;
  affiliates_highlighted_label?: IAffiliatesHighlightedLabel;
  has_graduated_access?: boolean;
  is_blue_verified?: boolean;
  profile_image_shape?: string;
  legacy?: IUserLegacy;
  professional?: IUserProfessional;
  super_follow_eligible?: boolean;
}

export interface IUserLegacy extends IUserBase {
  fast_followers_count?: number;
  has_custom_timelines?: boolean;
  location?: string;
  media_count?: number;
  normal_followers_count?: number;
  pinned_tweet_ids_str?: string[];
  possibly_sensitive?: boolean;
  profile_banner_url?: string;
  profile_interstitial_type?: string;
  url?: string;
}

export interface IUserProfessional {
  rest_id?: string;
  professional_type?: string;
  category?: IUserCategory[];
}

export interface IUserCategory {
  id?: number;
  name?: string;
  display?: boolean;
  icon_name?: string;
}

export interface IAffiliatesHighlightedLabel {
  label?: ILabel;
}

export interface ILabel {
  url?: IUrl;
  badge?: IBadge;
  description?: string;
  userLabelType?: string;
  userLabelDisplayType?: string;
}

export interface IUrl {
  url?: string;
  urlType?: string;
}

export interface IBadge {
  url?: string;
}
