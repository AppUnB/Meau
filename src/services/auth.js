import { backendClient } from "../backend/client";

async function login(email, password) {
  return backendClient.login(email, password);
}

async function register(email, password, nome, imageUrl) {
  return backendClient.register(email, password, nome, imageUrl);
}

export { login, register };
