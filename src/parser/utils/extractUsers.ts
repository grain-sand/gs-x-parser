import { IUser } from '../../type';

/**
 * 从数据中提取用户
 * @param data 任意对象
 * @returns IUser数组
 */
export function extractUsers(data: any): IUser[] {
  const users: IUser[] = [];
  const userIds = new Set<string>();

  // 处理 globalObjects.users 结构
  if (data?.globalObjects?.users) {
    Object.values(data.globalObjects.users).forEach((user: any) => {
      if (user && user.id_str && !userIds.has(user.id_str)) {
        // 添加 __typename 字段以保持一致性
        user.__typename = 'User';
        user.rest_id = user.id_str;
        userIds.add(user.id_str);
        users.push(user);
      }
    });
  }

  // 处理推荐用户结构 (users-recommendations.json)
  if (Array.isArray(data)) {
    data.forEach((item: any) => {
      if (item?.user && item.user.id_str && !userIds.has(item.user.id_str)) {
        const user = item.user;
        // 添加 __typename 字段以保持一致性
        user.__typename = 'User';
        user.rest_id = user.id_str;
        // 处理蓝V验证字段
        if (user.ext_is_blue_verified !== undefined) {
          user.is_blue_verified = user.ext_is_blue_verified;
        }
        userIds.add(user.id_str);
        users.push(user);
      }
    });
  }

  // 递归搜索用户
  const searchUsers = (obj: any) => {
    if (obj && typeof obj === 'object') {
      // 检查是否是用户对象（有id_str但可能没有__typename）
      if ((obj.__typename === 'User' || obj.id_str) && obj.id_str && !userIds.has(obj.id_str)) {
        // 添加 __typename 字段以保持一致性
        obj.__typename = 'User';
        obj.rest_id = obj.id_str;
        // 处理蓝V验证字段
        if (obj.ext_is_blue_verified !== undefined) {
          obj.is_blue_verified = obj.ext_is_blue_verified;
        }
        userIds.add(obj.id_str);
        users.push(obj);
      }

      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          searchUsers(obj[key]);
        }
      }
    } else if (Array.isArray(obj)) {
      obj.forEach(item => searchUsers(item));
    }
  };

  searchUsers(data);
  return users;
}
