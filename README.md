# StreamUI

A modern web application for managing and streaming video content, built with a powerful backend API integration.

## Overview

StreamUI is a comprehensive video management platform that leverages the StreamAPI for video processing and streaming capabilities. This application provides an intuitive interface for managing video content, handling uploads, and delivering high-quality streaming experiences.

## Features

- Video upload and management
- Real-time video streaming
- User authentication and authorization
- Video metadata management
- Multiple resolution support
- Custom video format conversion
- Responsive and modern UI

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- Docker (for running StreamAPI)
- MongoDB

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/streamui.git
cd streamui
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up StreamAPI:
```bash
git clone https://github.com/elvus/streamapi.git
cd streamapi
docker-compose up -d
```

4. Create a `.env` file in the root directory with the following variables:
```env
VITE_STREAMAPI_URL=http://127.0.0.1:5000
VITE_STREAMAPI_PREFIX=/v1/api
VITE_STREAMAPI_PREFIX_ADMIN=/dashboard
VITE_DEFAULT_NEXT_EPISODE_OFFSET=15
```

## Usage

1. Start the development server:
```bash
npm run dev
# or
yarn dev
```

2. Open your browser and navigate to `http://localhost:5173`

## API Integration

This application integrates with StreamAPI for video processing and streaming capabilities. The API provides the following key features:

- Video upload and conversion to M3U8 format
- Video streaming endpoints
- Video metadata management
- User authentication

For detailed API documentation, visit the [StreamAPI repository](https://github.com/elvus/streamapi.git).

## Development

### Project Structure

```
streamui/
├── src/
|   ├── admin/
|   ├── assets/
│   ├── components/
│   ├── controllers/
│   ├── web/
│   ├── App.tsx
│   ├── constants.tsx/
│   ├── index.css
│   ├── main.tsx
│   └── strings.ts
├── public/
└── package.json
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [StreamAPI](https://github.com/elvus/streamapi.git) for video processing capabilities
- All contributors who have helped shape this project
