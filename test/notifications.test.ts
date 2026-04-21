// noinspection TypeScriptUnresolvedReference

import {describe, expect, it} from 'vitest';
import {XParser} from '../src';
import fs from 'fs';
import path from 'path';

// 读取通知数据文件
const notificationsFiles = [
  'notifications-all.json',
  'notifications-all-2.json',
  'notifications-all-3.json',
  'notifications-all-card.json',
  'notifications-all-q-@.json',
  'notifications-mentions.json',
  'notifications-verified.json',
  'notifications-verified-2.json'
];

const getNotificationData = (fileName: string) => {
  const filePath = path.join(__dirname, '../tmp/net/notifications', fileName);
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
};

describe('XParser notifications parsing', () => {
  notificationsFiles.forEach((fileName) => {
    describe(`Parsing ${fileName}`, () => {
      it('should parse notifications data into ISimpleResult', () => {
        const data = getNotificationData(fileName);
        const result = XParser.parseSimple(data);

        // 验证结果结构
        expect(result).toBeDefined();
        expect(typeof result).toBe('object');

        // 验证用户解析
        expect(result.users).toBeDefined();
        expect(Array.isArray(result.users)).toBe(true);

        // 如果有用户数据，验证用户字段
        if (result.users.length > 0) {
          result.users.forEach((user) => {
            expect(user.rest_id).toBeDefined();
          });
        }

        // 验证推文解析
        expect(result.tweets).toBeDefined();
        expect(Array.isArray(result.tweets)).toBe(true);

        // 如果有推文数据，验证推文字段
        if (result.tweets.length > 0) {
          result.tweets.forEach((tweet) => {
            expect(tweet.rest_id).toBeDefined();
            expect(tweet.full_text).toBeDefined();
            expect(tweet.created_at).toBeDefined();
            expect(tweet.user).toBeDefined();
            expect(tweet.user.rest_id).toBeDefined();
          });
        }
      });

      it('should parse notifications data into IOriginalResult', () => {
        const data = getNotificationData(fileName);
        const result = XParser.parseOriginal(data);

        // 验证结果结构
        expect(result).toBeDefined();
        expect(typeof result).toBe('object');

        // 验证用户解析
        expect(result.users).toBeDefined();
        expect(Array.isArray(result.users)).toBe(true);

        // 验证推文解析
        expect(result.tweets).toBeDefined();
        expect(Array.isArray(result.tweets)).toBe(true);

        // 如果有推文数据，验证推文字段
        if (result.tweets.length > 0) {
          result.tweets.forEach((tweet) => {
            expect(tweet.rest_id).toBeDefined();
            // 检查是否有 legacy 字段，如果没有则检查其他可能的字段结构
            if (tweet.legacy) {
              expect(tweet.legacy?.full_text).toBeDefined();
              expect(tweet.legacy?.created_at).toBeDefined();
            } else if (tweet.full_text) {
              // 直接在 tweet 对象上检查字段
              expect(tweet.full_text).toBeDefined();
              expect(tweet.created_at).toBeDefined();
            }
          });
        }
      });
    });
  });
});
