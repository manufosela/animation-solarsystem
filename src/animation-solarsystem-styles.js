// Copyright 2022 manufosela.
// SPDX-License-Identifier: MIT

import { css } from 'lit';

export const AnimationSolarsystemStyles = css`
  :host, * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    --animation-solarsystem-bg-stars-image: linear-gradient(to top, #000033, #222255);
  }

  main {
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: var(--animation-solarsystem-bg-stars, linear-gradient(to top, #000033, #222255));
    background-size: cover;
    background-repeat: no-repeat;
    overflow-x: hidden;
    overflow-y: hidden;
    width: 100vw;
    height: 100vh;
  }

  svg {
    border: 0;
    transform: rotateX(65deg);
  }

  .sky {
    width: 100vw;
    height: 100vh;
    font-size: 30pt;
    color: white;	
  }

  .normalstar {
    width: 2px;
    height: 2px;
    background-color: white;
    border: 4px dotted "#EEEEEE";
    border-radius: 1px;
    position: absolute;
    animation-iteration-count: infinite;
    animation-name: zoom_out;
  }

  .normalstar:nth-of-type(odd) { animation-duration:  15s;  }
  .normalstar:nth-of-type(even) { animation-duration:  5s; }

  @keyframes zoom_out {
    0% { transform: scale(1); }
    50% {transform: scale(.5);}
    100% {transform: scale(1);}
  }
`;
