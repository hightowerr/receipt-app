// v2 Storage-triggered OCR bound to a specific bucket

import * as admin from "firebase-admin"; // Admin SDK (server)
import {ImageAnnotatorClient} from "@google-cloud/vision"; // Vision client
import {
  onObjectFinalized,
  StorageObjectData,
} from "firebase-functions/v2/storage"; // v2 Storage trigger
import {CloudEvent, setGlobalOptions} from "firebase-functions/v2"; // v2

admin.initializeApp(); // Init Admin SDK
const db = admin.firestore(); // Firestore handle
const vision = new ImageAnnotatorClient(); // Vision API client

setGlobalOptions({region: "europe-west1"}); // e.g. "europe-west2"

// Use the exact bucket name from Storage -> Files
// (usually <project>.appspot.com)
const BUCKET = "receipt-app-46ca7.appspot.com"; // Bound bucket

export const onReceiptImageUpload = onObjectFinalized(
  {bucket: BUCKET}, // Listen to this bucket only
  async (event: CloudEvent<StorageObjectData>) => {
    const obj = event.data; // Storage object metadata
    if (!obj) return;

    const ct = obj.contentType || ""; // MIME type
    if (!ct.startsWith("image/")) return; // Process images only

    const path = obj.name || ""; // Object path in bucket
    if (!path.startsWith("receipts/")) return; // Only our folder

    const md = obj.metadata || {}; // Custom upload metadata
    const docId = md.docId; // Firestore doc to update
    const uid = md.uid; // Owner user id
    if (!docId || !uid) return; // Require linkage

    const docRef = db.collection("receipts").doc(docId); // Firestore doc ref

    try {
      await docRef.set(
        // Mark processing
        {
          uid,
          status: "processing",
          ocrProvider: "gcp_vision",
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        },
        {merge: true}
      );

      const gcsUri = `gs://${obj.bucket}/${path}`; // gs:// URI for Vision
      const [res] = await vision.textDetection(gcsUri); // OCR call
      const text = res.fullTextAnnotation?.text || ""; // Extract text

      await docRef.set(
        // Save result
        {
          status: "done",
          textRaw: text,
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        },
        {merge: true}
      );
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e); // Normalize
      await docRef.set(
        // Surface error
        {
          status: "error",
          errorMessage: msg,
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        },
        {merge: true}
      );
      throw e; // Keep error in logs
    }
  }
);
