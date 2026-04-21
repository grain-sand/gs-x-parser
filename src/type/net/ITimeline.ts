import { TimelineEntryType, TweetDisplayType, DisplayType, InjectionType } from './ITypes';
import {ITweet} from "./ITweet";

export interface ITimeline {
  instructions?: ITimelineInstruction[];
}

export interface ITimelineInstruction {
  type?: string;
  entries?: ITimelineEntry[];
  entry?: ITimelineEntry;
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
  clientEventInfo?: ITimelineClientEventInfo;
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
  clientEventInfo?: ITimelineClientEventInfo;
  content?: ITimelineMessageContent;
  impressionCallbacks?: IEndpointCallback[];
  display_type?: string;
  text?: string;
  socialContext?: ISocialContext;
}

export interface ISocialContext {
  contextType?: string;
  text?: string;
  type?: string;
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
  clientEventInfo?: ITimelineClientEventInfo;
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
  dispensable?: boolean;
}

export interface ITimelineModuleItemContent {
  itemContent?: ITimelineItemContent;
  clientEventInfo?: ITimelineClientEventInfo;
}

export interface ITimelineClientEventInfo {
  component?: string;
  details?: ITimelineClientEventDetails;
  element?: string;
}

export interface ITimelineClientEventDetails {
  conversationDetails?: ITimelineConversationDetails;
  timelinesDetails?: ITimelineTimelinesDetails;
}

export interface ITimelineConversationDetails {
  conversationSection?: string;
}

export interface ITimelineTimelinesDetails {
  controllerData?: string;
  injectionType?: InjectionType;
}
