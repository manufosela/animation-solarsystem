import { html, LitElement } from 'lit';
import { AnimationSolarsystemStyles } from './animation-solarsystem-styles.js';

export class AnimationSolarsystem extends LitElement {
  static get styles() {
    return [AnimationSolarsystemStyles];
  }

  static get properties() {
    return {
      radioBase: { type: Number, attribute: "radio-base", reflect: true },
      width: { type: Number, attribute: "width", reflect: true  },
      height: { type: Number, attribute: "height", reflect: true  },
      radioPlantetBase: { type: Number, attribute: "radio-planet-base", reflect: true  },
      periodPlantetBase: { type: Number, attribute: "period-planet-base", reflect: true  },
    };
  }

  constructor() {
    super();
    this.svgNS = "http://www.w3.org/2000/svg";
    this.xlinkNS = "http://www.w3.org/1999/xlink";
    
    this.radioBase = 45; // ALL: 18, Interior: 350
    this.width = 2000;
    this.height = 1800;
    this.radioPlantetBase = 4;  // ALL: 4, Interior: 10
    this.periodPlantetBase = 60; // seg
    
    this.planetsData = {
      mercurio: { rp: 0.36, ro: 0.38, po: 4.15, color: "gray" },
      venus: { rp: 0.98, ro: 0.72, po: 1.62, color: "#f80" },
      tierra: { rp: 1, ro: 1, po: 1, color: "blue" },
      marte: { rp: 0.49, ro: 1.53, po: 0.53, color: "red" },
      jupiter: { rp: 10.46, ro: 5.22, po: 0.084, color: "#d40" },
      saturno: { rp: 8.7, ro: 9.59, po: 0.034, color: "brown" },
      urano: { rp: 3.5, ro: 19.26, po: 0.019, color: "cyan" },
      neptuno: { rp: 3.35, ro: 30.2, po: 0.006, color: "darkblue" }
    };
  }

  updated(changedProperties) {

  }

  firstUpdated() {
    this.cx = this.width / 2;
    this.cy = this.height / 2;
    this.putStars();
    this.svg = this.shadowRoot.querySelector("#mySVG");
    this.svg.setAttribute("width", this.width);
    this.svg.setAttribute("height", this.height);

    this.maxSize = 0;
    this.createPlanetaryOrbit('sun', { ro: 0, rp: 109, po: 0, color: "#ff0" });
    Object.keys(this.planetsData).forEach((planetName) => {
      this.createPlanetaryOrbit(planetName, this.planetsData[planetName]);
    });

    // svg.setAttribute("viewBox", `0 0 ${maxSize*2} ${maxSize*2}`);
    // svg.setAttribute("width", `${maxSize}px`);
    // svg.setAttribute("height", `${maxSize}px`);
  } 
    
  createPlanetaryOrbit(planetName, planetData) {
    const { ro , rp, po, color } = planetData;
    const r = this.radioBase * ro;
    const pathStr = `M ${this.cx}, ${this.cy} m -${r}, 0 a ${r},${r} 0 1,0 ${r * 2},0 a ${r},${r} 0 1,0 -${r * 2},0`;
  
    const orbit = document.createElementNS(this.svgNS, "path");
    orbit.setAttribute("id", `path-${planetName}`);
    orbit.setAttribute("fill", "none");
    orbit.setAttribute("stroke", "#777");
    orbit.setAttribute("stroke-linecap", "round");
    orbit.setAttribute("stroke-linejoin", "round");
    orbit.setAttribute("d", pathStr);
    this.svg.appendChild(orbit);
  
    const mpath = document.createElementNS(this.svgNS, "mpath");
    mpath.setAttributeNS(this.xlinkNS, "href", `#path-${planetName}`);
  
    const r2 = this.radioPlantetBase * rp > (this.radioPlantetBase*2) ? this.radioPlantetBase*2 : this.radioPlantetBase * rp;
    const planet = document.createElementNS(this.svgNS, "circle");
    planet.setAttribute("id", `planet-${planetName}`);
    planet.setAttribute("cx", "0");
    planet.setAttribute("cy", "0");
    planet.setAttribute("r", r2);
    planet.setAttribute("fill", color);
    planet.setAttribute("vector-effect", "non-scaling-stroke");
    planet.setAttribute("stroke", "none");
    this.svg.appendChild(planet);
  
    const tp = parseInt(this.periodPlantetBase / po, 10);
    const animateMotion = document.createElementNS(this.svgNS, "animateMotion");
    animateMotion.setAttribute("dur", `${tp}s`);
    animateMotion.setAttribute("repeatCount", "indefinite");
    animateMotion.appendChild(mpath);
    animateMotion.setAttributeNS(this.xlinkNS, "href", `#planet-${planetName}`);
    this.svg.appendChild(animateMotion);
  
    this.maxSize = this.maxSize < r ? r : this.maxSize;
  }

  putStars() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    let i = 1;
    // const limit = Math.floor(Math.random() * 1000);
    const limit = this.getRndInteger(400, 900);
    
    let starColor = "orange";
    
    while(i < limit) {
      const topPosition = this.getRndInteger(1, h);
      const leftPosition = this.getRndInteger(1, w);
      const scale = this.getRndInteger(1,10) / 10;
      const starRand = this.getRndInteger(1,3);
      if(starRand === 1) { 
        starColor = "yellow"; 
      } else if(starRand === 2) { 
        starColor = "lightblue"; 
      } else { 
        starColor = "white"; 
      }
      this.starNormal(starColor, topPosition, leftPosition, scale);
      i += 1;
    }
  }

  getRndInteger(min, max) {
    this._null = null;
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

  starNormal(starColor, topPosition, leftPosition, scale) {
    this._null = null;
    const drawnStar = document.createElement('div');
    drawnStar.setAttribute("class", "normalstar");
    drawnStar.setAttribute("style", `
      background-color: ${  starColor  }; 
      top: ${  topPosition  }px; 
      left: ${  leftPosition  }px; 
      transform: scale(${  scale  })
    `);
    this.shadowRoot.querySelector("#sky").appendChild(drawnStar);
  }

  render() {
    return html`
      <main id="sky" class="sky">
        <svg xmlns="http://www.w3.org/2000/svg" id="mySVG">
          <title>SVG Solar System Animate with Path</title>
        </svg>
      </main>
    `;
  }
}
