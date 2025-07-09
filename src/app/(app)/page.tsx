// src/app/(app)/page.tsx
'use client' 

import { HeroSection } from '@/components/home/HeroSection'
import { FeaturedWorks } from '@/components/home/FeaturedWorks'
import { HomeAbout } from '@/components/home/HomeAbout'
import { type Project } from '@/payload/payload-types'

export default function HomePage({ isVisible }: { isVisible: boolean }) {
  const placeholderProjects: Project[] = [
    /* ... placeholder data ... */
  ]

  return (
    <>
      {/* REMOVE THE COMPONENT FROM HERE */}
      {/* <BackgroundGrid /> */}
      <HeroSection isVisible={isVisible} />
      <FeaturedWorks projects={placeholderProjects} />
      <HomeAbout />
    </>
  )
}