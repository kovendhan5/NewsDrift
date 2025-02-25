import { initAuth0 } from '@auth0/nextjs-auth0';
import config from './config';

export const auth0Config = initAuth0({
  secret: process.env.AUTH0_CLIENT_SECRET!,
  issuerBaseURL: `https://${config.auth0.domain}`,
  baseURL: config.app.frontendUrl,
  clientID: config.auth0.clientId,
  clientSecret: config.auth0.clientSecret,
  routes: {
    callback: '/api/auth/callback',
    postLogoutRedirect: '/',
  },
  session: {
    rollingDuration: 60 * 60 * 24, // 24 hours in seconds
    absoluteDuration: 60 * 60 * 24 * 7, // 7 days in seconds
  },
  authorizationParams: {
    response_type: 'code',
    audience: config.auth0.audience,
    scope: 'openid profile email',
  },
});