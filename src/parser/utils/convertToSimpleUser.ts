import {IUser, ISimpleUser} from '../../type';

/**
 * 将IUser转换为ISimpleUser
 * @param user IUser对象
 * @returns ISimpleUser
 */
export function convertToSimpleUser(user: IUser): ISimpleUser {
  return {
    rest_id: user.rest_id,
    name: (user.legacy?.name) || user.name || user.core?.name || '',
    screen_name: (user.legacy?.screen_name) || user.screen_name || user.core?.screen_name || '',
    profile_image_url_https: (user.legacy?.profile_image_url_https) || user.profile_image_url_https || user.avatar?.image_url || '',
    verified: (user.legacy?.verified) || user.verified || user.verification?.verified,
    blue_verified: user.is_blue_verified,
    followers_count: (user.legacy?.followers_count) || user.followers_count,
    friends_count: (user.legacy?.friends_count) || user.friends_count,
    statuses_count: (user.legacy?.statuses_count) || user.statuses_count,
    description: (user.legacy?.description) || user.description || user.profile_bio?.description || null,
	location: (user.legacy?.location) || (typeof user.location === 'string' ? user.location : user.location?.location || null),
    url: (user.legacy?.url) || user.url || null,
    userLabelType: user.affiliates_highlighted_label?.label?.userLabelType,
    verified_type: (user.legacy?.verified_type) || user.verified_type
  };
}
