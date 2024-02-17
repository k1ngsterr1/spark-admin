import { Header } from "@features/Header";
import { Menu } from "@features/Menu";
import { Dashboard } from "@widgets/Screens/Dashboard/ui";

import "@fortawesome/fontawesome-svg-core/styles.css";

const page = () => {
  return (
    <div className="flex">
      <Menu />
      <main className="flex flex-col w-full">
        <Header />
        <Dashboard />
      </main>
    </div>
  );
};

export default page;
