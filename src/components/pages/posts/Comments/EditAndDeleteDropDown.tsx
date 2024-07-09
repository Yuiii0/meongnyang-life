import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
      <DropdownMenuContent className="text-center min-w-20">
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
