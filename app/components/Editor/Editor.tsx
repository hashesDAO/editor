'use client';

import { useRenderedImageContext, useRenderedImageDispatch } from '@/app/contexts/RenderedImageContext';
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
    p5.createCanvas(container?.clientWidth, container?.clientHeight);
    p5.background(255, 255);
    p5.noLoop();
  };

  p5.draw = () => {
    renderTraitStack();
  };
};

function canvasToBase64(canvas: HTMLCanvasElement) {
  // Create an SVG element
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', canvas.width.toString());
  svg.setAttribute('height', canvas.height.toString());

  // Create a foreignObject element to contain the canvas content
  const foreignObject = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
  foreignObject.setAttribute('width', '100%');
  foreignObject.setAttribute('height', '100%');

  // Append the canvas element to the foreignObject
  foreignObject.appendChild(canvas);

  // Append the foreignObject to the SVG
  svg.appendChild(foreignObject);

  // Serialize the SVG to an XML string
  const svgXml = new XMLSerializer().serializeToString(svg);

  // Convert the SVG string to base64
  const base64Svg = btoa(svgXml);

  // Return the final Data URL
  return `data:image/svg+xml;base64,${base64Svg}`;
}

export default function Editor() {
  const p5Ref = useRef(document.createElement('div'));
  const { selectedHash } = useHashContext();
  const selectedTraits = useTraitsContext();
  const updateRenderedImage = useRenderedImageDispatch();
  const renderedImage = useRenderedImageContext();

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

  useEffect(() => {
    if (p5Ref.current.firstChild) {
      const base64Image = canvasToBase64(p5Ref.current.firstChild as HTMLCanvasElement);
      if (base64Image === renderedImage) {
        return;
      }
      updateRenderedImage(base64Image);
    }
  }, [updateRenderedImage, renderedImage, p5Ref.current.firstChild]);

  return <div ref={p5Ref} className="h-screen" id="canvas-container"></div>;
}
