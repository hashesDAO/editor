'use client';

import { SandpackPreview, SandpackProvider } from '@codesandbox/sandpack-react';
import { useMemo } from 'react';
import { useHashContext } from '../contexts/HashContext';
import { INITIAL_SELECTED_HASH } from '../util/constants';
import * as attributeLibrary from '../util/attributeLibrary';
import { Address } from 'viem';
import { Trait } from '../reducers/traitsReducer';
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
  console.log('this', this);
  return `
var fr = 60;
function setup() {
  createCanvas(400, 400);
  background(255, 255)
  frameRate(fr);
  noLoop();
}

function draw() {
  ${traits.reduce(
    (prev, curr) => {
      const traitWrapper = new Function('p5', 'lib', 'hash', curr.content);
      const trait = traitWrapper(p5, attributeLibrary, hash);
      return trait(prev);
    },
    () => {
      console.log('emptyFn');
    },
  )()}
}
`;
}

export default function Editor() {
  const { selectedHash } = useHashContext();
  const selectedTraits = useTraitsContext();
  const parsedHash = selectedHash === INITIAL_SELECTED_HASH ? '"0xhello"' : selectedHash;

  const files = useMemo(() => {
    return {
      'sketch.js': {
        code: createP5Drawing(parsedHash, selectedTraits),
        active: true,
      },
      'index.html': {
        code: htmlBoilerplate,
        hidden: true,
      },
    };
  }, [parsedHash, selectedTraits]);

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
