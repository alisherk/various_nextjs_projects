import classes from "./all-posts.module.css";
import { PostGrid } from "./PostGrid";
import { Post } from "./types";

interface AllPostsProps {
  posts: Post[];
}

export const AllPosts = ({ posts }: AllPostsProps) => {
  return (
    <section className={classes.posts}>
      <h1> All Posts</h1>
      <PostGrid posts={posts} />
    </section>
  );
};
