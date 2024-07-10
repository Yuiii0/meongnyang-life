import { SyncLoader } from "react-spinners";

interface LoaderProps {
  loading: boolean;
}

function Loader({ loading }: LoaderProps) {
  return <SyncLoader loading={loading} size={8} color="#D1D5DB" />;
}

export default Loader;
