'use client';

import { SandpackPreview, SandpackProvider } from '@codesandbox/sandpack-react';
import { useMemo } from 'react';
import { useHashContext } from '../contexts/HashContext';
import { INITIAL_SELECTED_HASH } from '../util/constants';
import { Address } from 'viem';
import type { Trait } from '../reducers/traitsReducer';
import * as attributeLibrary from '../util/attributeLibrary';
import { useTraitsContext } from '../contexts/TraitsContext';

const p5 = require('p5'); // Import the p5.js module

const htmlBoilerplate = `
<html>
  <head>
    <meta charset="utf-8" />
    <style>
    .canvas-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }

    #myCanvas {
      /* Add any additional styling here */
    }

    </style>
  </head>
  <body>
    <div className="canvas-container">
      <canvas id="myCanvas defaultCanvas0" class="p5Canvas" width="700" height="410"></canvas>
    </div>
    <h1>hello world</h1>
    <script src="sketch.js"></script>
  </body>
</html>
`;

function createP5Drawing(hash: Address | string, traits: Trait[]) {
  // if (traits.length === 0 || hash === INITIAL_SELECTED_HASH) {
  //   return null;
  // }

  const sketch = (p) => {
    let x = 100;
    let y = 100;

    p.setup = function () {
      p.createCanvas(700, 410);
      p.background(255);
      p.noLoop();
    };

    p.draw = function () {
      //draw a circle in the middle of the canvas
      p.ellipse(p.width / 2, p.height / 2, 50, 50);
    };
  };

  const res = new p5(sketch);
  console.log('res', res);
  return res;
}

export default function Editor() {
  const { selectedHash } = useHashContext();
  const selectedTraits = useTraitsContext();
  const parsedHash = selectedHash === INITIAL_SELECTED_HASH ? '"0xhello"' : selectedHash;
  const files = useMemo(
    () => ({
      'sketch.js': {
        code: createP5Drawing(parsedHash, selectedTraits),
        active: true,
      },
      'index.html': {
        code: htmlBoilerplate,
        hidden: false,
      },
    }),
    [parsedHash, selectedTraits],
  );

  return (
    <SandpackProvider
      theme="dark"
      template="static"
      options={
        {
          // externalResources: ['https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.6.0/p5.min.js'],
        }
      }
      files={files}
      className="w-full"
    >
      <SandpackPreview
        showOpenInCodeSandbox={false}
        showRefreshButton={false}
        className="h-screen"
        ref={(preview) => {
          console.log('preview', preview);
        }}
      />
    </SandpackProvider>
  );
}
