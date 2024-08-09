import { useParams } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../Loading";

const Article = ({ url }) => {
  const { category } = useParams();
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`${url}/api/articles/listFilArticle?category2=${category}`);
        const sortedArticles = response.data.data.sort((a, b) => {
          const order = ["beginners", "intermediate", "advanced"];
          return order.indexOf(a.category1) - order.indexOf(b.category1);
        });
        setArticles(sortedArticles);
        setLoading(false);
      } catch (error) {
        console.error('There was an error fetching the articles!', error);
        setLoading(false);
      }
    };

    fetchArticles();
  }, [category]);

  if (loading) {
    return <Loading />;
  }

  const scrollToCategory = (categoryId) => {
    const element = document.getElementById(categoryId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="lg:grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
      

      <div className="md:col-span-2  flex justify-center lg:justify-end items-center">
        <div className="sm:w-2/3">
          {articles.map((article) => (
            <div key={article._id} id={article.category1} className="w-full mb-8 p-6 bg-gray-50 rounded-lg shadow-md border">
              <h2 className="text-3xl font-bold text-black mb-4">{article.Question}</h2>
              <div className="my-4">
                <span className="text-gray-700 font-semibold uppercase">Category: {article.category1} Level</span>
              </div>
              {article.image && (
                <img src={`${url}/images/${article.image}`} alt="Article Visual" className=" object-contain mx-auto mb-4 rounded-lg" />
              )}
              <p className="text-gray-700 my-4 font-semibold">{article.text1}</p>
              <p className="text-gray-700 my-4 font-semibold">{article.text2}</p>
              {article.liText && (
                <ul className="list-disc list-inside mb-4">
                  {article.liText.map((li, index) => (
                    <li key={index} className="text-gray-700">{li}</li>
                  ))}
                </ul>
              )}
              <p className="text-gray-700 my-4 font-semibold">{article.text3}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="hidden w-full lg:table text-center">
        <div className="sticky top-20">
          <div className="flex flex-col space-y-2">
            <h2 className="text-2xl font-bold">List of Categories</h2>
            <button onClick={() => scrollToCategory('beginners')} className="text-gray-500 hover:underline ">Beginner Level</button>
            <button onClick={() => scrollToCategory('intermediate')} className="text-gray-500 hover:underline ">Intermediate Level</button>
            <button onClick={() => scrollToCategory('advanced')} className="text-gray-500 hover:underline ">Advanced Level</button>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Article;
