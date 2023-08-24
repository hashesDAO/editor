'use client';

import { useEffect, useRef } from 'react';
import { Address } from 'viem';
import { useHashContext } from '../../contexts/HashContext';
import { useTraitsContext } from '../../contexts/TraitsContext';
import type { Trait } from '../../reducers/traitsReducer';
import * as attributeLibrary from '../../util/attributeLibrary';

let p5: any;
let p5Instance: any;

const renderP5 = (hash: Address | string, traits: Trait[]) => (p5: any) => {
  const renderTraitStack = traits.reduce(
    (prev, curr) => {
      const traitWrapper = new Function('p5', 'lib', 'hash', curr.content);
      const trait = traitWrapper(p5, attributeLibrary, hash);
      return trait(prev);
    },
    () => {
      console.log('emptyFn');
    },
  );

  p5.setup = () => {
    const container = document.querySelector('#canvas-container')!;
    p5.createCanvas(container?.clientHeight, container?.clientHeight);
    p5.background(255, 255);
    p5.noLoop();
  };

  p5.draw = () => {
    renderTraitStack();
  };
};

export default function Editor() {
  const p5Ref = useRef(document.createElement('div'));
  const { selectedHash } = useHashContext();
  const selectedTraits = useTraitsContext();

  useEffect(() => {
    p5 = require('p5');
  }, []);

  useEffect(() => {
    if (!p5 || !selectedHash) {
      return;
    }
    if (p5Instance) {
      p5Instance.remove();
    }
    if (p5Ref.current.firstChild) {
      p5Ref.current.removeChild(p5Ref.current.firstChild);
    }
    p5Instance = new p5(renderP5(selectedHash, selectedTraits), p5Ref.current);
  }, [selectedHash, selectedTraits]);

  return <div ref={p5Ref} className="h-screen" id="canvas-container"></div>;
}