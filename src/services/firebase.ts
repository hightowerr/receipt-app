import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  Timestamp,
  orderBy,
} from "firebase/firestore";

// The following global variables are provided by the environment
// and must be used for Firebase initialization.
declare const __app_id: string;
declare const __firebase_config: string;

// Initialize Firebase with the provided configuration.
const firebaseConfig = JSON.parse(__firebase_config);
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Use a specific app ID for Firestore data paths to ensure isolation.
const appId = typeof __app_id !== "undefined" ? __app_id : "default-app-id";

// Define a type for a receipt document to ensure type safety.
export interface Receipt {
  userId: string;
  amount: number;
  description: string;
  date: Timestamp;
}

/**
 * Service for interacting with Firestore, specifically for receipts.
 */
export const firestoreService = {
  /**
   * Adds a new receipt document to the Firestore database.
   * @param data The receipt data to add.
   */
  addReceipt: async (data: Omit<Receipt, 'date'>) => {
    try {
      const collectionPath = `artifacts/${appId}/public/data/receipts`;
      const docRef = await addDoc(collection(db, collectionPath), {
        ...data,
        date: Timestamp.now(), // Add a server-side timestamp
      });
      console.log("Document written with ID: ", docRef.id);
      return docRef.id;
    } catch (e) {
      console.error("Error adding document: ", e);
      throw e;
    }
  },

  /**
   * Fetches all receipts for a given user from Firestore.
   * @param userId The ID of the user whose receipts to fetch.
   */
  getReceipts: async (userId: string): Promise<Receipt[]> => {
    try {
      const collectionPath = `artifacts/${appId}/public/data/receipts`;
      const q = query(
        collection(db, collectionPath),
        where("userId", "==", userId)
      );

      const querySnapshot = await getDocs(q);
      const receipts: Receipt[] = [];
      querySnapshot.forEach((doc) => {
        // Cast the data to the Receipt type.
        const data = doc.data() as Omit<Receipt, 'date'> & { date: Timestamp };
        receipts.push({
          ...data,
          date: data.date,
        });
      });
      console.log("Found receipts:", receipts);
      return receipts;
    } catch (e) {
      console.error("Error getting documents: ", e);
      throw e;
    }
  },
};
