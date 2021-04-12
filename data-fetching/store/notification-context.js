import { createContext, useState, useEffect } from "react";

const NotificationContext = createContext({
  notification: null,
  showNotification: function (data) {},
  hideNotification: function () {},
});

export function NotificationContextProvider(props) {
  const [activeNotification, setActiveNotifications] = useState(null);

  useEffect(() => {
    let timer;
    if (activeNotification?.status === "success") {
      timer = setTimeout(() => {
        hideNotificationHandler();
      }, 4000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [activeNotification]);

  function showNotificationHandler(data) {
    setActiveNotifications(data);
  }

  function hideNotificationHandler() {
    setActiveNotifications(null);
  }

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
