import {getTweetId} from "gs-dom/frs-probe";
import {observe} from "gs-dom/observer";
import {trigger} from "gs-dom/event";
import {ListenTweetEvents} from "../type";
import {ListenFlag} from "./ListenFlag";


const containerSelector = 'main,main *'

const regionSelector = 'main [data-testid="primaryColumn"] [role="region"]'

const cellSelector = `${regionSelector} [data-testid="cellInnerDiv"]`

const itemSelector = `${cellSelector} [role="listitem"]`

const tweetSelector = [cellSelector, itemSelector].join(',')


function addedElements(els: HTMLElement[]) {
	if (!ListenFlag.flag?.enableTweetRendered) {
		return;
	}

	const tweets: string[] = []

	function processTarget(el: HTMLElement) {
		if (el.matches(tweetSelector)) {
			const id = getTweetId(el);
			if (id) {
				tweets.push(id)
			}
		} else if (el.matches(containerSelector) && el.clientHeight > 300) {
			els.push(...el.querySelectorAll(tweetSelector))
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
