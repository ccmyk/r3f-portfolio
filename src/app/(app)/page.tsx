import { HeroSection } from '@/features/home/hero-section'
import { FeaturedWorks } from '@/features/home/featured-works'
import { getPayloadClient } from '@/payload/getPayloadClient'
import { type Project } from '@/payload/payload-types'

export default async function HomePage() {
  const payload = await getPayloadClient()

  // Fetch the 3 most recent projects to feature on the homepage
  const { docs: projects } = await payload.find({
    collection: 'projects',
    limit: 3,
    sort: '-createdAt',
    // We use depth: 1 to automatically populate the 'coverImage' and 'tags' fields
    depth: 1,
  })

  return (
    <>
      <HeroSection />
      <FeaturedWorks projects={projects as Project} />
      {/* We will add the other sections (About, etc.) here later */}
    </>
  )
}