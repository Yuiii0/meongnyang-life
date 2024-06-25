import { SelectedBreed } from "./SelectedBreed";
import SelectedGender from "./SelectedGender";

interface OptionalProfileFormProps {
  petType: string;
  breed: string;
  gender: string;
  isNoPet: boolean;
  setIsNoPet: (isNoPet: boolean) => void;
  handleChangePetType: (selectedPet: "dog" | "cat" | "") => void;
  handleChangeBreed: (breed: string) => void;
  handleChangeGender: (gender: string) => void;
}

function OptionalProfileForm({
  petType,
  breed,
  gender,
  isNoPet,
  setIsNoPet,
  handleChangePetType,
  handleChangeBreed,
  handleChangeGender,
}: OptionalProfileFormProps) {
  return (
    <div className="flex flex-col mb-2 gap-y-6">
      <h4 className="px-1 py-2 text-sm font-semibold">반려동물 종류</h4>
      <div className="flex flex-col items-start gap-y-4">
        <div className="flex justify-center w-full gap-x-6">
          <button
            className={`p-4 rounded-lg border-2 w-28 h-28 min-w-28 min-h-28 flex justify-center items-center flex-col ${
              petType === "dog"
                ? "border-orange-200 bg-orange-200 "
                : "border-orange-200"
            } transition-all duration-200`}
            onClick={() => {
              handleChangePetType("dog");
              setIsNoPet(false);
            }}
          >
            <img
              src="/images/dog_smiling.png"
              alt="강아지"
              className="object-contain mx-auto"
            />
            <p className="pt-1 text-xs font-semibold text-gray-700">강아지</p>
          </button>
          <button
            className={`p-4 rounded-lg border-2 w-28 h-28 min-w-28 min-h-28 flex justify-center items-center flex-col ${
              petType === "cat"
                ? "border-orange-200 bg-orange-200 "
                : "border-orange-200"
            } transition-all duration-200`}
            onClick={() => {
              handleChangePetType("cat");
              setIsNoPet(false);
            }}
          >
            <img
              src="/images/cat_smiling.png"
              alt="고양이"
              className="object-cover h-18 w-18"
            />
            <p className="pt-1 text-xs font-semibold text-gray-700">고양이</p>
          </button>
        </div>
        <div className="mt-4 ml-8">
          <label className="inline-flex items-center" htmlFor="yellowCheckBox">
            <input
              id="yellowCheckBox"
              type="checkbox"
              className="w-4 h-4 accent-orange-400"
              checked={isNoPet}
              onChange={() => {
                handleChangePetType("");
                handleChangeBreed("");
                handleChangeGender("");
                setIsNoPet((prev) => !prev);
              }}
            />
            <span className="pl-2 text-sm text-gray-400">
              반려동물이 없어요
            </span>
          </label>
        </div>
      </div>

      <SelectedBreed
        petType={petType}
        breed={breed}
        handleChangeBreed={handleChangeBreed}
        disabled={isNoPet}
      />
      <SelectedGender
        gender={gender}
        handleChangeGender={handleChangeGender}
        disabled={isNoPet}
      />
    </div>
  );
}

export default OptionalProfileForm;
