# Legacy Theory & Mathematics Assessment Paper Viewer

An enterprise-grade, lightweight web application for rendering AI-evaluated student answer sheets, multiple-choice questions (MCQs), rubrics, step-by-step mark allocations, and LaTeX mathematical expressions (via KaTeX). Designed for high performance, modularity, and seamless PDF exporting.

---

## 📁 Repository Folder & File Structure

```
legacy-theory-paper-viewer/
├── CNAME                         # Custom domain configuration for GitHub Pages
├── logo_g.png                    # Gradified brand logo asset
├── index.html                    # Theory Assessment Viewer HTML entrypoint
├── README.md                     # Project architecture & structure documentation
│
├── js/                           # Theory Viewer Modular JavaScript Engine (< 200 lines/file)
│   ├── demo-data.js              # Default fallback evaluation sample dataset
│   ├── formatters.js            # HTML escaping, string formatters & toast feedback
│   └── pdf-exporter.js          # High-fidelity PDF exporter with strict .pdf filename suffix
│
├── math/                         # Mathematics Assessment Viewer Module
│   ├── index.html                # Math Assessment Viewer HTML template
│   └── js/                       # Modular Mathematics Engine (< 200 lines/file)
│       ├── demo-data.js          # Sample 14-question Math evaluation dataset
│       ├── formatters.js        # KaTeX math auto-wrapper & HTML escaping utilities
│       ├── normalizer.js        # Flexible JSON schema parser & evaluation data builder
│       ├── components.js        # SVG score dial, rubric bars, MCQ grid & question cards
│       ├── pdf-exporter.js      # PDF exporter with strict .pdf extension guarantee
│       ├── storage-modal.js     # Drag-and-drop file upload, JSON modal & LocalStorage
│       ├── api-loader.js        # Remote REST API loader & URL parameter decoder
│       └── app.js               # Application state controller & main entrypoint
│
└── .agents/
    └── skills/
        └── clean-code/          # Uncle Bob's Clean Code principles skill definition
            └── SKILL.md
```

---

## 🏗️ Architectural Guidelines & Clean Code Practices

This repository strictly adheres to **Clean Code** principles by Robert C. Martin (Uncle Bob):

- **Single Responsibility Principle (SRP)**: Each JavaScript module performs exactly one feature-based task.
- **Strict File Size Limits**: No JavaScript file exceeds **200 lines** of code.
- **No Noise Comments**: Avoided artificial section banners (`/* ==== */` or `// ----`). Used clean, descriptive JSDoc multiline block comments (`/** ... */`).
- **Strict PDF Naming**: PDF exports dynamically synchronize `document.title` and `.save(filename)` to guarantee that downloaded files always end in `.pdf`.
- **LaTeX Math Rendering**: Integrated with KaTeX for fast client-side rendering of formulas like `\frac{a}{b}`, `\sqrt{x}`, and algebraic expressions.

---

## 🚀 How to Run Locally

1. Clone or download the repository.
2. Serve using any standard static HTTP web server:
   ```bash
   python -m http.server 8000
   ```
3. Open in your browser:
   - **Theory Report Viewer**: `http://localhost:8000/index.html`
   - **Mathematics Report Viewer**: `http://localhost:8000/math/index.html`

---

## ⚙️ URL Parameter Options

- `?id=<UUID>`: Fetches evaluation report from remote API (`https://api.gradified.in/api/v1/report/<UUID>`).
- `?b64=<BASE64>`: Renders report directly from a Base64-encoded JSON payload.
- `#<UUID>`: Direct hash-based report loading for single-page applications.

---

*Powered by Gradified Engineering Team.*
