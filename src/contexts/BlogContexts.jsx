import { login } from "../services/AccountService";
import React, { createContext, useContext, useEffect, useState } from "react";
import BlogService from "../services/BlogServices";
import { toast } from 'react-toastify'
const BlogContext = createContext(undefined);

export const BlogProvider = ({ children }) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [blogsMe, setBlogsMe] = useState([]);
  const [blog, setBlog] = useState({});
  const [blogUpdate, setBlogUpdate] = useState({});
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [user, setUser] = useState({});

  const [page, setPage] = useState(1);
  const [pageMe, setPageMe] = useState(1);
  const [blogsDatas, setBlogsData] = useState({});
  const [blogsDatasMe, setBlogsDataMe] = useState({});
  const [blogForm, setBlogForm] = useState({
    title: "",
    content: "",
    tag: "",
    user_id: "",
    images: ""
  });

  const fetchUser = async () => {
    const userData = await login();
    putBlogForm("user_id", userData?.id);
    setUser(userData || {});
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const putBlogForm = (key, value) => {
    setBlogForm(prev => ({ ...prev, [key]: value }));
  };

  const putBlogUpdate = (key, value) => {
    setBlogUpdate(prev => ({ ...prev, [key]: value }));
  };

  const putBlog = (key, value) => {
    setBlog(prev => ({ ...prev, [key]: value }));
  };

  const createSubmit = async () => {
    if (!blogForm.title || !blogForm.tag) {
      toast.error('Invalid require!')
      return null;
    }
    try {
      const newBlog = await BlogService.createBlog(blogForm);
      if (newBlog) {
        setShowBlogForm(false);
        setBlogForm({
          title: "",
          content: "",
          tag_id: "",
          images: ""
        });
        setBlogs([newBlog, ...blogs]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateSubmit = async (id) => {
    if (!blog.title || !blog.tag_id || !blog.user_id) {
      toast.error('Invalid require field')
      return undefined;
    }
    try {
      const newBlog = await BlogService.update(id, blog);
      if (newBlog) {
        return newBlog;
      }
    } catch (err) {
      console.error(err);
      return undefined;
    }
  };

  return (
    <BlogContext.Provider
      value={{
        searchKeyword,
        setSearchKeyword,
        blogs,
        setBlogs,
        blog,
        setBlog,
        showBlogForm,
        setShowBlogForm,
        blogForm,
        setBlogForm,
        putBlogForm,
        createSubmit,
        page,
        setPage,
        blogsDatas,
        setBlogsData,
        user,
        setUser,
        updateSubmit,
        putBlogUpdate,
        setBlogUpdate,
        blogUpdate,
        putBlog,
        blogsMe,
        setBlogsMe,
        blogsDatasMe,
        setBlogsDataMe,
        pageMe,
        setPageMe,
        fetchUser
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlog must be used within a BlogProvider");
  }
  return context;
};

export default useBlog;
