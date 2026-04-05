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
