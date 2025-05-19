import React, { useState, useEffect } from "react";
import truncate from "lodash/truncate";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";

function ListArticlePage() {
  const [data, setData] = useState([]);
  // const { handleSubmit, register } = useForm();
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromParams = parseInt(searchParams.get("page") || "1", 10);
  const searchQuery = searchParams.get("search") || "";
  const [count, setCount] = useState(0);
  const totalPages = Math.ceil(count / 5);

  async function fetchArticles(limit = 5, page = 1, query = "") {
    const offset = (page - 1) * limit;
    const { data } = await axios.get("/data.json");
    const filtered = data.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );

    setCount(filtered.length);
    setData(filtered.slice(offset, offset + limit));
  }

  useEffect(() => {
    fetchArticles(5, pageFromParams, searchQuery);
  }, [searchParams]);

  // function searchData(value) {
  //   setSearchParams({ search: value.search, page: 1 });
  // }

  return (
    <div className="box-border w-screen h-screen overflow-x-hidden">
      <main className="w-full h-fit p-20 pb-5 flex justify-center">
        <div className="flex flex-col max-w-3xl items-start text-left gap-4 pt-5 mb-20">
          <div className="text-xl mx-auto">
            {searchParams.get("search") && (
              <div className="mb-6 text-gray-600">
                Hasil pencarian untuk "{searchParams.get("search")}" (
                <span className="font-medium">{count}</span> hasil ditemukan)
              </div>
            )}
          </div>
          {data.map((post, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-2xl shadow-lg p-6 flex flex-row gap-6"
            >
              <div className="flex flex-col flex-1 min-h-[150px]">
                <div className="text-2xl font-bold">
                  <Link to={`/article/@${post.username}/${post.slug}`}>
                    {post.title}
                  </Link>
                </div>
                <div className="mt-2 flex-1">
                  <p className="text-justify">
                    {truncate(post.body, {
                      length: 300,
                      separator: /[\s]+/,
                    })}
                  </p>
                </div>
              </div>

              <div className="max-w-[200px] h-full self-stretch">
                <Link
                  to={`/article/@${post.username}/${post.slug}`}
                  className="block h-full"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover rounded-lg max-h-[150px] md:max-h-[200px]" // Batasi tinggi maksimum
                  />
                </Link>
              </div>
            </div>
          ))}
          {data.length > 0 && (
            <div className="flex justify-center items-center gap-4 mt-6 text-sm w-full">
              <button
                disabled={pageFromParams === 1}
                onClick={() =>
                  setSearchParams({
                    ...(searchQuery && { search: searchQuery }),
                    page: pageFromParams - 1,
                  })
                }
                className={`font-bold size-[35px] rounded-full border cursor-pointer ${
                  pageFromParams === 1 ? "opacity-50 cursor-none" : ""
                }`}
              >
                {"<"}
              </button>

              <span className="px-4 py-2">Halaman {pageFromParams}</span>

              <button
                disabled={pageFromParams >= totalPages}
                onClick={() =>
                  setSearchParams({
                    ...(searchQuery && { search: searchQuery }),
                    page: pageFromParams + 1,
                  })
                }
                className={` font-bold size-[35px] rounded-full border cursor-pointer ${
                  pageFromParams >= totalPages ? "opacity-50 cursor-none" : ""
                }`}
              >
                {">"}
              </button>
            </div>
          )}
          {data.length < 1 && (
            <div className="font-semibold flex items-center text-2xl mt-10 h-full w-full">
              <span className="text-center mx-auto font-semibold text-gray-700">
                Tidak ada artikel.
              </span>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default ListArticlePage;
