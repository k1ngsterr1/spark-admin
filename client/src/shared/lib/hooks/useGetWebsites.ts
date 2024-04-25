export async function useGetWebsites() {
  const jwtToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiUnVzbGFuIE1ha2htYXRvdiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzE0MDYzNjg0LCJleHAiOjE3MTQxNTAwODR9.TyK_pBshrGk1E9N0YVkpV5nspl8S-MyImLAUNc36zuY";
  const url = "https://spark-admin-production.up.railway.app/api/website";

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
}
