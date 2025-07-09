// src/components/home/FeaturedWorks.tsx
'use client'

import { type Project } from '@/payload/payload-types'
// CORRECTED PATHS
import { ProjectCard } from './ProjectCard'
import { AnimatedText } from '@/components/ui/AnimatedText'

interface FeaturedWorksProps {
  projects: Project[]
}

export function FeaturedWorks({ projects }: FeaturedWorksProps) {
  return (
    <section className="mt-40 md:mt-80 px-4">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex items-end">
          <AnimatedText
            text="Featured works"
            el="h2"
            className="font-main text-4xl md:text-6xl tracking-tighter"
          />
          <p className="font-book text-neutral-500 ml-4 mb-2">(2020-2024)</p>
        </div>
        <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-24">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}