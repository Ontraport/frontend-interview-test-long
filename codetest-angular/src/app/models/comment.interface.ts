export interface Comment {
  id: number;
  userId: number;
  postId: number;
  content: string;
  date: string;
  username?: string;
  pic?: string;
}