import {observe} from "gs-dom/observer";
import {trigger} from "gs-dom/event";
import {IRenderedTweet, ListenTweetEvents} from "../type";
import {ListenFlag} from "./ListenFlag";
import {
	parseTweetIdByProps,
	primaryCellInnerSelector,
	primaryCellSelector,
	primaryItemSelector,
	primaryTweetSelector
} from "../dom";
import {defHideProp} from "./defHideProp";

const containerSelector = 'main,main *'
const itemAndInnerSelector = [primaryItemSelector, primaryCellInnerSelector].join(',')

const ObservePageKey = '__listen-tweet-observe-page-key'
const ObservePageVersion = 1;

interface IObservePageRecord {
	observer: MutationObserver
	version: number
}

function addedElements(els: HTMLElement[]) {
	const {enableVideoRendered: vr, enableTweetRendered: tr} = ListenFlag.flag || {}
	if (!vr && !tr) {
		return;
	}

	const tweetMap: Map<string, IRenderedTweet> = new Map()

	// const videoMap: Map<string, IGetTweetVideoIdResult> = new Map()

	function parseTweetId(el: HTMLElement) {
		const id = parseTweetIdByProps(el);
		if (!id || tweetMap.has(id)) return
		el = el.matches(primaryCellSelector) ? el : el.closest(primaryCellSelector) as HTMLElement
		tweetMap.set(id, {id, url: location.href, top: parseInt(el.style.transform?.replace(/\D+/g, ''))})
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
	if (tr && tweetMap.size) {
		trigger<CustomEventInit>(ListenTweetEvents.TweetRendered, {detail: [...tweetMap.values()]});
	}
	// if (vr && videoMap.size) {
	// 	trigger<CustomEventInit>(ListenTweetEvents.VideoRendered, {detail: [...videoMap.values()]});
	// }

}

export function observePage() {
	try {
		const record = self[ObservePageKey] as IObservePageRecord
		if (record?.version >= ObservePageVersion) return
		record?.observer?.disconnect()
	} catch {
	}
	const observer = observe({subtree: true, addedElements})
	defHideProp<IObservePageRecord>(ObservePageKey, {
		observer,
		version: ObservePageVersion,
	})
}
