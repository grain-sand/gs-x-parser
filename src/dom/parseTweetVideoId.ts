import {primaryItemSelector, primaryPreviewVideoSelector} from "./Selectors";
import {parseTweetIdByDom} from "./parseTweetIdByDom";
import {IGetTweetVideoIdResult} from "../type";

const ImageVideoIdRegex = /(?:video_thumb|card_img)\/(\d+)/
const LinkVideoIdRegex = /status\/(\d+)\/video\/(\d+)/

export function parseTweetVideoId(el: Element): IGetTweetVideoIdResult | undefined {
	if (!el) return
	const itemEl = <HTMLElement>(el.matches(primaryItemSelector) ? el : el.closest(primaryItemSelector))
	if (itemEl) {
		return parseTweetVideoIdByVideoContainer(itemEl)
	}
	return parseTweetVideoIdByVideoContainer(<HTMLElement>(el.matches(primaryPreviewVideoSelector) ? el : el.closest(primaryPreviewVideoSelector)), true)
}

export function parseTweetVideoIdByVideoContainer(el: HTMLElement, defaultTweet?: boolean): IGetTweetVideoIdResult | undefined {
	if (!el) {
		return;
	}
	const img = <HTMLImageElement>el.querySelector('img[src*="video_thumb/"],img[src*="card_img/"]');
	if (img) {
		const videoId = ImageVideoIdRegex.exec(img.src)?.[1];
		if (videoId) {
			return {videoId: videoId}
		}
	}
	// status/2046284836067758322/video/1
	const link = <HTMLLinkElement>el.querySelector('a[href*="/status/"][href*="/video/"]');
	if (!link) {
		if (!defaultTweet) {
			return
		}
		const tweetId = parseTweetIdByDom(el)
		if (tweetId) {
			let index = Array.from(el.querySelectorAll(primaryPreviewVideoSelector)).indexOf(el);
			if (index === -1) index = 0;
			return {index, tweetId}
		}
		return;
	}
	const match = LinkVideoIdRegex.exec(link.href);
	const tweetId = match?.[1]
	if (tweetId) {
		return
	}
	return {
		tweetId,
		index: parseInt(match![2]) || 0
	}
}
