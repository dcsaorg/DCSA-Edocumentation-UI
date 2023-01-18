export interface Config {
  supportBackendURL: string | null;
  eblBackendURL: string;
  bkgBackendURL: string;

  dateTimeFormat: string;
  dateFormat: string;
  authRegion: string;
  authUserPoolId: string;
  authUserPoolWebClientId: string;
  authRedirectUriSignIn: string;
  authentication: boolean;

}
