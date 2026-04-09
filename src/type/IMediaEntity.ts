/**
 * 媒体相关类型定义
 */
import { IColorPalette } from './index';

/**
 * 媒体实体接口
 */
export interface IMediaEntity {
  /** 显示URL */
  display_url?: string;
  /** 展开URL */
  expanded_url?: string;
  /** ID字符串 */
  id_str?: string;
  /** 索引 */
  indices?: number[];
  /** 媒体键 */
  media_key?: string;
  /** 媒体URL */
  media_url_https?: string;
  /** 类型 */
  type?: string;
  /** URL */
  url?: string;
  /** 额外媒体信息 */
  additional_media_info?: IAdditionalMediaInfo;
  /** 扩展媒体可用性 */
  ext_media_availability?: IExtMediaAvailability;
  /** 尺寸 */
  sizes?: IMediaSizes;
  /** 原始信息 */
  original_info?: IOriginalInfo;
  /** 允许下载状态 */
  allow_download_status?: IAllowDownloadStatus;
  /** 视频信息 */
  video_info?: IVideoInfo;
  /** 媒体结果 */
  media_results?: IMediaResults;
  /** 特性 */
  features?: IMediaFeatures;
  /** 扩展媒体颜色 */
  ext_media_color?: IExtMediaColor;
  /** 扩展替代文本 */
  ext_alt_text?: string | null;
  /** 扩展 */
  ext?: IExtMedia;
}

/**
 * 额外媒体信息接口
 */
export interface IAdditionalMediaInfo {
  /** 是否可变现 */
  monetizable?: boolean;
}

/**
 * 扩展媒体可用性接口
 */
export interface IExtMediaAvailability {
  /** 状态 */
  status?: string;
}

/**
 * 媒体尺寸接口
 */
export interface IMediaSizes {
  /** 大尺寸 */
  large?: IMediaSize;
  /** 中等尺寸 */
  medium?: IMediaSize;
  /** 小尺寸 */
  small?: IMediaSize;
  /** 缩略图 */
  thumb?: IMediaSize;
}

/**
 * 媒体尺寸接口
 */
export interface IMediaSize {
  /** 高度 */
  h?: number;
  /** 宽度 */
  w?: number;
  /** 调整大小方式 */
  resize?: string;
}

/**
 * 原始信息接口
 */
export interface IOriginalInfo {
  /** 高度 */
  height?: number;
  /** 宽度 */
  width?: number;
  /** 焦点矩形 */
  focus_rects?: IFocusRect[];
}

/**
 * 焦点矩形接口
 */
export interface IFocusRect {
  /** X坐标 */
  x?: number;
  /** Y坐标 */
  y?: number;
  /** 宽度 */
  w?: number;
  /** 高度 */
  h?: number;
}

/**
 * 允许下载状态接口
 */
export interface IAllowDownloadStatus {
  /** 是否允许下载 */
  allow_download?: boolean;
}

/**
 * 视频信息接口
 */
export interface IVideoInfo {
  /** 宽高比 */
  aspect_ratio?: number[];
  /** 时长（毫秒） */
  duration_millis?: number;
  /** 视频变体 */
  variants?: IVideoVariant[];
}

/**
 * 视频变体接口
 */
export interface IVideoVariant {
  /** 比特率 */
  bitrate?: number;
  /** 内容类型 */
  content_type?: string;
  /** URL */
  url?: string;
}

/**
 * 媒体结果接口
 */
export interface IMediaResults {
  /** 结果 */
  result?: IMediaResult;
}

/**
 * 媒体结果接口
 */
export interface IMediaResult {
  /** 媒体键 */
  media_key?: string;
}

/**
 * 媒体特性接口
 */
export interface IMediaFeatures {
  /** 大尺寸 */
  large?: IMediaFeature;
  /** 中等尺寸 */
  medium?: IMediaFeature;
  /** 小尺寸 */
  small?: IMediaFeature;
  /** 原始尺寸 */
  orig?: IMediaFeature;
}

/**
 * 面部接口
 */
export interface IFace {
  /** 高度 */
  h?: number;
  /** 宽度 */
  w?: number;
  /** X坐标 */
  x?: number;
  /** Y坐标 */
  y?: number;
}

/**
 * 媒体特性接口
 */
export interface IMediaFeature {
  /** 面部 */
  faces?: IFace[];
}

/**
 * 扩展媒体颜色接口
 */
export interface IExtMediaColor {
  /** 调色板 */
  palette?: IColorPalette[];
}

/**
 * 扩展媒体接口
 */
export interface IExtMedia {
  /** 媒体统计 */
  mediaStats?: IMediaStats;
}

/**
 * 媒体统计接口
 */
export interface IMediaStats {
  /** 统计数据 */
  r?: any;
  /** 生存时间 */
  ttl?: number;
}
