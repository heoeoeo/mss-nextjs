import { Client } from "@notionhq/client";
import { NotionAPI } from "notion-client";

export const notion = new Client({
  auth: process.env.NEXT_NOTION_API_KEY,
});

export const notion_x = new NotionAPI();
