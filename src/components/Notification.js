import React, { useEffect, useState } from "react";
import isWebview from "is-ua-webview";
import { Toaster, toast } from "react-hot-toast";
import { requestPermission, onMessageListener } from "../firebase";

function Notification() {
  const [notification, setNotification] = useState({ title: "", body: "" });

  useEffect(() => {
    console.log(
      "+++++++++is web view++++++++++++",
      isWebview(navigator.userAgent),
      navigator.userAgent
    );
    // console.log("mmmm",currentToken)
    let unsubscribe = null;
    if (!isWebview(navigator.userAgent)) {
      requestPermission();
      unsubscribe = onMessageListener().then((payload) => {
        setNotification({
          // title:payload?.notification?.title,
          // body:payload?.notification?.body

          title: "kkk",
          body: "kkkkkk",
        });
        toast.success(
          `${payload?.notification?.title}:${payload?.notification?.body}`,
          {
            duration: 60000,
            position: "top-right",
          }
        );
      });
    }
    return () => {
      unsubscribe.catch((err) => console.log("Failed :", err));
    };
  }, []);
  return (
    <div>
      <Toaster />
    </div>
  );
}
export default Notification;
