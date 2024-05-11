// функция для получения списка юзеров
export async function useGetUsers() {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhcnRlbS5hbmRyZWV2MjAwMDEyQG1haWwucnUiLCJyb2xlIjoidXNlciIsImlhdCI6MTcxNTAwMTU0NSwiZXhwIjoxNzE1MDg3OTQ1fQ.ZYIQtznYuhPJDiB74UEwJ12NfulVagfGLY9pCfv97EE";
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