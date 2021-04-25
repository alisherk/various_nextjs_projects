import { PostContent } from "component/posts/post-detail/PostContent";
import { getPostData, getPostFiles, Post } from "helper/post-util";
import {
  GetStaticPropsContext,
  GetStaticProps,
  GetStaticPaths,
  GetStaticPathsContext,
} from "next";

//we can type params on the context as well
type Params = {
  slug: string;
};

type SlugPageProps = {
  post: Post;
};

export const getStaticPaths: GetStaticPaths<Params> = async (
  ctx: GetStaticPathsContext
) => {
  const postFiles = getPostFiles(); 

  const slugs = postFiles.map(fileName => fileName.replace(/\.md$/,""));
  return {
    paths: slugs.map(slug => ({ params: { slug }})),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<SlugPageProps, Params> = async (
  ctx: GetStaticPropsContext<Params>
) => {
  const { params: { slug } } = ctx;
  const post = getPostData(slug);
  return {
    props: { post },
    revalidate: 600,
  };
};

export default function PostDetailPage({ post }: SlugPageProps) {
  return <PostContent post={post} />;
}
