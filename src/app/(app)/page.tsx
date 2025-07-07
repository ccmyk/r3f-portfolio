import { HeroSection } from '@/features/home/hero-section'
import { FeaturedWorks } from '@/features/home/featured-works'
import { getPayloadClient } from '@/payload/getPayloadClient'
import { type Project } from '@/payload/payload-types'

export default async function HomePage() {
  // For now, we'll use mock data. We'll replace this with a real
  // Payload fetch call once the CMS is populated.
  const mockProjects: Project = },
    { id: '2', title: 'Ciclope Fest', slug: 'ciclope-fest', tags: [{id: '3', name: 'UI/UX'}] },
    { id: '3', title: 'Kids Agency', slug: 'kids-agency', tags: },
  ]

  return (
    <>
      <HeroSection />
      <FeaturedWorks projects={mockProjects} />
      {/* We will add the other sections (About, etc.) here later */}
    </>
  )
}