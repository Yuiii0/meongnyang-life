interface NoResultsProps {
  title: string;
  description?: string;
  imageName?: string;
}

function NoResults({
  title,
  description,
  imageName = "dog_cute.webp",
}: NoResultsProps) {
  return (
    <div className="relative flex flex-col items-center justify-center w-full h-screen -translate-y-1/4 gap-y-4">
      <img
        src={`/images/${imageName}`}
        alt="dog_img"
        width={130}
        className="mx-auto"
      />
      <div className="text-center">
        <p className="pb-3 text-lg text-gray-700">{title}</p>
        <p className="text-xs text-gray-500 ">{description}</p>
      </div>
    </div>
  );
}

export default NoResults;
