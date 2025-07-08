'use client'

import { type Project, type Media } from '@/payload/payload-types'
import { Canvas } from '@react-three/fiber'
import { DistortedImagePlane } from './distorted-image-plane'
import Link from 'next/link'
import { AnimatedText } from '@/components/ui/animated-text'
import { Suspense } from 'react'

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const coverImage = project.coverImage as Media

  // The original layout uses specific widths and margins for different cards.
  // We can replicate this logic with conditional classes.
  const isFullWidth = index === 1
  const marginLeft = index === 2? 'lg:ml-32' : ''

  return (
    <Link
      href={`/project/${project.slug}`}
      className={`group ${isFullWidth? 'md:col-span-2' : ''} ${marginLeft}`}
    >
      {/* The R3F Canvas: This creates the WebGL scene */}
      <div className="w-full aspect-video md:aspect-[1.4/1] overflow-hidden bg-neutral-200">
        <Canvas>
          {/* Suspense is React's way of showing a fallback while async operations (like loading a texture) complete */}
          <Suspense fallback={null}>
            <DistortedImagePlane imageUrl={coverImage.url!} />
          </Suspense>
        </Canvas>
      </div>

      {/* Project Info */}
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
          {project.tags?.map((tag) => (typeof tag === 'object'? tag.name : tag)).join(', ')}
        </p>
      </div>
    </Link>
  )
}