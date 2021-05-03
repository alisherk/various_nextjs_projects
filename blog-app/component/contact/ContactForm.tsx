import { FormEvent, useState, useEffect } from 'react';
import { Notification } from '../ui/Notification';
import classes from './contact-form.module.css';

enum Status {
  pending,
  success,
  error,
}

type Contact = {
  email: string;
  name: string;
  message: string;
};

type Notification = {
  status: string;
  title: string;
  message: string;
};

async function sendContactData(contact: Contact) {
  const resp = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(contact),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await resp.json();
  if (!resp.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
}

export const ContactForm = () => {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [requestStatus, setRequestStatus] = useState<Status>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (requestStatus === Status.pending || requestStatus === Status.error) {
      setTimeout(() => {
        setRequestStatus(null);
        setError('');
      }, 3000);
    }
  }, [requestStatus]);

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();
    setRequestStatus(Status.pending);
    try {
      await sendContactData({ name, email, message });
      setRequestStatus(Status.success);
    } catch (error) {
      setError(error.message);
      setRequestStatus(Status.error);
    }
  };

  let notification: Notification;
  if (requestStatus === Status.pending) {
    notification = {
      status: 'pending',
      title: 'Sending',
      message: 'Your message is on the way',
    };
  }
  if (requestStatus === Status.success) {
    notification = {
      status: 'success',
      title: 'Success',
      message: 'Your message sent successfully',
    };
  }
  if (requestStatus === Status.error) {
    notification = {
      status: 'error',
      title: 'Failure',
      message: error,
    };
  }

  return (
    <section className={classes.contact}>
      <h1> How can I help you</h1>
      <form className={classes.form} onSubmit={sendMessage}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor='email'> Your email</label>
            <input
              type='email'
              id='email'
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor='name'> Your name</label>
            <input
              type='text'
              id='name'
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor='message'> Your message </label>
          <textarea
            required
            id='message'
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className={classes.actions}>
            <button> Send Message</button>
          </div>
        </div>
      </form>
      {notification && <Notification {...notification} />}
    </section>
  );
};
