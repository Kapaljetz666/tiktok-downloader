# TikTok Video Downloader

This is a simple web application that allows users to download TikTok videos by providing the video URL. It features a preview of the video thumbnail before the actual download.

## Features

*   Download TikTok videos without watermarks (where available).
*   Preview video thumbnail and title before downloading.
*   User-friendly interface.

## Technologies Used

### Frontend

*   **React:** A JavaScript library for building user interfaces.
*   **Axios:** Promise-based HTTP client for the browser and Node.js.
*   **React-Bootstrap:** Bootstrap components built with React.
*   **Bootstrap:** A popular CSS framework for responsive and mobile-first front-end web development.

### Backend

*   **Node.js:** A JavaScript runtime built on Chrome's V8 JavaScript engine.
*   **Express.js:** A fast, unopinionated, minimalist web framework for Node.js.
*   **CORS:** Node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
*   **@tobyg74/tiktok-api-dl:** A Node.js library to interact with TikTok's API for downloading videos.
*   **Axios:** Used in the backend to stream the video from TikTok's servers.

## Setup Instructions

Follow these steps to set up and run the project locally.

### 1. Clone the Repository

```bash
git clone <your-github-repo-url>
cd tiktok-downloader
```

### 2. Backend Setup

Navigate to the `backend` directory, install dependencies, and start the server.

```bash
cd backend
npm install
node index.js
```

The backend server will run on `http://localhost:5000`.

### 3. Frontend Setup

Open a new terminal, navigate to the `frontend` directory, install dependencies, and start the React development server.

```bash
cd ../frontend
npm install
npm start
```

The frontend application will open in your browser, usually at `http://localhost:3000`.

## Usage

1.  Enter a TikTok video URL into the input field.
2.  Click the "Get Video Info" button.
3.  A thumbnail preview and the video title will appear.
4.  Click the "Download Video Now" button to download the video.

## Deployment Notes

### Frontend Deployment

To deploy the React frontend, you can create a production build:

```bash
cd frontend
npm run build
```

Then, upload the contents of the `build` folder to your web server (e.g., `public_html` in cPanel).

### Backend Deployment

Deploying the Node.js backend to cPanel can be challenging as cPanel is not primarily designed for Node.js applications. If your cPanel host offers a "Setup Node.js App" feature, you can use that. Otherwise, consider these alternatives for a more robust and scalable deployment:

*   **Virtual Private Server (VPS):** Such as AWS EC2, Google Cloud Compute Engine, or Azure Virtual Machines. This gives you full control over the server environment.
*   **Platform as a Service (PaaS):** Services like Heroku or Render are excellent choices for deploying Node.js applications, handling much of the infrastructure for you.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
