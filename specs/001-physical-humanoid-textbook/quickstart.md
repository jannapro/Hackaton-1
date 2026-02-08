# Quickstart: Physical Humanoid Robots Textbook

**Feature**: `001-physical-humanoid-textbook`
**Date**: 2026-01-21
**Purpose**: Step-by-step guide to set up the textbook development environment

---

## Prerequisites

Before starting, ensure you have:

- [ ] Git installed
- [ ] Node.js 18+ and npm/yarn
- [ ] Text editor (VS Code recommended)
- [ ] GitHub account with repository access

---

## 1. Clone the Repository

```bash
git clone https://github.com/[ORG]/physical-humanoid-robots-textbook.git
cd physical-humanoid-robots-textbook
```

---

## 2. Install Dependencies

```bash
npm install
```

This installs:
- Docusaurus 3.x
- MDX support
- Custom component dependencies

---

## 3. Start Development Server

```bash
npm run start
```

The textbook will be available at `http://localhost:3000`.

**Hot reload**: Changes to MDX files appear immediately.

---

## 4. Project Structure Overview

```text
physical-humanoid-robots-textbook/
├── docs/                          # Chapter content (MDX)
│   ├── intro.mdx                  # Book introduction
│   └── 01-physical-ai-foundations/
│       ├── index.mdx              # Chapter content
│       ├── _category_.json        # Docusaurus config
│       └── assets/                # Images, diagrams
├── src/
│   └── components/                # Custom React components
│       ├── CodePlayground.tsx
│       ├── Quiz.tsx
│       └── CollapsibleSection.tsx
├── static/                        # Static assets
├── specs/                         # Spec-Kit Plus artifacts
├── docusaurus.config.ts           # Site configuration
└── sidebars.ts                    # Navigation
```

---

## 5. Author a New Chapter

### Step 1: Create Chapter Directory

```bash
mkdir -p docs/0X-chapter-name/assets
```

### Step 2: Create Category Config

Create `docs/0X-chapter-name/_category_.json`:

```json
{
  "label": "X. Chapter Title",
  "position": X,
  "link": {
    "type": "generated-index",
    "description": "Brief chapter description"
  }
}
```

### Step 3: Create Chapter Content

Copy the template:

```bash
cp specs/001-physical-humanoid-textbook/contracts/chapter-template.mdx \
   docs/0X-chapter-name/index.mdx
```

Fill in the placeholders following the constitution requirements:
- Learning objectives (3-5)
- Architecture diagram
- Code examples (rclpy, ROS 2)
- Failure modes (3-5)
- Hardware requirements

### Step 4: Validate Chapter

Run build to check for errors:

```bash
npm run build
```

---

## 6. Build for Production

```bash
npm run build
```

Output is in `build/` directory, ready for deployment.

---

## 7. Deploy

### GitHub Pages

```bash
GIT_USER=<your-username> npm run deploy
```

### Vercel

Connect repository to Vercel dashboard. Automatic deployments on push.

---

## 8. Content Guidelines Quick Reference

| Requirement | Target |
|-------------|--------|
| Word count per chapter | 4,000-6,000 words |
| Learning objectives | 3-5 per chapter |
| Token count per section | 500-1,000 tokens |
| Code examples | ROS 2 Humble/Iron, rclpy only |
| Humanoid model | Unitree H1 |
| Simulation | Gazebo Harmonic or Isaac Sim |

---

## Common Commands

| Command | Description |
|---------|-------------|
| `npm run start` | Start dev server |
| `npm run build` | Production build |
| `npm run serve` | Serve production build locally |
| `npm run deploy` | Deploy to GitHub Pages |
| `npm run clear` | Clear cache |

---

## Troubleshooting

### Build fails with MDX error

Check for:
- Unclosed JSX tags
- Invalid frontmatter YAML
- Missing closing code fences

### Images not loading

Ensure:
- Images are in `docs/0X-chapter/assets/`
- Paths use `./assets/filename.png` (relative)
- File extensions match exactly (case-sensitive)

### Components not rendering

Verify import at top of MDX file:
```jsx
import { Quiz, CodePlayground } from '@site/src/components';
```

---

## Next Steps

1. Run `/sp.tasks` to generate chapter authoring tasks
2. Begin with Chapter 1 (P1 priority)
3. Query Context7 MCP for curriculum alignment before authoring
4. Commit each chapter via GitHub MCP
