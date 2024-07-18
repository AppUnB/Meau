import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export async function uploadImage(uri, path) {
  const storage = getStorage();
  const storageRef = ref(storage, path);

  let URL;
  const response = await fetch(uri);
  const blob = await response.blob();

  await uploadBytes(storageRef, blob);

  URL = await getDownloadURL(storageRef);
  console.log(URL);

  return URL;
}
