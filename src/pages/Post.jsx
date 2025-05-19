import axios from "axios";

const createPost = async () => {
  try {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      {
        title: "Judul Post Baru",
        body: "Ini adalah konten post.",
        userId: 1,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Data berhasil dikirim:", response.data);
  } catch (error) {
    console.error("Error:", error.message);
  }
};

// Panggil fungsi:
createPost();
