

import { PostItem } from "./PostItem";
import classes from "./posts-grid.module.css"; 

interface PostGridProps {
    posts: any[]
}

export const PostGrid = ({ posts }: PostGridProps) => {
    return (
       <ul className={classes.grid}> 
          {posts.map(post => <PostItem />)}
       </ul>
    );
}

