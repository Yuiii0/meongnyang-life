import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { SelectedBreed } from "./SelectedBreed";
import SelectedGender from "./SelectedGender";

function OptionalProfileForm() {
  const { register, setValue, watch } = useFormContext();
  const petType = watch("petType");
  const breed = watch("breed");
  const gender = watch("gender");
  const isNoPet = watch("isNoPet");

  useEffect(() => {
    if (isNoPet) {
      setValue("petType", "");
      setValue("breed", "");
      setValue("gender", "");
    }
  }, [isNoPet, setValue]);

  return (
    <section>
      <h4 className="px-1 py-2 pt-4 mb-2 text-sm font-semibold">
        반려동물 종류
      </h4>
      <div className="flex flex-col mb-2 gap-y-10">
        <div className="flex flex-col items-start gap-y-4">
          <div className="flex justify-center w-full gap-x-6">
            <button
              type="button"
              className={`p-4 rounded-lg border-2 w-28 h-28 min-w-28 min-h-28 flex justify-center items-center flex-col ${
                petType === "dog"
                  ? "border-orange-200 bg-orange-200 "
                  : "border-orange-200"
              } transition-all duration-200`}
              onClick={() => {
                setValue("petType", "dog");
                setValue("isNoPet", false);
              }}
              aria-label="Select dog as pet type"
            >
              <img
                src="/images/dog_smiling.webp"
                alt="강아지"
                className="object-contain mx-auto"
                width={76}
                height={56}
              />
              <p className="pt-1 text-xs font-semibold text-gray-700">강아지</p>
            </button>
            <button
              type="button"
              className={`p-4 rounded-lg border-2 w-28 h-28 min-w-28 min-h-28 flex justify-center items-center flex-col ${
                petType === "cat"
                  ? "border-orange-200 bg-orange-200 "
                  : "border-orange-200"
              } transition-all duration-200`}
              onClick={() => {
                setValue("petType", "cat");
                setValue("isNoPet", false);
              }}
              aria-label="Select cat as pet type"
            >
              <img
                src="/images/cat_smiling.webp"
                alt="고양이"
                className="object-cover h-18 w-18"
                width={76}
                height={56}
              />
              <p className="pt-1 text-xs font-semibold text-gray-700">고양이</p>
            </button>
          </div>
          <div className="ml-8 ">
            <label
              className="inline-flex items-center"
              htmlFor="yellowCheckBox"
            >
              <input
                id="yellowCheckBox"
                type="checkbox"
                className="w-4 h-4 accent-orange-400"
                aria-label="No pet checkbox"
                {...register("isNoPet")}
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
          handleChangeBreed={(value) => setValue("breed", value)}
          disabled={isNoPet}
        />
        <SelectedGender
          gender={gender}
          handleChangeGender={(value) => setValue("gender", value)}
          disabled={isNoPet}
        />
      </div>
    </section>
  );
}
export default OptionalProfileForm;
