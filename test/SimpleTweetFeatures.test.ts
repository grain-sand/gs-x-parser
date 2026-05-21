// noinspection TypeScriptUnresolvedReference

/**
 * ISimpleTweet 新功能单元测试
 * 测试 text_range 和 includeOriginalTweet 功能
 */
import {describe, expect, it} from 'vitest';
import {XParser} from '../src';
import {convertToSimpleTweet} from '../src/parser/utils/convertToSimpleTweet';

describe('ISimpleTweet New Features', () => {
	describe('IUrlEntity indices field', () => {
		it('should extract indices from tweet entities urls', () => {
			const mockTweet: any = {
				__typename: 'Tweet',
				rest_id: '67890',
				legacy: {
					full_text: 'Check out https://example.com',
					created_at: '2024-01-01T00:00:00Z',
					user_id_str: '12345',
					entities: {
						urls: [
							{
								url: 'https://t.co/abc123',
								expanded_url: 'https://example.com',
								display_url: 'example.com',
								indices: [11, 34]
							}
						]
					}
				}
			};

			const simpleTweet = convertToSimpleTweet(mockTweet);

			expect(simpleTweet.urls).toBeDefined();
			expect(simpleTweet.urls?.length).toBe(1);
			expect(simpleTweet.urls?.[0].indices).toEqual([11, 34]);
		});

		it('should handle undefined indices in urls', () => {
			const mockTweet: any = {
				__typename: 'Tweet',
				rest_id: '67890',
				legacy: {
					full_text: 'Check out https://example.com',
					created_at: '2024-01-01T00:00:00Z',
					user_id_str: '12345',
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

			expect(simpleTweet.urls).toBeDefined();
			expect(simpleTweet.urls?.length).toBe(1);
			expect(simpleTweet.urls?.[0].indices).toBeUndefined();
		});
	});

	describe('ISimpleTweet note_urls field', () => {
		it('should extract note_urls from note_tweet', () => {
			const mockTweet: any = {
				__typename: 'Tweet',
				rest_id: '67890',
				legacy: {
					full_text: 'This is a Note tweet',
					created_at: '2024-01-01T00:00:00Z',
					user_id_str: '12345'
				},
				note_tweet: {
					note_tweet_results: {
						result: {
							text: 'Note content with https://note-example.com',
							entities: {
								urls: [
									{
										url: 'https://t.co/def456',
										expanded_url: 'https://note-example.com',
										display_url: 'note-example.com',
										indices: [20, 43]
									}
								]
							}
						}
					}
				}
			};

			const simpleTweet = convertToSimpleTweet(mockTweet);

			expect(simpleTweet.note_urls).toBeDefined();
			expect(simpleTweet.note_urls?.length).toBe(1);
			expect(simpleTweet.note_urls?.[0].url).toBe('https://t.co/def456');
			expect(simpleTweet.note_urls?.[0].expanded_url).toBe('https://note-example.com');
			expect(simpleTweet.note_urls?.[0].display_url).toBe('note-example.com');
			expect(simpleTweet.note_urls?.[0].indices).toEqual([20, 43]);
		});

		it('should not include note_urls when note_tweet has no urls', () => {
			const mockTweet: any = {
				__typename: 'Tweet',
				rest_id: '67890',
				legacy: {
					full_text: 'This is a Note tweet',
					created_at: '2024-01-01T00:00:00Z',
					user_id_str: '12345'
				},
				note_tweet: {
					note_tweet_results: {
						result: {
							text: 'Note content without URLs',
							entities: {}
						}
					}
				}
			};

			const simpleTweet = convertToSimpleTweet(mockTweet);

			expect(simpleTweet.note_urls).toBeUndefined();
		});

		it('should not include note_urls when note_tweet is not present', () => {
			const mockTweet: any = {
				__typename: 'Tweet',
				rest_id: '67890',
				legacy: {
					full_text: 'Regular tweet',
					created_at: '2024-01-01T00:00:00Z',
					user_id_str: '12345'
				}
			};

			const simpleTweet = convertToSimpleTweet(mockTweet);

			expect(simpleTweet.note_urls).toBeUndefined();
		});
	});
	describe('text_range field', () => {
		it('should extract display_text_range as text_range', () => {
			const mockTweet: any = {
				__typename: 'Tweet',
				rest_id: '67890',
				legacy: {
					full_text: 'Test tweet with display range',
					created_at: '2024-01-01T00:00:00Z',
					user_id_str: '12345',
					display_text_range: [0, 28],
					retweet_count: 10,
					favorite_count: 20,
					reply_count: 5,
					quote_count: 3,
					lang: 'en',
					conversation_id_str: '67890',
					possibly_sensitive: false
				}
			};

			const simpleTweet = convertToSimpleTweet(mockTweet);

			expect(simpleTweet.text_range).toBeDefined();
			expect(Array.isArray(simpleTweet.text_range)).toBe(true);
			expect(simpleTweet.text_range).toEqual([0, 28]);
		});

		it('should handle undefined display_text_range', () => {
			const mockTweet: any = {
				__typename: 'Tweet',
				rest_id: '67890',
				legacy: {
					full_text: 'Test tweet without display range',
					created_at: '2024-01-01T00:00:00Z',
					user_id_str: '12345',
					retweet_count: 10,
					favorite_count: 20
				}
			};

			const simpleTweet = convertToSimpleTweet(mockTweet);

			expect(simpleTweet.text_range).toBeUndefined();
		});
	});

	describe('includeOriginalTweet option', () => {
		it('should include original_tweet when includeOriginalTweet is true', () => {
			const mockTweet: any = {
				__typename: 'Tweet',
				rest_id: '67890',
				legacy: {
					full_text: 'Test tweet',
					created_at: '2024-01-01T00:00:00Z',
					user_id_str: '12345',
					retweet_count: 10,
					favorite_count: 20
				}
			};

			const simpleTweet = convertToSimpleTweet(mockTweet, undefined, { includeOriginalTweet: true });

			expect(simpleTweet.original_tweet).toBeDefined();
			expect(simpleTweet.original_tweet?.rest_id).toBe('67890');
			expect(simpleTweet.original_tweet?.__typename).toBe('Tweet');
		});

		it('should not include original_tweet when includeOriginalTweet is false', () => {
			const mockTweet: any = {
				__typename: 'Tweet',
				rest_id: '67890',
				legacy: {
					full_text: 'Test tweet',
					created_at: '2024-01-01T00:00:00Z',
					user_id_str: '12345'
				}
			};

			const simpleTweet = convertToSimpleTweet(mockTweet, undefined, { includeOriginalTweet: false });

			expect(simpleTweet.original_tweet).toBeUndefined();
		});

		it('should not include original_tweet when includeOriginalTweet is undefined', () => {
			const mockTweet: any = {
				__typename: 'Tweet',
				rest_id: '67890',
				legacy: {
					full_text: 'Test tweet',
					created_at: '2024-01-01T00:00:00Z',
					user_id_str: '12345'
				}
			};

			const simpleTweet = convertToSimpleTweet(mockTweet);

			expect(simpleTweet.original_tweet).toBeUndefined();
		});
	});

	describe('XParser.parseSimple with includeOriginalTweet', () => {
		it('should include original_tweet in parseSimple when option is true', () => {
			const mockData: any = {
				data: {
					user: {
						result: {
							__typename: 'User',
							rest_id: '12345',
							legacy: {
								name: 'Test User',
								screen_name: 'testuser',
								profile_image_url_https: 'https://example.com/avatar.jpg'
							}
						}
					},
					timeline: {
						instructions: [
							{
								type: 'TimelineAddEntries',
								entries: [
									{
										content: {
											tweet: {
												result: {
													__typename: 'Tweet',
													rest_id: '67890',
													legacy: {
														full_text: 'Test tweet',
														created_at: '2024-01-01T00:00:00Z',
														user_id_str: '12345',
														display_text_range: [0, 11],
														retweet_count: 10,
														favorite_count: 20
													}
												}
											}
										}
									}
								]
							}
						]
					}
				}
			};

			const result = XParser.parseSimple(mockData, { includeOriginalTweet: true });

			expect(result.tweets).toBeDefined();
			expect(result.tweets.length).toBeGreaterThan(0);
			expect(result.tweets[0].text_range).toEqual([0, 11]);
			expect(result.tweets[0].original_tweet).toBeDefined();
			expect(result.tweets[0].original_tweet?.rest_id).toBe('67890');
		});

		it('should not include original_tweet in parseSimple when option is false', () => {
			const mockData: any = {
				data: {
					user: {
						result: {
							__typename: 'User',
							rest_id: '12345',
							legacy: {
								name: 'Test User',
								screen_name: 'testuser',
								profile_image_url_https: 'https://example.com/avatar.jpg'
							}
						}
					},
					timeline: {
						instructions: [
							{
								type: 'TimelineAddEntries',
								entries: [
									{
										content: {
											tweet: {
												result: {
													__typename: 'Tweet',
													rest_id: '67890',
													legacy: {
														full_text: 'Test tweet',
														created_at: '2024-01-01T00:00:00Z',
														user_id_str: '12345',
														display_text_range: [0, 11]
													}
												}
											}
										}
									}
								]
							}
						]
					}
				}
			};

			const result = XParser.parseSimple(mockData, { includeOriginalTweet: false });

			expect(result.tweets).toBeDefined();
			expect(result.tweets.length).toBeGreaterThan(0);
			expect(result.tweets[0].text_range).toEqual([0, 11]);
			expect(result.tweets[0].original_tweet).toBeUndefined();
		});
	});
});
