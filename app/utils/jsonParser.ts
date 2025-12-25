/**
 * Extracts and parses a JSON array from a string potentially containing other text.
 * Useful for handling AI responses that might include chatter around the JSON data.
 */
export const extractAndParseJSON = (aiResponse: string): any[] | null => {
  try {
    // 1. Find the first '[' and last ']'
    const startIndex = aiResponse.indexOf("[");
    const endIndex = aiResponse.lastIndexOf("]");

    if (startIndex === -1 || endIndex === -1) {
      // Trying object?
      // const startObj = aiResponse.indexOf('{');
      // const endObj = aiResponse.lastIndexOf('}');
      // if (startObj !== -1 && endObj !== -1) return JSON.parse(aiResponse.substring(startObj, endObj + 1));
      return null;
    }

    // 2. Substring to get only the array part
    const jsonString = aiResponse.substring(startIndex, endIndex + 1);

    // 3. Parse the clean string
    const parsed = JSON.parse(jsonString);

    // Ensure it is an array
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return null;
  } catch (error) {
    console.warn("Failed to parse itinerary JSON from AI response:", error);
    return null; // Return null so UI knows to display generic text
  }
};
