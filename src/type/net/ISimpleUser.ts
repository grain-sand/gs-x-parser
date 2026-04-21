/**
 * 简单用户类型，仅保留必须的标识字段、核心数据字段、用于显示的字段
 */
import { UserLabelType, VerifiedType } from './ITypes';

export interface ISimpleUser {
  /** 用户REST ID */
  rest_id: string;
  /** 用户名 */
  name: string;
  /** 用户屏幕名称 */
  screen_name: string;
  /** 头像URL */
  profile_image_url_https: string;
  /** 是否验证 */
  verified?: boolean;
  /** 是否蓝V验证 */
  blue_verified?: boolean;
  /** 粉丝数 */
  followers_count?: number;
  /** 关注数 */
  friends_count?: number;
  /** 推文数 */
  statuses_count?: number;
  /** 个人简介 */
  description?: string | null;
  /** 位置 */
  location?: string | null;
  /** 个人网站 */
  url?: string | null;
  /** 用户标签类型 */
  userLabelType?: UserLabelType;
  /** 验证类型 */
  verified_type?: VerifiedType;
}
