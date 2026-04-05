import { IColorPalette } from './index';

// 媒体相关类型
export interface IMediaEntity {
  display_url?: string;
  expanded_url?: string;
  id_str?: string;
  indices?: number[];
  media_key?: string;
  media_url_https?: string;
  type?: string;
  url?: string;
  additional_media_info?: IAdditionalMediaInfo;
  ext_media_availability?: IExtMediaAvailability;
  sizes?: IMediaSizes;
  original_info?: IOriginalInfo;
  allow_download_status?: IAllowDownloadStatus;
  video_info?: IVideoInfo;
  media_results?: IMediaResults;
  features?: IMediaFeatures;
  ext_media_color?: IExtMediaColor;
  ext_alt_text?: string | null;
  ext?: IExtMedia;
}

export interface IAdditionalMediaInfo {
  monetizable?: boolean;
}

export interface IExtMediaAvailability {
  status?: string;
}

export interface IMediaSizes {
  large?: IMediaSize;
  medium?: IMediaSize;
  small?: IMediaSize;
  thumb?: IMediaSize;
}

export interface IMediaSize {
  h?: number;
  w?: number;
  resize?: string;
}

export interface IOriginalInfo {
  height?: number;
  width?: number;
  focus_rects?: IFocusRect[];
}

export interface IFocusRect {
  x?: number;
  y?: number;
  w?: number;
  h?: number;
}

export interface IAllowDownloadStatus {
  allow_download?: boolean;
}

export interface IVideoInfo {
  aspect_ratio?: number[];
  duration_millis?: number;
  variants?: IVideoVariant[];
}

export interface IVideoVariant {
  bitrate?: number;
  content_type?: string;
  url?: string;
}

export interface IMediaResults {
  result?: IMediaResult;
}

export interface IMediaResult {
  media_key?: string;
}

export interface IMediaFeatures {
  large?: IMediaFeature;
  medium?: IMediaFeature;
  small?: IMediaFeature;
  orig?: IMediaFeature;
}

export interface IMediaFeature {
  faces?: any[];
}

export interface IExtMediaColor {
  palette?: IColorPalette[];
}

export interface IExtMedia {
  mediaStats?: IMediaStats;
}

export interface IMediaStats {
  r?: any;
  ttl?: number;
}
