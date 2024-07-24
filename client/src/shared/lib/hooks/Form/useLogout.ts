"use client";

export function useLogout() {
  const logOut = () => {
    localStorage.removeItem("userData");
  };

  return logOut;
}
