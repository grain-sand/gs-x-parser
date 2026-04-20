import {IListenTweetOption} from "../type";

const ListenFlagKey = '__listen-tweet-flag-key'

export class ListenFlag {

	static #flag?: IListenTweetOption;

	static get flag(): IListenTweetOption | undefined {
		return this.#flag || (this.#flag = self[ListenFlagKey]);
	}

	static isInit(arg?: IListenTweetOption): boolean {
		const init = !!this.flag;
		if (arg) {
			this.update(arg)
		}
		return init;
	}

	static update(arg?: IListenTweetOption): void {
		if (self[ListenFlagKey]) {
			if (arg?.enableTweetDetected) self[ListenFlagKey].enableTweetDetected = true;
			if (arg?.enableUserDetected) self[ListenFlagKey].enableUserDetected = true;
		} else {
			Object.defineProperty(self, ListenFlagKey, {
				value: {...arg},
				enumerable: false,
				configurable: false,
				writable: false,
			})
		}
		this.#flag = self[ListenFlagKey];
	}
}
