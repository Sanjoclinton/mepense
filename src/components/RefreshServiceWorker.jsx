import { useEffect, useState } from "react";
import { registerSW } from "virtual:pwa-register";

import { RefreshCw, X } from "lucide-react"; // Assuming you have lucide-react installed

const RefreshServiceWorker = () => {
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    console.log("Before refresh");
    const updateSW = registerSW({
      onNeedRefresh() {
        setRefresh(true);
        console.log("here");
      },

      onOfflineReady() {},
    });

    return () => {
      updateSW?.();
    };
  }, []);

  return (
    refresh && (
      <div className="fixed bottom-4 right-4 z-50 max-w-sm bg-white rounded-lg shadow-lg border border-gray-100 p-4">
        <div className="flex flex-col gap-3">
          <p className="text-gray-700 text-sm font-medium">
            A new version is available!
          </p>
          <div className="flex gap-3">
            <button
              aria-label="Reload Page"
              onClick={() => window.location.reload()}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors duration-200"
            >
              <RefreshCw className="w-4 h-4" />
              Update
            </button>
            <button
              aria-label="Dismiss update"
              onClick={() => setRefresh(false)}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors duration-200"
            >
              <X className="w-4 h-4" />
              Dismiss
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default RefreshServiceWorker;
