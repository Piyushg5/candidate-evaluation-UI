export const msalConfig = {
    auth: {
      clientId: '811ba117-edae-4f84-a037-6bfa036c7a2a',
      authority: 'https://login.microsoftonline.com/intelliswift.com',
      redirectUri: '/',
      postLogoutRedirectUri: '/login',
      navigateToLoginRequestUrl: true,
    },
    cache: {
      cacheLocation: 'sessionStorage',
      storeAuthStateInCookie: true,
    }
  };
  // Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
 scopes: ["User.Read"]
};

// Add the endpoints here for Microsoft Graph API services you'd like to use.
export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
};