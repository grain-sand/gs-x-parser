import { ITweet } from './ITweet';

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
  entryType?: string;
  __typename?: string;
  itemContent?: ITimelineItemContent;
  items?: ITimelineModuleItem[];
  displayType?: string;
  clientEventInfo?: IClientEventInfo;
  feedbackInfo?: IFeedbackInfo;
}

export interface ITimelineItemContent {
  itemType?: string;
  __typename?: string;
  tweet_results?: ITweetResults;
  tweetDisplayType?: string;
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
}
