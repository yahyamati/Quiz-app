
const BlockArticle = ({url,category,imgSrc,navigate}) => {
    return (<>
    <div
    onClick={() => {
        console.log(category);
        navigate(`/articles/${category}`);
    }}
    className="flex flex-col gap-2 items-center justify-center bg-slate-100 px-16 py-4 rounded-3xl hover:scale-110 cursor-pointer hover:bg-slate-200 transition-transform ease-in-out w-1/4">
    <p className=" uppercase font-semibold">{category}</p>

    </div>
    </>  );
}
 
export default BlockArticle;