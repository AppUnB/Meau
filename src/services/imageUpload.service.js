import { backendClient } from "../backend/client";

export async function uploadImage(uri, path) {
  return backendClient.uploadImage(uri, path);
}
