/**
 * 简单用户类型，仅保留必须的标识字段、核心数据字段、用于显示的字段
 */
export interface ISimpleUser {
  /** 用户ID */
  id: string;
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
  /** 粉丝数 */
  followers_count?: number;
  /** 关注数 */
  friends_count?: number;
  /** 推文数 */
  statuses_count?: number;
  /** 个人简介 */
  description?: string;
  /** 位置 */
  location?: string;
  /** 个人网站 */
  url?: string;
}
