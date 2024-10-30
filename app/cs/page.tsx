import Renderer from "config/NotionRenderer";
import { notion_x } from "utils/notion/client";

export default async function AnnouncePage() {
  const page_id = process.env.NEXT_PUBLIC_NOTION_PAGE_ID;
  const record_map = await notion_x.getPage(page_id);
  const mapPageUrl = "/cs";

  return (
    <div>
      <Renderer recordMap={record_map} mapPageUrl={mapPageUrl} />
    </div>
  );
}
