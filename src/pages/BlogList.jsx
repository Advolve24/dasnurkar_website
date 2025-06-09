// BlogList.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BlogList = () => {
    const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000/api/blogs';
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/blogs`);
        setBlogs(res.data);
      } catch (err) {
        console.error("Failed to fetch blogs", err);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="bg-[#141414] text-white min-h-screen px-4 py-10">
      {/* Page Header */}
      <div className="w-screen h-[100px] sm:h-[150px] bg-[#2f2f2f] flex items-center justify-center text-center mt-10 mb-10 relative left-0 right-0 -mx-6">
        <h1 className="text-[2rem] md:text-[2rem] font-bold"style={{ fontFamily: "FrieghtNeo",letterSpacing:"0.01rem" }}>Blog</h1>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 w-[98%] mx-auto">
  {blogs.map((blog) => (
    <Link to={`/blog/${blog._id}`} key={blog._id}>
      <div className="bg-[#1a1a1a] rounded-xl overflow-hidden shadow-lg hover:scale-[1.02] transition-all duration-300 h-[350px] flex flex-col border-[1.5px] border-white/50" style={{ fontFamily: "FrieghtNeo"}}>
        <img
          src={blog.mainImage}
          alt={blog.title}
          className="w-full h-[220px] object-cover"
        />
        <div className="p-4 flex flex-col justify-between flex-grow">
          <div>
            <p className="text-sm text-gray-400 mb-1">
              {new Date(blog.date).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <h2 className="text-lg font-semibold leading-snug line-clamp-2">
              {blog.title}
            </h2>
          </div>
        </div>
      </div>
    </Link>
  ))}
</div>

    </div>
  );
};

export default BlogList;
