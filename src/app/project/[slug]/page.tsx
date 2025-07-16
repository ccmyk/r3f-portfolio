// src/app/project/[slug]/page.tsx 
import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'

interface ProjectFrontmatter {
  title: string
  slug: string
  date: string
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const projectPath = path.join(process.cwd(), 'src', 'content', 'projects', `${params.slug}.mdx`)
  const source = await fs.readFile(projectPath, 'utf8')
  const { content, data: frontmatter } = matter(source)

  // Optionally: type-cast frontmatter if you want (not enforced on the .mdx file itself)
  const meta = frontmatter as ProjectFrontmatter

  return (
    <article>
      <h1>{meta.title}</h1>
      <MDXRemote source={content} />
    </article>
  )
}