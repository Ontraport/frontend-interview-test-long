import { Comment } from './comment.interface';

export interface Post {
  id: number;
  userId: number;
  date: string;
  content: string;
  comments: Comment[];
  username?: string;
  pic?: string;
}
