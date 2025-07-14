import { defineDocumentType, makeSource } from 'contentlayer2/source-files'

export const Project = defineDocumentType(() => ({
  name: 'Project',
  filePathPattern: `projects/*.md`,
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    image: { type: 'string' },
    slug: { type: 'string', required: true },
    tags: { type: 'list', of: { type: 'string' } },
    date: { type: 'date' },
  },
}))

export const About = defineDocumentType(() => ({
  name: 'About',
  filePathPattern: `about.md`,
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
  },
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Project, About],
})