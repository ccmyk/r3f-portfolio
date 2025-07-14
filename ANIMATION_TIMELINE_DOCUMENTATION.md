# Eva Sanchez Portfolio - Animation Timeline Documentation

## Overview
This document provides a comprehensive breakdown of the animation system, timing, and sequencing for the Eva Sanchez portfolio site, based on the legacy WordPress theme. This documentation is essential for the React/Framer Motion migration.

## Animation System Architecture

### Core Components
1. **GSAP Timeline System**: Main animation engine
2. **Intersection Observer**: Triggers animations when elements enter viewport
3. **Text Splitting**: SplitType library for character/word/line animations
4. **Event System**: Custom events for animation coordination

### Animation Classes & States
- `.Awrite`: Character-by-character text animation
- `.Atext`: Line-by-line text animation  
- `.Aline`: Simple line animation
- `.Awrite-inv`: Inverse/fade-in animation
- `.inview`: Element is in viewport
- `.stview`: Element has started animation
- `.ivi`: Animation is complete
- `.okF`: Ready for loop/repeat

## Page Load & Loader Sequence

### 1. Initial Loader (0-2600ms)
```
0ms:    Loader starts
260ms:  GL context creation begins
800ms:  Loader progress animation
1200ms: WebGL textures loading
2600ms: Loader complete, fade out begins
```

### 2. Navigation Appearance (2600-3000ms)
```
2600ms: Navigation container opacity: 0 → 1
2700ms: Logo "EVASANCHEZ" text splitting begins
2800ms: Logo character animation (stagger: 0.05s per char)
3000ms: Navigation fully visible
```

### 3. Home Hero Animation Sequence (3000-6000ms)

#### Main Title Animation (3000-4500ms)
```
3000ms: .cnt_tt (main title) intersection observer triggered
3100ms: Text splitting into characters complete
3200ms: Character animation begins
        - Duration: 0.3s per character
        - Stagger: 0.05s between characters
        - Easing: 'power4.inOut'
4500ms: Main title animation complete
```

#### Subtitle Animation (3500-5000ms)
```
3500ms: .cnt_bt (subtitle) intersection observer triggered
3600ms: Text splitting complete
3700ms: Character animation begins
        - Duration: 0.3s per character
        - Stagger: 0.05s between characters
        - Easing: 'power4.inOut'
5000ms: Subtitle animation complete
```

#### Section Content Animation (4000-5500ms)
```
4000ms: .cnt_sc (section content) intersection observer triggered
4100ms: Line splitting complete
4200ms: Line animation begins
        - Duration: 0.6s per line
        - Stagger: 0.1s between lines
        - Y-transform: 50% → 0%
        - Easing: 'power4.inOut'
5500ms: Section content animation complete
```

#### Link Animation (4500-6000ms)
```
4500ms: .cnt_lk (links) intersection observer triggered
4600ms: Text splitting complete
4700ms: Character animation begins
        - Duration: 0.3s per character
        - Stagger: 0.05s between characters
        - Easing: 'power4.inOut'
6000ms: Link animation complete
```

### 4. Projects Section Animation (6000-8000ms)

#### Projects Title Animation (6000-7000ms)
```
6000ms: .home_prjs .cnt_t intersection observer triggered
6100ms: "Featured works" title animation begins
        - Duration: 0.3s per character
        - Stagger: 0.05s between characters
        - Delay: 1.3s (data-params="1.3")
7000ms: Projects title animation complete
```

#### Project Items Animation (6500-8000ms)
```
6500ms: .cnt_prj project items intersection observer triggered
6600ms: Project titles text splitting begins
6700ms: Project animations begin (staggered)
        - Duration: 0.3s per character
        - Stagger: 0.05s between characters
        - Each project delayed by 200ms from previous
8000ms: All project animations complete
```

### 5. About Section Animation (8000-10000ms)

#### About Title Animation (8000-9000ms)
```
8000ms: .home_about .cnt_tp intersection observer triggered
8100ms: "Interactive Designer," title animation begins
8200ms: "also Speaker & Teacher" title animation begins
        - Duration: 0.3s per character
        - Stagger: 0.05s between characters
        - WebGL background animation synchronized
9000ms: About titles animation complete
```

#### About Content Animation (8500-10000ms)
```
8500ms: .home_about .cnt_x intersection observer triggered
8600ms: About text line splitting begins
8700ms: Line animation begins
        - Duration: 0.6s per line
        - Stagger: 0.1s between lines
        - Y-transform: 50% → 0%
        - Easing: 'power4.inOut'
10000ms: About content animation complete
```

### 6. Footer Animation (10000-12000ms)

#### Footer Title Animation (10000-11000ms)
```
10000ms: .footer_cm intersection observer triggered
10100ms: "Get in touch" title animation begins
        - WebGL footer component activation
        - Duration: 0.3s per character
        - Stagger: 0.05s between characters
11000ms: Footer title animation complete
```

#### Footer Links Animation (10500-12000ms)
```
10500ms: .cnt_lk footer links intersection observer triggered
10600ms: Social media links animation begins
        - Instagram, Savee, LinkedIn, Dribbble, Read.cv, Behance
        - Duration: 0.3s per character
        - Stagger: 0.05s between characters
        - Each link delayed by 100ms from previous
12000ms: All footer links animation complete
```

## Navigation Animation Details

### Logo Animation
- **Element**: `.nav_logo` containing "EVASANCHEZ"
- **Type**: Character-by-character reveal
- **Timing**: 
  - Start: 2700ms (after loader)
  - Character duration: 0.3s
  - Stagger: 0.05s
  - Total duration: ~700ms

### Navigation Right / "LET'S TALK" Link
- **Element**: `.nav_right a`
- **Type**: Write animation with hover effects
- **Timing**:
  - Appears with main navigation
  - Hover: Character scramble effect
  - Duration: 0.22s (faster than normal text)

## Text Animation System

### Character Animation (`Awrite`)
```javascript
// Base timing configuration
let times = [0.3, 0.05, 0.16, 0.05, 0.016]
// [char_duration, char_stagger, fake_duration, fake_stagger, fake_separation]

// For line elements
times = [0.3, 0.05, 0.16, 0.05, 0.016]

// For mouse/hover elements (.Ms)
times = [0.22, 0.05, 0.16, 0.05, 0.016]
```

### Line Animation (`Atext`, `Aline`)
```javascript
// Line animation timing
{
  duration: 0.6,
  stagger: 0.1,
  yPercent: 50 → 0,
  opacity: 0 → 1,
  ease: 'power4.inOut'
}
```

### Fake Character System
- **Purpose**: Creates typewriter/glitch effect
- **Characters**: `##·$%&/=€|()@+09*+]}{[`
- **Behavior**: Random characters appear before real character
- **Timing**: Controlled by `times` array indices 2-4

## Intersection Observer Configuration

### Thresholds
```javascript
// Desktop and mobile
threshold: [0, 1]
```

### Root Margin
```javascript
root: null  // Viewport
```

### Animation Triggers
1. **Entry**: Element enters viewport
2. **Class Addition**: `inview` class added
3. **Animation Start**: `stview` class added
4. **Event Dispatch**: Custom animation event fired
5. **Animation Complete**: `ivi` class added

## Exit Animations

### Character Exit (`Awrite`)
```javascript
// Reverse order animation
{
  duration: 0.12,    // Fake character fade in
  stagger: 0.04,     // Between characters
  opacity: 0,        // Character fade out
  final_fade: 0.4    // Parent fade duration
}
```

### Line Exit (`Atext`, `Aline`)
```javascript
// Reverse order animation
{
  duration: 0.2,     // Line fade out
  stagger: 0.04,     // Between lines
  final_fade: 0.4    // Parent fade duration
}
```

## Performance Considerations

### Animation Optimization
- **RAF**: RequestAnimationFrame for smooth animations
- **GSAP**: Hardware acceleration enabled
- **Cleanup**: Proper timeline disposal
- **Memory**: Event listener cleanup

### Mobile Adaptations
- **Touch Detection**: Simplified animations on touch devices
- **Reduced Motion**: Respect user preferences
- **Performance**: Optimized for mobile performance

## React/Framer Motion Migration Notes

### Key Mapping for Migration
```javascript
// GSAP → Framer Motion equivalents
{
  'power4.inOut': [0.25, 0.1, 0.25, 1],
  opacity: 'opacity',
  yPercent: 'y', // Convert to pixels
  scaleX: 'scaleX',
  duration: 'duration'
}
```

### Animation Variants
```javascript
// Character animation variant
const charVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      delay: i * 0.05,
      ease: [0.25, 0.1, 0.25, 1]
    }
  })
}

// Line animation variant
const lineVariants = {
  hidden: { opacity: 0, y: '50%' },
  visible: (i) => ({
    opacity: 1,
    y: '0%',
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: [0.25, 0.1, 0.25, 1]
    }
  })
}
```

### Intersection Observer Replacement
```javascript
// Use Framer Motion's useInView hook
const { ref, inView } = useInView({
  threshold: 0,
  triggerOnce: false
})
```

## Critical Animation Classnames for Migration

### Essential Classes to Preserve
- `.Awrite` - Character animation
- `.Atext` - Line animation  
- `.Aline` - Simple line animation
- `.Awrite-inv` - Inverse animation
- `.Atitle` - Title animation with WebGL
- `.Ms` - Mouse/hover animation
- `.MW` - Mouse/hover with WebGL effects

### Hero Section Classes
- `.cnt_tt` - Main title
- `.cnt_bt` - Subtitle
- `.cnt_sc` - Section content
- `.cnt_lk` - Links

### Projects Section Classes
- `.home_prjs` - Projects section container
- `.cnt_prj` - Individual project item
- `.cnt_prj_im` - Project image container
- `.cnt_prj_t` - Project title container

### About Section Classes
- `.home_about` - About section container
- `.cnt_tp` - About titles container
- `.cnt_x` - About content container
- `.cnt_bp` - About bottom content

### Footer Classes
- `.footer` - Footer container
- `.footer_cm` - Footer main content
- `.cnt_lk` - Footer links container
- `.cnt_lk_el` - Individual footer link

### Navigation Classes
- `.nav_logo` - Navigation logo
- `.nav_right` - Navigation right section
- `.nav_clock` - Navigation clock
- `.nav_clock_p` - Clock location
- `.nav_clock_h` - Clock hours
- `.nav_clock_m` - Clock minutes
- `.nav_clock_a` - Clock AM/PM

### WebGL Integration Classes
- `.Oi` - WebGL element marker
- `.Oi-bg` - Background WebGL element
- `.Oi-tt` - Title WebGL element
- `.Oiel` - WebGL element container
- `.cCover` - WebGL cover element

### Animation State Classes
- `.inview` - Element in viewport
- `.stview` - Animation started
- `.ivi` - Animation complete
- `.okF` - Ready for loop

### Intersection Observer Classes
- `.iO` - Intersection observer trigger
- `.iO-std` - Standard intersection observer

### Critical Data Attributes
- `data-params` - Animation timing parameters (e.g., "1.3" for 1.3s delay)
- `data-io` - Intersection observer ID
- `data-delay` - Element delay timing
- `data-temp` - WebGL template type ("bg", "tt", "foot", "loader")
- `data-bucle` - Loop animation flag
- `data-clean` - Clean animation parameters
- `data-white` - White theme flag for WebGL
- `data-nome` - WebGL name identifier
- `data-w` - WebGL width parameter
- `data-s` - WebGL scale parameter
- `data-l` - WebGL letter spacing
- `data-m` - WebGL margin parameter
- `data-text` - WebGL text content
- `data-foot` - Footer WebGL flag
- `data-length` - WebGL text length
- `data-type` - Navigation link type
- `data-tt` - Tooltip text
- `data-auto` - Auto-play flag for videos
- `data-src` - Video/image source for lazy loading

## WebGL Components & Synchronization

### Background Component (🏜️ - "bg")
- **Purpose**: Animated background gradients and particles
- **Timing**: Activated after loader (2600ms)
- **Shader**: Fragment shader with time-based animations
- **Uniforms**:
  - `uTime`: Animation time
  - `uStart1`, `uStart0`, `uStart2`: Animation triggers
  - `uStartX`, `uStartY`: Position offsets
  - `uMultiX`, `uMultiY`: Animation multipliers
  - `uResolution`: Canvas resolution

### Title Component (🧮 - "tt")
- **Purpose**: Text WebGL effects for main titles
- **Timing**: Synchronized with text animations
- **Features**: 
  - Texture-based text rendering
  - Particle effects on text
  - Hover interactions
  - Smooth transitions

### Footer Component (🧮 - "foot")
- **Purpose**: WebGL effects for footer section
- **Timing**: Activated with footer animations (10000ms)
- **Features**:
  - Background animations
  - Text glow effects
  - Interactive elements

### Loader Component (⌛️ - "loader")
- **Purpose**: Loading screen WebGL effects
- **Timing**: 0-2600ms
- **Features**:
  - Progress animations
  - Particle systems
  - Smooth transitions to main content

### Animation Integration Points
```javascript
// WebGL components coordinate with DOM animations
const webglTiming = {
  bg: {
    start: 2600,      // After loader
    active: 'continuous'
  },
  tt: {
    start: 3000,      // With hero text
    trigger: 'intersection'
  },
  foot: {
    start: 10000,     // With footer
    trigger: 'intersection'
  },
  loader: {
    start: 0,         // Page load
    end: 2600
  }
}
```

## WebGL Integration Points

### Timeline Coordination
- **GL Loader**: Coordinates with main loader
- **Canvas Resize**: Responds to viewport changes
- **Performance**: Pauses during intensive animations

### Animation Synchronization
- **Shared Timeline**: WebGL animations sync with DOM
- **Event System**: Custom events coordinate GL and DOM
- **State Management**: Shared animation state

## Complete Animation Timeline Overview

### Full Page Animation Sequence (0-12000ms)
```
0ms:      Loader starts (WebGL loader component)
260ms:    GL context creation
800ms:    Loader progress animation
1200ms:   WebGL textures loading
2600ms:   Loader complete, fade out
          Background WebGL component activates

2600ms:   Navigation container fade in
2700ms:   Logo "EVASANCHEZ" character animation
2800ms:   Navigation clock animation
3000ms:   Navigation fully visible

3000ms:   Hero main title animation (.cnt_tt)
3200ms:   Title WebGL effects activate
3500ms:   Hero subtitle animation (.cnt_bt)
4000ms:   Hero content animation (.cnt_sc)
4500ms:   Hero links animation (.cnt_lk)

6000ms:   Projects section animation (.home_prjs)
6100ms:   "Featured works" title animation
6500ms:   Project items animation (staggered)
7000ms:   Projects WebGL effects
8000ms:   Projects animation complete

8000ms:   About section animation (.home_about)
8100ms:   About titles animation ("Interactive Designer,")
8200ms:   About second title ("also Speaker & Teacher")
8500ms:   About content lines animation
8600ms:   About WebGL background effects
10000ms:  About section complete

10000ms:  Footer animation (.footer)
10100ms:  Footer WebGL component activates
10200ms:  "Get in touch" title animation
10500ms:  Footer social links animation
11000ms:  Footer links WebGL effects
12000ms:  Complete page animation finished
```

### WebGL Component Lifecycle
```
Loader (0-2600ms):     Progress animations, particle effects
Background (2600ms+):  Continuous gradient/particle background
Title (3000ms+):       Text effects, hover interactions
Footer (10000ms+):     Background animations, glow effects
```

### Intersection Observer IDs
```
data-io="1":  Hero main title
data-io="2":  Hero subtitle  
data-io="3":  Hero content
data-io="4":  Hero links
data-io="5":  Projects section
data-io="6":  Projects title
data-io="7":  First project
data-io="8":  Second project
data-io="9":  Third project
data-io="10": About section
data-io="11": About content
data-io="12": Footer Instagram
data-io="13": Footer Savee
data-io="14": Footer LinkedIn
data-io="15": Footer Dribbble
data-io="16": Footer Read.cv
data-io="17": Footer Behance
```

## Testing & Validation

### Animation Checklist
- [ ] Loader sequence timing (0-2600ms)
- [ ] Navigation appearance (2600-3000ms)
- [ ] Hero title animation (3000-4500ms)
- [ ] Projects section animation (6000-8000ms)
- [ ] About section animation (8000-10000ms)
- [ ] Footer animation (10000-12000ms)
- [ ] WebGL component synchronization
- [ ] Text splitting accuracy
- [ ] Intersection observer triggers
- [ ] Exit animations
- [ ] Mobile performance
- [ ] Accessibility compliance

### Performance Metrics
- **FPS**: Maintain 60fps during animations
- **Memory**: No memory leaks from timelines
- **CPU**: Efficient animation calculations
- **Battery**: Optimized for mobile devices
- **WebGL**: Proper context management and cleanup

---

*This documentation serves as the definitive guide for implementing the Eva Sanchez portfolio animations in React/Framer Motion. All timings and sequences have been extracted from the original WordPress theme codebase.*
