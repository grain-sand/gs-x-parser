/**
 * 简单媒体类型，仅保留各子类型、各品质的URL与尺寸、说明
 */
import { MediaType, VideoQuality } from './ITypes';

export interface ISimpleMedia {
  /** 媒体键 */
  media_key?: string;
  /** 媒体类型 */
  type: MediaType;
  /** 媒体URL */
  media_url_https: string;
  /** 显示URL */
  display_url?: string;
  /** 展开URL */
  expanded_url?: string;
}

/**
 * 简单图片媒体类型
 */
export interface ISimplePhoto extends ISimpleMedia {
  /** 媒体类型 */
  type: 'photo';
  /** 图片尺寸 */
  sizes?: {
    /** 缩略图 */
    thumb?: ISimpleMediaSize;
    /** 小尺寸 */
    small?: ISimpleMediaSize;
    /** 中等尺寸 */
    medium?: ISimpleMediaSize;
    /** 大尺寸 */
    large?: ISimpleMediaSize;
  };
  /** 原始信息 */
  original_info?: {
    /** 宽度 */
    width: number;
    /** 高度 */
    height: number;
  };
}

/**
 * 简单视频媒体类型
 */
export interface ISimpleVideo extends ISimpleMedia {
  /** 媒体类型 */
  type: Exclude<MediaType, 'photo'>;
  /** 宽高比 */
  aspect_ratio?: number[];
  /** 时长（毫秒） */
  duration_millis?: number;
  /** MP4 视频数组 */
  mp4?: ISimpleMP4Video[];
  /** HLS 视频 URL */
  hls?: string;
}

/**
 * 媒体尺寸
 */
export interface ISimpleMediaSize {
  /** 宽度 */
  w: number;
  /** 高度 */
  h: number;
  /** 调整大小方式 */
  resize: string;
}

/**
 * MP4 视频
 */
export interface ISimpleMP4Video {
  /** 比特率 */
  bitrate?: number;
  /** 视频URL */
  url: string;
  /** 质量 */
  quality?: VideoQuality;
}

/**
 * 简单URL类型
 */
export interface ISimpleUrl {
  /** URL */
  url: string;
  /** 展开URL */
  expanded_url?: string;
  /** 显示URL */
  display_url?: string;
}
