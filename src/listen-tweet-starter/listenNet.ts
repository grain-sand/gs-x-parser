import {addXhrInterceptor} from "gs-web-hooks/xhr";
import {XParser} from "../parser";
import {ListenFlag} from "./ListenFlag";
import {trigger} from "gs-dom/event";
import {ListenTweetEvents} from "../type";

const timelineRegex = /TweetDetail|Timeline|Bookmarks|UserTweets|UserMedia|Likes/
const id = '__listen-tweet-interceptor'

export function listenNet() {
	addXhrInterceptor({
		id,
		before: (url) => timelineRegex.test(url) ? url : undefined,
		after: (text) => {
			const json = JSON.parse(text);
			const {tweets, users, videos} = XParser.parseSimple(json);
			const flag = ListenFlag.flag || {}
			if (flag.enableVideoDetected && videos?.length) try {
				trigger<CustomEventInit>(ListenTweetEvents.VideoDetected, {detail: videos});
			} catch {
			}
			if (flag.enableTweetDetected && tweets?.length) try {
				trigger<CustomEventInit>(ListenTweetEvents.UserDetected, {detail: tweets});
			} catch {
			}
			if (flag.enableUserDetected && users?.length) try {
				trigger<CustomEventInit>(ListenTweetEvents.UserDetected, {detail: users});
			} catch {
			}
		}
	});
}
