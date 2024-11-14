import { useEffect, useRef, useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { doc, updateDoc } from "firebase/firestore";

import React from "react";
import { db } from "../config/firebase";
import { Upload } from "lucide-react";

const UploadWidget = () => {
  const { user } = useAuthContext();
  const userId = user.uid;

  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    const setImageUrl = async (url) => {
      const washingtonRef = doc(db, "users", userId, "settings", "main");
      await updateDoc(washingtonRef, {
        imageUrl: url,
      });
    };

    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dpbbc9zyd",
        uploadPreset: "smt4ffrg",
        publicId: userId,
        cropping: true,
        multiple: false,
        sources: ["local", "url", "camera"],
        resource_type: "image",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          setImageUrl(result.info.secure_url);
        }
      }
    );
  }, []);

  return (
    <div>
      <button
        onClick={() => {
          widgetRef.current.open();
        }}
      >
        <Upload color="white" size={16} />
      </button>
    </div>
  );
};

export default UploadWidget;
