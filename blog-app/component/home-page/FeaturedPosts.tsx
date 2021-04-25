import { PostGrid } from "component/posts/PostGrid";
import { Post } from "component/posts/types";
import classes from "./feature-posts.module.css";

interface FeaturedPostProps {
  posts: Post[];
}

export const FeaturedPosts = ({ posts }: FeaturedPostProps) => {
  return (
    <section className={classes.latest}>
      <h2> Feature Posts </h2>
      <PostGrid posts={posts}/>
    </section>
  );
};
