"use client";

import { NotionRenderer } from "react-notion-x";
import "react-notion-x/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import Image from "next/image";
import Link from "next/link";

type RendererProps = {
  recordMap: any;
  disableHeader?: boolean;
  mapPageUrl: string;
};

export const Renderer = ({
  recordMap,
  disableHeader = true,
  mapPageUrl,
}: RendererProps) => {
  const root_page_id = process.env.NEXT_PUBLIC_NOTION_PAGE_ID;
  return (
    <div className="notion__container">
      <NotionRenderer
        disableHeader={disableHeader}
        recordMap={recordMap}
        fullPage={true}
        darkMode={false}
        mapPageUrl={(pageId) => `${mapPageUrl}/${pageId}`}
        rootPageId={root_page_id}
        previewImages
        components={{
          nextImage: Image,
          nextLink: Link,
        }}
      />
    </div>
  );
};

export default Renderer;
