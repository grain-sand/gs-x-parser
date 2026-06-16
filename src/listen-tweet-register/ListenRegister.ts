import {IRenderedTweet, ISimpleTweet, ISimpleUser, ListenTweetEvents} from "../type";
import {on} from "gs-dom/event";

export class ListenRegister {

	static addVideoDetectedListener(listener: (videos: ISimpleTweet[]) => void) {
		on(ListenTweetEvents.VideoDetected, ({detail}: CustomEvent) => listener(detail))
	}

	static addTweetDetectedListener(listener: (tweets: ISimpleTweet[]) => void) {
		on(ListenTweetEvents.TweetDetected, ({detail}: CustomEvent) => listener(detail))
	}

	static addUserDetectedListener(listener: (users: ISimpleUser[]) => void) {
		on(ListenTweetEvents.UserDetected, ({detail}: CustomEvent) => listener(detail))
	}

	static addTweetRenderedListener(listener: (tweets: IRenderedTweet[]) => void) {
		on(ListenTweetEvents.TweetRendered, ({detail}: CustomEvent) => listener(detail))
	}

	// static addVideoRenderedListener(listener: (tweetIds: IGetTweetVideoIdResult[]) => void) {
	// 	on(ListenTweetEvents.VideoRendered, ({detail}: CustomEvent) => listener(detail))
	// }

	static addPageEndListener(listener: (url: string) => void) {
		on(ListenTweetEvents.PageEnd, ({detail}: CustomEvent) => listener(detail))
	}
}
