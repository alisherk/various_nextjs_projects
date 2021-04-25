import { AllPosts } from "component/posts/AllPosts";
import { getAllPosts, Post } from "helper/post-util";
import { GetStaticPropsContext, GetStaticProps } from "next";

type AllPostProps = {
  posts: Post[];
};

export const getStaticProps: GetStaticProps<AllPostProps, undefined> = async (
  ctx: GetStaticPropsContext
) => {
  const allPosts = getAllPosts();
  return {
    props: { posts: allPosts },
  };
};

export default function AllPostsPage({ posts }: AllPostProps) {
  return <AllPosts posts={posts}/>
}
