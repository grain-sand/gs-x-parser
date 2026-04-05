// 定义__typename的联合类型
export const USER_TYPENAMES = ['User'] as const;
export type UserTypename = typeof USER_TYPENAMES[number];

export const TWEET_TYPENAMES = ['Tweet'] as const;
export type TweetTypename = typeof TWEET_TYPENAMES[number];

export const COMMUNITY_TYPENAMES = ['Community'] as const;
export type CommunityTypename = typeof COMMUNITY_TYPENAMES[number];

export const TIMELINE_TYPENAMES = ['TimelineTimelineItem', 'TimelineMessagePrompt'] as const;
export type TimelineTypename = typeof TIMELINE_TYPENAMES[number];

export const TIMELINE_ITEM_TYPENAMES = ['TimelineTweet', 'TimelineMessagePrompt'] as const;
export type TimelineItemTypename = typeof TIMELINE_ITEM_TYPENAMES[number];

// 定义type的联合类型
export const TIMELINE_INSTRUCTION_TYPES = ['TimelineAddEntries'] as const;
export type TimelineInstructionType = typeof TIMELINE_INSTRUCTION_TYPES[number];

export const TIMELINE_ENTRY_TYPES = ['TimelineTimelineItem', 'TimelineModule'] as const;
export type TimelineEntryType = typeof TIMELINE_ENTRY_TYPES[number];

export const TIMELINE_ITEM_TYPES = ['TimelineTweet', 'TimelineMessagePrompt'] as const;
export type TimelineItemType = typeof TIMELINE_ITEM_TYPES[number];

export const MEDIA_TYPES = ['photo', 'video', 'animated_gif'] as const;
export type MediaType = typeof MEDIA_TYPES[number];
