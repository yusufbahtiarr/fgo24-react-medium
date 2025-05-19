import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function DetailArticlePage() {
  const { username, slug } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("/data.json")
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }, []);

  return (
    <div className="box-border w-screen h-screen overflow-x-hidden">
      <div className="w-full h-fit p-20 flex justify-center mb-100">
        {data
          .filter((item) =>
            item.slug.toLowerCase().includes(slug.toLocaleLowerCase())
          )
          .map((item, index) => {
            return (
              <div
                key={index}
                className="flex flex-col max-w-2xl items- justify-start text-left gap-4 pt-5 mb-20"
              >
                <div className="text-3xl text-left font-bold">{item.title}</div>
                <div className="font-light text-gray-700 text-[14px]">
                  Created by: <span>{username.slice(1)}</span>
                </div>
                <div>
                  <img
                    src={item.image}
                    alt="image-article"
                    className="h-[350px] w-full object-cover"
                  />
                </div>
                <div className="mt-8 text-justify font-light">{item.body}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default DetailArticlePage;
