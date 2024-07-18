import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/shared/components/dropdown-menu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { Ellipsis, Pencil, Trash } from "lucide-react";

interface EditAndDeleteDropDownProps {
  isMyComment: boolean;
  isMyPost?: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

function EditAndDeleteDropDown({
  isMyComment,
  isMyPost,
  onEdit,
  onDelete,
}: EditAndDeleteDropDownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Ellipsis size={14} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="px-4 space-y-1.5 text-[13px] text-center min-w-18">
        {isMyComment && (
          <DropdownMenuItem
            onClick={onEdit}
            className="flex items-center gap-x-2"
          >
            <Pencil size={12} />
            수정
          </DropdownMenuItem>
        )}
        {(isMyComment || isMyPost) && (
          <DropdownMenuItem
            onClick={onDelete}
            className="flex items-center gap-x-2"
          >
            <Trash size={12} />
            삭제
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default EditAndDeleteDropDown;
