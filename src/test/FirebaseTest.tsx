import React, {useEffect, useState} from "react";
import {View, Text} from "react-native";
import {
  webAuth,
  webDb,
  rnAuth,
  rnFirestore,
  rnStorage,
} from "../config/firebase.config";

export const FirebaseTest = () => {
  const [status, setStatus] = useState("Testing...");

  useEffect(() => {
    try {
      // Test if Firebase app is initialized
      if (webAuth && webDb && rnAuth && rnFirestore && rnStorage) {
        setStatus("✅ Firebase configurations loaded successfully!");
        console.log("Web Auth instance created:", !!webAuth);
        console.log("Web Db instance created:", !!webDb);
        console.log("RN Auth instance created:", !!rnAuth);
        console.log("RN Firestore instance created:", !!rnFirestore);
        console.log("RN Storage instance created:", !!rnStorage);
      } else {
        setStatus("❌ Firebase configuration failed to load");
      }
    } catch (error: any) {
      setStatus(`❌ Error: ${error.message}`);
      console.error("Firebase configuration error:", error);
    }
  }, []);

  return (
    <View style={{padding: 20}}>
      <Text>{status}</Text>
    </View>
  );
};
