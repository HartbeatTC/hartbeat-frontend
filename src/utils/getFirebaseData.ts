import { getStorage, ref, getDownloadURL } from 'firebase/storage';

export const getFirebaseData = async (
  firebaseId: string,
  maxRetries: number = 3
) => {
  let attempts = 0;
  while (attempts < maxRetries) {
    try {
      const storage = getStorage();
      const imageRef = ref(
        storage,
        `userImages/${firebaseId}/profilePicture.jpg`
      );
      const url = await getDownloadURL(imageRef);
      return url;
    } catch (error) {
      if (attempts === maxRetries - 1)
        throw new Error('Failed to fetch user image');
      attempts++;
      console.error('Error fetching user image: ', error);
    }
  }
};
