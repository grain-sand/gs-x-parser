/**
 * 类型常量和联合类型定义
 */

/**
 * 用户类型名称常量
 */
export const USER_TYPENAMES = ['User', 'UserUnavailable'] as const;

/**
 * 用户类型名称联合类型
 */
export type UserTypename = typeof USER_TYPENAMES[number];

/**
 * 推文类型名称常量
 */
export const TWEET_TYPENAMES = ['Tweet', 'TextTombstone', 'TweetTombstone', 'TweetWithVisibilityResults', 'ContextualTweetInterstitial'] as const;

/**
 * 推文类型名称联合类型
 */
export type TweetTypename = typeof TWEET_TYPENAMES[number];

/**
 * 社区类型名称常量
 */
export const COMMUNITY_TYPENAMES = ['Community', 'CommunityDeleteActionUnavailable', 'CommunityUserDefaultModerationState', 'CommunityJoinRequestsUnavailable'] as const;

/**
 * 社区类型名称联合类型
 */
export type CommunityTypename = typeof COMMUNITY_TYPENAMES[number];

/**
 * 时间线类型名称常量
 */
export const TIMELINE_TYPENAMES = ['TimelineTimelineItem', 'TimelineMessagePrompt'] as const;

/**
 * 时间线类型名称联合类型
 */
export type TimelineTypename = typeof TIMELINE_TYPENAMES[number];

/**
 * 时间线项目类型名称常量
 */
export const TIMELINE_ITEM_TYPENAMES = ['TimelineTweet', 'TimelineMessagePrompt'] as const;

/**
 * 时间线项目类型名称联合类型
 */
export type TimelineItemTypename = typeof TIMELINE_ITEM_TYPENAMES[number];

/**
 * 时间线指令类型常量
 */
export const TIMELINE_INSTRUCTION_TYPES = ['TimelineAddEntries'] as const;

/**
 * 时间线指令类型联合类型
 */
export type TimelineInstructionType = typeof TIMELINE_INSTRUCTION_TYPES[number];

/**
 * 时间线条目类型常量
 */
export const TIMELINE_ENTRY_TYPES = ['TimelineTimelineItem', 'TimelineTimelineModule', 'TimelineTimelineCursor'] as const;

/**
 * 时间线条目类型联合类型
 */
export type TimelineEntryType = typeof TIMELINE_ENTRY_TYPES[number];

/**
 * 时间线项目类型常量
 */
export const TIMELINE_ITEM_TYPES = ['TimelineTweet', 'TimelineMessagePrompt'] as const;

/**
 * 时间线项目类型联合类型
 */
export type TimelineItemType = typeof TIMELINE_ITEM_TYPES[number];

/**
 * 媒体类型常量
 */
export const MEDIA_TYPES = ['photo', 'video', 'animated_gif'] as const;

/**
 * 媒体类型联合类型
 */
export type MediaType = typeof MEDIA_TYPES[number];

/**
 * 资格类型常量
 */
export const ELIGIBILITY_TYPES = ['Eligible', 'IneligibleUserUnauthorized'] as const;

/**
 * 资格类型联合类型
 */
export type EligibilityType = typeof ELIGIBILITY_TYPES[number];

/**
 * 显示类型常量
 */
export const DISPLAY_TYPES = ['Carousel', 'Vertical', 'VerticalConversation', 'Classic', 'EntireTweet'] as const;

/**
 * 显示类型联合类型
 */
export type DisplayType = typeof DISPLAY_TYPES[number];

/**
 * 推文显示类型常量
 */
export const TWEET_DISPLAY_TYPES = ['CondensedTweet', 'Tweet', 'SelfThread'] as const;

/**
 * 推文显示类型联合类型
 */
export type TweetDisplayType = typeof TWEET_DISPLAY_TYPES[number];

/**
 * 用户显示类型常量
 */
export const USER_DISPLAY_TYPES = ['SubscribableUser', 'User'] as const;

/**
 * 用户显示类型联合类型
 */
export type UserDisplayType = typeof USER_DISPLAY_TYPES[number];

/**
 * 注入类型常量
 */
export const INJECTION_TYPES = ['ForYouInNetwork', 'ForYouPromoted', 'WhoToFollow', 'creators-only-connect-tab', 'CommunityToJoin', 'FollowingInNetwork'] as const;

/**
 * 注入类型联合类型
 */
export type InjectionType = typeof INJECTION_TYPES[number];

/**
 * 透明指南详情类型常量
 */
export const TRANSPARENT_GUIDE_DETAIL_TYPES = ['TimelineEventUrtMetadata'] as const;

/**
 * 透明指南详情类型联合类型
 */
export type TransparentGuideDetailType = typeof TRANSPARENT_GUIDE_DETAIL_TYPES[number];

/**
 * 元素类型常量
 */
export const ELEMENT_TYPES = ['tweet', 'user', 'event', 'feedback', 'trend', 'users_followed_you', 'generic_report_received', 'users_liked_your_tweet', 'user_quoted_your_tweet', 'user_replied_to_your_tweet', 'users_retweeted_your_tweet', 'user_mentioned_you'] as const;

/**
 * 元素类型联合类型
 */
export type ElementType = typeof ELEMENT_TYPES[number];

/**
 * 推文质量类型常量
 */
export const TWEET_QUALITIES = ['HighQuality', 'LowQuality', 'AbusiveQuality', 'RelatedTweet'] as const;

/**
 * 推文质量类型联合类型
 */
export type TweetQuality = typeof TWEET_QUALITIES[number];

/**
 * 组件值常量
 */
export const COMPONENT_VALUES = ['url', 'tweet', 'trends', 'unified_events', 'related_tweet', 'suggest_who_to_follow', 'for_you_in_network', 'for-you-promoted', 'alt-text-prompt-injection', 'ads-sharing-x-premium-upsell-candidate'] as const;

/**
 * 组件值联合类型
 */
export type ComponentValue = typeof COMPONENT_VALUES[number];

/**
 * 项目类型常量
 */
export const ITEM_TYPES = ['TimelineTweet', 'TimelineUser', 'TimelineEventSummary', 'TimelineMessagePrompt', 'TimelineCommunity', 'CommunityPinnedTimeline'] as const;

/**
 * 项目类型联合类型
 */
export type ItemType = typeof ITEM_TYPES[number];

/**
 * 游标类型常量
 */
export const CURSOR_TYPES = ['Top', 'Bottom', 'ShowMore', 'ShowMoreThreads'] as const;

/**
 * 游标类型联合类型
 */
export type CursorType = typeof CURSOR_TYPES[number];

/**
 * 指令类型常量
 */
export const INSTRUCTION_TYPES = ['TimelineClearCache', 'TimelineAddEntries', 'TimelineTerminateTimeline', 'TimelineShowAlert', 'TimelineShowCover'] as const;

/**
 * 指令类型联合类型
 */
export type InstructionType = typeof INSTRUCTION_TYPES[number];

/**
 * 内容类型常量
 */
export const CONTENT_TYPES = ['TimelineTweetMedia', 'TimelineUrl'] as const;

/**
 * 内容类型联合类型
 */
export type ContentType = typeof CONTENT_TYPES[number];

/**
 * 视频内容类型常量
 */
export const VIDEO_CONTENT_TYPES = ['application/x-mpegURL', 'video/mp4'] as const;

/**
 * 视频内容类型联合类型
 */
export type VideoContentType = typeof VIDEO_CONTENT_TYPES[number];

/**
 * 消息收件箱时间线索引常量
 */
export const MESSAGE_INBOX_TIMELINE_INDEXES = ['trusted', 'untrusted', 'untrusted_low_quality'] as const;

/**
 * 消息收件箱时间线索引联合类型
 */
export type MessageInboxTimelineIndex = typeof MESSAGE_INBOX_TIMELINE_INDEXES[number];

/**
 * 通知键常量
 */
export const NOTIFICATION_KEYS = ['clearCache', 'addEntries', 'clearEntriesUnreadState', 'markEntriesUnreadGreaterThanSortIndex'] as const;

/**
 * 通知键联合类型
 */
export type NotificationKey = typeof NOTIFICATION_KEYS[number];

/**
 * 验证类型常量
 */
export const VERIFIED_TYPES = ['Business', 'Government', 'Blue', 'None'] as const;

/**
 * 验证类型联合类型
 */
export type VerifiedType = typeof VERIFIED_TYPES[number];

/**
 * 用户标签类型常量
 */
export const USER_LABEL_TYPES = ['BusinessLabel', 'AutomatedLabel'] as const;

/**
 * 用户标签类型联合类型
 */
export type UserLabelType = typeof USER_LABEL_TYPES[number];

/**
 * URL类型常量
 */
export const URL_TYPES = ['ExternalUrl', 'DeepLink', 'UrtEndpoint'] as const;

/**
 * URL类型联合类型
 */
export type UrlType = typeof URL_TYPES[number];

/**
 * 视图状态常量
 */
export const VIEW_STATES = ['EnabledWithCount', 'Enabled'] as const;

/**
 * 视图状态联合类型
 */
export type ViewState = typeof VIEW_STATES[number];

/**
 * 遗留卡片绑定键类型常量
 */
export const LEGACY_CARD_BINDING_KEY_TYPES = ['thumbnail_image', 'description', 'domain', 'thumbnail_image_large', 'thumbnail_image_original', 'thumbnail_image_small', 'thumbnail_image_x_large', 'thumbnail_image_color', 'summary_photo_image', 'summary_photo_image_small', 'summary_photo_image_large', 'summary_photo_image_x_large', 'summary_photo_image_original', 'summary_photo_image_color', 'photo_image_full_size_color', 'vanity_url', 'title', 'card_url', 'creator', 'site', 'player_image', 'player_image_small', 'player_image_large', 'player_image_x_large', 'player_image_original', 'player_image_color', 'player_url', 'player_width', 'player_height', 'app_name', 'app_is_free', 'app_star_rating', 'app_num_ratings', 'app_price_currency', 'unified_card', 'app_price_amount'] as const;

/**
 * 遗留卡片绑定键类型联合类型
 */
export type LegacyCardBindingKeyType = typeof LEGACY_CARD_BINDING_KEY_TYPES[number];

/**
 * 遗留卡片绑定值类型常量
 */
export const LEGACY_CARD_BINDING_VALUE_TYPES = ['STRING', 'IMAGE_COLOR', 'IMAGE', 'USER'] as const;

/**
 * 遗留卡片绑定值类型联合类型
 */
export type LegacyCardBindingValueType = typeof LEGACY_CARD_BINDING_VALUE_TYPES[number];

/**
 * ID前缀枚举
 * 用于标识不同类型的条目ID前缀
 */
export enum IdPrefixes {
  /**
   * 弹出广告
   */
  MessagePrompt = 'messageprompt-',

  /**
   * 正常推文
   */
  NormalTweet = 'tweet-',

  /**
   * 推广推文
   */
  PromotedTweet = 'promoted-tweet-',

  /**
   * 用户
   */
  User = 'user-',

  /**
   * 社区推荐
   */
  CommunityToJoin = 'community-to-join-',

  /**
   * 首页会话
   */
  HomeConversation = 'home-conversation-',

  /**
   * 具体会话
   */
  Conversationthread = 'conversationthread-',

  /**
   * 社区会话
   */
  CommunityConversation = 'community-conversation-',

  /**
   * 社区分组
   */
  CommunityGrid = 'communities-grid-',

  /**
   * 关注置顶推荐
   */
  PinnedTweets = 'pinned-tweets-',

  /**
   * 关注推荐
   */
  WhoToFollow = 'who-to-follow-',

  /**
   * 创伤者推荐
   */
  CreatorsOnlyConnectTab = 'creators-only-connect-tab-',

  /**
   * 更多
   */
  Label = 'label-',

  /**
   * 更多
   */
  Guide = 'Guide-',

  /**
   * 个人信息分组
   */
  ProfileGrid = 'profile-grid-',

  /**
   * 通知
   */
  Notification = 'notification-',

  /**
   * 游标
   */
  Cursor = 'cursor-',

  /**
   * 顶部游标
   */
  CursorTop = 'cursor-top-',

  /**
   * 底部游标
   */
  CursorBottom = 'cursor-bottom-',

  /**
   * 探索更多
   */
  TweetDetailRelatedTweets = 'tweetdetailrelatedtweets-',

  /**
   * 流行趋势
   */
  Trends = 'trends-',
}
