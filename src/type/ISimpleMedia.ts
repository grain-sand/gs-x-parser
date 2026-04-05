// 简单媒体类型，仅保留各子类型、各品质的URL与尺寸、说明

export interface ISimpleMedia {
  id: string;
  type: 'photo' | 'video' | 'animated_gif';
  media_url_https: string;
  display_url?: string;
  expanded_url?: string;
}

export interface ISimplePhoto extends ISimpleMedia {
  type: 'photo';
  sizes?: {
    thumb?: ISimpleMediaSize;
    small?: ISimpleMediaSize;
    medium?: ISimpleMediaSize;
    large?: ISimpleMediaSize;
  };
  original_info?: {
    width: number;
    height: number;
  };
}

export interface ISimpleVideo extends ISimpleMedia {
  type: 'video' | 'animated_gif';
  video_info?: {
    aspect_ratio?: number[];
    duration_millis?: number;
    variants?: ISimpleVideoVariant[];
  };
}

export interface ISimpleMediaSize {
  w: number;
  h: number;
  resize: string;
}

export interface ISimpleVideoVariant {
  bitrate?: number;
  content_type: string;
  url: string;
}

export interface ISimpleUrl {
  url: string;
  expanded_url?: string;
  display_url?: string;
}
