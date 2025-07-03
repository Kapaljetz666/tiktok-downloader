import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';

function App() {
  const [tiktokUrl, setTiktokUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [previewData, setPreviewData] = useState(null); // Stores { videoUrl, thumbnailUrl, title }

  const handleGetPreview = async () => {
    setError('');
    setLoading(true);
    setPreviewData(null); // Clear previous preview

    try {
      const response = await axios.post('http://localhost:5000/download', { url: tiktokUrl });
      if (response.data.success) {
        setPreviewData({ 
          videoUrl: response.data.videoUrl,
          thumbnailUrl: response.data.thumbnailUrl,
          title: response.data.title
        });
      } else {
        setError('Failed to get video preview.');
      }
    } catch (err) {
      console.error('Error during preview fetch:', err);
      setError(err.response?.data?.error || 'Failed to get video preview. Please try again.');
    }
    finally {
      setLoading(false);
    }
  };

  const handleActualDownload = async () => {
    setError('');
    setLoading(true);
    try {
      const response = await axios.get(previewData.videoUrl, { responseType: 'blob' });

      const contentDisposition = response.headers['content-disposition'];
      let filename = previewData.title ? `${previewData.title}.mp4` : 'tiktok_video.mp4';
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/);
        if (filenameMatch && filenameMatch[1]) {
          filename = filenameMatch[1];
        }
      }

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);

    } catch (err) {
      console.error('Error during actual download:', err);
      if (err.response && err.response.data) {
        const reader = new FileReader();
        reader.onload = function() {
          try {
            const errorData = JSON.parse(reader.result);
            setError(errorData.error || 'Failed to download video. Please try again.');
          } catch (e) {
            setError('Failed to download video. An unknown error occurred.');
          }
        };
        reader.readAsText(err.response.data);
      } else {
        setError('Failed to download video. Please check your network connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="mb-4 text-center">TikTok Video Downloader</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formTiktokUrl">
          <Form.Label>TikTok Video URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter TikTok video URL"
            value={tiktokUrl}
            onChange={(e) => setTiktokUrl(e.target.value)}
            disabled={loading}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleGetPreview} className="w-100" disabled={loading}>
          {loading ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
            'Get Video Info'
          )}
        </Button>
      </Form>

      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

      {previewData && (
        <div className="mt-4 text-center">
          <h3>Video Title: {previewData.title}</h3>
          {previewData.thumbnailUrl ? (
            <img src={previewData.thumbnailUrl} alt="Video Thumbnail" className="img-fluid" style={{ maxWidth: '300px' }} />
          ) : (
            <p>No thumbnail available.</p>
          )}
          
          <Button variant="success" onClick={handleActualDownload} className="w-100 mt-3" disabled={loading}>
            {loading ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              'Download Video Now'
            )}
          </Button>
        </div>
      )}

      <p className="mt-4 text-muted text-center">
        Note: This application uses a third-party library for TikTok downloads. Functionality may vary.
      </p>
    </Container>
  );
}

export default App;
