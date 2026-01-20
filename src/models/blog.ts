export type Blog = {
  id: string;
  title: string;
  slug: string;
  category: string;
  content: string;
  coverImageUrl: string;
  createdAt: string;
  updatedAt: string;
};

export type Blogs = Record<string, Blog>;
export type BlogMap = Blog[];

export type AddBlogPayload = {
  title: string;
  slug: string;
  category: string;
  content: string;
  coverImageUrl: string;
};

export type UpdateBlogPayload = AddBlogPayload & {
  id: string;
};
