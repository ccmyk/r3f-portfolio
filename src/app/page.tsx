// src/app/page.tsx
'use client';

import { useRef } from 'react';
import { allProjects, type Project } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';
import { useAnimation } from '@/providers/AnimationProvider';
import { Loader } from '@/components/Loader';
import { Nav } from '@/components/Nav';
import { Background } from '@/components/Background';
import { ProjectCard } from '@/components/ProjectCard';
import { AnimatePresence, motion } from 'framer-motion';
import { View } from '@react-three/drei';
import { TitleWebGL } from '@/webgl/TitleWebGL';
import { LoaderScene } from '@/webgl/LoaderScene';
import { BackgroundWebGL } from '@/webgl/BackgroundWebGL';
import { Animated } from '@/components/Animated';

export default function HomePage() {
  const { state } = useAnimation();
  const isContentVisible = state === 'CONTENT_VISIBLE' |

| state === 'IDLE';

  const heroTitle1 = useRef<HTMLDivElement>(null);
  const heroTitle2 = useRef<HTMLDivElement>(null);
  const aboutBgRef = useRef<HTMLDivElement>(null);

  const projects: Project = allProjects.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  return (
    <>
      <AnimatePresence>
        {state === 'LOADING' && <Loader />}
        {state === 'LOADER_EXITING' && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 99 }}>
            <LoaderScene onComplete={() => dispatch({ type: 'SET_IDLE' })} />
          </div>
        )}
      </AnimatePresence>
      <Nav />
      <Background />

      <main className="home">
        <motion.section
          className="home_hero"
          initial={{ opacity: 0 }}
          animate={{ opacity: isContentVisible? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          <div className="c-vw cnt">
            <div className="cnt_hold">
              <h2 className="cnt_tt">
                <div className="Atitle">
                  <div ref={heroTitle1} className="cCover" />
                  <div className="ttj Oiel act">Chris</div>
                </div>
                <div className="Atitle">
                  <div ref={heroTitle2} className="cCover" />
                  <div className="ttj Oiel act">Hall</div>
                </div>
              </h2>

              <div className="cnt_bt">
                <Animated as="h3" className="tt3" variant="Aline" text={"Art Director & Designer\nBased in Los Angeles."} isVisible={isContentVisible} delay={0.5} />
                <Animated as="h4" variant="Awrite" text="PORTFOLIO_20/25" isVisible={isContentVisible} delay={0.7} />
              </div>

              <div className="cnt_sc">
                <Animated as="h4" variant="Awrite" text="*" isVisible={isContentVisible} delay={0.9} />
              </div>

              <div className="cnt_lk">
                <Animated as="a" href="#" variant="Awrite" text="LINKEDIN" isVisible={isContentVisible} delay={1.1} />
                <Animated as="a" href="#" variant="Awrite" text="RESUME" isVisible={isContentVisible} delay={1.2} />
              </div>
            </div>
          </div>
        </motion.section>

        <section className="home_prjs">
          <div className="c-vw">
            <div className="cnt_t">
              <Animated as="h3" variant="Awrite" text="Featured works" isVisible={isContentVisible} delay={1.5} />
            </div>
            <div className="cnt_els">
              {projects.map((project) => (
                <ProjectCard key={project.slug} project={project} isVisible={isContentVisible} />
              ))}
            </div>
          </div>
        </section>
        <section className="home_about">
          <div className="Oi Oi-bg" ref={aboutBgRef}>
            <View track={aboutBgRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100vh' }}>
              <BackgroundWebGL />
            </View>
          </div>
        </section>
      </main>

      {/* WebGL Views */}
      {isContentVisible && (
        <>
          <View track={heroTitle1}>
            <TitleWebGL text="Chris" isVisible={isContentVisible} />
          </View>
          <View track={heroTitle2}>
            <TitleWebGL text="Hall" isVisible={isContentVisible} />
          </View>
        </>
      )}
    </>
  );
}