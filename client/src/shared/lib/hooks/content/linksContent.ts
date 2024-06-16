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
  {
    icon: faGlobe,
    textKey: "websites",
    href: "/websites",
    text: "Мои сайты",
    margin: "mt-0",
  },
  {
    icon: faUser,
    textKey: "users",
    href: "/users",
    text: "Мои юзеры",
    margin: "mt-4",
  },
  {
    icon: faChartArea,
    textKey: "analytics",
    href: "/analytics",
    text: "Аналитика",
    margin: "mt-4",
  },
  {
    icon: faLock,
    textKey: "access",
    href: "/access",
    text: "Мой доступ",
    margin: "mt-4",
  },
  {
    icon: faHeadphones,
    textKey: "support",
    href: "/support",
    text: "Поддержка",
    margin: "mt-4",
  },
  {
    icon: faGear,
    textKey: "settings",
    href: "/settings",
    text: "Настройки",
    margin: "mt-4",
  },
];
