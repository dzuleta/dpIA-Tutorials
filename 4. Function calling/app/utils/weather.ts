import * as dotenv from "dotenv";
dotenv.config();

console.log("TAVILY_API_KEY:", process.env.TAVILY_API_KEY);
console.log("OPENAI_API_KEY:", process.env.OPENAI_API_KEY);


import { TavilySearchAPIRetriever } from "@langchain/community/retrievers/tavily_search_api";

const searchInformation = async (query: string) => {
  try {

    const searchResultsInstance = new TavilySearchAPIRetriever({
      k: 3,
    });
    
    const searchResults = await searchResultsInstance.invoke(query);
    console.log({ searchResults });

    if (searchResults.length === 0) {
      throw new Error("No information found");
    }

    return searchResults[0];
  } catch (error) {
    console.error("Error fetching information:", error);
    throw new Error("Could not fetch information");
  }
};

export { searchInformation };
