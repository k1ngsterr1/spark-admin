import fetch from "node-fetch";

export async function useGetWebsites() {
  const jwtToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJuYW1lIjoiQXJ0ZW0gQW5kcmVldiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzEzOTY5NjIyLCJleHAiOjE3MTQwNTYwMjJ9.hiNPY7kRFbohEdZRMvK9TykmdnpcaHn0Ak78_wZ_LbY";
  const url = "https://spark-admin-production.up.railway.app/api/website";
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      "Content-Type": "application/json",
    },
  });
  const sites = await response.json();

  async function fetchData() {
    try {
      const sites = await useGetWebsites();
      console.log("Полученные сайты:", sites);
    } catch (error) {
      console.error("Ошибка при получении сайтов:", error);
    }
  }

  fetchData();
  return sites;
}
