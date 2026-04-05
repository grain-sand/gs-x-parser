// 简单Result类型，包含所有简单User、Tweet、各种媒体、游标标识等
import { ISimpleUser } from './ISimpleUser';
import { ISimpleTweet } from './ISimpleTweet';
import { IUser } from './IUser';
import { ITweet } from './ITweet';

// Result的基类，支持泛型
export interface IResultBase<UserType extends ISimpleUser | IUser, TweetType extends ISimpleTweet | ITweet> {
  users?: UserType[];
  tweets?: TweetType[];
  photos?: TweetType[]; // 包含图片的推文数组
  videos?: TweetType[]; // 包含视频的推文数组
  urls?: TweetType[]; // 包含URL的推文数组
  next_cursor?: string;
  next_cursor_str?: string;
  previous_cursor?: string;
  previous_cursor_str?: string;
  cursor_top?: string;
  cursor_bottom?: string;
  total_count?: number;
  has_more_items?: boolean;
  new_latent_count?: number;
}

// 基于简单类型的Result
export interface ISimpleResult extends IResultBase<ISimpleUser, ISimpleTweet> {
}

// 基于原始类型的Result
export interface IOriginalResult extends IResultBase<IUser, ITweet> {
}
