'use client';

import { SandpackPreview, SandpackProvider } from '@codesandbox/sandpack-react';
import { useMemo } from 'react';
import { useHashContext } from '../contexts/HashContext';
import { INITIAL_SELECTED_HASH } from '../util/constants';
import { Address } from 'viem';

const htmlBoilerplate = `
<html>
  <head>
    <meta charset="utf-8" />
  </head>
  <body>
    <script src="sketch.js"></script>
  </body>
</html>
`;

function createP5Drawing(hash: Address | string) {
  return `
var fr = 60;
function setup() {
  createCanvas(400, 400);
  background(255, 255)
  frameRate(fr);
  noLoop();
}

function draw() {
  // Calculate the center coordinates of the canvas
  const centerX = width / 2;
  const centerY = height / 2;

  const squareSize = 200; // Size of the square

  // Draw the square
  rectMode(CENTER); // Set the rectangle mode to draw from the center
  stroke(0); // Set the stroke color to black
  fill(255); // Set the fill color to white
  rect(centerX, centerY, squareSize, squareSize); // Draw the square

  // Draw the text
  textAlign(CENTER, CENTER); // Set the text alignment to center
  textSize(32); // Set the text size
  fill(0); // Set the text color to black
  text(${hash}, centerX, centerY); // Draw the text at the center of the square
}
`;
}

export default function Editor() {
  const { selectedHash } = useHashContext();
  const parsedHash = selectedHash === INITIAL_SELECTED_HASH ? '"0xhello"' : selectedHash;

  const files = useMemo(() => {
    return {
      'sketch.js': {
        code: createP5Drawing(parsedHash),
        active: true,
      },
      'index.html': {
        code: htmlBoilerplate,
        hidden: true,
      },
    };
  }, [parsedHash]);

  return (
    <SandpackProvider
      theme="dark"
      template="static"
      options={{
        externalResources: ['https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.6.0/p5.min.js'],
      }}
      files={files}
      className="w-full"
    >
      <SandpackPreview showOpenInCodeSandbox={false} showRefreshButton={false} className="h-screen" />
    </SandpackProvider>
  );
}
