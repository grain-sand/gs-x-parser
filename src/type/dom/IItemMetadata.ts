import { IClientEventInfo } from '../net/ITweet';
import { IModuleMetadata } from './IModuleMetadata';

export interface IItemMetadata {
	clientEventInfo?: IClientEventInfo;
	feedbackInfo?: any;
	reactiveTriggers?: any;
	moduleMetadata?: IModuleMetadata;
}
