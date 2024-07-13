import { Button } from "@/components/ui/Button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { catBreedData } from "@/shared/breeds/catbreed.data";
import { dogBreedData } from "@/shared/breeds/dogbreed.data";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";

interface SelectedBreedsProps {
  petType?: string;
  breed: string;
  disabled?: boolean;
  handleChangeBreed: (breed: string) => void;
}

export function SelectedBreed({
  petType = "dog",
  breed,
  disabled = false,
  handleChangeBreed,
}: SelectedBreedsProps) {
  const [open, setOpen] = useState(false);
  const breedData = petType === "cat" ? catBreedData : dogBreedData;
  const petTypeKr = petType === "cat" ? "묘종" : "견종";

  const handleSelectBreed = (breed: string) => {
    handleChangeBreed(breed);
    setOpen(false);
  };

  useEffect(() => {
    handleChangeBreed("");
  }, [petType]);

  useEffect(() => {
    if (breed) {
      handleChangeBreed(breed);
    }
  }, []);

  return (
    <div>
      <h4 className="py-3 text-sm font-semibold">견종/묘종</h4>
      <div className="flex justify-center">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              disabled={disabled}
              className="w-[200px] justify-between"
            >
              {breed
                ? breedData.find((b) => b.value === breed)?.label
                : `${petTypeKr}을 선택해주세요`}
              <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder={`${petTypeKr}을 검색해보세요`} />
              <CommandList className="overflow-y-auto max-h-32">
                <CommandEmpty>{`해당하는 ${petTypeKr}이 없습니다`}</CommandEmpty>
                <CommandGroup>
                  {breedData.map((b) => (
                    <CommandItem
                      key={b.value}
                      value={b.value}
                      onSelect={() => handleSelectBreed(b.value)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          breed === b.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {b.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
