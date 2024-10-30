import Renderer from "config/NotionRenderer";
import { DAY_1 } from "constants/seconds";
import { notion_x } from "utils/notion/client";

export const revalidate = DAY_1;

export default async function PrivacyPage() {
  const pageId = "12db8486390880a997a4c1ad356ae769";

  const record_map = await notion_x.getPage(pageId);

  return (
    <div>
      <Renderer recordMap={record_map} mapPageUrl="" />
    </div>
  );
}
