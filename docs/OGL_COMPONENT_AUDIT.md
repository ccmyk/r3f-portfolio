# OGL Component Audit - Eva Sánchez Website

**Date:** July 2, 2025  
**Total Components Found:** 81 across 4 pages  
**Component Types:** 9 distinct WebGL components

---

## 🏠 **Homepage (`index.html`) - 11 Components**

### **Hero Section (`<section class="home_hero">`)**
- **💬 Text (tt)** - 2 instances:
  ```html
  <!-- Large animated hero text with special effects -->
  <div class="Oi Oi-tt" data-temp="tt" data-l="-0.022" data-m="5" data-text="Eva" data-oi="0"></div>
  <div class="Oi Oi-tt" data-temp="tt" data-l="-0.016" data-m="5" data-text="Sánchez" data-oi="1"></div>
  ```
  **Notable:** Unique `data-m="5"` (larger size) for hero text, dynamic letter spacing

### **Featured Works Section (`<section class="home_prjs">`)**  
- **💬 Text (tt)** - 1 instance:
  ```html
  <!-- Standard section title -->
  <div class="Oi Oi-tt" data-nome="1" data-temp="tt" data-w="33" data-s=".29" data-l="-.024" data-m="3.8" data-text="Featured works"></div>
  ```
  **Notable:** Additional attributes `data-nome="1"`, `data-w="33"`, `data-s=".29"`

### **Project Previews**
- **🖼️ Media (default)** - 3 instances:
  ```html
  <!-- Video: Banjo project cover -->
  <div class="Oi" data-src="https://evasanchez.info/wp-content/uploads/2023/11/02_eva_sanchez_banjo_cover_soundscape_website.mp4"></div>
  
  <!-- Image: Ciclope Fest cover -->
  <div class="Oi" data-src="https://evasanchez.info/wp-content/uploads/2024/01/02.2_eva_sanchez_ciclope_fest_cover_website.jpg"></div>
  
  <!-- Video: Kids Agency cover -->
  <div class="Oi" data-src="https://evasanchez.info/wp-content/uploads/2023/12/00_eva_sanchez_kids_agency_cover_website.mp4"></div>
  ```
  **Notable:** Main project preview media with WebGL effects

### **About Section (`<section class="home_about">`)**
- **🏜️ Background (bg)** - 1 instance:
  ```html
  <!-- Animated background transition element -->
  <div class="Oi Oi-bg" data-temp="bg"></div>
  ```
  **Notable:** Only page with this component, creates scroll-triggered background transitions

- **💬 Text (tt)** - 2 instances:
  ```html
  <!-- White text for dark background -->
  <div class="Oi Oi-tt" data-nome="1" data-white="1" data-temp="tt" data-l="-.024" data-m="3.8" data-text="Interactive Designer,"></div>
  <div class="Oi Oi-tt" data-nome="1" data-white="1" data-temp="tt" data-l="-.032" data-m="3.8" data-text="also Speaker &amp; Teacher"></div>
  ```
  **Notable:** Both have `data-white="1"` for white text on dark background

- **🖼️ Media (default)** - 1 instance:
  ```html
  <!-- About section portrait image -->
  <div class="Oi" data-src="https://evasanchez.info/wp-content/uploads/2024/01/00_eva_sanchez_abou_home_website-1366x2049.jpg"></div>
  ```

### **Footer (`<footer class="footer">`)**
- **🔥 Footer Text (foot)** - 1 instance:
  ```html
  <!-- Special footer animation with post-processing effects -->
  <div class="Oi Oi-tt" data-temp="foot" data-foot="1" data-white="1" data-length="3" data-w="6" data-l="-0.022" data-m="5.4" data-text="Get in touch"></div>
  ```
  **Notable:** Special footer variant with `data-foot="1"`, `data-length="3"`, `data-w="6"`

---

## 📁 **Projects/Index Page (`index/index.html`) - 12 Components**

### **Header (`<div class="cnt_tp c-vw">`)**
- **💬 Text (tt)** - 2 instances:
  ```html
  <!-- Page title split into two parts -->
  <div class="Oi Oi-tt" data-nome="1" data-temp="tt" data-l="-.024" data-m="3.8" data-text="Index of" data-oi="0"></div>
  <div class="Oi Oi-tt" data-nome="1" data-temp="tt" data-l="-.024" data-m="3.8" data-text="work" data-oi="1"></div>
  ```
  **Notable:** Standard section titles with `data-nome="1"`

### **Main Content (`<div class="cnt_els">`)**
- **🎢 Roll (roll)** - 1 instance:
  ```html
  <!-- Horizontal scrolling media gallery -->
  <div class="Oi Oi-roll" data-temp="roll" data-oi="2"></div>
  ```
  **Notable:** Unique to this page, creates horizontal media scroll

- **🎞️ Slider (slider)** - 8 instances:
  ```html
  <!-- Individual project galleries -->
  <div class="Oi" data-temp="slider" data-ids="0" data-oi="3"></div>
  <div class="Oi" data-temp="slider" data-ids="1" data-oi="4"></div>
  <div class="Oi" data-temp="slider" data-ids="2" data-oi="5"></div>
  <div class="Oi" data-temp="slider" data-ids="3" data-oi="6"></div>
  <div class="Oi" data-temp="slider" data-ids="4" data-oi="7"></div>
  <div class="Oi" data-temp="slider" data-ids="5" data-oi="8"></div>
  <div class="Oi" data-temp="slider" data-ids="6" data-oi="9"></div>
  <div class="Oi" data-temp="slider" data-ids="7" data-oi="10"></div>
  ```
  **Notable:** Each represents a different project's media carousel with `data-ids` indexing

### **Archive Section (`<section class="projects_arc">`)**
- **💬 Text (tt)** - 1 instance:
  ```html
  <!-- Archive section title -->
  <div class="Oi Oi-tt" data-nome="1" data-temp="tt" data-l="-.025" data-m="3.8" data-text="Archive" data-oi="11"></div>
  ```

### **Footer**  
- **🔥 Footer Text (foot)** - 1 instance:
  ```html
  <!-- Same footer as homepage -->
  <div class="Oi Oi-tt" data-temp="foot" data-foot="1" data-length="3" data-w="6" data-l="-0.022" data-m="5.4" data-text="Get in touch" data-oi="12"></div>
  ```

---

## 🎮 **Playground Page (`playground/index.html`) - 55 Components**

### **Header**
- **💬 Text (tt)** - 1 instance:
  ```html
  <!-- Page title -->
  <div class="Oi Oi-tt" data-temp="tt" data-l="-0.0196" data-m="5" data-text="Playground" data-oi="0"></div>
  ```

### **Main Gallery System**
- **🧮 Playground (pg)** - 1 instance:
  ```html
  <!-- Main WebGL playground controller -->
  <div class="Oi Oi-pg" data-temp="pg" data-oi="1"></div>
  ```
  **Notable:** Unique interactive canvas system that controls all gallery elements

- **🧮 Playground Elements (pgel)** - 52 instances:
  ```html
  <!-- Individual gallery items (showing first few examples) -->
  <div class="Oi Oi-pgel" data-temp="pgel" data-pg="0" data-oi="1"></div>
  <div class="Oi Oi-pgel" data-temp="pgel" data-pg="1" data-oi="1"></div>
  <div class="Oi Oi-pgel" data-temp="pgel" data-pg="2" data-oi="1"></div>
  <!-- ... continues to data-pg="51" -->
  <div class="Oi Oi-pgel" data-temp="pgel" data-pg="51" data-oi="1"></div>
  ```
  **Notable:** Each item is interactive and connects to the main `pg` controller via `data-pg` indexing

### **Footer**
- **🔥 Footer Text (foot)** - 1 instance:
  ```html
  <!-- Same footer as other pages -->
  <div class="Oi Oi-tt" data-temp="foot" data-foot="1" data-length="3" data-w="6" data-l="-0.022" data-m="5.4" data-text="Get in touch" data-oi="55"></div>
  ```

---

## 👤 **About Page (`about/index.html`) - 3 Components**

### **Main Content**
- **👩‍⚖️ About Text (about)** - 1 instance:
  ```html
  <!-- Special about text component with custom content -->
  <div class="Oi Oi-tt" data-temp="about" data-l="-.01" data-m=".8" data-oi="0"></div>
  ```
  **Notable:** Uses `data-temp="about"` with smaller size `data-m=".8"`, contains hardcoded bio text

- **🖼️ Media (default)** - 1 instance:
  ```html
  <!-- About page image with special class -->
  <div class="Oi act" data-src="https://evasanchez.info/wp-content/uploads/2024/01/00_eva_sanchez_about_website.jpg" data-oi="1"></div>
  ```
  **Notable:** Has additional `act` class alongside `Oi`

### **Footer**
- **🔥 Footer Text (foot)** - 1 instance:
  ```html
  <!-- Same footer as other pages -->
  <div class="Oi Oi-tt" data-temp="foot" data-foot="1" data-length="3" data-w="6" data-l="-0.022" data-m="5.4" data-text="Get in touch" data-oi="2"></div>
  ```

---

## 📊 **Component Usage Summary**

| Component | Emoji | Code Location | Usage Count | Pages Found | Purpose |
|-----------|-------|---------------|-------------|-------------|---------|
| **Text (tt)** | 💬 | `/💬/` | 7 total | All pages | Standard text rendering with WebGL effects |
| **Footer Text (foot)** | 🔥 | `/🔥/` | 4 total | All pages | Special footer text with post-processing |
| **Media (default)** | 🖼️ | `/🖼️/` | 5 total | Home, About | Image/video display with fractal effects |
| **Slider (slider)** | 🎞️ | `/🎞️/` | 8 total | Index only | Project media carousels |
| **Playground (pg)** | 🧮 | `/🧮/` | 1 total | Playground only | Main interactive canvas controller |
| **Playground Element (pgel)** | 🧮 | `/🧮/` | 52 total | Playground only | Individual gallery items |
| **Roll (roll)** | 🎢 | `/🎢/` | 1 total | Index only | Horizontal scrolling media |
| **Background (bg)** | 🏜️ | `/🏜️/` | 1 total | Home only | Animated background transitions |
| **About Text (about)** | 👩‍⚖️ | `/👩‍⚖️/` | 1 total | About only | Special bio text component |

---

## 🔍 **Key Technical Insights**

### **Component Triggering Logic**
Based on the `createEls` function in `/wp-content/themes/src/gl🌊🌊🌊/els.js`:

```javascript
const temp = el.dataset.temp || "base";

// Component routing logic:
if (temp == "tt" || temp == "foot" || temp == "about") {
    // Text-based components (💬🔥👩‍⚖️)
} else if (temp == "bg" || temp == "loader") {
    // Background components (🏜️⌛️)
} else if (temp == "roll") {
    // Roll component (🎢)
} else if (temp == "slider") {
    // Slider component (🎞️)
} else if (temp == "pg") {
    // Playground controller (🧮)
} else if (temp == "pgel") {
    // Playground elements (🧮)
} else {
    // Default media component (🖼️)
}
```

### **Text Component Variations**
The `tt` component has different behaviors based on context:

1. **Hero Text** (Homepage):
   - Large size: `data-m="5"`
   - Dynamic letter spacing
   - Advanced animation effects

2. **Section Titles** (Most pages):
   - Standard size: `data-m="3.8"`
   - `data-nome="1"` for specific styling
   - Static positioning

3. **Footer Text** (All pages):
   - Special `foot` variant: `data-temp="foot"`
   - Post-processing effects
   - Interactive hover states

### **Page-Specific Components**

1. **Homepage Unique**:
   - `🏜️ bg`: Only page with background transitions
   - Hero text animations with `data-m="5"`

2. **Index Page Unique**:
   - `🎢 roll`: Horizontal scrolling gallery
   - `🎞️ slider`: Multiple project carousels (8 instances)

3. **Playground Unique**:
   - `🧮 pg`/`pgel`: Interactive gallery system (53 total instances)
   - Largest component count on any page

4. **About Page Unique**:
   - `👩‍⚖️ about`: Special bio text with hardcoded content
   - Smallest component count (only 3 total)

### **Universal Patterns**
- All pages have footer `🔥 foot` component
- Most pages use standard `💬 tt` text components
- `🖼️` Media components only appear on Home and About pages
- Other pages use specialized gallery systems instead

### **Data Attribute Patterns**
- `data-oi`: Sequential indexing for component initialization order
- `data-temp`: Component type identifier
- `data-src`: Media URL for default components
- `data-pg`/`data-ids`: Index linking for gallery systems
- `data-white="1"`: White text for dark backgrounds
- `data-nome="1"`: Special styling flag
- `data-m`: Text size (5=hero, 3.8=standard, 0.8=small)

---

## 🎨 **WebGL Shader Mapping**

Each component uses specific GLSL shaders:

- **💬 tt**: `/💬/🧪msdf.glsl` (fragment) + `/💬/🩻msdf.glsl` (vertex)
- **🔥 foot**: `/🔥/🧪msdf.glsl` + `/🔥/🧪parent.glsl` (post-processing)
- **👩‍⚖️ about**: `/👩‍⚖️/🧪msdf.glsl` + `/👩‍⚖️/🧪parent.glsl`
- **🖼️ default**: `/🖼️/🧪main.glsl` + `/🖼️/🩻main.glsl`
- **🎞️ slider**: `/🎞️/🧪main.glsl` + `/🎞️/🩻main.glsl` + `/🎞️/🧪parent.glsl`
- **🎢 roll**: `/🎢/🧪single.glsl` + `/🎢/🩻single.glsl`
- **🏜️ bg**: `/🏜️/🧪main.glsl` + `/🏜️/🩻main.glsl`
- **🧮 pg**: `/🧮/🧪main.glsl` + `/🧮/🩻main.glsl`

---

*This audit was generated on July 2, 2025, by analyzing all HTML files and the WebGL component system in Eva Sánchez's portfolio website.*
