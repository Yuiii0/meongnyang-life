function NoResults() {
  return (
    <div className="relative flex flex-col items-center justify-center w-full translate-y-1/2 gap-y-4">
      <img
        src="/images/dog_cute.png"
        alt="dog_img"
        width={130}
        className="mx-auto"
      />
      <div className="text-center">
        <p className="pb-3 text-lg text-gray-700">검색 결과가 없습니다.</p>
        <p className="text-xs text-gray-500 ">다른 키워드로 검색해보세요</p>
      </div>
    </div>
  );
}

export default NoResults;
