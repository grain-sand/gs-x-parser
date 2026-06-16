import {addXhrInterceptor, removeXhrInterceptor} from "gs-web-hooks/xhr";
import {XParser} from "../parser";
import {ListenFlag} from "./ListenFlag";
import {trigger} from "gs-dom/event";
import {ListenTweetEvents} from "../type";
import {defHideProp} from "./defHideProp";

const timelineRegex = /(?:TweetDetail|Timeline|Bookmarks|UserTweets(?:AndReplies)?|UserHighlightsTweets|UserMedia|Likes)(?:\?|$)/
const ListenNetId = '__listen-tweet-interceptor'
const ListenNetVersion = 1;

export function listenNet() {
	const version = self[ListenNetId];
	if (version >= ListenNetVersion) {
		console.log('listen net exist version', version)
		return;
	}
	removeXhrInterceptor(ListenNetId);
	addXhrInterceptor({
		id: ListenNetId,
		before: (url) => timelineRegex.test(url) ? url : undefined,
		after: (text) => {
			const json = JSON.parse(text);
			const parsed = XParser.parseSimple(json, {
				includeAds: true,
				includeExploreMore: true,
				includeRecommendations: true
			});
			const {tweets, users, videos, cursor_bottom, cursor_top, next_cursor} = parsed
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
			if (
				tweets.length && !cursor_bottom && !next_cursor
				|| (cursor_bottom || cursor_top) && !tweets.length && !users.length
			) {
				trigger<CustomEventInit>(ListenTweetEvents.PageEnd, {detail: location.href});
			}
			console.log(parsed, json)
		}
	});
	defHideProp(ListenNetId, ListenNetVersion);
}
