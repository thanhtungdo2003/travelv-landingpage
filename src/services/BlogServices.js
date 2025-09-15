import axios from "axios";
import { getTokenCookie } from "./AccountService";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1",
});

export default class BlogService {
  static async createBlog(data) {
    try {
      const res = await api.post("/blog/create", data, {
        headers:{
          Authorization: `Bearer ${getTokenCookie()}`
        }
      });
      return res.data;
    } catch (err) {
      console.log("createBlog error:", err);
      return null;
    }
  }

  static async update(blog_id, data) {
    try {
      const res = await api.patch(`/api/v1/blogs/${blog_id}`, data);
      return res.data;
    } catch (err) {
      console.log("update error:", err);
      return null;
    }
  }

  static async getTags() {
    try {
      const res = await api.get("/api/v1/tags/");
      return res.data;
    } catch (err) {
      console.log("getTags error:", err);
      return [];
    }
  }

  static async getBlogs(getSchem) {
    try {
      const res = await api.post("/blog/get", getSchem);
      return res.data;
    } catch (err) {
      console.log("getBlogs error:", err);
      return [];
    }
  }

  static async getBlogsByUserId({ page, limit, tag_id, user_id }) {
    try {
      const params = { page, limit };
      if (tag_id) params.tag_id = tag_id;
      const res = await api.get(`/api/v1/blogs/user/${user_id}`, { params });
      return res.data;
    } catch (err) {
      console.log("getBlogsByUserId error:", err);
      return [];
    }
  }

  static async search({ page, limit, title }) {
    try {
      const params = {
        page,
        limit,
        title: title || "%",
      };
      const res = await api.get("/api/v1/blogs/search/title", { params });
      return res.data;
    } catch (err) {
      console.log("search error:", err);
      return [];
    }
  }

  static async getBlog(id) {
    try {
      const res = await api.get(`/api/v1/blogs/${id}`);
      return res.data;
    } catch (err) {
      console.log("getBlog error:", err);
      return null;
    }
  }

  static async remove(id) {
    try {
      const res = await api.delete(`/api/v1/blogs/${id}`);
      return res.data;
    } catch (err) {
      console.log("remove error:", err);
      return null;
    }
  }
}
