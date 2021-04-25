import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Post = {
  title: string;
  image: string;
  excerpt: string;
  date: string;
  slug: string;
  isFeatured: boolean;
};
const postDir = path.join(process.cwd(), "posts");

export const getPostFiles = () => {
  return fs.readdirSync(postDir);
};

export function getPostData(postIdentifier) {
  const postSlug = postIdentifier.replace(/\.md$/, "");
  const filePath = path.join(postDir, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  const postData = {
    slug: postSlug,
    date: data.date,
    isFeatured: data.isFeatured,
    title: data.title,
    image: data.image,
    excerpt: data.excerpt,
    content,
  } as Post;

  return postData;
}

export function getAllPosts() {
  const postFiles = getPostFiles();

  const allPosts = postFiles.map((postFile) => {
    return getPostData(postFile);
  });
  const sortedPosts = allPosts.sort((postA, postB) =>
    postA.date > postB.date ? -1 : 1
  );
  return sortedPosts;
}

export function getFeaturedPosts() {
  const allPosts = getAllPosts();
  const featuredPosts = allPosts.filter((post) => post.isFeatured);
  return featuredPosts;
}
