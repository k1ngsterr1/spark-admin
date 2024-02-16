import { Header } from "@features/Header";
import { Menu } from "@features/Menu";

import "@fortawesome/fontawesome-svg-core/styles.css";

const page = () => {
  return (
    <div className="flex">
      <Menu />
      <Header />
    </div>
  );
};

export default page;
