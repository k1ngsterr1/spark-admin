//функция для получения вебсайтов
export async function useGetWebsites() {
  const jwtToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAsImVtYWlsIjoiYXJ0ZW0uYW5kcmVldjIwMDAxMkBtYWlsLnJ1Iiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MTQzNzI4MzAsImV4cCI6MTcxNDQ1OTIzMH0.lOEE2VUPD6BqY8fa92SyY3arfodgYNIO5TzRCZq1-1Q";
  const url = "https://spark-admin-production.up.railway.app/api/website";

  //отравка GET запроса
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      "Content-Type": "application/json",
    },
  });

  // выброс ошибки
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
}
