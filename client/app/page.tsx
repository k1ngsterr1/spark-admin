import { Header } from "@features/Header";
import { Menu } from "@features/Menu";

import "@fortawesome/fontawesome-svg-core/styles.css";

const page = () => {
  return (
    <div className="flex">
      <Menu />
      <main className="flex flex-col w-full">
        <Header />
      </main>
    </div>
  );
};

export default page;
