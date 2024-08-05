import React from 'react';
const Loading = () => (
  <div className='flex items-center justify-center'>
  
  <div className="animate-pulse flex flex-col items-center gap-4 w-60">
  <div>
    <div className="w-40 sm:w-96 h-6 bg-slate-300 rounded-md hidden sm:block"></div>
    <div className="w-28 sm:w-80 h-4 bg-slate-300 mx-auto mt-3 rounded-md"></div>
  </div>
  <div className="h-5 sm:h-7 bg-slate-300 w-full rounded-md"></div>
  <div className="h-5 sm:h-7 bg-slate-300 w-full rounded-md"></div>
  <div className="h-5 sm:h-7 bg-slate-300 w-full rounded-md"></div>
  <div className="h-5 sm:h-7 bg-slate-300 w-1/2 rounded-md"></div>
</div>
</div>
  
);

export default Loading;
