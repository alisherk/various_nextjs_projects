import classes from "./newsletter-registration.module.css";
import React, { useRef, useContext } from "react";
import NotificationContext from "../../store/notification-context";

function NewsletterRegistration() {
  const inputRef = useRef();
  const notificationCtx = useContext(NotificationContext);

  async function registrationHandler(event) {
    notificationCtx.showNotification({
      title: "Signing up",
      message: "Registerning newsletter",
      status: "pending",
    });
    event.preventDefault();
    const email = inputRef.current.value;
    const resp = await fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    await resp.json();
    notificationCtx.showNotification({
      title: "Success",
      message: "Sucessfully registered for newsletter",
      status: "success",
    });
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            ref={inputRef}
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
