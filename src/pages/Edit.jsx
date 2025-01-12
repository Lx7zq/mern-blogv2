import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import swal from "sweetalert2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import PostService from "../services/post.service";
import Editor from "../components/Editor";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [postDetail, setPostDetail] = useState({
    title: "",
    summary: "",
    content: "",
    file: null,
  });
  const [content, setContent] = useState("");
  const editorRef = useRef(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await PostService.getPostById(id);
        setPostDetail({
          title: response.data.title,
          summary: response.data.summary,
          content: response.data.content,
          file: null, // ไม่ต้องดึงไฟล์จาก API
        });
        setContent(response.data.content); // กำหนดค่า content ให้กับ Quill Editor
      } catch (error) {
        swal.fire({
          title: "Error",
          text: "Couldn't fetch the post data.",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    };
    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "file") {
      setPostDetail({ ...postDetail, [name]: e.target.files[0] });
    } else {
      setPostDetail({ ...postDetail, [name]: value });
    }
  };

  const handleContentChange = (value) => {
    setContent(value);
    setPostDetail({ ...postDetail, content: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("title", postDetail.title);
      data.append("summary", postDetail.summary);
      data.append("content", postDetail.content);
      data.append("file", postDetail.file);

      const response = await PostService.updatePost(id, data);

      if (response.status === 200) {
        swal
          .fire({
            title: "Update Post",
            text: "Post updated successfully.",
            icon: "success",
          })
          .then(() => {
            navigate(`/post/${id}`); // เปลี่ยนไปที่หน้าโพสต์หลังจากอัปเดต
          });
      }
    } catch (error) {
      swal.fire({
        title: "Update Post",
        text: error?.response?.data?.message || error.message,
        icon: "error",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 mt-8 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-center mb-4">Edit Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-semibold text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            value={postDetail.title}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md text-sm"
            placeholder="Enter the post title"
            required
          />
        </div>

        <div>
          <label
            htmlFor="summary"
            className="block text-sm font-semibold text-gray-700"
          >
            Summary
          </label>
          <textarea
            name="summary"
            value={postDetail.summary}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md text-sm"
            placeholder="Write a short summary"
            rows="3"
            required
          />
        </div>

        <div>
          <label
            htmlFor="content"
            className="block text-sm font-semibold text-gray-700"
          >
            Content
          </label>
          <div className="64">
            <Editor
              value={content}
              onChange={handleContentChange}
              ref={editorRef}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="image"
            className="block text-sm font-semibold text-gray-700"
          >
            Upload Image
          </label>
          <input
            type="file"
            name="file"
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md text-sm"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 text-sm md-5"
          >
            Update Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
