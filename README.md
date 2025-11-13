# QUANTUM TERMINAL // PORTFOLIO

A retro-futuristic portfolio website with a vintage tech aesthetic inspired by iPod Classic, ThinkPad, and Matrix vibes. Built for quantitative researchers and developers who appreciate *sophistication in chaos*.

## 🎨 Aesthetic Features

- **Matrix Rain Background**: Animated falling characters in classic green
- **CRT Monitor Effects**: Scanlines and subtle screen flicker for that vintage feel
- **Retro UI**: iPod-inspired navigation with ThinkPad window styling
- **Emo Edge**: Pink spike accents (`#ff0055`) cutting through the matrix green
- **Glitch Effects**: Subtle glitch animation on title text
- **Terminal Vibes**: Full-featured command-line interface

## ⚡ Key Features

### 1. **Navigation System**
- Five main sections: HOME, PAPERS, CODE, LINALG, TERMINAL
- Smooth transitions with fade-in animations
- Sticky header with glowing effects

### 2. **Research Papers Section**
Display your academic work with:
- Paper title, metadata, and descriptions
- Organized layout with hover effects
- Easy to add more papers (just edit the HTML)

### 3. **Code Repositories**
Showcase your GitHub projects with:
- Repository name, language tags, and descriptions
- Star/fork counts
- Hover animations with glowing borders

### 4. **Linear Algebra Calculator**
Three powerful calculators:

**Matrix Operations:**
- Addition, Subtraction, Multiplication
- Transpose, Determinant, Inverse
- Supports any size matrices

**Vector Operations:**
- Addition, Subtraction, Dot Product
- Cross Product (3D vectors)
- Magnitude and Normalization

**Eigenvalue Calculator:**
- Eigenvalue computation for 2x2 matrices
- Supports complex eigenvalues

### 5. **Terminal Interface**
A fully functional terminal with these commands:

```bash
help          # Show all commands
clear         # Clear terminal
ls            # List visible files
ls -a         # List ALL files (including hidden)
cat [file]    # Read file contents
whoami        # Display user info
date          # Show current date/time
matrix        # Toggle matrix rain background
calc          # Open linear algebra calculator
papers        # Navigate to papers section
repos         # Navigate to repos section
hack          # Try it and see...
konami        # Easter egg
fortune       # Random quote
```

### 6. **Hidden File System**
Easter eggs hidden throughout! Use `ls -a` in the terminal to discover:
- `.secret` - The matrix has you
- `.easter_egg_1` - Sophistication in chaos
- `.konami` - Classic code
- `.quant_wisdom` - Data-driven insights
- `.matrix_wisdom` - No spoon philosophy
- `.hidden_message` - Kung fu meets calculus

## 🎯 Customization Guide

### Adding Your Papers
Edit `index.html` in the papers section (~line 89):

```html
<div class="paper-item">
    <div class="paper-icon">📄</div>
    <div class="paper-info">
        <h3>Your Paper Title</h3>
        <p class="paper-meta">2024 | Journal Name</p>
        <p class="paper-desc">Brief description</p>
        <a href="link-to-paper.pdf" class="paper-link">[VIEW PAPER]</a>
    </div>
</div>
```

### Adding Your Repositories
Edit `index.html` in the repos section (~line 126):

```html
<div class="repo-item">
    <div class="repo-header">
        <span class="repo-icon">📦</span>
        <h3>repo-name</h3>
        <span class="repo-lang">Language</span>
    </div>
    <p class="repo-desc">Description of your project</p>
    <div class="repo-stats">
        <span>⭐ stars</span>
        <span>🔀 forks</span>
        <a href="github-url" class="repo-link">[GITHUB]</a>
    </div>
</div>
```

### Adding Hidden Files
Edit `app.js` in the fileSystem object (~line 74):

```javascript
'.your_secret': '🎁 Your secret message here',
```

### Color Customization
Edit CSS variables in `styles.css` (~line 6):

```css
:root {
    --matrix-green: #00ff41;      /* Main green color */
    --spike-accent: #ff0055;      /* Pink accent */
    --warning-orange: #ff9500;    /* Orange highlights */
}
```

## 🚀 Usage

1. Open `index.html` in your browser
2. Navigate using the top menu buttons
3. Try the terminal commands
4. Use `ls -a` to find hidden files
5. Calculate some linear algebra
6. Add your own content

## 💻 Technical Stack

- **Pure HTML5/CSS3/JavaScript** - No frameworks needed
- **Canvas API** - For matrix rain animation
- **CSS Animations** - Glitch effects, CRT scanlines
- **Custom Terminal** - With command history (↑/↓ arrows)
- **Mathematical Functions** - Matrix operations, eigenvalues

## 🎮 Easter Eggs

Hidden secrets throughout the site:
1. Type `ls -a` in terminal to see hidden files
2. Try the `hack` command
3. Use `konami` command for a surprise
4. Check out `fortune` for random quotes
5. More secrets in hidden files...

## 📱 Responsive Design

- Desktop-optimized but mobile-friendly
- Flexible layouts that adapt to screen size
- Touch-friendly navigation

## 🎨 Design Philosophy

**"Sophistication in Chaos"**

This design blends the precision of quantitative finance with the raw energy of retro computing. The matrix aesthetic represents data flowing through systems, while the sharp pink accents add an edge - because being a quant doesn't mean being boring.

- **Vintage Tech**: iPod click wheel navigation, ThinkPad window frames
- **Matrix Vibes**: Green on black, falling code, terminal commands
- **Emo Edge**: Pink spikes cutting through the green monotony
- **Professional Chaos**: Serious mathematics wrapped in rebellious design

## 🔧 Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari
- Any modern browser with Canvas support

## 📝 License

Feel free to use, modify, and distribute. Make it your own.

---

**Built with sophistication in chaos.**

*Type `help` in the terminal to begin your journey.*
