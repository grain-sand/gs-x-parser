# GS X Parser
GS X Parser is a TypeScript library for parsing Twitter/X API responses, providing complete type definitions and parsing functionality, supporting the conversion of complex API responses into simple and easy-to-use formats.

[中文](README.zh.md)

## Features

- Complete TypeScript type definitions based on Twitter/X API data structures
- Support for parsing multiple data types such as users, tweets, media, etc.
- Provide two parsing modes: simple mode and original mode
- Support data extraction from various API responses
- Type safety to ensure reliable data processing

## Installation

```bash
# Using npm
npm install gs-x-parser

# Using yarn
yarn add gs-x-parser
```

## Usage Examples

### Parse Simple Mode

```typescript
import { XParser } from './src/parser/XParser';

// Parse API response
const data = {/* data from API */};
const result = XParser.parseSimple(data);

// Access parsed results
console.log(result.users); // Simple user list
console.log(result.tweets); // Simple tweet list
console.log(result.photos); // Tweets with photos
console.log(result.videos); // Tweets with videos
console.log(result.urls); // Tweets with URLs
```

### Parse Original Mode

```typescript
import { XParser } from './src/parser/XParser';

// Parse API response
const data = {/* data from API */};
const result = XParser.parseOriginal(data);

// Access parsed results
console.log(result.users); // Original user list
console.log(result.tweets); // Original tweet list
console.log(result.photos); // Tweets with photos
console.log(result.videos); // Tweets with videos
console.log(result.urls); // Tweets with URLs
```

## Type Definitions

The project provides complete type definitions in the `src/type` directory, including:

- `IUser` - User type
- `ITweet` - Tweet type
- `IMediaEntity` - Media entity type
- `ISimpleUser` - Simple user type
- `ISimpleTweet` - Simple tweet type
- `ISimpleResult` - Simple result type
- `IOriginalResult` - Original result type

## License

This project uses the MIT license. For details, please see the [LICENSE](LICENSE) file.
