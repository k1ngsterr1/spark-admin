//функция для получения юзеров
export async function useGetUsers() {
  const jwtToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhcnRlbS5hbmRyZWV2MjAwMDEyQG1haWwucnUiLCJyb2xlIjoidXNlciIsImlhdCI6MTcxNDExNzY0OSwiZXhwIjoxNzE0MjA0MDQ5fQ.IMxKymCDF4tgRLF2yFTK7QHJn6E7JqYQ8FN4fsyAoBs";
  const url = "https://spark-admin-production.up.railway.app/api/users";

  //отравка GET запроса
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      "Content-Type": "application/json",
    },
  });

  // выброс отшибки
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}
