// 简单用户类型，仅保留必须的标识字段、核心数据字段、用于显示的字段
export interface ISimpleUser {
  id: string;
  rest_id: string;
  name: string;
  screen_name: string;
  profile_image_url_https: string;
  verified?: boolean;
  followers_count?: number;
  friends_count?: number;
  statuses_count?: number;
  description?: string;
  location?: string;
  url?: string;
}
