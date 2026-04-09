import {IMediaEntity, ISimplePhoto, ISimpleTweet, ISimpleUrl, ISimpleVideo, ITweet, IUser} from '../../type';
import {convertToSimpleUser} from './convertToSimpleUser';

/**
 * 根据比特率获取视频质量
 * @param bitrate 比特率
 * @returns 视频质量
 */
function getVideoQuality(bitrate: number): string {
	if (bitrate >= 2500000) return 'high';
	if (bitrate >= 1200000) return 'medium';
	return 'low';
}

/**
 * 将ITweet转换为ISimpleTweet
 * @param tweet ITweet对象
 * @param user IUser对象（可选）
 * @returns ISimpleTweet
 */
export function convertToSimpleTweet(tweet: ITweet, user?: IUser): ISimpleTweet {
	// 提取推文数据，优先使用 legacy 字段，其次直接使用 tweet 对象
	const tweetData = tweet.legacy || tweet;
	// 提取推文质量
	let tweetQuality;
	if (tweet.visibility_results?.tweet_visibility_annotations) {
		const annotation = tweet.visibility_results.tweet_visibility_annotations.find(
			(item) => item.tweet_quality
		);
		tweetQuality = annotation?.tweet_quality as any;
	} else if (tweet.clientEventInfo?.details?.conversationDetails?.conversationSection) {
		// 从 clientEventInfo 中提取质量信息
		tweetQuality = tweet.clientEventInfo?.details?.conversationDetails?.conversationSection as any;
	}

	// 如果质量信息不存在，默认为高质量
	if (!tweetQuality) {
		tweetQuality = 'HighQuality';
	}

	const simpleTweet: ISimpleTweet = {
		rest_id: tweet.rest_id,
		full_text: tweetData.full_text || '',
		created_at: tweetData.created_at || '',
		user: user ? convertToSimpleUser(user) : {
			rest_id: tweetData.user_id_str || '',
			name: '',
			screen_name: '',
			profile_image_url_https: ''
		},
		retweet_count: tweetData.retweet_count,
		favorite_count: tweetData.favorite_count,
		reply_count: tweetData.reply_count,
		quote_count: tweetData.quote_count,
		lang: tweetData.lang,
		conversation_id: tweetData.conversation_id_str || '',
		possibly_sensitive: tweetData.possibly_sensitive,
		is_retweet: !!tweetData.retweeted_status_id_str,
		retweeted_status_id: tweetData.retweeted_status_id_str,
		quoted_status_id: tweetData.quoted_status_id_str,
		quality: tweetQuality
	};

	// 提取媒体
	const media = tweetData.extended_entities?.media || tweetData.entities?.media;
	if (media) {
		const photos: ISimplePhoto[] = [];
		const videos: ISimpleVideo[] = [];

		media.forEach((mediaItem: IMediaEntity) => {
			if (mediaItem.type === 'photo') {
				// 处理图片尺寸
				let simpleSizes: any;
				if (mediaItem.sizes) {
					simpleSizes = {};
					if (mediaItem.sizes.thumb) {
						simpleSizes.thumb = {
							w: mediaItem.sizes.thumb.w || 0,
							h: mediaItem.sizes.thumb.h || 0,
							resize: mediaItem.sizes.thumb.resize || 'fit'
						};
					}
					if (mediaItem.sizes.small) {
						simpleSizes.small = {
							w: mediaItem.sizes.small.w || 0,
							h: mediaItem.sizes.small.h || 0,
							resize: mediaItem.sizes.small.resize || 'fit'
						};
					}
					if (mediaItem.sizes.medium) {
						simpleSizes.medium = {
							w: mediaItem.sizes.medium.w || 0,
							h: mediaItem.sizes.medium.h || 0,
							resize: mediaItem.sizes.medium.resize || 'fit'
						};
					}
					if (mediaItem.sizes.large) {
						simpleSizes.large = {
							w: mediaItem.sizes.large.w || 0,
							h: mediaItem.sizes.large.h || 0,
							resize: mediaItem.sizes.large.resize || 'fit'
						};
					}
				}

				// 处理原始信息
				let simpleOriginalInfo;
				if (mediaItem.original_info) {
					simpleOriginalInfo = {
						width: mediaItem.original_info.width || 0,
						height: mediaItem.original_info.height || 0
					};
				}

				photos.push({
					media_key: mediaItem.media_key || '',
					type: 'photo',
					media_url_https: mediaItem.media_url_https || '',
					display_url: mediaItem.display_url || '',
					expanded_url: mediaItem.expanded_url || '',
					sizes: simpleSizes,
					original_info: simpleOriginalInfo
				});
			} else if (mediaItem.type === 'video' || mediaItem.type === 'animated_gif') {
				// 处理视频信息
				// noinspection TypeScriptValidateTypes
				const mp4Videos = mediaItem.video_info?.variants?.filter(item => item?.content_type === 'video/mp4'
				).map((variant: any) => ({
					bitrate: variant.bitrate,
					url: variant.url || '',
					quality: variant.bitrate ? getVideoQuality(variant.bitrate) : undefined
				}));

				// 查找 HLS 视频
				// noinspection TypeScriptValidateTypes
				const hlsVideo = mediaItem.video_info?.variants?.find(item => item?.content_type === 'application/x-mpegURL');

				videos.push({
					media_key: mediaItem.media_key || '',
					type: mediaItem.type as 'video' | 'animated_gif',
					media_url_https: mediaItem.media_url_https || '',
					display_url: mediaItem.display_url || '',
					expanded_url: mediaItem.expanded_url || '',
					aspect_ratio: mediaItem.video_info?.aspect_ratio,
					duration_millis: mediaItem.video_info?.duration_millis,
					mp4: mp4Videos,
					hls: hlsVideo?.url
				});
			}
		});

		if (photos.length > 0) simpleTweet.photos = photos;
		if (videos.length > 0) simpleTweet.videos = videos;
	}

	// 提取URL
	if (tweetData.entities?.urls) {
		const urls: ISimpleUrl[] = tweetData.entities.urls.map((url: any) => ({
			url: url.url || '',
			expanded_url: url.expanded_url || '',
			display_url: url.display_url || ''
		}));

		if (urls.length > 0) simpleTweet.urls = urls;
	}

	return simpleTweet;
}
