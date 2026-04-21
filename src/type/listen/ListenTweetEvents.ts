export const enum ListenTweetEvents {
	/**
	 * 发现视频
	 */
	VideoDetected = '__listen-tweet-video-detected',
	/**
	 * 发现推文
	 */
	TweetDetected = '__listen-tweet-tweet-detected',
	/**
	 * 发现用户
	 */
	UserDetected = '__listen-tweet-user-detected',
	/**
	 * 推文渲染
	 */
	TweetRendered = '__listen-tweet-tweet-rendered',
	/**
	 * 视频渲染
	 */
	VideoRendered = '__listen-tweet-video-rendered',
}
