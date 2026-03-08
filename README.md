# VectorShift Pipeline Builder

A visual node-based pipeline builder built with React and FastAPI.

**Live Demo:** https://vectorshift-azure.vercel.app  
**Backend API:** https://vectorshift-1-smqx.onrender.com

---

## Tech Stack

- **Frontend:** React, ReactFlow, Zustand, Lucide React
- **Backend:** FastAPI, Python, Pydantic
- **Deployment:** Vercel (frontend), Render (backend)

---

## Assignment Implementation

### Part 1 — Node Abstraction
All nodes extend `BaseNode` (`frontend/src/nodes/BaseNode.js`), a reusable component that handles:
- Labeled input/output handles (left/right)
- Node header with icon and title
- Close button to delete node
- Consistent styling

**5 new nodes created using the abstraction:**
| Node | File | Purpose |
|------|------|---------|
| Aggregate | `aggregateNode.js` | Combines multiple inputs |
| Debug | `debugNode.js` | Inspect pipeline values |
| Transform | `transformNode.js` | Apply transformation logic |
| Filter | `filterNode.js` | Filter data by condition |
| Http | `apiNode.js` | Make HTTP API requests |

**Plus 2 bonus nodes:**
| Node | File | Purpose |
|------|------|---------|
| Note | `noteNode.js` | Sticky notes with color picker |
| Image | `imageNode.js` | Display images by URL |

### Part 2 — Styling
- Clean white card nodes with colored headers per node type
- Purple gradient toolbar with VS logo
- Light gray canvas with dot grid background
- Lucide React icons throughout
- Toggles for Animated/Deletable edges

### Part 3 — Text Node
The `TextNode` (`frontend/src/nodes/textNode.js`) has two advanced features:

1. **Dynamic resizing** — `useEffect` + `ref` watches text changes and sets `textarea.style.height = scrollHeight`
2. **Variable detection** — regex `/\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g` extracts valid JS identifiers from `{{variable}}` syntax. Each variable gets its own labeled input handle, computed with `useMemo`.

### Part 4 — Backend Integration
Submit button (▶ Play in toolbar) sends `{ nodes, edges }` to `POST /pipelines/parse`.

Backend (`backend/main.py`) runs **Kahn's Algorithm** (topological sort via BFS) to determine if the graph is a DAG. Returns:
```json
{
  "num_nodes": 3,
  "num_edges": 2,
  "is_dag": true
}
```

Frontend adds a `is_pipeline_valid` check (all nodes connected) and shows a modal with:
- Node count card
- Edge count card
- DAG Structure: Valid/Invalid
- Pipeline: Valid/Invalid
- 🎉 Confetti on full success

---

## Running Locally

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm start
```

Open http://localhost:3000. The backend runs on http://localhost:8000.

---

## Project Structure

```
vectorshift/
├── frontend/
│   └── src/
│       ├── nodes/
│       │   ├── BaseNode.js        # Reusable node abstraction
│       │   ├── inputNode.js
│       │   ├── outputNode.js
│       │   ├── llmNode.js
│       │   ├── textNode.js        # Dynamic resize + variable handles
│       │   ├── aggregateNode.js   # NEW
│       │   ├── debugNode.js       # NEW
│       │   ├── transformNode.js   # NEW
│       │   ├── filterNode.js      # NEW
│       │   ├── apiNode.js         # NEW
│       │   ├── noteNode.js        # BONUS
│       │   └── imageNode.js       # BONUS
│       ├── store.js               # Zustand state management
│       ├── toolbar.js             # Toolbar with edge toggles
│       ├── ui.js                  # ReactFlow canvas
│       ├── submit.js              # API call + validation modal
│       └── index.css              # All styles
└── backend/
    ├── main.py                    # FastAPI + Kahn's algorithm
    └── requirements.txt
```
