export interface WikiData {
  summary: string;
  imageUrl: string | null;
  wikiUrl: string;
}

export const fetchWikiData = async (
  query: string
): Promise<WikiData | null> => {
  try {
    // Remove common words that confuse Wikipedia search (e.g., "Restaurant", "Jalan") if needed.
    // For now, raw query is often okay, but cleaners can be added.
    const cleanQuery = query.split(",")[0].trim(); // Take first part usually name

    const searchUrl = `https://id.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts|pageimages&titles=${encodeURIComponent(cleanQuery)}&pithumbsize=500&exintro=1&explaintext=1`;

    const response = await fetch(searchUrl);
    const data = await response.json();

    const pages = data.query?.pages;
    if (!pages) return null;

    const pageId = Object.keys(pages)[0];
    if (pageId === "-1") return null;

    const pageData = pages[pageId];

    return {
      summary: pageData.extract
        ? pageData.extract.substring(0, 150) + "..."
        : "",
      imageUrl: pageData.thumbnail?.source || null,
      wikiUrl: `https://id.wikipedia.org/?curid=${pageData.pageid}`,
    };
  } catch (error) {
    console.error(`Failed to fetch Wiki data for ${query}:`, error);
    return null;
  }
};
