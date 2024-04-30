//функция для получения вебсайтов
export async function useGetWebsites() {
  const jwtToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzMsImVtYWlsIjoicnVzbGFubWFraG1hdG92QGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzE0NDY5MDgyLCJleHAiOjE3MTQ1NTU0ODJ9.jB3P3hE2cPG6XDIC6FNeeD2VXu6AOs7sTw-SD8UP_e4";
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
