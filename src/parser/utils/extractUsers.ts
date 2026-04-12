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

  // 处理 BlueVerifiedFollowers 结构
  if (data?.data?.user?.result?.timeline?.timeline?.instructions) {
    data.data.user.result.timeline.timeline.instructions.forEach((instruction: any) => {
      if (instruction.type === 'TimelineAddEntries' && instruction.entries) {
        instruction.entries.forEach((entry: any) => {
          if (entry.content?.itemContent?.user_results?.result) {
            const user = entry.content.itemContent.user_results.result;
            if (user && user.rest_id && !userIds.has(user.rest_id)) {
              // 确保有id_str字段
              if (!user.id_str) {
                user.id_str = user.rest_id;
              }
              userIds.add(user.rest_id);
              users.push(user);
            }
          }
        });
      }
    });
  }

  // 处理 Bookmarks 结构
  if (data?.data?.bookmark_timeline_v2?.timeline?.instructions) {
    data.data.bookmark_timeline_v2.timeline.instructions.forEach((instruction: any) => {
      if (instruction.type === 'TimelineAddEntries' && instruction.entries) {
        instruction.entries.forEach((entry: any) => {
          if (entry.content?.itemContent?.tweet_results?.result?.core?.user_results?.result) {
            const user = entry.content.itemContent.tweet_results.result.core.user_results.result;
            if (user && user.rest_id && !userIds.has(user.rest_id)) {
              // 确保有id_str字段
              if (!user.id_str) {
                user.id_str = user.rest_id;
              }
              userIds.add(user.rest_id);
              users.push(user);
            }
          }
        });
      }
    });
  }

  // 处理通知时间线结构
  if (data?.data?.viewer_v2?.user_results?.result?.notification_timeline?.timeline?.instructions) {
    data.data.viewer_v2.user_results.result.notification_timeline.timeline.instructions.forEach((instruction: any) => {
      if (instruction.entries) {
        instruction.entries.forEach((entry: any) => {
          if (entry.content?.itemContent?.template?.from_users) {
            entry.content.itemContent.template.from_users.forEach((fromUser: any) => {
              if (fromUser?.user_results?.result) {
                const user = fromUser.user_results.result;
                if (user && user.rest_id && !userIds.has(user.rest_id)) {
                  // 确保有id_str字段
                  if (!user.id_str) {
                    user.id_str = user.rest_id;
                  }
                  userIds.add(user.rest_id);
                  users.push(user);
                }
              }
            });
          }
          if (entry.content?.itemContent?.template?.target_objects) {
            entry.content.itemContent.template.target_objects.forEach((targetObject: any) => {
              if (targetObject?.tweet_results?.result?.core?.user_results?.result) {
                const user = targetObject.tweet_results.result.core.user_results.result;
                if (user && user.rest_id && !userIds.has(user.rest_id)) {
                  // 确保有id_str字段
                  if (!user.id_str) {
                    user.id_str = user.rest_id;
                  }
                  userIds.add(user.rest_id);
                  users.push(user);
                }
              }
            });
          }
        });
      }
    });
  }

  // 递归搜索用户
  const searchUsers = (obj: any) => {
    if (obj && typeof obj === 'object') {
      // 更严格地检查是否是用户对象：
      // 1. 必须有 __typename === 'User'
      // 2. 必须有 rest_id 或 id_str
      // 3. 不能有推文特征字段：core（特别是core.user_results）或 legacy.full_text
      // 4. 应该有用户特征字段：如 name、screen_name 或 legacy 字段
      const userId = obj.id_str || obj.rest_id;
      const isUser = obj.__typename === 'User' &&
                     userId &&
                     !userIds.has(userId) &&
                     !obj.core?.user_results &&
                     !obj.legacy?.full_text &&
                     (obj.name || obj.screen_name || obj.legacy);

      if (isUser) {
        // 添加 __typename 字段以保持一致性
        obj.__typename = 'User';
        // 确保有rest_id字段
        if (!obj.rest_id) {
          obj.rest_id = userId;
        }
        // 确保有id_str字段
        if (!obj.id_str) {
          obj.id_str = userId;
        }
        // 处理蓝V验证字段
        if (obj.ext_is_blue_verified !== undefined) {
          obj.is_blue_verified = obj.ext_is_blue_verified;
        }
        userIds.add(userId);
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
