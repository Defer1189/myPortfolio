import express from 'express';

const router = express.Router();

/**
 * GET /api/info
 * Get API information
 */
router.get('/info', (req, res) => {
    res.json({
        name: 'KICK API Integration',
        version: '1.0.0',
        description: 'Backend API for KICK OAuth2 integration',
        endpoints: {
            health: 'GET /health',
            apiInfo: 'GET /api/info',
            authLogin: 'GET /api/auth/login',
            authCallback: 'GET /api/auth/callback',
            authUser: 'GET /api/auth/user',
            authLogout: 'POST /api/auth/logout',
        },
        oauth: {
            provider: 'KICK',
            scopes: (process.env.KICK_SCOPES || '').split(' '),
        },
    });
});

export default router;
