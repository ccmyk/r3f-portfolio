// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer2/source-files";
var Project = defineDocumentType(() => ({
  name: "Project",
  filePathPattern: `projects/*.md`,
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    image: { type: "string" },
    slug: { type: "string", required: true },
    tags: { type: "list", of: { type: "string" } },
    date: { type: "date" }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "content",
  documentTypes: [Project]
});
export {
  Project,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-A4REP6OM.mjs.map
