export interface ImageSource {
  url: string;
  width: number;
  height: number;
}

export type Response<T = { [key: string]: any }> = {
  kind: string;
  data: T;
};

export type ApiResponse = Response<{
  children: Response[];
  [key: string]: any;
}>;

export type Post = {
  id: string;
  created: string;
  thumbnail: string;
  preview: {
    images: {
      id: string;
      source: ImageSource;
      resolutions: ImageSource[];
    }[];
    reddit_video_preview: Omit<ImageSource, 'url'> & { fallback_url: string };
  };
  url: string;
  subreddit: string;
  title: string;
  downs: number;
  ups: number;
};

export type PostResponse = Response<{
  children: Response[];
  [key: string]: any;
}> & {
  error: string;
};

// export interface PostResponse {
//   data: Response<{
//     children: Response[];
//     [key: string]: any;
//   }>;
//   error: string;
// }
export interface PostState {
  data: Post[];
  loading: boolean;
  error: string;
}
