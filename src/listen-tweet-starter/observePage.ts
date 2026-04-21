import {observe} from "gs-dom/observer";
import {trigger} from "gs-dom/event";
import {ListenTweetEvents} from "../type";
import {ListenFlag} from "./ListenFlag";
import {
	parseTweetIdByProps,
	primaryCellInnerSelector,
	primaryCellSelector,
	primaryItemSelector,
	primaryTweetSelector
} from "../dom";

const containerSelector = 'main,main *'
const itemAndInnerSelector = [primaryItemSelector, primaryCellInnerSelector].join(',')

function addedElements(els: HTMLElement[]) {
	const {enableVideoRendered: vr, enableTweetRendered: tr} = ListenFlag.flag || {}
	if (!vr && !tr) {
		return;
	}

	const tweets: string[] = []
	// const videoMap: Map<string, IGetTweetVideoIdResult> = new Map()

	function parseTweetId(el: HTMLElement) {
		const id = parseTweetIdByProps(el);
		if (id) {
			tweets.push(id)
		}
	}

	// function parseVideoId(el: HTMLElement, defaultTweet?: boolean) {
	// 	const id = parseTweetVideoIdByVideoContainer(el, defaultTweet);
	// 	if (id) {
	// 		videoMap.set(JSON.stringify(id), id)
	// 	}
	// }

	function processTarget(el: HTMLElement) {
		if (el.matches(primaryItemSelector)) {
			if (tr) parseTweetId(el);
			// if (vr) parseVideoId(el);
		} else if (el.matches(primaryCellSelector)) {
			if (tr) parseTweetId(el);
			// if (vr) parseVideoId(el);
			els.push(...el.querySelectorAll(itemAndInnerSelector))
		} else if (el.matches(primaryCellInnerSelector)) {
			if (tr) parseTweetId(el);
			// if (vr) parseVideoId(el);
		} else if (el.matches(containerSelector) && el.clientHeight > 300) {
			els.push(...el.querySelectorAll(primaryTweetSelector))
		}
	}

	for (let i = 0; i < els.length; i++) {
		try {
			processTarget(els[i]);
		} catch (e) {
			console.warn(e)
		}
	}
	if (tr && tweets.length) {
		trigger<CustomEventInit>(ListenTweetEvents.TweetRendered, {detail: tweets});
	}
	// if (vr && videoMap.size) {
	// 	trigger<CustomEventInit>(ListenTweetEvents.VideoRendered, {detail: [...videoMap.values()]});
	// }

}

export function observePage() {
	observe({subtree: true, addedElements})
}
