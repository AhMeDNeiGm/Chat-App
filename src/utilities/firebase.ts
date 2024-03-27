import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyDnjwBcCXl01OVUrKnzECp2FCT1xSNgqCg',
  authDomain: 'convo-file-bucket.firebaseapp.com',
  projectId: 'convo-file-bucket',
  storageBucket: 'convo-file-bucket.appspot.com',
  messagingSenderId: '208917418919',
  appId: '1:208917418919:web:e63aa01b6d5c8eb8d59c82'
}

const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
