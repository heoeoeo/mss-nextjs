import Renderer from "config/NotionRenderer";
import { notion_x } from "utils/notion/client";

export default async function AnnounceDetailPage({ params }) {
  const { id } = params;
  const record_map = await notion_x.getPage(id);
  const mapPageUrl = "/cs";

  return (
    <div>
      <Renderer
        recordMap={record_map}
        mapPageUrl={mapPageUrl}
        disableHeader={false}
      />
    </div>
  );
}
