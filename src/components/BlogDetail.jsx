import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BlogDetail = () => {
     const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000/api/blogs';
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [moreBlogs, setMoreBlogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/blogs`);
        const currentBlog = res.data.find((b) => b._id === id);
        setBlog(currentBlog);
        setMoreBlogs(res.data.filter((b) => b._id !== id));
      } catch (err) {
        console.error("Failed to fetch blog", err);
      }
    };

    fetchData();
  }, [id]);

  if (!blog) return <div className="text-white p-4 sm:p-6 md:p-10">Loading...</div>;

  return (
    <div className="bg-[#141414] text-white min-h-screen py-6 sm:py-8 md:py-10">
      <>
        {/* Page Header */}
        <header className="w-full h-[120px] sm:h-[150px] md:h-[170px] bg-black flex items-center justify-center text-center mt-[50px] sm:mt-10 mb-2 sm:mb-4 md:mb-6 px-4">
          <h2
            className="text-[1.5rem] sm:text-[3rem] md:text-[2rem] font-light text-center"
            style={{ fontFamily: "FrieghtNeo" }}
          >
            {blog.title.includes(":") ? (
              <>
                {blog.title.split(":")[0]}:
                <span className="font-normal">{blog.title.split(":")[1]}</span>
              </>
            ) : (
              blog.title
            )}
          </h2>
        </header>

        {/* Blog + Sidebar */}
        <div
          className="w-full mx-auto flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-10 px-4 sm:px-6"
          style={{ fontFamily: "Gothic" }}
        >
          {/* Main Blog */}
          <div className="flex flex-col w-full md:w-[68%]">
            <p className="text-sm sm:text-base text-white mb-2 mt-2 sm:mb-4">
              {new Date(blog.date).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <img
              src={blog.mainImage}
              alt="Main Blog"
              className="rounded-lg w-full h-[250px] sm:h-[350px] md:h-[500px] object-cover mb-4 sm:mb-6"
            />
            <div
              className="prose prose-invert max-w-none text-sm sm:text-base"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>

          {/* Sidebar More Posts */}
          <aside className="w-full md:w-1/4 mt-6 md:mt-0">
            <h3 className="text-lg sm:text-xl font-medium mb-4">More Posts</h3>
            {moreBlogs.map((b) => (
              <a
                href={`/blog/${b._id}`}
                key={b._id}
                className="flex gap-3 items-start mb-4 sm:mb-6 hover:opacity-80"
              >
                <img
                  src={b.mainImage}
                  className="w-24 sm:w-28 h-16 sm:h-20 object-cover rounded-md"
                  alt="thumbnail"
                />
                <div>
                  <p className="text-sm font-light line-clamp-2">{b.title}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(b.date).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </a>
            ))}
          </aside>
        </div>

        {/* Bottom More Posts */}
        <div
          className="hidden sm:block w-full px-4 sm:px-6 mt-10 sm:mt-12"
          style={{ fontFamily: "Gothic" }}
        >
          <h3 className="text-lg sm:text-xl font-medium mb-4">Previous Posts</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {moreBlogs.map((b) => (
              <a
                href={`/blog/${b._id}`}
                key={b._id}
                className="flex gap-3 items-start hover:opacity-80"
              >
                <img
                  src={b.mainImage}
                  className="w-24 sm:w-28 h-16 sm:h-20 object-cover rounded-md"
                  alt="thumbnail"
                />
                <div>
                  <p className="text-sm font-light line-clamp-2">{b.title}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(b.date).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </>
    </div>
  );
};

export default BlogDetail;
