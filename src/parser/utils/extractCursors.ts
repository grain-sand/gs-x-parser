/**
 * 从数据中提取游标
 * @param data 任意对象
 * @param result 结果对象
 */
export function extractCursors(data: any, result: any): void {
  // 递归搜索游标
  const searchCursors = (obj: any) => {
    if (obj && typeof obj === 'object') {
      // 检查游标字段
      if (obj.cursor_top) result.cursor_top = obj.cursor_top;
      if (obj.cursor_bottom) result.cursor_bottom = obj.cursor_bottom;
      if (obj.next_cursor) result.next_cursor = obj.next_cursor;
      if (obj.next_cursor_str) result.next_cursor_str = obj.next_cursor_str;
      if (obj.previous_cursor) result.previous_cursor = obj.previous_cursor;
      if (obj.previous_cursor_str) result.previous_cursor_str = obj.previous_cursor_str;

      // 检查其他可能的游标字段
      if (obj.entryId && (obj.entryId.startsWith('cursor-top-') || obj.entryId.startsWith('cursor-bottom-'))) {
        if (obj.content && obj.content.value) {
          if (obj.entryId.startsWith('cursor-top-')) {
            result.cursor_top = obj.content.value;
          } else {
            result.cursor_bottom = obj.content.value;
          }
        }
      }

      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          searchCursors(obj[key]);
        }
      }
    } else if (Array.isArray(obj)) {
      obj.forEach(item => searchCursors(item));
    }
  };

  searchCursors(data);
}
