class WorldMap extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }); // 创建 Shadow DOM
  }

  connectedCallback() {
    const dots = JSON.parse(this.getAttribute('data-dots')) || [];
    this.render(dots);
  }

  render(dots) {
    const mapContainer = document.createElement('div');
    mapContainer.style.position = 'relative';
    mapContainer.style.width = '100%';
    mapContainer.style.height = '0';
    mapContainer.style.paddingBottom = '50%'; // 保持 2:1 的宽高比

    const svgContainer = document.createElement('svg');
    svgContainer.setAttribute('viewBox', '0 0 800 400');
    svgContainer.style.position = 'absolute';
    svgContainer.style.top = '0';
    svgContainer.style.left = '0';
    svgContainer.style.width = '100%';
    svgContainer.style.height = '100%';

    // 绘制路径和点
    dots.forEach((dot) => {
      const startPoint = this.projectPoint(dot.start.lat, dot.start.lng);
      const endPoint = this.projectPoint(dot.end.lat, dot.end.lng);
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', this.createCurvedPath(startPoint, endPoint));
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', '#0ea5e9');
      path.setAttribute('stroke-width', '1');
      svgContainer.appendChild(path);
    });

    mapContainer.appendChild(svgContainer);
    this.shadowRoot.appendChild(mapContainer);
  }

  projectPoint(lat, lng) {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  }

  createCurvedPath(start, end) {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  }
}

// 注册 custom element
customElements.define('world-map', WorldMap);
