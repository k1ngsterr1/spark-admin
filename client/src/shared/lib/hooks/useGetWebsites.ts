// функция для получения списка вебсайтов
export async function useGetWebsites() {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJydXNsYW5tYWtobWF0b3ZAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MTUyNTgzOTUsImV4cCI6MTcxNTM0NDc5NX0.xdm-dpZfFUThMeHLHx0seJQkzjtp4_GywiAwJDGl_n0";
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
