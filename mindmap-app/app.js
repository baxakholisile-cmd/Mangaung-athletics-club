/* ============================================
   INTERACTIVE MIND MAP APP - JAVASCRIPT
   ============================================ */

class MindMapNode {
    constructor(id, title, x, y, level = 0, color = '#667eea') {
        this.id = id;
        this.title = title;
        this.description = '';
        this.x = x;
        this.y = y;
        this.level = level;
        this.color = color;
        this.children = [];
        this.parent = null;
    }

    addChild(node) {
        node.parent = this;
        this.children.push(node);
    }

    removeChild(node) {
        this.children = this.children.filter(child => child.id !== node.id);
    }
}

class MindMapApp {
    constructor() {
        this.nodes = [];
        this.selectedNode = null;
        this.nodeIdCounter = 0;
        this.canvas = document.getElementById('canvas');
        this.editModal = document.getElementById('editModal');
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.createDefaultNode();
        this.render();
    }

    setupEventListeners() {
        // Header Actions
        document.getElementById('saveBtn').addEventListener('click', () => this.saveToLocalStorage());
        document.getElementById('downloadBtn').addEventListener('click', () => this.downloadAsJSON());
        document.getElementById('resetBtn').addEventListener('click', () => this.reset());

        // Sidebar Actions
        document.getElementById('addRootBtn').addEventListener('click', () => this.addRootNode());
        document.getElementById('addBranchBtn').addEventListener('click', () => this.addBranch());
        document.getElementById('deleteBranchBtn').addEventListener('click', () => this.deleteSelected());

        // Modal Actions
        document.getElementById('closeModalBtn').addEventListener('click', () => this.closeModal());
        document.getElementById('cancelBtn').addEventListener('click', () => this.closeModal());
        document.getElementById('saveNodeBtn').addEventListener('click', () => this.saveNodeChanges());

        // Canvas Click
        this.canvas.addEventListener('click', (e) => {
            if (e.target === this.canvas) {
                this.deselectNode();
            }
        });

        // Load from LocalStorage
        this.loadFromLocalStorage();
    }

    createDefaultNode() {
        if (this.nodes.length === 0) {
            const centerX = this.canvas.offsetWidth / 2;
            const centerY = this.canvas.offsetHeight / 2;
            const node = new MindMapNode(this.nodeIdCounter++, 'Central Topic', centerX, centerY, 0, '#667eea');
            this.nodes.push(node);
        }
    }

    addRootNode() {
        const centerX = this.canvas.offsetWidth / 2;
        const centerY = this.canvas.offsetHeight / 2 + 200;
        const node = new MindMapNode(this.nodeIdCounter++, 'New Topic', centerX, centerY, 0, '#f093fb');
        this.nodes.push(node);
        this.render();
        this.selectNode(node);
    }

    addBranch() {
        if (!this.selectedNode) {
            alert('Please select a node first to add a branch');
            return;
        }

        const offsetX = 200 + Math.random() * 100;
        const offsetY = -100 + Math.random() * 100;
        const newX = this.selectedNode.x + offsetX;
        const newY = this.selectedNode.y + offsetY;

        const colors = ['#f093fb', '#4facfe', '#667eea', '#f5576c'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        const newNode = new MindMapNode(
            this.nodeIdCounter++,
            'Sub-topic',
            newX,
            newY,
            this.selectedNode.level + 1,
            randomColor
        );

        this.selectedNode.addChild(newNode);
        this.render();
        this.selectNode(newNode);
    }

    deleteSelected() {
        if (!this.selectedNode) {
            alert('Please select a node to delete');
            return;
        }

        if (this.selectedNode.parent) {
            this.selectedNode.parent.removeChild(this.selectedNode);
        } else {
            this.nodes = this.nodes.filter(node => node.id !== this.selectedNode.id);
        }

        this.selectedNode = null;
        this.render();
    }

    selectNode(node) {
        this.deselectNode();
        this.selectedNode = node;
        this.render();
    }

    deselectNode() {
        this.selectedNode = null;
        this.render();
    }

    openModal(node) {
        document.getElementById('nodeTitle').value = node.title;
        document.getElementById('nodeDescription').value = node.description;
        document.getElementById('nodeColor').value = node.color;
        this.editModal.classList.add('active');
        this.editModal.dataset.nodeId = node.id;
    }

    closeModal() {
        this.editModal.classList.remove('active');
    }

    saveNodeChanges() {
        const nodeId = parseInt(this.editModal.dataset.nodeId);
        const node = this.findNodeById(nodeId);

        if (node) {
            node.title = document.getElementById('nodeTitle').value || 'Untitled';
            node.description = document.getElementById('nodeDescription').value;
            node.color = document.getElementById('nodeColor').value;
            this.render();
            this.closeModal();
        }
    }

    findNodeById(id, nodes = this.nodes) {
        for (let node of nodes) {
            if (node.id === id) return node;
            const found = this.findNodeById(id, node.children);
            if (found) return found;
        }
        return null;
    }

    getAllNodes(nodes = this.nodes) {
        let allNodes = [...nodes];
        for (let node of nodes) {
            allNodes = allNodes.concat(this.getAllNodes(node.children));
        }
        return allNodes;
    }

    drawConnections(ctx, node, offsetX = 0, offsetY = 0) {
        for (let child of node.children) {
            ctx.beginPath();
            ctx.moveTo(node.x + offsetX + 90, node.y + offsetY);
            ctx.lineTo(child.x + offsetX - 90, child.y + offsetY);
            ctx.strokeStyle = 'rgba(102, 126, 234, 0.3)';
            ctx.lineWidth = 2;
            ctx.stroke();

            this.drawConnections(ctx, child, offsetX, offsetY);
        }
    }

    render() {
        // Clear canvas
        this.canvas.innerHTML = '';

        // Create SVG for connections
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', this.canvas.offsetWidth);
        svg.setAttribute('height', this.canvas.offsetHeight);
        svg.style.position = 'absolute';
        svg.style.top = '0';
        svg.style.left = '0';
        svg.style.pointerEvents = 'none';
        this.canvas.appendChild(svg);

        // Draw connections
        this.drawSVGConnections(svg, this.nodes);

        // Create mindmap container
        const container = document.createElement('div');
        container.className = 'mindmap-container';
        this.canvas.appendChild(container);

        // Render nodes
        this.renderNodes(this.nodes, container);

        // Update item count
        document.getElementById('itemCount').textContent = this.getAllNodes().length;
    }

    drawSVGConnections(svg, nodes) {
        for (let node of nodes) {
            for (let child of node.children) {
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', node.x + 90);
                line.setAttribute('y1', node.y);
                line.setAttribute('x2', child.x - 90);
                line.setAttribute('y2', child.y);
                line.setAttribute('stroke', 'rgba(102, 126, 234, 0.3)');
                line.setAttribute('stroke-width', '2');
                svg.appendChild(line);

                this.drawSVGConnections(svg, [child]);
            }
        }
    }

    renderNodes(nodes, container) {
        nodes.forEach(node => {
            const nodeDiv = document.createElement('div');
            nodeDiv.className = 'node';
            nodeDiv.style.left = (node.x - 90) + 'px';
            nodeDiv.style.top = (node.y - 30) + 'px';

            const nodeBox = document.createElement('div');
            nodeBox.className = 'node-box';
            nodeBox.style.background = `linear-gradient(135deg, ${node.color} 0%, ${this.adjustColor(node.color, -30)} 100%)`;

            if (this.selectedNode && this.selectedNode.id === node.id) {
                nodeBox.classList.add('selected');
            }

            nodeBox.innerHTML = `
                <div class="node-content">
                    <div class="node-title">${this.escapeHtml(node.title)}</div>
                    ${node.description ? `<div class="node-description">${this.escapeHtml(node.description)}</div>` : ''}
                </div>
                <div class="node-controls">
                    <button class="node-btn" title="Edit">✎</button>
                    <button class="node-btn" title="Add Child">+</button>
                </div>
            `;

            // Event Listeners
            nodeBox.addEventListener('click', (e) => {
                e.stopPropagation();
                this.selectNode(node);
            });

            const buttons = nodeBox.querySelectorAll('.node-btn');
            buttons[0].addEventListener('click', (e) => {
                e.stopPropagation();
                this.openModal(node);
            });

            buttons[1].addEventListener('click', (e) => {
                e.stopPropagation();
                this.addChildNode(node);
            });

            // Drag functionality
            this.makeDraggable(nodeBox, node);

            nodeDiv.appendChild(nodeBox);
            container.appendChild(nodeDiv);

            // Render children
            if (node.children.length > 0) {
                this.renderNodes(node.children, container);
            }
        });
    }

    addChildNode(parentNode) {
        const offsetX = 200 + Math.random() * 100;
        const offsetY = -100 + Math.random() * 100;
        const newX = parentNode.x + offsetX;
        const newY = parentNode.y + offsetY;

        const colors = ['#f093fb', '#4facfe', '#667eea', '#f5576c'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        const newNode = new MindMapNode(
            this.nodeIdCounter++,
            'New Sub-topic',
            newX,
            newY,
            parentNode.level + 1,
            randomColor
        );

        parentNode.addChild(newNode);
        this.render();
        this.selectNode(newNode);
    }

    makeDraggable(element, node) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

        element.onmousedown = (e) => {
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;

            document.onmouseup = () => {
                document.onmouseup = null;
                document.onmousemove = null;
            };

            document.onmousemove = (e) => {
                e.preventDefault();
                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;

                node.x -= pos1;
                node.y -= pos2;

                this.render();
            };
        };
    }

    adjustColor(color, percent) {
        const num = parseInt(color.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
            (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
            (B < 255 ? B < 1 ? 0 : B : 255))
            .toString(16).slice(1);
    }

    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }

    saveToLocalStorage() {
        const data = {
            nodes: this.nodes,
            nodeIdCounter: this.nodeIdCounter
        };
        localStorage.setItem('mindmapData', JSON.stringify(data));
        alert('✅ Mind map saved successfully!');
    }

    loadFromLocalStorage() {
        const saved = localStorage.getItem('mindmapData');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                // Note: Simplified loading - for full functionality, reconstruct the tree
                this.nodeIdCounter = data.nodeIdCounter;
                // this.nodes = data.nodes; // You may need more sophisticated deserialization
            } catch (e) {
                console.log('Could not load saved data');
            }
        }
    }

    downloadAsJSON() {
        const data = {
            title: 'Mind Map Export',
            nodes: this.serializeNodes(this.nodes),
            exportDate: new Date().toISOString()
        };

        const dataStr = JSON.stringify(data, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `mindmap-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    serializeNodes(nodes) {
        return nodes.map(node => ({
            id: node.id,
            title: node.title,
            description: node.description,
            level: node.level,
            color: node.color,
            children: this.serializeNodes(node.children)
        }));
    }

    reset() {
        if (confirm('⚠️ Are you sure you want to reset the mind map? This cannot be undone.')) {
            this.nodes = [];
            this.selectedNode = null;
            this.nodeIdCounter = 0;
            localStorage.removeItem('mindmapData');
            this.createDefaultNode();
            this.render();
        }
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new MindMapApp();
});