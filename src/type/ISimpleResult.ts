/**
 * 简单Result类型，包含所有简单User、Tweet、各种媒体、游标标识等
 */
import { ISimpleUser } from './ISimpleUser';
import { ISimpleTweet } from './ISimpleTweet';
import { IUser } from './IUser';
import { ITweet } from './ITweet';

/**
 * Result的基类，支持泛型
 * @template UserType - 用户类型，必须是ISimpleUser或IUser
 * @template TweetType - 推文类型，必须是ISimpleTweet或ITweet
 */
export interface IResultBase<UserType extends ISimpleUser | IUser, TweetType extends ISimpleTweet | ITweet> {
  /** 用户数组 */
  users?: UserType[];
  /** 推文数组 */
  tweets?: TweetType[];
  /** 包含图片的推文数组 */
  photos?: TweetType[];
  /** 包含视频的推文数组 */
  videos?: TweetType[];
  /** 包含URL的推文数组 */
  urls?: TweetType[];
  /** 下一页游标 */
  next_cursor?: string;
  /** 下一页游标字符串 */
  next_cursor_str?: string;
  /** 上一页游标 */
  previous_cursor?: string;
  /** 上一页游标字符串 */
  previous_cursor_str?: string;
  /** 顶部游标 */
  cursor_top?: string;
  /** 底部游标 */
  cursor_bottom?: string;
  /** 总数 */
  total_count?: number;
  /** 是否有更多项目 */
  has_more_items?: boolean;
  /** 新的潜在计数 */
  new_latent_count?: number;
}

/**
 * 基于简单类型的Result
 */
export interface ISimpleResult extends IResultBase<ISimpleUser, ISimpleTweet> {
}

/**
 * 基于原始类型的Result
 */
export interface IOriginalResult extends IResultBase<IUser, ITweet> {
}
