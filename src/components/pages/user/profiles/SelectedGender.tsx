interface SelectedGenderProps {
  gender: string;
  disabled?: boolean;
  handleChangeGender: (gender: "male" | "female" | "") => void;
}

function SelectedGender({
  gender,
  disabled,
  handleChangeGender,
}: SelectedGenderProps) {
  return (
    <div>
      <h4 className="px-1 py-2 text-sm font-semibold">성별</h4>
      <div className="flex justify-center space-x-4">
        <button
          className={`p-4 rounded-lg border-2  w-28 h-28 min-w-28 min-h-28 flex justify-center items-center flex-col ${
            gender === "male" ? " bg-gray-200 " : "border-gray-200"
          } transition-all duration-200`}
          disabled={disabled}
          onClick={() => handleChangeGender("male")}
        >
          <img
            src="/public/icons/male.png"
            alt="남아"
            className="object-contain w-8 h-8 min-w-8 min-h-8"
          />
          <p className="pt-3 text-xs font-semibold text-gray-700">남아</p>
        </button>
        <button
          className={`p-4 rounded-lg border-2  w-28 h-28 min-w-28 min-h-28 flex justify-center items-center flex-col ${
            gender === "female" ? " bg-gray-200 " : "border-gray-200"
          } transition-all duration-200`}
          disabled={disabled}
          onClick={() => handleChangeGender("female")}
        >
          <img
            src="/public/icons/female.png"
            alt="여아"
            className="object-contain w-8 h-8 min-w-8 min-h-8"
          />
          <p className="pt-3 text-xs font-semibold text-gray-700">여아</p>
        </button>
      </div>
    </div>
  );
}

export default SelectedGender;