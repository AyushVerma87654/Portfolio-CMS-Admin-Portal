import { FC, useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "../redux/store";
import {
  blogsMapSelector,
  blogsLoadingSelector,
} from "../redux/selectors/blogsSelector";
import {
  fetchBlogsInitiatedAction,
  createBlogInitiatedAction,
  updateBlogInitiatedAction,
  deleteBlogInitiatedAction,
} from "../redux/slice/blogsSlice";
import { imageUploadInitiatedAction } from "../redux/slice/imageUploadSlice";
import { uploadedImageUrlSelector } from "../redux/selectors/imageUploadSelector";
import Input from "../components/Input";
import Button from "../components/Button";
import { IoClose } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { RiVideoUploadLine } from "react-icons/ri";
import { isLoggedInSelector } from "../redux/selectors/userSelector";
import Loading from "../components/Loading";

const BlogsPage: FC<ReduxProps> = ({
  blogs,
  loading,
  fetchBlogs,
  addBlog,
  updateBlog,
  deleteBlog,
  uploadImage,
  imageUrl,
  isLoggedIn,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [expandedBlogId, setExpandedBlogId] = useState<string>("");
  const [editingBlogId, setEditingBlogId] = useState<string>("");
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  useEffect(() => {
    if (imageUrl) setCoverImageUrl(imageUrl);
  }, [imageUrl]);

  const resetForm = () => {
    setTitle("");
    setSlug("");
    setCategory("");
    setContent("");
    setCoverImageUrl("");
    setEditingBlogId("");
  };

  const handleAddNewClick = () => {
    setShowForm((prev) => !prev);
    resetForm();
  };

  const handleEditBlog = (blog: any) => {
    setEditingBlogId(blog.id);
    setShowForm(true);
    setTitle(blog.title);
    setSlug(blog.slug);
    setCategory(blog.category || "");
    setContent(blog.content || "");
    setCoverImageUrl(blog.coverImageUrl || "");
  };

  const handleSubmitBlog = () => {
    if (!title.trim() || !slug.trim()) return;

    const blogPayload = {
      title: title.trim(),
      slug: slug.trim(),
      category: category.trim(),
      content: content.trim(),
      coverImageUrl: coverImageUrl.trim(),
    };

    if (editingBlogId) {
      updateBlog({ blog: { id: editingBlogId, ...blogPayload } });
    } else {
      addBlog({ blog: blogPayload });
    }

    resetForm();
    setShowForm(false);
  };

  const handleDeleteBlog = (id: string) => {
    deleteBlog({ id });
  };

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4 min-w-0">
        <h1 className="text-2xl font-bold">Blogs</h1>

        {isLoggedIn && (
          <div className="text-center">
            <Button
              onClick={handleAddNewClick}
              className={showForm ? "bg-gray-500" : ""}
            >
              {showForm ? (
                <div className="flex items-center gap-2">
                  <IoClose size={22} />
                  <span>Cancel</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <FaPlus />
                  <span>{editingBlogId ? "Edit Blog" : "Add New Blog"}</span>
                </div>
              )}
            </Button>
          </div>
        )}
      </div>

      {isLoggedIn && (
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            showForm
              ? "opacity-100 mb-6"
              : "max-h-0 opacity-0 mb-0 pointer-events-none"
          }`}
        >
          <div className="space-y-4 border p-4 rounded shadow">
            <Input
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input
              label="Slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />
            <Input
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <Input
              label="Cover Image URL"
              value={coverImageUrl}
              onChange={() => {}}
            />

            <div className="flex flex-col sm:flex-row items-center gap-8">
              <label className="flex flex-col items-center justify-center px-4 py-4 bg-orange-50 text-orange-600 rounded-lg border-2 border-dashed border-orange-300 cursor-pointer hover:bg-orange-100 w-36 text-center">
                <RiVideoUploadLine className="w-6 h-6 mb-1" />
                <span className="text-sm font-medium">
                  {loading ? "Uploading..." : "Choose Image"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) uploadImage({ file });
                  }}
                />
              </label>

              {coverImageUrl && (
                <img
                  src={coverImageUrl}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded border"
                />
              )}
            </div>

            <textarea
              rows={10}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border-2 border-black rounded-md p-3"
              placeholder="Write blog content here..."
            />

            <Button onClick={handleSubmitBlog}>
              {editingBlogId ? "Update Blog" : "Add Blog"}
            </Button>
          </div>
        </div>
      )}

      {loading ? (
        <Loading className="h-72" />
      ) : (
        <div className="space-y-3">
          {blogs.map((blog) => {
            const isExpanded = expandedBlogId === blog.id;
            if (editingBlogId === blog.id) return;

            return (
              <div key={blog.id} className="bg-white p-4 rounded shadow">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="flex flex-col sm:flex-row items-center justify-center text-center gap-3">
                    {blog.coverImageUrl && (
                      <div className="mx-auto">
                        <img
                          src={blog.coverImageUrl}
                          className="w-32 h-32 sm:min-w-12 sm:min-h-12 sm:max-w-12 sm:max-h-12 object-cover rounded"
                        />
                      </div>
                    )}
                    <div>
                      <h2 className="font-semibold">{blog.title}</h2>
                      <p className="text-xs text-gray-500">/{blog.slug}</p>
                      {blog.category && (
                        <p className="text-xs text-gray-400">
                          Category: {blog.category}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      className="bg-blue-500"
                      onClick={() =>
                        setExpandedBlogId(isExpanded ? "" : blog.id)
                      }
                    >
                      {isExpanded ? "Hide Content" : "View Content"}
                    </Button>

                    {isLoggedIn && (
                      <>
                        <Button
                          className="bg-yellow-500"
                          onClick={() => handleEditBlog(blog)}
                        >
                          Edit
                        </Button>
                        <Button
                          className="bg-red-500"
                          onClick={() => handleDeleteBlog(blog.id)}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isExpanded ? "opacity-100 mt-4" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="border-t pt-3 text-sm whitespace-pre-line">
                    {blog.content}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  blogs: blogsMapSelector(state),
  loading: blogsLoadingSelector(state),
  imageUrl: uploadedImageUrlSelector(state),
  isLoggedIn: isLoggedInSelector(state),
});

const mapDispatchToProps = {
  fetchBlogs: fetchBlogsInitiatedAction,
  addBlog: createBlogInitiatedAction,
  updateBlog: updateBlogInitiatedAction,
  deleteBlog: deleteBlogInitiatedAction,
  uploadImage: imageUploadInitiatedAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector> & { isLoggedIn: boolean };

export default connector(BlogsPage);
