const fetchWebsites = async () => {
  try {
    // Example API endpoint
    const response = await fetch("https://example.com/api/websites");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const websites = await response.json();
    return websites;
  } catch (error) {
    console.error("Failed to fetch websites:", error);
    return []; // Return an empty array in case of error
  }
};

export { fetchWebsites };
