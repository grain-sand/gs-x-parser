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
  /** 是否有毕业访问权限 */
  has_graduated_access?: boolean;
  /** 是否蓝V验证 */
  is_blue_verified?: boolean;
  /** 头像形状 */
  profile_image_shape?: string;
  /** 遗留用户数据 */
  legacy?: IUserLegacy;
  /** 专业信息 */
  professional?: IUserProfessional;
  /** 是否有超级关注资格 */
  super_follow_eligible?: boolean;
  /** 小费设置 */
  tipjar_settings?: ITipjarSettings;
}

export interface ITipjarSettings {
  /** 是否启用 */
  is_enabled?: boolean;
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
