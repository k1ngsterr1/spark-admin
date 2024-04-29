//функция для получения вебсайтов
export async function useGetWebsites() {
  const jwtToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzMsImVtYWlsIjoicnVzbGFubWFraG1hdG92QGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzE0MzgyMjYzLCJleHAiOjE3MTQ0Njg2NjN9.DluHE8tOLDiBeX6-Z8XTEpz2fm3ztpA4J5dSiZDtkFw";
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
