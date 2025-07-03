const express = require('express');
const cors = require('cors');
const tiktokdlModule = require('@tobyg74/tiktok-api-dl');
const axios = require('axios');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.post('/download', async (req, res) => {
    try {
        const { url } = req.body;
        if (!url || !url.includes('tiktok.com')) {
            return res.status(400).json({ error: 'Invalid TikTok URL' });
        }

        console.log('Attempting to get TikTok video info from:', url);
        const result = await tiktokdlModule.Downloader(url);
        console.log('TikTok DL Result:', JSON.stringify(result, null, 2));

        let videoUrl = null;
        let thumbnailUrl = null;
        let videoTitle = 'tiktok_video'; // Default title

        if (result.status === 'success' && result.result && result.result.video) {
            if (result.result.video.noWatermark) {
                videoUrl = result.result.video.noWatermark;
            } else if (result.result.video.downloadAddr && result.result.video.downloadAddr.length > 0) {
                videoUrl = result.result.video.downloadAddr[0];
            }

            if (result.result.video.cover && result.result.video.cover.length > 0) {
                thumbnailUrl = result.result.video.cover[0];
            }

            // Use video description as title if available
            if (result.result.desc) {
                videoTitle = result.result.desc;
            }
        }

        if (videoUrl) {
            res.json({ success: true, videoUrl: videoUrl, thumbnailUrl: thumbnailUrl, title: videoTitle });
        } else {
            console.error('TikTok DL failed or no suitable video URL found. Full result object:', JSON.stringify(result, null, 2));
            res.status(404).json({ error: 'Could not find video or no suitable download URL available.' });
        }

    } catch (error) {
        console.error('Error in backend:', error.message);
        console.error('Full error object:', error);
        res.status(500).json({ error: 'Failed to process request.' });
    }
});

app.listen(port, () => {
    console.log(`Backend server listening at http://localhost:${port}`);
});
