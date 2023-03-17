const Upload = () => {
  return (
    <div className="h-full mx-auto pt-40 flex-grow text-white">
      <div className="h-full mx-auto container flex justify-between">
        <div className="w-5/12 h-5/6 border-dotted border-white border-2 rounded-xl hover:bg-zinc-900 cursor-pointer">
          e
        </div>
        <div className="w-6/12 h-5/6">
          <p className="text-xl">파일명</p>
          <p className="text-xl">확장자</p>
          <p className="text-xl">용량</p>
        </div>
      </div>
    </div>
  );
};

export default Upload;
