// функция для получения списка вебсайтов
export async function useGetWebsites() {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhcnRlbS5hbmRyZWV2MjAwMDEyQG1haWwucnUiLCJyb2xlIjoidXNlciIsImlhdCI6MTcxNDc1MTkzMywiZXhwIjoxNzE0ODM4MzMzfQ.-RrDaNkJLFrclon5Hl15vcGfiloPSOxw_aoRRbmnWM8";
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
