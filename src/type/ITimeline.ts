import { ITweet } from './index';
import { TimelineEntryType, TweetDisplayType, DisplayType, InjectionType } from './ITypes';

export interface ITimeline {
  instructions?: ITimelineInstruction[];
}

export interface ITimelineInstruction {
  type?: string;
  entries?: ITimelineEntry[];
}

export interface ITimelineEntry {
  entryId?: string;
  sortIndex?: string;
  content?: ITimelineContent;
}

export interface ITimelineContent {
  entryType?: TimelineEntryType;
  __typename?: string;
  itemContent?: ITimelineItemContent;
  items?: ITimelineModuleItem[];
  displayType?: DisplayType;
  clientEventInfo?: IClientEventInfo;
  feedbackInfo?: IFeedbackInfo;
  metadata?: IMetadata;
}

export interface IMetadata {
  conversationMetadata?: IConversationMetadata;
}

export interface IConversationMetadata {
  allTweetIds?: string[];
  enableDeduplication?: boolean;
}

export interface ITimelineItemContent {
  itemType?: string;
  __typename?: string;
  tweet_results?: ITweetResults;
  tweetDisplayType?: TweetDisplayType;
  hasModeratedReplies?: boolean;
  clientEventInfo?: IClientEventInfo;
  content?: ITimelineMessageContent;
  impressionCallbacks?: IEndpointCallback[];
}

export interface ITimelineMessageContent {
  contentType?: string;
  headerText?: string;
  bodyText?: string;
  primaryButtonAction?: IButtonAction;
  headerRichText?: IRichText;
  bodyRichText?: IRichText;
}

export interface IButtonAction {
  text?: string;
  action?: IAction;
}

export interface IAction {
  url?: string;
  dismissOnClick?: boolean;
  onClickCallbacks?: IEndpointCallback[];
  clientEventInfo?: IClientEventInfo;
}

export interface IEndpointCallback {
  endpoint?: string;
}

export interface IRichText {
  text?: string;
  entities?: any[];
}

export interface IFeedbackInfo {
  feedbackKeys?: string[];
}

export interface ITweetResults {
  result?: ITweet;
}

export interface ITimelineModuleItem {
  entryId?: string;
  item?: ITimelineModuleItemContent;
}

export interface ITimelineModuleItemContent {
  itemContent?: ITimelineItemContent;
  clientEventInfo?: IClientEventInfo;
}

export interface IClientEventInfo {
  details?: IClientEventDetails;
}

export interface IClientEventDetails {
  conversationDetails?: IConversationDetails;
  timelinesDetails?: ITimelinesDetails;
}

export interface IConversationDetails {
  conversationSection?: string;
}

export interface ITimelinesDetails {
  controllerData?: string;
  injectionType?: InjectionType;
}
