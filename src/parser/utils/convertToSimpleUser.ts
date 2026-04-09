import { IUser, ISimpleUser } from '../../type';

/**
 * 将IUser转换为ISimpleUser
 * @param user IUser对象
 * @returns ISimpleUser
 */
export function convertToSimpleUser(user: IUser): ISimpleUser {
  return {
    rest_id: user.rest_id,
    name: user.legacy?.name || '',
    screen_name: user.legacy?.screen_name || '',
    profile_image_url_https: user.legacy?.profile_image_url_https || '',
    verified: user.legacy?.verified,
    followers_count: user.legacy?.followers_count,
    friends_count: user.legacy?.friends_count,
    statuses_count: user.legacy?.statuses_count,
    description: user.legacy?.description,
    location: user.legacy?.location,
    url: user.legacy?.url,
    userLabelType: user.affiliates_highlighted_label?.label?.userLabelType,
    verified_type: user.legacy?.verified_type
  };
}
