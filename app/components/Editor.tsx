'use client';

import { SandpackPreview, SandpackProvider } from '@codesandbox/sandpack-react';
import { useMemo } from 'react';
import { useHashContext } from '../contexts/HashContext';
import { INITIAL_SELECTED_HASH } from '../util/constants';
import { Address } from 'viem';
import type { Trait } from '../reducers/traitsReducer';
import * as attributeLibrary from '../util/attributeLibrary';
import { useTraitsContext } from '../contexts/TraitsContext';

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

function createP5Drawing(hash: Address | string, traits: Trait[]) {
  return `
  const s = ( p5 ) => {

    let x = 100;
    let y = 100;

    p5.setup = function() {
      p5.createCanvas(700, 410);
    };

    p5.draw = function() {
      p5.background(0);
      p5.fill(255);
      p5.rect(x,y,50,50);
    };
  };

  let myp5 = new p5(s);
`;
}

export default function Editor() {
  const { selectedHash } = useHashContext();
  const selectedTraits = useTraitsContext();
  const parsedHash = selectedHash === INITIAL_SELECTED_HASH ? '"0xhello"' : selectedHash;

  const demo = createP5Drawing(parsedHash, selectedTraits);
  console.log(demo);

  const files = useMemo(
    () => ({
      'sketch.js': {
        code: createP5Drawing(parsedHash, selectedTraits),
        active: true,
      },
      'index.html': {
        code: htmlBoilerplate,
        hidden: true,
      },
    }),
    [parsedHash],
  );

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
