import { MoveUpRight } from "lucide-react";
import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
interface CustomLinkProps {
  to: string;
}

function NavigationLink({ to, children }: PropsWithChildren<CustomLinkProps>) {
  return (
    <div className="flex gap-x-1.5 items-center">
      <Link to={to} className="text-sm font-semibold">
        {children}
      </Link>
      <MoveUpRight size={14} strokeWidth={2} />
    </div>
  );
}

export default NavigationLink;
