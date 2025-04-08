class WorldMap extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    style.textContent = `
      .map-container {
        width: 100%;
        height: 100%;
        min-height: 400px;
      }
    `;

    const container = document.createElement('div');
    container.classList.add('map-container');

    this.shadowRoot.append(style, container);
    this._container = container;
    this._chart = null;
  }

  static get observedAttributes() {
    return ['width', 'height', 'data'];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === 'width') {
      this.style.width = newVal;
    } else if (name === 'height') {
      this.style.height = newVal;
    } else if (name === 'data' && this._chart) {
      try {
        const data = JSON.parse(newVal);
        this._updateData(data);
      } catch (e) {
        console.error('Invalid JSON in data attribute');
      }
    }
  }

  connectedCallback() {
    this.style.display = 'block';
    this.style.width = this.getAttribute('width') || '100%';
    this.style.height = this.getAttribute('height') || '500px';

    if (typeof echarts === 'undefined') {
      this._container.textContent = 'ECharts not loaded.';
      return;
    }

    this._chart = echarts.init(this._container);

    this._chart.setOption({
      title: {
        text: 'World Map',
        left: 'center',
        textStyle: { fontSize: 20 }
      },
      tooltip: { trigger: 'item' },
      visualMap: {
        min: 0,
        max: 100,
        text: ['High', 'Low'],
        realtime: false,
        calculable: true,
        inRange: {
          color: ['#e0ffff', '#006edd']
        }
      },
      series: [{
        name: 'World',
        type: 'map',
        map: 'world',
        roam: true,
        emphasis: {
          label: { show: true }
        },
        data: []
      }]
    });

    // 如果 data 属性已经存在，尝试载入数据
    const dataAttr = this.getAttribute('data');
    if (dataAttr) {
      try {
        const data = JSON.parse(dataAttr);
        this._updateData(data);
      } catch (e) {
        console.warn('Invalid data attribute');
      }
    }

    // Resize support
    window.addEventListener('resize', this._resizeHandler = () => {
      if (this._chart) this._chart.resize();
    });
  }

  disconnectedCallback() {
    if (this._chart) {
      this._chart.dispose();
    }
    window.removeEventListener('resize', this._resizeHandler);
  }

  _updateData(data) {
    this._chart.setOption({
      series: [{
        data
      }]
    });
  }
}

customElements.define('world-map', WorldMap);
