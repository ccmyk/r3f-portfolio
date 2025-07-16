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
var About = defineDocumentType(() => ({
  name: "About",
  filePathPattern: `about.md`,
  // Specifically targets about.md
  fields: {
    title: { type: "string", required: true }
    // Add other fields if your about.md has them, e.g., image, bio
  }
  // The body field is automatically included for the markdown content
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "content",
  documentTypes: [Project]
});
export {
  About,
  Project,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-LDGMZ3LN.mjs.map
