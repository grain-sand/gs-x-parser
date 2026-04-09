// noinspection TypeScriptUnresolvedReference

/**
 * XParser 单元测试
 */
import {describe, expect, it} from 'vitest';
import {XParser} from '../src';
import {convertToSimpleUser} from '../src/parser/utils/convertToSimpleUser';
import {convertToSimpleTweet} from '../src/parser/utils/convertToSimpleTweet';
import * as fs from 'fs';
import * as path from 'path';

// 读取tmp目录下的所有JSON文件
const tmpDir = path.join(__dirname, '../tmp');
const jsonFiles: string[] = [];

function findJsonFiles(dir: string) {
	const files = fs.readdirSync(dir);
	files.forEach(file => {
		const filePath = path.join(dir, file);
		const stat = fs.statSync(filePath);
		if (stat.isDirectory()) {
			findJsonFiles(filePath);
		} else if (file.endsWith('.json')) {
			jsonFiles.push(filePath);
		}
	});
}

findJsonFiles(tmpDir);

describe('XParser', () => {
	// 测试转换方法
	describe('convertToSimpleUser', () => {
		it('should convert IUser to ISimpleUser', () => {
			const mockUser: any = {
				__typename: 'User',
				rest_id: '12345',
				legacy: {
					name: 'Test User',
					screen_name: 'testuser',
					profile_image_url_https: 'https://example.com/avatar.jpg',
					verified: true,
					followers_count: 1000,
					friends_count: 500,
					statuses_count: 100,
					description: 'Test description',
					location: 'Test Location',
					url: 'https://example.com',
					verified_type: 'Blue'
				},
				affiliates_highlighted_label: {
					label: {
						userLabelType: 'BusinessLabel'
					}
				}
			};

			const simpleUser = convertToSimpleUser(mockUser);

			expect(simpleUser.rest_id).toBe('12345');
			expect(simpleUser.name).toBe('Test User');
			expect(simpleUser.screen_name).toBe('testuser');
			expect(simpleUser.profile_image_url_https).toBe('https://example.com/avatar.jpg');
			expect(simpleUser.verified).toBe(true);
			expect(simpleUser.followers_count).toBe(1000);
			expect(simpleUser.friends_count).toBe(500);
			expect(simpleUser.statuses_count).toBe(100);
			expect(simpleUser.description).toBe('Test description');
			expect(simpleUser.location).toBe('Test Location');
			expect(simpleUser.url).toBe('https://example.com');
			expect(simpleUser.userLabelType).toBe('BusinessLabel');
			expect(simpleUser.verified_type).toBe('Blue');
		});
	});

	describe('convertToSimpleTweet', () => {
		it('should convert ITweet to ISimpleTweet', () => {
			const mockTweet: any = {
				__typename: 'Tweet',
				rest_id: '67890',
				legacy: {
					full_text: 'Test tweet',
					created_at: '2024-01-01T00:00:00Z',
					user_id_str: '12345',
					retweet_count: 10,
					favorite_count: 20,
					reply_count: 5,
					quote_count: 3,
					lang: 'en',
					conversation_id_str: '67890',
					possibly_sensitive: false,
					retweeted_status_id_str: '54321',
					quoted_status_id_str: '98765',
					extended_entities: {
						media: [
							{
								media_key: '3_67890',
								type: 'photo',
								media_url_https: 'https://example.com/photo.jpg',
								display_url: 'pic.twitter.com/abc123',
								expanded_url: 'https://twitter.com/testuser/status/67890/photo/1',
								sizes: {
									thumb: {w: 150, h: 150, resize: 'crop'},
									small: {w: 480, h: 360, resize: 'fit'},
									medium: {w: 600, h: 450, resize: 'fit'},
									large: {w: 1024, h: 768, resize: 'fit'}
								},
								original_info: {
									width: 1024,
									height: 768
								}
							}
						]
					},
					entities: {
						urls: [
							{
								url: 'https://t.co/abc123',
								expanded_url: 'https://example.com',
								display_url: 'example.com'
							}
						]
					}
				}
			};

			const simpleTweet = convertToSimpleTweet(mockTweet);

			expect(simpleTweet.rest_id).toBe('67890');
			expect(simpleTweet.full_text).toBe('Test tweet');
			expect(simpleTweet.created_at).toBe('2024-01-01T00:00:00Z');
			expect(simpleTweet.user).toBeDefined();
			expect(simpleTweet.user.rest_id).toBe('12345');
			expect(simpleTweet.retweet_count).toBe(10);
			expect(simpleTweet.favorite_count).toBe(20);
			expect(simpleTweet.reply_count).toBe(5);
			expect(simpleTweet.quote_count).toBe(3);
			expect(simpleTweet.lang).toBe('en');
			expect(simpleTweet.conversation_id).toBe('67890');
			expect(simpleTweet.possibly_sensitive).toBe(false);
			expect(simpleTweet.is_retweet).toBe(true);
			expect(simpleTweet.retweeted_status_id).toBe('54321');
			expect(simpleTweet.quoted_status_id).toBe('98765');
			expect(simpleTweet.photos).toBeDefined();
			expect(simpleTweet.photos?.length).toBe(1);
			expect(simpleTweet.urls).toBeDefined();
			expect(simpleTweet.urls?.length).toBe(1);
		});
	});

	// 测试parseSimple方法
	describe('parseSimple', () => {
		jsonFiles.forEach(filePath => {
			it(`should parse ${path.basename(filePath)} to ISimpleResult`, () => {
				const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
				const result = XParser.parseSimple(data);

				// 验证返回类型
				expect(result).toBeDefined();
				expect(typeof result).toBe('object');

				// 验证游标字段类型
				if (result.cursor_top) expect(typeof result.cursor_top).toBe('string');
				if (result.cursor_bottom) expect(typeof result.cursor_bottom).toBe('string');
				if (result.next_cursor) expect(typeof result.next_cursor).toBe('string');
				if (result.next_cursor_str) expect(typeof result.next_cursor_str).toBe('string');
				if (result.previous_cursor) expect(typeof result.previous_cursor).toBe('string');
				if (result.previous_cursor_str) expect(typeof result.previous_cursor_str).toBe('string');

				// 验证推文数组
				if (result.tweets) {
					expect(Array.isArray(result.tweets)).toBe(true);
					result.tweets.forEach(tweet => {
						expect(tweet).toBeDefined();
						expect(typeof tweet).toBe('object');
						expect(tweet.rest_id).toBeDefined();
						expect(typeof tweet.rest_id).toBe('string');
						expect(tweet.full_text).toBeDefined();
						expect(typeof tweet.full_text).toBe('string');
						expect(tweet.created_at).toBeDefined();
						expect(typeof tweet.created_at).toBe('string');
						expect(tweet.user).toBeDefined();
						expect(typeof tweet.user).toBe('object');
						expect(tweet.user.rest_id).toBeDefined();
						expect(typeof tweet.user.rest_id).toBe('string');
					});
				}

				// 验证分类推文
				if (result.photos) expect(Array.isArray(result.photos)).toBe(true);
				if (result.videos) expect(Array.isArray(result.videos)).toBe(true);
				if (result.urls) expect(Array.isArray(result.urls)).toBe(true);
			});
		});
	});

	// 测试parseOriginal方法
	describe('parseOriginal', () => {
		jsonFiles.forEach(filePath => {
			it(`should parse ${path.basename(filePath)} to IOriginalResult`, () => {
				const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
				const result = XParser.parseOriginal(data);

				// 验证返回类型
				expect(result).toBeDefined();
				expect(typeof result).toBe('object');

				// 验证游标字段类型
				if (result.cursor_top) expect(typeof result.cursor_top).toBe('string');
				if (result.cursor_bottom) expect(typeof result.cursor_bottom).toBe('string');
				if (result.next_cursor) expect(typeof result.next_cursor).toBe('string');
				if (result.next_cursor_str) expect(typeof result.next_cursor_str).toBe('string');
				if (result.previous_cursor) expect(typeof result.previous_cursor).toBe('string');
				if (result.previous_cursor_str) expect(typeof result.previous_cursor_str).toBe('string');

				// 验证推文数组
				if (result.tweets) {
					expect(Array.isArray(result.tweets)).toBe(true);
					result.tweets.forEach(tweet => {
						expect(tweet.__typename).toBe('Tweet');
						expect(tweet.rest_id).toBeDefined();
						expect(typeof tweet.rest_id).toBe('string');
					});
				}

				// 验证分类推文
				if (result.photos) expect(Array.isArray(result.photos)).toBe(true);
				if (result.videos) expect(Array.isArray(result.videos)).toBe(true);
				if (result.urls) expect(Array.isArray(result.urls)).toBe(true);
			});
		});
	});
});
