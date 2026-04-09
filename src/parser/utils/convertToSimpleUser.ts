import {IUser, ISimpleUser} from '../../type';

/**
 * 将IUser转换为ISimpleUser
 * @param user IUser对象
 * @returns ISimpleUser
 */
export function convertToSimpleUser(user: IUser): ISimpleUser {
  // 提取用户数据，优先使用 legacy 字段，其次直接使用 user 对象
  const userData = user.legacy || user;
  return {
    rest_id: user.rest_id,
    name: userData.name || (user.core && user.core.name) || '',
    screen_name: userData.screen_name || (user.core && user.core.screen_name) || '',
    profile_image_url_https: userData.profile_image_url_https || (user.avatar && user.avatar.image_url) || '',
    verified: userData.verified,
    blue_verified: user.is_blue_verified,
    followers_count: userData.followers_count,
    friends_count: userData.friends_count,
    statuses_count: userData.statuses_count,
    description: userData.description,
	  location: typeof userData.location === 'object' ? userData.location?.location : user.location as string || null,
    url: userData.url,
    userLabelType: user.affiliates_highlighted_label?.label?.userLabelType,
    verified_type: userData.verified_type
  };
}
