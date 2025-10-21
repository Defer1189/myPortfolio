import express from 'express';
import axios from 'axios';
import { kickConfig, cookieOptions } from '../config/oauth.config.js';
import { generateState, validateState } from '../utils/oauthHelpers.js';

const router = express.Router();

/**
 * GET /api/auth/login
 * Initiate OAuth2 login flow
 * Generates a random state, stores it in a signed cookie, and redirects to KICK authorization
 */
router.get('/login', (req, res) => {
    try {
        // Generate random state for CSRF protection
        const state = generateState();

        // Store state in signed cookie
        res.cookie('oauth_state', state, cookieOptions);

        // Build authorization URL
        const authParams = new URLSearchParams({
            client_id: kickConfig.clientId,
            redirect_uri: kickConfig.redirectUri,
            response_type: 'code',
            scope: kickConfig.scopes,
            state: state,
        });

        const authorizationUrl = `${kickConfig.authorizationURL}?${authParams.toString()}`;

        // Redirect to KICK authorization page
        res.redirect(authorizationUrl);
    } catch (error) {
        console.error('Error initiating OAuth login:', error);
        res.status(500).json({
            error: 'Failed to initiate login',
            message: error.message,
        });
    }
});

/**
 * GET /api/auth/callback
 * OAuth2 callback endpoint
 * Validates state, exchanges code for tokens, and stores user data
 */
router.get('/callback', async (req, res) => {
    try {
        const { code, state: receivedState } = req.query;

        // Validate required parameters
        if (!code || !receivedState) {
            return res.status(400).json({
                error: 'Missing required parameters',
                message: 'Code and state are required',
            });
        }

        // Retrieve state from signed cookie
        const storedState = req.signedCookies.oauth_state;

        // Validate state to prevent CSRF attacks
        if (!validateState(receivedState, storedState)) {
            return res.status(401).json({
                error: 'Invalid state',
                message: 'State validation failed. Possible CSRF attack.',
            });
        }

        // Clear the state cookie
        res.clearCookie('oauth_state');

        // Exchange authorization code for access token
        const tokenResponse = await axios.post(
            kickConfig.tokenURL,
            {
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: kickConfig.redirectUri,
                client_id: kickConfig.clientId,
                client_secret: kickConfig.clientSecret,
            },
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            },
        );

        const { access_token, refresh_token, expires_in, token_type } = tokenResponse.data;

        // Fetch user information
        const userResponse = await axios.get(kickConfig.userInfoURL, {
            headers: {
                Authorization: `${token_type} ${access_token}`,
            },
        });

        const userData = userResponse.data;

        // Store tokens and user data in signed cookies
        res.cookie('access_token', access_token, {
            ...cookieOptions,
            maxAge: expires_in * 1000,
        });

        if (refresh_token) {
            res.cookie('refresh_token', refresh_token, cookieOptions);
        }

        res.cookie(
            'user_data',
            JSON.stringify({
                id: userData.id,
                username: userData.username,
                email: userData.email,
            }),
            cookieOptions,
        );

        // Redirect to frontend with success
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
        res.redirect(`${frontendUrl}/auth/success`);
    } catch (error) {
        console.error('OAuth callback error:', error.response?.data || error.message);
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
        res.redirect(`${frontendUrl}/auth/error?message=${encodeURIComponent(error.message)}`);
    }
});

/**
 * GET /api/auth/user
 * Get current user data from stored cookies
 */
router.get('/user', (req, res) => {
    try {
        const userData = req.signedCookies.user_data;
        const accessToken = req.signedCookies.access_token;

        if (!userData || !accessToken) {
            return res.status(401).json({
                error: 'Not authenticated',
                message: 'No user session found',
            });
        }

        res.json({
            user: JSON.parse(userData),
            authenticated: true,
        });
    } catch (error) {
        console.error('Error getting user data:', error);
        res.status(500).json({
            error: 'Failed to get user data',
            message: error.message,
        });
    }
});

/**
 * POST /api/auth/logout
 * Clear all authentication cookies
 */
router.post('/logout', (req, res) => {
    try {
        // Clear all auth-related cookies
        res.clearCookie('access_token');
        res.clearCookie('refresh_token');
        res.clearCookie('user_data');
        res.clearCookie('oauth_state');

        res.json({
            success: true,
            message: 'Logged out successfully',
        });
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).json({
            error: 'Failed to logout',
            message: error.message,
        });
    }
});

export default router;
