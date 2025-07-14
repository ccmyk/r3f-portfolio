'use client'

import { allProjects } from 'contentlayer/generated'
import { useState, useRef } from 'react'
import { Loader } from '@/components/Loader'
import { AnimatedText } from '@/components/AnimatedText'
import { LoaderWebGL } from '@/webgl/LoaderWebGL'
import { TitleWebGL } from '@/webgl/TitleWebGL'
import { BackgroundWebGL } from '@/webgl/BackgroundWebGL'
import { MediaWebGl } from '@/webgl/MediaWebGL'
import { ProjectCard } from '@/components/ProjectCard'
import { FooterWebGL } from '@/webgl/FooterWebGL'
import { Footer } from '@/components/Footer'

import { useAnimationController } from '@/hooks/useAnimationController'

export default function HomePage() {
  const { state, observeElement } = useAnimationController()
  const heroRef = useRef<HTMLElement>(null)
  const projectsRef = useRef<HTMLElement>(null)
  const aboutRef = useRef<HTMLElement>(null)
  const footerRef = useRef<HTMLElement>(null)

  const projects = allProjects

  observeElement(heroRef, 'heroVisible')
  observeElement(projectsRef, 'projectsVisible')
  observeElement(aboutRef, 'aboutVisible')
  observeElement(footerRef, 'footerVisible')

  if (!state.loaderComplete) {
    return (
      <>
        <Loader onComplete={() => {}} />
        <LoaderWebGL />
      </>
    )
  }

  return (
    <>
      <BackgroundWebGL />
      <section ref={heroRef} className="home_hero">
        <div className="c-vw cnt">
          <div className="cnt_hold">
            <h2 className="cnt_tt">
              <div className="Atitle">
               <AnimatedText>
                 <div className="cCover">
                   <div className="Oi Oi-tt"></div>                 
                     <TitleWebGL>
                       text="Chris"
                       type="word char"
                       className="ttj Oiel act"
                       isVisible={state.heroVisible}
                       data-oi="0"
                     </TitleWebGL>
                   </div>
                 </div>
               /AnimatedText> 
              </div>
                </h2>
                </div>
              </div>
            </h2>
            <div className="cnt_tt">
              <AnimatedText
                    text="Chris"
                    type="word char"
                    className="ttj Oiel act"
                    isVisible={state.heroVisible}
                    data-io="1"
                  />
              <AnimatedText
                text="Hall"
                type="char"
                className="Atitle tt1"
                isVisible={state.heroVisible}
                data-io="1"
              />
            </div>
            <div className="cnt_bt">
            
              <AnimatedText
                text="Art Director & Designer"
                type="char"
                className="Awrite"
                isVisible={state.heroVisible}
                data-io="2"
              />
            </div>
            <div className="cnt_sc">
              <AnimatedText
                text="[SCROLL TO EXPLORE]"
                type="line"
                className="Atext"
                isVisible={state.heroVisible}
                data-io="3"
              />
            </div>
            <div className="cnt_lk">
              <AnimatedText
                text="View Projects"
                type="char"
                className="Awrite"
                isVisible={state.heroVisible}
                data-io="4"
              />
            </div>
          </div>
        </div>
      </section>
      <section ref={projectsRef} className="home_prjs">
        <div className="c-vw cnt">
          <div className="cnt_t">
            <AnimatedText
              text="Featured works"
              type="char"
              className="Awrite"
              isVisible={state.projectsVisible}
              data-io="6"
              data-params="1.3"
            />
          </div>
          <div className="cnt_hold">
            {projects.map((project, index) => (
              <ProjectCard
                key={project._id}
                project={project}
                isVisible={state.projectsVisible}
                data-io={`7${index}`}
                delay={index * 0.2}
              />
            ))}
          </div>
        </div>
      </section>
      <section ref={aboutRef} className="home_about">
        <div className="c-vw cnt">
          <div className="cnt_tp">
            <AnimatedText
              text="Interactive Designer,"
              type="char"
              className="Awrite"
              isVisible={state.aboutVisible}
              data-io="10"
            />
            <AnimatedText
              text="also Speaker & Teacher"
              type="char"
              className="Awrite"
              isVisible={state.aboutVisible}
              data-io="10"
            />
          </div>
          <div className="cnt_x">
            <AnimatedText
              text="Crafting engaging and innovative solutions"
              type="line"
              className="Atext"
              isVisible={state.aboutVisible}
              data-io="11"
            />
          </div>
        </div>
      </section>
      <Footer ref={footerRef} isVisible={state.footerVisible} />
      <FooterWebGL text="Get in touch" />
    </>
  )
}