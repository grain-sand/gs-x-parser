// noinspection TypeScriptUnresolvedReference

/**
 * XParser 广告和推荐测试
 */
import {describe, expect, it} from 'vitest';
import {XParser} from '../src';
import * as fs from 'fs';
import * as path from 'path';

// 读取HomeTimeline-ShowCover.json文件
const homeTimelinePath = path.join(__dirname, '../tmp', 'home', 'HomeTimeline-ShowCover.json');

if (!fs.existsSync(homeTimelinePath)) {
  console.warn('HomeTimeline-ShowCover.json not found, skipping ad and recommendation tests');
} else {
  describe('XParser - Ads and Recommendations', () => {
    const homeTimelineData = JSON.parse(fs.readFileSync(homeTimelinePath, 'utf8'));

    // 测试广告识别
    describe('Ad Detection', () => {
      it('should detect ads in HomeTimeline.json', () => {
        const result = XParser.parseSimple(homeTimelineData);
        
        // 验证广告字段
        expect(result.ads).toBeDefined();
        expect(Array.isArray(result.ads)).toBe(true);
        expect(result.ads?.length).toBeGreaterThan(0);
        
        // 验证广告不包含在默认推文列表中
        expect(result.tweets).toBeDefined();
        expect(Array.isArray(result.tweets)).toBe(true);
        
        // 计算推文数量（不包含广告）
        const tweetCount = result.tweets?.length || 0;
        const adCount = result.ads?.length || 0;
        
        // 测试 includeAds 选项
        const resultWithAds = XParser.parseSimple(homeTimelineData, { includeAds: true });
        expect(resultWithAds.tweets?.length).toBe(tweetCount + adCount);
      });

      it('should detect ads in original format', () => {
        const result = XParser.parseOriginal(homeTimelineData);
        
        // 验证广告字段
        expect(result.ads).toBeDefined();
        expect(Array.isArray(result.ads)).toBe(true);
        expect(result.ads?.length).toBeGreaterThan(0);
        
        // 测试 includeAds 选项
        const resultWithAds = XParser.parseOriginal(homeTimelineData, { includeAds: true });
        const tweetCount = result.tweets?.length || 0;
        const adCount = result.ads?.length || 0;
        expect(resultWithAds.tweets?.length).toBe(tweetCount + adCount);
      });
    });

    // 测试推荐识别
    describe('Recommendation Detection', () => {
      it('should detect recommendations in HomeTimeline-ShowCover.json', () => {
        const result = XParser.parseSimple(homeTimelineData);
        
        // 验证推荐字段
        expect(result.recommendations).toBeDefined();
        expect(Array.isArray(result.recommendations)).toBe(true);
        expect(result.recommendations?.length).toBeGreaterThan(0);
        
        // 测试 includeRecommendations 选项
        const resultWithRecommendations = XParser.parseSimple(homeTimelineData, { includeRecommendations: true });
        const originalTweetCount = result.tweets?.length || 0;
        const recommendationCount = result.recommendations?.length || 0;
        
        // 验证包含推荐后的推文数量
        expect(resultWithRecommendations.tweets?.length).toBe(originalTweetCount + recommendationCount);
      });

      it('should detect recommendations in original format', () => {
        const result = XParser.parseOriginal(homeTimelineData);
        
        // 验证推荐字段
        expect(result.recommendations).toBeDefined();
        expect(Array.isArray(result.recommendations)).toBe(true);
        expect(result.recommendations?.length).toBeGreaterThan(0);
        
        // 测试 includeRecommendations 选项
        const resultWithRecommendations = XParser.parseOriginal(homeTimelineData, { includeRecommendations: true });
        const originalTweetCount = result.tweets?.length || 0;
        const recommendationCount = result.recommendations?.length || 0;
        
        // 验证包含推荐后的推文数量
        expect(resultWithRecommendations.tweets?.length).toBe(originalTweetCount + recommendationCount);
      });
    });

    // 测试所有选项组合
    describe('Options Combination', () => {
      it('should handle all options together', () => {
        const result = XParser.parseSimple(homeTimelineData, {
          includeAds: true,
          includeExploreMore: true,
          includeRecommendations: true
        });
        
        // 验证所有字段
        expect(result.tweets).toBeDefined();
        expect(Array.isArray(result.tweets)).toBe(true);
        expect(result.ads).toBeDefined();
        expect(result.exploreMore).toBeDefined();
        expect(result.recommendations).toBeDefined();
      });
    });
  });
}
