// функция для получения списка вебсайтов
export async function useGetUsers() {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAsImVtYWlsIjoiYXJ0ZW0uYW5kcmVldjIwMDAxMkBtYWlsLnJ1Iiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MTQ3MjE0NDcsImV4cCI6MTcxNDgwNzg0N30.EmXZXNgi1VRcaAxUsJyJQgicvFONpBZZGheWk1YN0Xs";
  const url = "https://spark-admin-production.up.railway.app/api/website/users";

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
