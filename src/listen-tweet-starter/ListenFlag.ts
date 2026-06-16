import {IListenTweetOption} from "../type";
import {defHideProp} from "./defHideProp";

const ListenFlagKey = '__listen-tweet-flag-key'

export class ListenFlag {

	static #flag?: IListenTweetOption;

	static get flag(): IListenTweetOption | undefined {
		return this.#flag || (this.#flag = self[ListenFlagKey]);
	}

	static checkInit(arg?: IListenTweetOption): void {
		if (arg) {
			this.update(arg)
		}
	}

	static update(arg?: IListenTweetOption): void {
		if (self[ListenFlagKey]) {
			if (arg?.enableTweetDetected) self[ListenFlagKey].enableTweetDetected = true;
			if (arg?.enableUserDetected) self[ListenFlagKey].enableUserDetected = true;
		} else {
			defHideProp(ListenFlagKey, {...arg});
		}
		this.#flag = self[ListenFlagKey];
	}
}
