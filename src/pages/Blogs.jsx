import { useEffect } from "react";
import Blog from "../components/blog/Blog";
import BlogForm from "../components/blog/BlogForm";
import useBlog from "../contexts/BlogContexts";
import './page.css'
import BlogService from "../services/BlogServices";
export default function BlogsPage() {
    const { blogs, setBlogs } = useBlog();
    useEffect(() => {
        const fetch = async () => {
            const res = await BlogService.getBlogs({
                id: null,
                page: 1,
                row: 10
            })
            setBlogs(res)
        }
        fetch();
    }, [])
    return (<>
        <div className="blogs-page">
            <BlogForm />
            <div className="blogs-container">
                <div className="blogs-box-title">New blogs</div>
                {blogs.map((e, i) => {
                    return (<Blog
                        id={e.id}
                        title={e.title}
                        content={e.content}
                        createdAt={e.created_at}
                        authorName={'Admin'}
                        img={e.imageURL}
                        tag={e.tag}
                        read={'read'}
                    />)
                })}
            </div>
            <div className="best-blogs-container">
                <div className="blogs-box-title">Best blogs</div>
                {blogs.map((e, i) => {
                    return (<Blog
                        id={e.id}
                        title={e.title}
                        createdAt={e.created_at}
                        authorName={'Admin'}
                        img={e.imageURL}
                        read={'read'}
                    />)
                })}
            </div>
        </div>
    </>)
}