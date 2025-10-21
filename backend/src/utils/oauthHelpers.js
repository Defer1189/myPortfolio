import crypto from 'crypto';

/**
 * Generate a random state string for OAuth2 CSRF protection
 * @returns {string} Random state string
 */
export function generateState() {
    return crypto.randomBytes(32).toString('hex');
}

/**
 * Validate that the state from the callback matches the stored state
 * @param {string} receivedState - State from callback query
 * @param {string} storedState - State from signed cookie
 * @returns {boolean} True if states match
 */
export function validateState(receivedState, storedState) {
    if (!receivedState || !storedState) {
        return false;
    }
    return receivedState === storedState;
}
