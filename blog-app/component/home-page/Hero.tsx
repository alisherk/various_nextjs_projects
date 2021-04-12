import Image from 'next/image';
import classes from "./hero.module.css";

export const Hero = () => {
  return (
    <section className={classes.hero}>
      <div className={classes.image}> <Image layout='responsive' src='/images/site/me.jpg' alt='an image showing Alisher' width={200} height={200}/></div>
      <h1> Hi, I am Alisher</h1>
      <p> I blog about Life</p>
    </section>
  );
};
