import React, { useState, useEffect } from "react";
import axios from "axios";
import { truncate } from "lodash";
import { Link } from "react-router-dom";

function DataFetching() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("/data.json")
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);
  console.log(data);

  return (
    <div className="flex flex-col max-w-2xl items- justify-start text-left gap-4 pt-5 mb-20">
      {data.map((post, index) => (
        <React.Fragment key={index}>
          <div className="border border-gray-300 rounded-2xl shadow-lg p-6 flex flex-col gap-4">
            <div className="text-3xl text-left font-bold">
              <Link to={`/article/@${post.username}/${post.slug}`}>
                {post.title}
              </Link>
            </div>
            <div className="mt-2">
              <p>{truncate(post.body, { length: 400, separator: /.? +/ })}</p>
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

export default DataFetching;
