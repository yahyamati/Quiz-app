const ProgressBar = ({ progressPercentage,skippedCount,passedCount,totalQuestions,currentIndex , home }) => {
    return (
        <div className="relative pt-1 w-full">
            <div className="flex mb-2 items-center justify-between">
               {!home && <>
               <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                  Progress
                </span>
              </div>
             
              <p className="text-blue-600 bg-blue-20 sm:text-sm text-xs">
                Skipped: {skippedCount}
              </p>
              <p className="text-blue-600 bg-blue-20 sm:text-sm text-xs">
                Passed: {passedCount}
              </p>
              </>
              }
              

              <div className={`text-right ${home ? "table mx-auto": ""}`}>
                <span className="text-xs font-semibold inline-block text-blue-600 bg-blue-200 rounded-3xl px-2 p-1">
                  {currentIndex}/{totalQuestions}
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
              <div
                style={{ width: `${progressPercentage}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
              ></div>
            </div>
          </div>
    )
  }
  export default ProgressBar;