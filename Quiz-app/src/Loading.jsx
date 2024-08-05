import React from 'react';

const Loading = () => (
  <div className="flex flex-col items-center justify-center pt-10 space-y-6">
    <div className="animate-pulse flex flex-col items-center gap-4 w-60">
      
      <div className="h-3 sm:w-80 bg-slate-300 w-1/2 rounded-md"></div>
      <div className="h-5 sm:h-10 bg-slate-300 w-full rounded-md"></div>
      <div className="h-5 sm:h-7 bg-slate-300 w-full rounded-md"></div>
      <div className="h-5 sm:h-7 bg-slate-300 w-1/2 rounded-md"></div>
      <div className="w-72 sm:w-96 h-40 bg-slate-300 rounded-md pt-8"></div>
    </div>
  </div>
);

export default Loading;
