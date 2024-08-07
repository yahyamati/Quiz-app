
const BlockArticle = ({url,category,imgSrc}) => {
    return (<>
    <div
    className="flex flex-col gap-2 items-center justify-center bg-slate-100 px-16 py-4 rounded-3xl hover:scale-110 cursor-pointer hover:bg-slate-200 transition-transform ease-in-out w-1/4">
    {/* <img src={`${url}/images/${imgSrc}`}alt="category logo" className='w-16 h-16' /> */}
    <p className=" uppercase font-semibold">{category}</p>
    {/* <ul className="flex flex-wrap justify-center text-xs font-semibold">
    <li className="cursor-pointer text-green-500 bg-white rounded-2xl px-4 py-2 shadow-md transition-all duration-300 ease-in-out transform hover:bg-green-500 hover:text-white hover:scale-105">
        Beginner
    </li>
    <li className="cursor-pointer text-yellow-500 bg-white rounded-2xl px-4 py-2 shadow-md transition-all duration-300 ease-in-out transform hover:bg-yellow-500 hover:text-white hover:scale-105">
        Intermediate
    </li>
    <li className="cursor-pointer text-red-500 bg-white rounded-2xl px-4 py-2 shadow-md transition-all duration-300 ease-in-out transform hover:bg-red-500 hover:text-white hover:scale-105">
        Hard
    </li>
</ul> */}

    </div>
    </>  );
}
 
export default BlockArticle;