export interface Config {

  useBackend: boolean;
  supportBackendURL?: string | null;
  eblBackendURL?: string | null;
  bkgBackendURL?: string | null;

  eblUnofficialBackendURL?: string | null;
  bkgUnofficialBackendURL?: string | null;

  dateTimeFormat: string;
  dateFormat: string;
  authRegion?: string | null;
  authUserPoolId?: string | null;
  authUserPoolWebClientId?: string | null;
  authRedirectUriSignIn?: string | null;
  authentication: boolean;

  features: {
    supportNonISO6346References: false
  }

}
