"use client";

export function useLogout() {
  const logOut = () => {
    console.log("log out is working");
    localStorage.removeItem("userData");
  };

  return logOut;
}
