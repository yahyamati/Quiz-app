const BlockArticle = ({ category, articles, navigate }) => {
    return (
      <div
        onClick={() => {
          console.log(category);
          navigate(`/articles/${category}`);
        }}
        className="flex flex-col gap-2 items-center justify-center bg-slate-100 px-16 py-4 rounded-3xl hover:scale-110 cursor-pointer hover:bg-slate-200 transition-transform ease-in-out w-1/4"
      >
        <p className="uppercase font-bold">{category}</p>
        <p className="font-semibold">Questions in the Article : </p>
        {articles.map((article) => (
          <div key={article._id} className="mt-2 text-gray-600">
            <p className="text-left">{article.Question}</p>
          </div>
        ))}
      </div>
    );
  }
  
  export default BlockArticle;
  