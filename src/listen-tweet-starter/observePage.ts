import {observe} from "gs-dom/observer";
import {trigger} from "gs-dom/event";
import {ListenTweetEvents} from "../type";
import {ListenFlag} from "./ListenFlag";
import {getTweetId, primaryCellInnerSelector, primaryTweetSelector} from "../dom";

const containerSelector = 'main,main *'

function addedElements(els: HTMLElement[]) {
	if (!ListenFlag.flag?.enableTweetRendered) {
		return;
	}

	const tweets: string[] = []

	function processTarget(el: HTMLElement) {
		if (el.matches(primaryTweetSelector)) {
			const id = getTweetId(el);
			if (id) {
				tweets.push(id)
			}
			els.push(...el.querySelectorAll(primaryCellInnerSelector))
		} else if (el.matches(primaryCellInnerSelector)) {
			const id = getTweetId(el);
			if (id) {
				tweets.push(id)
			}
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
	if (tweets.length) {
		trigger<CustomEventInit>(ListenTweetEvents.TweetRendered, {detail: tweets});
	}

}

export function observePage() {
	observe({subtree: true, addedElements})
}
