# Advanced DOM Manipulation Project

A comprehensive JavaScript project demonstrating advanced DOM manipulation techniques and modern web development practices. This project is part of a JavaScript Udemy course and showcases realistic, production-ready functionality.

---

## 📋 Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Features in Detail](#features-in-detail)
- [Technologies Used](#technologies-used)
- [Key Concepts](#key-concepts)
- [Code Highlights](#code-highlights)

---

## ✨ Features

### 1. **Modal Window**
- Open/close modal dialogs
- Click overlay to close
- Close button functionality
- ESC key support to dismiss modal

### 2. **Cookie Consent Banner**
- Animated cookie message display
- Dismiss button to remove banner
- Dynamic element creation and manipulation

### 3. **Smooth Scrolling**
- "Learn More" button scrolls to section
- Navigation links scroll to target sections
- Uses modern `scrollIntoView()` API

### 4. **Navigation System**
- Sticky navbar that appears on scroll
- Event delegation for efficient link handling
- Smooth navigation between sections
- Intersection Observer API for sticky behavior

### 5. **Tab Component**
- Tabbed interface with multiple content sections
- Active tab highlighting
- Dynamic content switching
- Using dataset attributes for tab management

### 6. **Menu Fade Animation**
- Hover effects on navigation links
- Sibling elements fade out on hover
- Logo opacity changes with navigation
- Uses `.bind()` for context binding

### 7. **Reveal Sections on Scroll**
- Sections reveal with animation as user scrolls
- Intersection Observer API for performance
- 15% threshold for trigger
- Automatic unobserve after reveal

### 8. **Lazy Loading Images**
- Images load only when approaching viewport
- Uses `data-src` attribute for image URLs
- 200px rootMargin for preloading
- Smooth fade-in effect on load

### 9. **Image Slider**
- Navigation buttons (Previous/Next)
- Keyboard controls (Arrow keys)
- Dot indicators for slide navigation
- Circular navigation (loops around)

### 10. **Advanced Event Handling**
- Event propagation (bubbling, capturing)
- Event delegation for performance
- Custom event listeners
- Event listener removal with timeouts

### 11. **DOM Traversal**
- Parent/Child navigation
- Sibling selection
- Query selectors and collecting elements
- Direct property access vs. getAttribute()

---

## 🗂️ Project Structure

```
Advance Dom/
├── index.html          # Main HTML file
├── script.js           # JavaScript logic (main file)
├── style.css           # Styling and animations
├── prettierrc.txt      # Code formatter configuration
├── img/                # Image assets folder
└── README.md           # This file
```

---

## 🚀 Installation

1. **Clone or download the project**
   ```bash
   cd "Advance Dom"
   ```

2. **Open in browser**
   - Simply open `index.html` in your web browser
   - No build tools or npm installation required

3. **Optional: Use a live server**
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js http-server
   npx http-server
   ```

---

## 💻 Usage

### Basic Interaction
1. **Modal Window**: Click "Open Account" button to open the modal
2. **Navigation**: Use links in navbar to scroll to different sections
3. **Tabs**: Click operation tabs to switch between content
4. **Slider**: Use arrow buttons or keyboard arrows to navigate slides
5. **Scroll**: Scroll down to see sections reveal and images lazy load

### Keyboard Shortcuts
- `ESC` - Close modal
- `←` / `→` - Navigate slider

---

## 📚 Features in Detail

### Modal Window Implementation
```javascript
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
```

### Intersection Observer API (Sticky Navigation)
```javascript
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const observerOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
};
```

### Reveal Sections
```javascript
const revealSection = function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  });
};
```

### Event Delegation Pattern
```javascript
document.querySelector('.nav__links').addEventListener('click', function (e) {
  if (e.target.classList.contains('nav__link')) {
    e.preventDefault();
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
```

### Lazy Loading Images
```javascript
const loading = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  
  entry.target.setAttribute('src', entry.target.dataset.src);
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  
  observer.unobserve(entry.target);
};
```

---

## 🛠️ Technologies Used

| Technology | Purpose |
|-----------|---------|
| **HTML5** | Semantic structure |
| **CSS3** | Styling and animations |
| **Vanilla JavaScript** | All interactive functionality |
| **Intersection Observer API** | Performance-optimized scrolling |
| **Event Delegation** | Efficient event handling |
| **DOM API** | DOM manipulation and traversal |

---

## 🧠 Key Concepts Demonstrated

### 1. **Event Handling**
- Event listeners and callbacks
- Event propagation (bubbling and capturing)
- Event delegation for optimal performance
- Preventing default behavior with `preventDefault()`

### 2. **Modern JavaScript APIs**
- **Intersection Observer** - Detect when elements enter/exit viewport
- **getBoundingClientRect()** - Get element dimensions and position
- **Dataset attributes** - Store custom data on HTML elements
- **classList API** - Manipulate CSS classes efficiently

### 3. **DOM Traversal**
- Parent/child relationships
- Sibling navigation
- Query selectors for precise targeting
- Node lists vs HTML collections

### 4. **Performance Optimization**
- Lazy loading images
- Intersection Observer (vs. scroll listeners)
- Event delegation (single listener vs. multiple)
- Unobserving after action completed

### 5. **Function Binding**
- `.bind()` for context preservation
- Arrow functions vs. regular functions
- Callbacks and closures

---

## 🎯 Code Highlights

### Smooth Scrolling
```javascript
section1.scrollIntoView({ behavior: 'smooth' });
```

### Tab Switching with Dataset
```javascript
document.querySelector(`.operations__content--${clicked.dataset.tab}`)
  .classList.add('operations__content--active');
```

### Menu Hover Animation with Bind
```javascript
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));
```

### Slider Navigation
```javascript
const goToSlide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${(i - slide) * 100}%)`;
  });
};
```

---

## 🎓 Learning Outcomes

By studying this project, you'll learn:

✅ Advanced DOM manipulation techniques  
✅ Event handling and delegation patterns  
✅ Modern Intersection Observer API  
✅ Performance optimization strategies  
✅ Real-world UI component implementation  
✅ JavaScript animation techniques  
✅ CSS class manipulation with classList  
✅ Event propagation and stopping  
✅ Data attributes and custom datasets  
✅ Professional coding practices  

---

## 📝 Notes

- The project uses **Prettier** for code formatting (see `prettierrc.txt`)
- All functionality is vanilla JavaScript (no frameworks)
- Fully responsive and works on all modern browsers
- Performance-optimized using Intersection Observer API

---

## 🔗 Related Projects

This workspace includes:
- `Bank_Array/` - Array manipulation project
- `Udemy_Course/` - Basic JavaScript concepts course files

---

## 📄 License

Educational project from Udemy JavaScript course.

---

## 💡 Tips for Developers

1. **Debugging**: Open DevTools Console (F12) to see console logs
2. **Experimenting**: Try modifying threshold values in Intersection Observer
3. **Performance**: Check DevTools Performance tab to see lazy loading in action
4. **Practice**: Modify animations or add new features like dark mode
5. **Keyboard Shortcuts**: ESC to close modal, arrows for slider

---

**Happy Learning! 🚀**
