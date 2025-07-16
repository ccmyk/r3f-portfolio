// src/components/ProjectCard.tsx
'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { View } from '@react-three/drei';
import { type Project } from 'contentlayer/generated';
import { Animated } from './Animated';
import { Media } from '@/webgl/Media';

type ProjectCardProps = {
  project: Project;
  isVisible: boolean;
};

export function ProjectCard({ project, isVisible }: ProjectCardProps) {
  const mediaRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="project_card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="project_card_media" ref={mediaRef}>
        <View track={mediaRef}>
          <Media url={project.image} isHovered={isHovered} />
        </View>
      </div>
      <div className="project_card_info">
        <Link href={`/project/${project.slug}`}>
          <Animated as="h4" variant="Awrite" text={project.title} isVisible={isVisible} />
        </Link>
        <div className="project_card_meta">
          <Animated as="span" variant="Aline" text={new Date(project.date).getFullYear().toString()} isVisible={isVisible} delay={0.2} />
          <Animated as="span" variant="Aline" text={project.tags.join(', ')} isVisible={isVisible} delay={0.3} />
        </div>
      </div>
    </motion.div>
  );
}