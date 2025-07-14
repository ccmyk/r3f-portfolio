// src/app/page.tsx
"use client";

import { Animated } from "@/components/Animated";
// We are NOT importing useAnimationController

export default function HomePage() {
  // No more complex state or refs to control animations!
  // Framer Motion's `whileInView` handles this automatically inside the component.

  return (
    <>
      {/* The background can be a separate component */}
      {/* <BackgroundWebGL /> */}

      <section className="home_hero">
        <div className="c-vw cnt">
          <div className="cnt_hold">
            <h2 className="cnt_tt">
              {/* The Animated component handles its own reveal. */}
              {/* No more isVisible props! */}
              <Animated
                as="div"
                variant="Awrite"
                text="Chris Hall"
                className="ttj" // Your typography class
                stagger={0.08}
              />
            </h2>
            <div className="cnt_bt">
              <Animated
                as="h3"
                variant="Awrite"
                text="Art Director & Designer"
                className="Awrite" // The component adds this, but being explicit is fine
                delay={0.5} // Start this animation 0.5s after it appears
              />
            </div>
            <div className="cnt_sc">
              <Animated
                as="p"
                variant="Aline"
                text="[SCROLL TO EXPLORE]"
                className="Atext"
                delay={1.0}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Add some space to make the page scrollable */}
      <div style={{ height: '100vh' }}></div>

      <section className="home_prjs">
         <div className="c-vw cnt">
          <div className="cnt_t">
            <Animated
              as="h2"
              variant="Awrite"
              text="Featured works"
              className="Atitle tt1"
              delay={0} // No delay, it will trigger when it scrolls into view
            />
          </div>
        </div>
      </section>
    </>
  );
}
