import { MoveUpRight } from "lucide-react";
import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
interface CustomLinkProps {
  to: string;
  isBottom?: boolean;
}

function NavigationLink({
  to,
  children,
  isBottom = true,
}: PropsWithChildren<CustomLinkProps>) {
  return (
    <div
      className="flex gap-x-1.5 items-center  data-[is-bottom=true]:fixed data-[is-bottom=true]:bottom-10 data-[is-bottom=true]:right-10"
      data-is-bottom={isBottom}
    >
      <Link to={to} className="text-sm font-semibold">
        {children}
      </Link>
      <MoveUpRight size={14} strokeWidth={2} />
    </div>
  );
}

export default NavigationLink;
