// функция для получения списка вебсайтов
export async function useGetWebsites() {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJydXNsYW5tYWtobWF0b3ZAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MTQ4MjI4OTIsImV4cCI6MTcxNDkwOTI5Mn0.8xbzg_Xd8L3c-WQD1qODD007u_ejkMJ4vGQoRAyUJAU";
  const url = "https://spark-admin-production.up.railway.app/api/website";

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
}
