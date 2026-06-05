import {primaryCellSelector, primaryItemSelector, primaryPreviewVideoSelector} from "./Selectors";
import {parseTweetIdByDom} from "./parseTweetIdByDom";
import {IGetTweetVideoIdResult} from "../type";

const ImageVideoIdRegex = /(?:video_thumb|card_img)\/(\d+)/
const LinkVideoIdRegex = /status\/(\d+)\/video\/(\d+)/
const ImageSelector = 'img[src^="https://pbs.twimg.com/media/"]'

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
	const videoIdImg = <HTMLImageElement>el.querySelector('img[src*="video_thumb/"],img[src*="card_img/"]');
	if (videoIdImg) {
		const videoId = ImageVideoIdRegex.exec(videoIdImg.src)?.[1];
		if (videoId) {
			return {videoId}
		}
	}
	const previewImg = <HTMLImageElement>el.querySelector(ImageSelector);
	if (previewImg) {
		return {
			imgUrl: previewImg.src.split('?')[0],
		}
	}
	const cell = <HTMLElement>el.closest(primaryCellSelector)
	if(cell) {
		// status/2046284836067758322/video/1
		const link = <HTMLLinkElement>cell.querySelector('a[href*="/status/"][href*="/video/"],a[href*="/status/"]');
		if (link) {
			const match = LinkVideoIdRegex.exec(link.href);
			const tweetId = match?.[1]
			if (tweetId) {
				return {
					tweetId,
					index: parseInt(match![2]) || 0
				}
			}
		}
		if (defaultTweet) {
			const tweetId = parseTweetIdByDom(cell)
			if (tweetId) {
				let index = Array.from(cell.querySelectorAll(primaryPreviewVideoSelector)).indexOf(el);
				if (index === -1) index = 0;
				return {index, tweetId}
			}
		}
	}
}
