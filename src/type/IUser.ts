/**
 * 用户类型定义
 */
import {IUserBase} from './index';
import { UserDisplayType, UserLabelType, VerifiedType, UrlType } from './ITypes';

/**
 * 用户接口
 */
export interface IUser {
  /** 类型名称 */
  __typename: string;
  /** 用户ID */
  id: string;
  /** 用户REST ID */
  rest_id: string;
  /** 附属高亮标签 */
  affiliates_highlighted_label?: IAffiliatesHighlightedLabel;
  /** 头像 */
  avatar?: IAvatar;
  /** 核心数据 */
  core?: IUserCore;
  /** 私信权限 */
  dm_permissions?: IDmPermissions;
  /** 是否有毕业访问权限 */
  has_graduated_access?: boolean;
  /** 是否蓝V验证 */
  is_blue_verified?: boolean;
  /** 位置 */
  location?: ILocation | string;
  /** 媒体权限 */
  media_permissions?: IMediaPermissions;
  /** 模仿评论粉丝标签 */
  parody_commentary_fan_label?: string;
  /** 隐私设置 */
  privacy?: IPrivacy;
  /** 头像形状 */
  profile_image_shape?: string;
  /** 个人简介 */
  profile_bio?: IProfileBio;
  /** 个人简介语言 */
  profile_description_language?: string;
  /** 关系视角 */
  relationship_perspectives?: IRelationshipPerspectives;
  /** 遗留用户数据 */
  legacy?: IUserLegacy;
  /** 专业信息 */
  professional?: IUserProfessional;
  /** 是否有超级关注资格 */
  super_follow_eligible?: boolean;
  /** 是否被超级关注 */
  super_followed_by?: boolean;
  /** 是否超级关注 */
  super_following?: boolean;
  /** 小费设置 */
  tipjar_settings?: ITipjarSettings;
  /** 验证信息 */
  verification?: IVerification;
  /** 直接在用户对象上的字段（用于通知数据） */
  name?: string;
  screen_name?: string;
  profile_image_url_https?: string;
  verified?: boolean;
  followers_count?: number;
  friends_count?: number;
  statuses_count?: number;
  description?: string;
  url?: string;
  verified_type?: VerifiedType;
  created_at?: string;
  profile_banner_url?: string;
  protected?: boolean;
  lang?: string;
  contributors_enabled?: boolean;
  is_translator?: boolean;
  is_translation_enabled?: boolean;
  profile_background_color?: string;
  profile_background_image_url?: string;
  profile_background_image_url_https?: string;
  profile_background_tile?: boolean;
  profile_link_color?: string;
  profile_sidebar_border_color?: string;
  profile_sidebar_fill_color?: string;
  profile_text_color?: string;
  profile_use_background_image?: boolean;
  default_profile?: boolean;
  default_profile_image?: boolean;
  following?: boolean;
  follow_request_sent?: boolean;
  notifications?: boolean;
  blocking?: boolean;
  blocked_by?: boolean;
  want_retweets?: boolean;
  profile_interstitial_type?: string;
  translator_type?: string;
  withheld_in_countries?: string[];
  followed_by?: boolean;
  ext_is_blue_verified?: boolean;
  ext_highlighted_label?: any;
  entities?: any;
}

export interface ITipjarSettings {
  /** 是否启用 */
  is_enabled?: boolean;
  /** 比特币地址 */
  bitcoin_handle?: string;
  /** 以太坊地址 */
  ethereum_handle?: string;
  /** Patreon 句柄 */
  patreon_handle?: string;
}

/**
 * 遗留用户数据接口
 */
export interface IUserLegacy extends IUserBase {
  /** 快速粉丝数 */
  fast_followers_count?: number;
  /** 是否有自定义时间线 */
  has_custom_timelines?: boolean;
  /** 位置 */
  location?: string;
  /** 媒体数 */
  media_count?: number;
  /** 正常粉丝数 */
  normal_followers_count?: number;
  /** 固定推文ID数组 */
  pinned_tweet_ids_str?: string[];
  /** 是否敏感内容 */
  possibly_sensitive?: boolean;
  /** 个人资料横幅URL */
  profile_banner_url?: string;
  /** 个人资料间隙类型 */
  profile_interstitial_type?: string;
  /** 个人网站 */
  url?: string;
  /** 验证类型 */
  verified_type?: VerifiedType;
}

/**
 * 用户专业信息接口
 */
export interface IUserProfessional {
  /** REST ID */
  rest_id?: string;
  /** 专业类型 */
  professional_type?: string;
  /** 分类 */
  category?: IUserCategory[];
}

/**
 * 用户分类接口
 */
export interface IUserCategory {
  /** ID */
  id?: number;
  /** 名称 */
  name?: string;
  /** 是否显示 */
  display?: boolean;
  /** 图标名称 */
  icon_name?: string;
}

/**
 * 附属高亮标签接口
 */
export interface IAffiliatesHighlightedLabel {
  /** 标签 */
  label?: ILabel;
}

/**
 * 标签接口
 */
export interface ILabel {
  /** URL */
  url?: IUrl;
  /** 徽章 */
  badge?: IBadge;
  /** 描述 */
  description?: string;
  /** 用户标签类型 */
  userLabelType?: UserLabelType;
  /** 用户标签显示类型 */
  userLabelDisplayType?: UserDisplayType;
}

/**
 * URL接口
 */
export interface IUrl {
  /** URL */
  url?: string;
  /** URL类型 */
  urlType?: UrlType;
}

/**
 * 徽章接口
 */
export interface IBadge {
  /** URL */
  url?: string;
}

/**
 * 头像接口
 */
export interface IAvatar {
  /** 图像URL */
  image_url?: string;
}

/**
 * 用户核心数据接口
 */
export interface IUserCore {
  /** 创建时间 */
  created_at?: string;
  /** 名称 */
  name?: string;
  /** 屏幕名称 */
  screen_name?: string;
}

/**
 * 私信权限接口
 */
export interface IDmPermissions {
  /** 是否可以发送私信 */
  can_dm?: boolean;
}

/**
 * 位置接口
 */
export interface ILocation {
  /** 位置 */
  location?: string;
}

/**
 * 媒体权限接口
 */
export interface IMediaPermissions {
  /** 是否可以媒体标签 */
  can_media_tag?: boolean;
}

/**
 * 隐私设置接口
 */
export interface IPrivacy {
  /** 是否受保护 */
  protected?: boolean;
}

/**
 * 个人简介接口
 */
export interface IProfileBio {
  /** 描述 */
  description?: string;
}

/**
 * 关系视角接口
 */
export interface IRelationshipPerspectives {
  /** 是否被阻塞 */
  blocked_by?: boolean;
  /** 是否阻塞 */
  blocking?: boolean;
  /** 是否被关注 */
  followed_by?: boolean;
  /** 是否关注 */
  following?: boolean;
  /** 是否静音 */
  muting?: boolean;
}

/**
 * 验证信息接口
 */
export interface IVerification {
  /** 是否验证 */
  verified?: boolean;
}
