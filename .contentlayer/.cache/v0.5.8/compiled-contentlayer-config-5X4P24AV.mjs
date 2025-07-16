// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
var Project = defineDocumentType(() => ({
  name: "Project",
  filePathPattern: `projects/**/*.md`,
  // Matches all.md files in the projects folder
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    tags: { type: "list", of: { type: "string" }, required: true },
    image: { type: "string", required: true }
    // Path to the cover image
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace("projects/", "")
    }
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
//# sourceMappingURL=compiled-contentlayer-config-5X4P24AV.mjs.map
