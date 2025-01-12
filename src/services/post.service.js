import api from "./api";
const API_URL = import.meta.env.VITE_BASE_URL + "/post";

const createPost = async (post) => {
  const response = await api.post(API_URL, post, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

const getPost = async () => {
  return await api.get(API_URL);
};

const getPostById = async (id) => {
  return await api.get(`${API_URL}/${id}`);
};

const getPostByAuthor = async (id) => {
  return await api.get(`${API_URL}/author/${id}`)
}

const deleteById = async (id) => {
  return await api.delete(`${API_URL}/${id}`)
}

const updatePost = async (id, post) => {
  return await api.put(`${API_URL}/${id}`, post);
};

const PostService = {
  createPost,
  getPost,
  getPostById,
  getPostByAuthor,
  deleteById,
  updatePost
};

export default PostService;
