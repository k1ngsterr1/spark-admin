import {
  faArrowRightToBracket,
  faChartArea,
  faGear,
  faGlobe,
  faHeadphones,
  faLock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export const navlinks = [
  { icon: faGlobe, href: "/websites", text: "Мои сайты", margin: "mt-0" },
  { icon: faUser, href: "/users", text: "Мои юзеры", margin: "mt-4" },
  {
    icon: faChartArea,
    href: "/analytics",
    text: "Аналитика",
    margin: "mt-4",
  },
  { icon: faLock, href: "/analytics", text: "Мой доступ", margin: "mt-4" },
  { icon: faHeadphones, href: "/support", text: "Поддержка", margin: "mt-4" },
  { icon: faGear, href: "/settings", text: "Настройки", margin: "mt-4" },
];
