import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";

const AdminIndexPage = () => {
  const [tokens, setTokens] = useState(null);


  useEffect(() => {
    const tokensCollectionRef = collection(db, "tokens");
    const unsub = onSnapshot(tokensCollectionRef, (querySnapshot) => {
      let data = [];
      querySnapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          token: doc.data().token,
        });
      });
      setTokens(data);
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    tokens && (
      <div className="flex flex-col gap-4 w-screen p-6">
        {tokens.map((token, index) => (
          <ul key={index} className="text-xs w-100">
            <li>
              <span className="font-semibold">Name :</span> {token.id}
            </li>
            <li className="break-words">
              <span className="font-semibold">Token :</span> {token.token}
            </li>
          </ul>
        ))}
      </div>
    )
  );
};

export default AdminIndexPage;
