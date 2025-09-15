import React, { useEffect, useState } from "react";
import ReactQuill from 'react-quill-new'
import "react-quill-new/dist/quill.snow.css";
import Button from "../ui/Button";
import useBlog from "../../contexts/BlogContexts";
import BlogService from "../../services/BlogServices";
import './blog.css'
import { Divide, DivideSquare, Maximize, Minus, Upload, X } from "lucide-react";
const reactQuillModules = {
    toolbar: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        ["clean"],
    ],
};
function BlogForm(props) {
    const [showState, setShowState] = useState('default');
    const [tags, setTags] = useState([]);
    const { setShowBlogForm, showBlogForm } = useBlog();

    useEffect(() => {
        const handleBeforeUnload = (e) => {
            e.preventDefault();
            e.returnValue = "";
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);

    useEffect(() => {
        const fetchTags = async () => {
            const tagsData = await BlogService.getTags();
            setTags(tagsData);
        }
        fetchTags();
    }, []);
    const { putBlogForm, blogForm,
        createSubmit
    } = useBlog();
    return (
        <>
            <div className={`blog-form ${showState}`} display={props.toggle ? "block" : "none"}>
                <form>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        justifyContent: "space-between",
                        gap: "10px",
                        height: "100%",
                        position: "relative"
                    }}>
                        <div className="blog-form-toolbar">
                            <div style={{ fontWeight: 600 }}>
                                Discussion Creation
                            </div>
                            <div className="window-toolbar">
                                <div onClick={() => {
                                    if (showState == "minimize") {
                                        setShowState('default');
                                    } else {
                                        setShowState('minimize');
                                    }
                                }}>{showState == "minimize" ? <DivideSquare color="black" /> : <Minus color="black" />}</div>
                                <div onClick={() => {
                                    if (showState == "maxmize") {
                                        setShowState('default');

                                    } else {
                                        setShowState('maxmize');

                                    }

                                }}
                                >{showState == "maxmize" ? <DivideSquare color="black" /> : <Maximize color="black" />}</div>
                                <div onClick={() => {
                                    setShowBlogForm(false);

                                }}><X color="black" /></div>
                            </div>
                        </div>
                        <div style={{ display: "flex", gap: "10px", width: "100%" }}>
                            <div style={{ flex: 3 }}>
                                <label>Title</label>
                                <input className="text-input-title-blog" placeholder="title of discussion"
                                    value={blogForm?.title}
                                    onChange={(e) => putBlogForm('title', e.target.value)}
                                />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label>Tag</label>
                                <select className="div-select-tag-blog"
                                    value={blogForm?.tag}
                                    onChange={(e) => putBlogForm('tag', e.target.value)}
                                >
                                    <option value={''} disabled>-- select tag --</option>
                                    <option value={'SHARE'}>Share</option>
                                    <option value={'NOTIFICATION'}>Notification</option>
                                    <option value={'FACT'}>Fact</option>
                                    <option value={'FUN'}>Fun</option>

                                </select>
                            </div>
                        </div>
                        <div style={{ display: "flex", gap: "10px", width: "100%" }}>
                            <div style={{ flex: 1 }}>
                                <label>ImagePreview</label><br />
                                <img style={{ width: "100px", objectFit: "contain" }} src={blogForm?.imageURL} />
                            </div>
                            <div style={{ flex: 5 }}>
                                <label>ImageURL</label>
                                <input className="text-input-title-blog" placeholder="Image of discussion"
                                    value={blogForm?.imageURL}
                                    onChange={(e) => putBlogForm('imageURL', e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label>Contents</label>
                            <ReactQuill
                                className="blog-form-child content-input"
                                style={{ height: "100%" }}
                                theme="snow"
                                value={blogForm?.content}
                                onChange={(value) => putBlogForm('content', value)} placeholder="What are you thinking?"
                                modules={{
                                    toolbar: [
                                        [{ font: [] }],
                                        [{ header: [1, 2, 3, false] }],
                                        ['bold', 'italic', 'underline'],
                                        ['image', 'link'],
                                        [{ list: 'ordered' }, { list: 'bullet' }],
                                        ['clean'],
                                    ],
                                }}
                            /><br />
                        </div>
                        <div style={{ display: showState == "minimize" ? 'none' : 'flex', gap: "10px", position: "fixed", bottom: "10px", width: "400px" }}>
                            <Button
                                flex={1}
                                backgroundColor={"#ba6b6bff"}
                                onClick={() => {
                                    setShowBlogForm(false);
                                }}
                                color={'rgba(112, 44, 44, 1)'}
                                value={'Cancel'}
                                iconLeft={<X />}
                            />
                            <Button flex={3} onClick={createSubmit}
                                color={'black'}
                                backgroundColor={"#f1f1f1ff"}
                                loadingText="Uploading..."
                                value={'Post'}
                                iconLeft={<Upload color="black" />}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
export default BlogForm;