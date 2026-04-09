/**
 * 推文类型定义
 */
import {IMediaEntity, ITweetBase, IUser} from './index';
import { EligibilityType, LegacyCardBindingKeyType, LegacyCardBindingValueType, ViewState } from './ITypes';

/**
 * 推文接口
 */
export interface ITweet {
  /** 类型名称 */
  __typename: string;
  /** 推文REST ID */
  rest_id: string;
  /** 是否有birdwatch注释 */
  has_birdwatch_notes?: boolean;
  /** 核心数据 */
  core?: ITweetCore;
  /** 取消提及数据 */
  unmention_data?: Record<string, unknown>;
  /** 编辑控制 */
  edit_control?: IEditControl;
  /** Grok分析按钮 */
  grok_analysis_button?: boolean;
  /** Grok注释 */
  grok_annotations?: Record<string, unknown>;
  /** Grok翻译帖子可用性 */
  grok_translated_post_with_availability?: IGrokTranslatedPostWithAvailability;
  /** 之前的计数 */
  previous_counts?: IPreviousCounts;
  /** 是否可翻译 */
  is_translatable?: boolean;
  /** 视图 */
  views?: ITweetViews;
  /** 来源 */
  source?: string;
  /** 卡片 */
  card?: ICard;
  /** 遗留推文数据 */
  legacy?: ITweetLegacy;
  /** 快速推广资格 */
  quick_promote_eligibility?: IQuickPromoteEligibility;
  /** 引用状态结果 */
  quoted_status_result?: IQuotedStatusResult;
  /** 转发状态结果 */
  retweeted_status_result?: IRetweetedStatusResult;
  /** 超级关注回复用户结果 */
  superFollowsReplyUserResult?: ISuperFollowsReplyUserResult;
  /** 可见性结果 */
  visibility_results?: IVisibilityResults;
  /** 客户端事件信息 */
  clientEventInfo?: IClientEventInfo;
}

/**
 * 客户端事件信息接口
 */
export interface IClientEventInfo {
  /** 组件 */
  component?: string;
  /** 详情 */
  details?: IClientEventDetails;
  /** 元素 */
  element?: string;
}

/**
 * 客户端事件详情接口
 */
export interface IClientEventDetails {
  /** 会话详情 */
  conversationDetails?: IConversationDetails;
  /** 时间线详情 */
  timelinesDetails?: ITimelinesDetails;
}

/**
 * 会话详情接口
 */
export interface IConversationDetails {
  /** 会话部分 */
  conversationSection?: string;
}

/**
 * 时间线详情接口
 */
export interface ITimelinesDetails {
  /** 控制器数据 */
  controllerData?: string;
  /** 注入类型 */
  injectionType?: string;
}

/**
 * 可见性结果接口
 */
export interface IVisibilityResults {
  /** 推文质量 */
  tweet_visibility_annotations?: ITweetVisibilityAnnotation[];
}

/**
 * 推文可见性注释接口
 */
export interface ITweetVisibilityAnnotation {
  /** 类型 */
  type?: string;
  /** 理由 */
  reason?: string;
  /** 推文质量 */
  tweet_quality?: string;
}

/**
 * 推文核心数据接口
 */
export interface ITweetCore {
  /** 用户结果 */
  user_results?: IUserResults;
}

/**
 * 用户结果接口
 */
export interface IUserResults {
  /** 结果 */
  result?: IUser;
}

/**
 * 编辑控制接口
 */
export interface IEditControl {
  /** 初始推文ID */
  initial_tweet_id?: string;
  /** 初始编辑控制 */
  edit_control_initial?: IEditControlInitial;
  /** 编辑推文ID数组 */
  edit_tweet_ids?: string[];
  /** 可编辑直到毫秒 */
  editable_until_msecs?: string;
  /** 是否可编辑 */
  is_edit_eligible?: boolean;
  /** 剩余编辑次数 */
  edits_remaining?: string;
}

/**
 * 初始编辑控制接口
 */
export interface IEditControlInitial {
  /** 编辑推文ID数组 */
  edit_tweet_ids?: string[];
  /** 可编辑直到毫秒 */
  editable_until_msecs?: string;
  /** 是否可编辑 */
  is_edit_eligible?: boolean;
  /** 剩余编辑次数 */
  edits_remaining?: string;
}

/**
 * 之前的计数接口
 */
export interface IPreviousCounts {
  /** 书签数 */
  bookmark_count?: number;
  /** 点赞数 */
  favorite_count?: number;
  /** 引用数 */
  quote_count?: number;
  /** 回复数 */
  reply_count?: number;
  /** 转发数 */
  retweet_count?: number;
}

/**
 * 推文视图接口
 */
export interface ITweetViews {
  /** 计数 */
  count?: string;
  /** 状态 */
  state?: ViewState;
}

/**
 * 遗留推文数据接口
 */
export interface ITweetLegacy extends ITweetBase {
  /** 书签数 */
  bookmark_count?: number;
  /** 是否已书签 */
  bookmarked?: boolean;
  /** 扩展实体 */
  extended_entities?: IExtendedEntities;
  /** 是否可编辑敏感内容 */
  possibly_sensitive_editable?: boolean;
  /** 用户ID字符串 */
  user_id_str?: string;
  /** 引用状态永久链接 */
  quoted_status_permalink?: IQuotedStatusPermalink;
}

/**
 * 扩展实体接口
 */
export interface IExtendedEntities {
  /** 媒体实体数组 */
  media?: IMediaEntity[];
}

/**
 * 快速推广资格接口
 */
export interface IQuickPromoteEligibility {
  /** 资格 */
  eligibility?: EligibilityType;
}

/**
 * 引用状态结果接口
 */
export interface IQuotedStatusResult {
  /** 结果 */
  result?: ITweet;
}

/**
 * 超级关注回复用户结果接口
 */
export interface ISuperFollowsReplyUserResult {
  /** 结果 */
  result?: IUser;
}

/**
 * 转发状态结果接口
 */
export interface IRetweetedStatusResult {
  /** 结果 */
  result?: ITweet;
}

/**
 * 引用状态永久链接接口
 */
export interface IQuotedStatusPermalink {
  /** URL */
  url?: string;
  /** 展开URL */
  expanded?: string;
  /** 显示URL */
  display?: string;
}

/**
 * 卡片接口
 */
export interface ICard {
  /** REST ID */
  rest_id?: string;
  /** 遗留卡片数据 */
  legacy?: ICardLegacy;
}

/**
 * 遗留卡片数据接口
 */
export interface ICardLegacy {
  /** 绑定值数组 */
  binding_values?: IBindingValue[];
  /** 卡片平台 */
  card_platform?: ICardPlatform;
  /** 名称 */
  name?: string;
  /** URL */
  url?: string;
  /** 用户引用结果数组 */
  user_refs_results?: IUserRefResult[];
}

/**
 * 绑定值接口
 */
export interface IBindingValue {
  /** 键 */
  key?: LegacyCardBindingKeyType;
  /** 值 */
  value?: IBindingValueContent;
}

/**
 * 绑定值内容接口
 */
export interface IBindingValueContent {
  /** 图像值 */
  image_value?: IImageValue;
  /** 字符串值 */
  string_value?: string;
  /** 类型 */
  type?: LegacyCardBindingValueType;
  /** 图像颜色值 */
  image_color_value?: IImageColorValue;
  /** 记录键 */
  scribe_key?: string;
  /** 用户值 */
  user_value?: IUserValue;
  /** 应用价格金额 */
  app_price_amount?: string;
}

/**
 * 图像值接口
 */
export interface IImageValue {
  /** 高度 */
  height?: number;
  /** 宽度 */
  width?: number;
  /** URL */
  url?: string;
}

/**
 * 图像颜色值接口
 */
export interface IImageColorValue {
  /** 调色板 */
  palette?: IColorPalette[];
}

/**
 * 颜色调色板接口
 */
export interface IColorPalette {
  /** RGB颜色 */
  rgb?: IColorRGB;
  /** 百分比 */
  percentage?: number;
}

/**
 * RGB颜色接口
 */
export interface IColorRGB {
  /** 蓝色通道 */
  blue?: number;
  /** 绿色通道 */
  green?: number;
  /** 红色通道 */
  red?: number;
}

/**
 * 卡片平台接口
 */
export interface ICardPlatform {
  /** 平台 */
  platform?: IPlatform;
}

/**
 * 平台接口
 */
export interface IPlatform {
  /** 受众 */
  audience?: IAudience;
  /** 设备 */
  device?: IDevice;
}

/**
 * 受众接口
 */
export interface IAudience {
  /** 名称 */
  name?: string;
}

/**
 * 设备接口
 */
export interface IDevice {
  /** 名称 */
  name?: string;
  /** 版本 */
  version?: string;
}

/**
 * 用户引用结果接口
 */
export interface IUserRefResult {
  /** 结果 */
  result?: IUser;
}

/**
 * 用户值接口
 */
export interface IUserValue {
  /** ID字符串 */
  id_str?: string;
  /** 路径 */
  path?: string[];
}

/**
 * Grok翻译帖子可用性接口
 */
export interface IGrokTranslatedPostWithAvailability {
  /** 是否可用 */
  is_available?: boolean;
}
