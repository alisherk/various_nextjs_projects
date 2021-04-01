import classes from "./newsletter-registration.module.css";
import React, { useRef } from "react";

function NewsletterRegistration() {
 
  const inputRef = useRef()
  async function registrationHandler(event) {
    event.preventDefault();
    const email = inputRef.current.value;
    const resp = await fetch("api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await resp.json();
    console.log(data);
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
