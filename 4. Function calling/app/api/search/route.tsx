import { TavilySearchAPIRetriever } from "@langchain/community/retrievers/tavily_search_api";
import * as dotenv from "dotenv";

dotenv.config();

export async function POST(req, res) {
  const { query } = await req.json();

  try {
    const searchResultsInstance = new TavilySearchAPIRetriever({
      k: 3
    });

    const searchResults = await searchResultsInstance.invoke(query);
    console.log({ searchResults });

    if (searchResults.length === 0) {
      throw new Error("No information found");
    }

    return new Response(JSON.stringify(searchResults[0]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error fetching information:", error);
    return new Response(JSON.stringify({ error: "Could not fetch information" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}