const fetchWebsites = async () => {
  try {
    const response = await fetch("https://example.com/api/websites");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const websites = await response.json();
    return websites;
  } catch (error) {
    console.error("Failed to fetch websites:", error);
    return [];
  }
};

export { fetchWebsites };
