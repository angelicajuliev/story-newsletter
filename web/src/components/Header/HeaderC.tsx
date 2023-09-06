import { useLocation } from "react-router";
import Header from "./Header";

const HeaderC = () => {
  const location = useLocation();
  const showNav = !location.pathname?.includes("/unsubscribe");

  return <Header showNav={showNav} />;
}

export default HeaderC
