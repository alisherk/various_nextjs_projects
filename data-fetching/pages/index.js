import { getFeaturedEvents } from '../helpers/api-util';
import EventList from '../components/events/event-list';
import NewsletterRegistration from '../components/input/newsletter-registration';
import Head from 'next/head';

function HomePage(props) {
  return (
    <div>
      <Head>
        <title> Next Events</title>
        <meta name='description' content='Find a lot of great events' />
      </Head>
      <NewsletterRegistration />
      <EventList items={props.events} />
    </div>
  );
}

export const getStaticProps = async () => {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800, //regenaretd after 1800s
  };
};

export default HomePage;
