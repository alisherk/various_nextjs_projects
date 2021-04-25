import { Fragment } from "react";
import { Hero } from "component/home-page/Hero";
import { FeaturedPosts } from "component/home-page/FeaturedPosts";
import { getFeaturedPosts, Post } from "helper/post-util";
import { GetStaticProps } from "next";

type HomePageProps = {
  posts: Post[];
};

export const getStaticProps: GetStaticProps<HomePageProps, undefined> = async (
) => {
  const featuredPosts = getFeaturedPosts();
  return {
    props: { posts: featuredPosts },
    revalidate: 60,
  };
};

export default function HomePage({ posts }: HomePageProps) {
  return (
    <Fragment>
      <Hero />
      <FeaturedPosts posts={posts} />
    </Fragment>
  );
}
