import {IListenTweetOption} from "../type";
import {ListenFlag} from "./ListenFlag";
import {listenNet} from "./listenNet";
import {observePage} from "./observePage";

export function startListen(option: IListenTweetOption) {
	ListenFlag.checkInit(option)
	listenNet()
	observePage()
}
