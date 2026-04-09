/**
 * XParser 静态类，用于解析Twitter API响应
 */
export interface IXParserOptions {
	/**
	 * 是否包含广告推文（包括推广推文）
	 */
	includeAds?: boolean;
	/**
	 * 是否包含探索更多内容
	 */
	includeExploreMore?: boolean;
	/**
	 * 是否包含各类推荐推文
	 */
	includeRecommendations?: boolean;
}
