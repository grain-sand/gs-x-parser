import { IUser } from '../../type';

/**
 * 从数据中提取用户
 * @param data 任意对象
 * @returns IUser数组
 */
export function extractUsers(data: any): IUser[] {
  const users: IUser[] = [];

  // 处理 globalObjects.users 结构
  if (data?.globalObjects?.users) {
    Object.values(data.globalObjects.users).forEach((user: any) => {
      if (user && user.id_str) {
        // 添加 __typename 字段以保持一致性
        user.__typename = 'User';
        user.rest_id = user.id_str;
        users.push(user);
      }
    });
  }

  // 递归搜索用户
  const searchUsers = (obj: any) => {
    if (obj && typeof obj === 'object') {
      if (obj.__typename === 'User' && obj.rest_id) {
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
