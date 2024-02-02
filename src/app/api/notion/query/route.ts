import { ClientErrorCode, isNotionClientError } from "@notionhq/client";

const { Client } = require("@notionhq/client");
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export async function POST() {
  const databaseId = process.env.NOTION_DATABASE_ID;

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
    });

    return Response.json({ response });
  } catch (error) {
    console.error(error);
    // type guarding
    if (isNotionClientError(error)) {
      if (error.code === ClientErrorCode.RequestTimeout) {
        return Response.json(
          { error },
          {
            status: 408,
            statusText: "Request timed out while querying the Notion database",
          }
        );
      }
      return Response.json(
        { error },
        {
          status: error.status,
          statusText: "An error occurred while querying the Notion database",
        }
      );
    }
    return Response.json(
      { error },
      {
        status: 500,
        statusText:
          "An unknown error occurred while querying the Notion database",
      }
    );
  }
}
