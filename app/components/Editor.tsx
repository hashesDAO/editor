'use client';

import { SandpackPreview, SandpackProvider } from '@codesandbox/sandpack-react';

const p5Boilerplate = `
var fr = 60;
function setup() {
  createCanvas(500, 500);
  frameRate(fr);
}

function draw() {
  frameRate(fr);
  background(1);
}
`;

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

const files = {
  'sketch.js': {
    code: p5Boilerplate,
    active: true,
  },
  'index.html': {
    code: htmlBoilerplate,
    hidden: true,
  },
};

export default function Editor() {
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
