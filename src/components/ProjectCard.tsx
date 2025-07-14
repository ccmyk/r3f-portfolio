// src/components/ProjectCard.tsx
'use client'

import { Project } from 'contentlayer/generated'
import { AnimatedText } from './AnimatedText'

interface ProjectCardProps {
  project: Project
  isVisible: boolean
  delay: number
}

export function ProjectCard({ project, isVisible, delay }: ProjectCardProps) {
  return (
    <div className="cnt_prj">
      <div className="cnt_prj_t">
        <AnimatedText
          text={project.title}
          type="char"
          className="Awrite"
          isVisible={isVisible}
          startDelay={delay}
        />
      </div>
      <div className="cnt_prj_im">
        <img src={project.image} alt={project.title} />
      </div>
    </div>
  )
}