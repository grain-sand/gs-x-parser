import {DomDisplayType} from './DisplayType';
import {ITweet} from '../net/ITweet';


export interface IContent {
	id?: string;
	prerollMetadata?: any;
	promotedMetadata?: any;
	displayType?: DomDisplayType;
	tweetContext?: any;
	socialContext?: any;
	innerTombstoneInfo?: any;
	forwardPivot?: any;
	hasModeratedReplies?: any;
	ruxContext?: any;
	conversation_annotation?: any;
	retweetedStatusId?: any;
	replyBadge?: any;
	highlights?: any;
	grok_translated_post?: any;
	count?: number;
	lastRevealedTimestamp?: number | null;
	tweet?: ITweet;
}
