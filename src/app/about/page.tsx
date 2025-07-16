// src/app/about/page.tsx
import { allAbouts } from 'contentlayer/generated';
import { Wysiwyg } from '@/components/Wysiwyg';
import { Animated } from '@/components/Animated';

export default function AboutPage() {
  // Contentlayer generates an array, so we take the first (and only) item.
  const aboutContent = allAbouts;

  return (
    <main className="about">
      <section className="about_intro">
        <div className="c-vw cnt">
          <Animated
            as="h1"
            variant="Atext"
            className="tt1"
            text={aboutContent.title}
            isVisible={true}
          />
        </div>
      </section>

      <section className="about_content">
        <div className="c-vw cnt">
          <Wysiwyg content={aboutContent.body.html} />
        </div>
      </section>
    </main>
  );
}