export const kickConfig = {
    authorizationURL: 'https://id.kick.com/oauth/authorize',
    tokenURL: 'https://id.kick.com/oauth/token',
    userInfoURL: 'https://kick.com/api/v2/user',
    clientId: process.env.KICK_CLIENT_ID,
    clientSecret: process.env.KICK_CLIENT_SECRET,
    redirectUri: process.env.KICK_REDIRECT_URI,
    scopes: process.env.KICK_SCOPES || 'user:read channel:read channel:write chat:write streamkey:read events:subscribe moderation:ban',
};

// Cookie options
export const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    signed: true,
    maxAge: parseInt(process.env.SESSION_MAX_AGE) || 3600000, // 1 hour
    sameSite: 'lax',
};
