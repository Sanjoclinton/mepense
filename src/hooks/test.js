import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

export const test = async () => {
  const usersCollectionRef = collection(db, "users");

  try {
    const querySnapShot = await getDocs(usersCollectionRef);
    querySnapShot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
    });
  } catch (error) {}

  return {
    
  };
};
