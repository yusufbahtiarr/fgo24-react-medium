import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import DataFetching from "./DataFetch";

function ListArticlePage() {
  return (
    <div className="box-border w-screen h-screen">
      <Header />
      <div className="w-full h-fit p-20 flex justify-center mb-100">
        <DataFetching />
      </div>
      <Footer />
    </div>
  );
}

export default ListArticlePage;
