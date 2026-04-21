import {IUser} from "./IUser";
import {IColorPalette} from "./ITweet";

export interface ICommunityResult {
  result?: ICommunity;
  id?: string;
}

export interface ICommunity {
  __typename?: string;
  id_str?: string;
  name?: string;
  description?: string;
  created_at?: number;
  search_tags?: string[];
  is_nsfw?: boolean;
  actions?: ICommunityActions;
  admin_results?: IUserResult;
  creator_results?: IUserResult;
  invites_result?: ICommunityInvitesResult;
  join_policy?: string;
  invites_policy?: string;
  is_pinned?: boolean;
  members_facepile_results?: IUserResult[];
  moderator_count?: number;
  member_count?: number;
  role?: string;
  rules?: ICommunityRule[];
  custom_banner_media?: ICommunityMedia;
  default_banner_media?: ICommunityMedia;
  viewer_relationship?: IViewerRelationship;
  join_requests_result?: ICommunityJoinRequestsResult;
  id?: string;
}

export interface ICommunityActions {
  delete_action_result?: ICommunityDeleteActionResult;
  join_action_result?: ICommunityJoinActionResult;
  leave_action_result?: ICommunityLeaveActionResult;
  pin_action_result?: ICommunityTweetPinActionResult;
  id?: string;
}

export interface ICommunityDeleteActionResult {
  __typename?: string;
  __isCommunityDeleteActionResult?: string;
  reason?: string;
}

export interface ICommunityJoinActionResult {
  __typename?: string;
  __isCommunityJoinActionResult?: string;
  reason?: string;
  message?: string;
}

export interface ICommunityLeaveActionResult {
  __typename?: string;
  __isCommunityLeaveActionResult?: string;
  reason?: string;
  message?: string;
}

export interface ICommunityTweetPinActionResult {
  __typename?: string;
  __isCommunityTweetPinActionResult?: string;
}

export interface IUserResult {
  result?: IUser;
  id?: string;
}

export interface ICommunityInvitesResult {
  __typename?: string;
  __isCommunityInvitesResult?: string;
  reason?: string;
  message?: string;
}

export interface ICommunityRule {
  rest_id?: string;
  name?: string;
  id?: string;
}

export interface ICommunityMedia {
  media_info?: IApiImage;
  id?: string;
}

export interface IApiImage {
  __typename?: string;
  color_info?: IColorInfo;
  original_img_url?: string;
  original_img_width?: number;
  original_img_height?: number;
  salient_rect?: ISalientRect;
}

export interface IColorInfo {
  palette?: IColorPalette[];
}

export interface ISalientRect {
  left?: number;
  top?: number;
  width?: number;
  height?: number;
}

export interface IViewerRelationship {
  moderation_state?: ICommunityUserDefaultModerationState;
  id?: string;
}

export interface ICommunityUserDefaultModerationState {
  __typename?: string;
}

export interface ICommunityJoinRequestsResult {
  __typename?: string;
}
