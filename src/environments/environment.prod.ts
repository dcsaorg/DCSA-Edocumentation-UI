export const environment = {
  production: true
};

// define Server here, if you are not in production mode and want to have another server than http://localhost:8080
// for remote server accessing your local gui for e.g. sahi test insert your local rest client here
export const BACKEND_URL =  window.location.origin + '/api';
export const CONFIG_FILE = 'assets/config.json';
