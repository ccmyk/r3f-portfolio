// src/components/home/ProjectCard.tsx
'use client'

import { type Project, type Media } from '@/payload/payload-types'
import { Canvas } from '@react-three/fiber'
import Link from 'next/link'
import { Suspense } from 'react'
// CORRECTED PATHS
import { DistortedImageGL } from '@/webgl/components/DistortedImage.gl'
import { AnimatedText } from '@/components/ui/AnimatedText'

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const coverImage = project.coverImage as Media
  const isFullWidth = index === 1
  const marginLeft = index === 2 ? 'lg:ml-32' : ''

  return (
    <Link
      href={`/project/${project.slug}`}
      className={`group ${isFullWidth ? 'md:col-span-2' : ''} ${marginLeft}`}
    >
      <div className="w-full aspect-video md:aspect-[1.4/1] overflow-hidden bg-neutral-200">
        <Canvas>
          <Suspense fallback={null}>
            {/* The component name was also corrected here */}
            <DistortedImageGL imageUrl={coverImage.url!} />
          </Suspense>
        </Canvas>
      </div>
      <div className="mt-3">
        <div className="flex justify-between items-center">
          <AnimatedText
            text={project.title}
            el="h3"
            className="font-main text-lg uppercase"
          />
          <span className="font-book text-neutral-500">0{index + 1}</span>
        </div>
        <p className="font-book text-neutral-500 mt-1">
          {project.tags?.map((tag) => (typeof tag === 'object' ? tag.name : tag)).join(', ')}
        </p>
      </div>
    </Link>
  )
}