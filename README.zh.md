# GS X Parser

[English](README.md)

## 项目简介

GS X Parser 是一个用于解析 Twitter/X API 响应的 TypeScript 库，提供了完整的类型定义和解析功能，支持将复杂的 API 响应转换为简单易用的格式。

## 功能特性

- 完整的 TypeScript 类型定义，基于 Twitter/X API 数据结构
- 支持解析用户、推文、媒体等多种数据类型
- 提供简单模式和原始模式两种解析方式
- 支持从各种 API 响应中提取数据
- 类型安全，确保数据处理的可靠性

## 安装

```bash
# 使用 npm
npm install gs-x-parser

# 使用 yarn
yarn add gs-x-parser
```

## 使用示例

### 解析简单模式

```typescript
import { XParser } from './src/parser/XParser';

// 解析 API 响应
const data = {/* 从 API 获取的数据 */};
const result = XParser.parseSimple(data);

// 访问解析结果
console.log(result.users); // 简单用户列表
console.log(result.tweets); // 简单推文列表
console.log(result.photos); // 包含图片的推文
console.log(result.videos); // 包含视频的推文
console.log(result.urls); // 包含链接的推文
```

### 解析原始模式

```typescript
import { XParser } from './src/parser/XParser';

// 解析 API 响应
const data = {/* 从 API 获取的数据 */};
const result = XParser.parseOriginal(data);

// 访问解析结果
console.log(result.users); // 原始用户列表
console.log(result.tweets); // 原始推文列表
console.log(result.photos); // 包含图片的推文
console.log(result.videos); // 包含视频的推文
console.log(result.urls); // 包含链接的推文
```

## 类型定义

项目在 `src/type` 目录下提供了完整的类型定义，包括：

- `IUser` - 用户类型
- `ITweet` - 推文类型
- `IMediaEntity` - 媒体实体类型
- `ISimpleUser` - 简单用户类型
- `ISimpleTweet` - 简单推文类型
- `ISimpleResult` - 简单结果类型
- `IOriginalResult` - 原始结果类型

## 许可证

本项目使用 MIT 许可证，详情请查看 [LICENSE](LICENSE) 文件。
