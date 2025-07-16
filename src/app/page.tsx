// src/app/page.tsx
'use client';

import { useRef } from 'react';
// import { allProjects, type Project } from 'contentlayer/generated';
// import { compareDesc } from 'date-fns';
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
  
  const projects: any =;
  // const projects: Project = allProjects.sort((a, b) =>
  //   compareDesc(new Date(a.date), new Date(b.date))
  //);

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
                <div className="iO"></div>
                <Animated as="h3" className="tt3" variant="Aline" text={"Art Director & Designer\nBased in Los Angeles."} isVisible={isContentVisible} delay={0.5} />
                <Animated as="h4" variant="Awrite" text="PORTFOLIO_20/25" isVisible={isContentVisible} delay={0.7} />
                <div className="iO iO-std"></div>
              </div>

              <div className="cnt_sc">
                <Animated as="h4" variant="Awrite" text="[SCROLL TO EXPLORE]" isVisible={isContentVisible} delay={0.9} />
                <div className="iO iO-std"></div>
              </div>

              <div className="cnt_lk">
                <Animated as="a" href="https://linkedin.com/in/chrisryanhall" variant="Awrite" text="LINKEDIN" isVisible={isContentVisible} delay={1.1} />
                <div className="iO iO-std"></div>
                  <i style="display: inline-block; position: relative;">
                    <svg viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg" style="display: inline-block; position: relative;">
                      <path d="M6.49194 3.516H5.67594L5.67594 2.052L5.74794 1.272L5.71194 1.26L4.94394 2.124L0.911938 6.156L0.335937 5.58L4.36794 1.548L5.23194 0.78L5.21994 0.743999L4.43994 0.816L2.97594 0.816V0L6.49194 0L6.49194 3.516Z" fill="black">  
                      </path>
                    </svg>
                  </i>
                <Animated as="a" href="#" variant="Awrite" text="RESUME" isVisible={isContentVisible} delay={1.2} />
                <div className="iO iO-std"></div>
                  <i style="display: inline-block; position: relative;">
                    <svg viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg" style="display: inline-block; position: relative;">
                      <path d="M6.49194 3.516H5.67594L5.67594 2.052L5.74794 1.272L5.71194 1.26L4.94394 2.124L0.911938 6.156L0.335937 5.58L4.36794 1.548L5.23194 0.78L5.21994 0.743999L4.43994 0.816L2.97594 0.816V0L6.49194 0L6.49194 3.516Z" fill="black">
                      </path>
                    </svg>
                  </i>
              </div>
            </div>
          </div>
        </motion.section>

        <section className="home_prjs">
          <div className="c-vw cnt">
            <div className="cnt_t">
              <div className="Atitle">
                <div className="cCover" />
                <h2 className="tt1 Oiel act">Featured Works</h2>
              <Animated as="h3" variant="Awrite" text="Featured works" isVisible={isContentVisible} delay={1.5} />
            </div>
            <div className="cnt_els">
              {projects.map((project) => (
                <ProjectCard key={project.slug} project={project} isVisible={isContentVisible} />
              ))}
            </div>
            <div className="cnt_ft">
            <div className="cnt_st">
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