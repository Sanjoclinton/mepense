import { Bell, X } from "lucide-react";
import React, { useEffect, useState } from "react";

const NotificationToast = ({ notification }) => {
  const [visible, setVisible] = useState(true);
  const [bodyVisible, setBodyVisible] = useState(false);

  const handleClose = () => {
    setVisible(false);
    setBodyVisible(false);
  };

  useEffect(() => {
    if (notification) {
      setVisible(true);
    }
  }, [notification]);

  return (
    <div>
      <div
        className={`fixed ml-6 bottom-20 right-8 bg-blue-600 rounded-lg shadow-md shadow-black/10 flex flex-col gap-3 overflow-hidden max-w-md transition-all duration-500 ease-in-out ${
          visible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        <div className="text-white flex gap-3 justify-between items-center px-4 py-3 ">
          <div
            onClick={() => setBodyVisible(true)}
            className="flex gap-3 items-center"
          >
            <Bell
              size={20}
              className={`cursor-pointer ${!bodyVisible && "animate-shake"} `}
            />
            <h4>{notification?.title}</h4>
          </div>
          <X
            onClick={handleClose}
            size={20}
            className=" cursor-pointer hover:scale-[1.02]"
          />
        </div>

        {bodyVisible && (
          <div className="px-4 py-3 bg-white dark:bg-gray-800 flex flex-col gap-4 ">
            {notification.image && (
              <img
                src={notification.image}
                alt="profile picture of customer care"
                className="rounded-full h-8 w-8"
              />
            )}

            <p className="text-gray-700 dark:text-gray-200 text-sm">
              {notification.body}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationToast;
