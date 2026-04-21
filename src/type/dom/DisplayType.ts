// 定义 displayType 的所有可选值
export const DomDisplayTypes = [
  'Tweet',
  'defaultDisplayType',
  'FocalTweet',
  'MediaGrid',
  'User'
] as const;

// 从数组定义联合类型
export type DomDisplayType = typeof DomDisplayTypes[number];
