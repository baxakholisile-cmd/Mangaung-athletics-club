# 🧠 Interactive Mind Map App

A premium, interactive mind map application with editable sections, sub-sections, and a modern UI. Perfect for brainstorming, organizing ideas, and visualizing complex concepts.

## ✨ Features

### Core Functionality
- 🎯 **Central Topic Management** - Create and edit a main central topic
- 🌳 **Hierarchical Branching** - Add multiple branches and sub-branches with unlimited depth
- ✏️ **Editable Nodes** - Click any node to edit title, description, and color
- 🎨 **Custom Colors** - Choose unique colors for each node to categorize ideas
- 🖱️ **Drag & Drop** - Drag nodes around the canvas to reorganize your mind map
- 🔗 **Visual Connections** - SVG lines automatically connect parent and child nodes

### User Interface
- 🌙 **Premium Dark Theme** - Modern gradient backgrounds and smooth animations
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- 🎪 **Interactive Header** - Quick access to save, download, and reset functions
- 📊 **Sidebar Stats** - Real-time count of total items in your mind map
- 🎨 **Legend** - Visual guide to understand node hierarchy levels

### Data Management
- 💾 **Auto-Save** - Save your work to browser's local storage
- 📥 **Export as JSON** - Download your mind map as a JSON file for backup
- 🔄 **Import/Export** - Easily share and restore mind maps
- ⚡ **Reset Option** - Clear everything and start fresh

## 🚀 Quick Start

### Installation
1. Clone the repository
   ```bash
   git clone https://github.com/baxakholisile-cmd/Mangaung-athletics-club.git
   ```

2. Navigate to the mind map app directory
   ```bash
   cd mindmap-app
   ```

3. Open in your browser
   ```bash
   # Simply open index.html in your preferred browser
   open index.html
   ```

### Usage

#### Creating Nodes
- **Add Central Topic**: Click "+ Add Central Topic" to create a new root node
- **Add Branch**: Select a node and click "+ Add Branch" to add child nodes
- **Quick Add**: When editing a node, you can add children directly

#### Editing Nodes
1. Click on any node to select it
2. Click the ✎ (edit) button that appears
3. Modify:
   - **Title**: Main text for the node
   - **Description**: Additional details (optional)
   - **Color**: Choose a custom color using the color picker
4. Click "Save Changes" to apply

#### Organizing Ideas
- **Drag Nodes**: Click and drag any node to reposition it on the canvas
- **Delete**: Select a node and click "- Delete Selected" to remove it
- **Hierarchical Structure**: Automatically maintains parent-child relationships

#### Saving & Exporting
- **💾 Save**: Click the Save button to store your mind map in browser storage
- **📥 Download**: Export your current mind map as a JSON file
- **↻ Reset**: Clear all nodes and start over (irreversible)

## 🎨 UI Components

### Header
- Title and tagline
- Save button
- Download button
- Reset button

### Sidebar
- Quick Actions panel
- Item counter
- Legend showing node types and colors

### Canvas
- Main interactive area
- Scrollable mind map workspace
- Visual connections between nodes

### Modal (Edit Dialog)
- Node title input
- Description textarea
- Color picker
- Save/Cancel buttons

## 🛠️ Technical Stack

- **HTML5** - Structure and semantic markup
- **CSS3** - Premium styling with gradients and animations
- **Vanilla JavaScript** - No dependencies, pure JS
- **SVG** - Scalable vector graphics for connections
- **LocalStorage API** - Client-side data persistence

## 📁 File Structure

```
mindmap-app/
├─�� index.html          # Main HTML file
├── styles.css          # Premium CSS styles
├── app.js              # Interactive functionality
└── README.md           # Documentation
```

## 🎯 Class Structure

### MindMapNode
Represents a single node in the mind map
```javascript
new MindMapNode(id, title, x, y, level, color)
```
- **id**: Unique identifier
- **title**: Node label
- **x, y**: Canvas position
- **level**: Hierarchy depth
- **color**: Node color
- **children**: Array of child nodes
- **parent**: Reference to parent node

### MindMapApp
Main application controller
```javascript
new MindMapApp()
```

#### Key Methods
- `addRootNode()` - Add new top-level node
- `addBranch()` - Add child to selected node
- `deleteSelected()` - Remove selected node
- `selectNode(node)` - Select a node
- `openModal(node)` - Show edit dialog
- `saveNodeChanges()` - Update node properties
- `render()` - Redraw the canvas
- `saveToLocalStorage()` - Persist data
- `downloadAsJSON()` - Export as file
- `reset()` - Clear all data

## 🎨 Color Palette

The app includes beautiful gradient colors:

| Type | Primary | Secondary |
|------|---------|-----------|
| Central | #667eea | #764ba2 |
| Main Branch | #f093fb | #f5576c |
| Sub-branch | #4facfe | #00f2fe |
| Accent | #f093fb | #f5576c |

## 🌐 Browser Support

- ✅ Chrome/Edge (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (Latest)
- ✅ Mobile Browsers

## 💡 Tips & Tricks

1. **Organize by Color**: Use different colors to categorize ideas by theme
2. **Drag to Layout**: Arrange nodes in a circular pattern for clarity
3. **Backup Regularly**: Download your mind map periodically
4. **Keyboard Friendly**: Use Tab to navigate between nodes
5. **Mobile Editing**: Great for quick brainstorming on tablets

## 🔧 Advanced Features

### Custom Styling
Edit `styles.css` to customize:
- Color schemes
- Font families
- Animation speeds
- Shadow depths

### Extending Functionality
Add new features by modifying `app.js`:
- Import from JSON
- Collaborative editing
- Undo/Redo functionality
- Theme switching
- Node icons
- Connection types

## 🐛 Known Limitations

- Maximum canvas size: Browser's DOM limit
- Complex large maps may have performance impact
- LocalStorage limited to ~5-10MB per domain
- No built-in cloud sync

## 📈 Future Enhancements

- [ ] Cloud synchronization
- [ ] Collaborative editing
- [ ] Undo/Redo system
- [ ] Image insertion
- [ ] PDF export
- [ ] Node icons
- [ ] Theme customization panel
- [ ] Dark/Light mode toggle
- [ ] Search functionality
- [ ] Analytics integration

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Created by **baxakholisile-cmd**

## 🙏 Acknowledgments

- Inspired by popular mind mapping tools
- Built with modern web technologies
- Designed for productivity and creativity

## 📞 Support

For issues, questions, or suggestions:
1. Open an issue on GitHub
2. Check existing documentation
3. Review the code comments
4. Contact the author

---

### 🚀 Ready to start mapping your ideas?

Open `index.html` in your browser and begin creating your first mind map today!

**Happy Mapping! 🧠✨**