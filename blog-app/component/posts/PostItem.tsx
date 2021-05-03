import Link from "next/link";
import Image from "next/image";
import classes from "./post-item.module.css";
import { Post } from "./types";

interface PostItemProps {
  post: Post;
}

export const PostItem = ({ post }: PostItemProps) => {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const imagePath = `/images/posts/${post.slug}/${post.image}`;
  const linkPath = `/posts/${post.slug}`;

  return (
    <li className={classes.post}>
      <Link href={linkPath}>
        <a className={classes.image}>
          <div>
            <Image
              src={imagePath}
              alt={post.title}
              width={300}
              height={200}
              layout="responsive"
            />
          </div>
          <div className={classes.image}>
            <h3> {post.title} </h3>
            <time> {formattedDate} </time>
            <p>{post.excerpt}</p>
          </div>
        </a>
      </Link>
    </li>
  );
};
