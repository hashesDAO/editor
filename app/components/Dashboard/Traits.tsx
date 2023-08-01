'use client';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Trait from './Trait';
import TraitSet from './TraitSet';
import DragTrait from './DragTrait';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const traitSectionMapping = [
  {
    description: 'Draw elements on the canvas.',
    type: 'draw',
  },
  {
    description: 'Repeat a trait sequence to create patterns.',
    type: 'repeat',
  },
  {
    description: 'Modify canvas before drawing.',
    type: 'pre-process',
  },
  {
    description: 'Modify canvas after drawing.',
    type: 'post-process',
  },
];

const parsedTraits = [
  {
    description: 'Draw elements on the canvas.',
    type: 'draw',
    traits: [
      {
        id: 'makeSquare',
        name: 'Square',
        content:
          'const size = 20 + lib.leading1s(hash) * 10;\r\n\r\nreturn function(inputFn) {\r\n    return (outputFn) => {\r\n        inputFn(outputFn);\r\n        p5.rect(0,0,size,size);\r\n    }\r\n}',
        type: 'draw',
      },
      {
        id: 'JasonSquare',
        name: 'Jason Square',
        content:
          'const size = 20 + lib.leading1s(hash) * 10;\r\n\r\nreturn function(inputFn) {\r\n  return (outputFn) => {\r\n    inputFn(outputFn);\r\n\r\n    for (let i = 0; i < 12; i++) {\r\n      p5.push(); // Push the current drawing state onto the stack\r\n      p5.translate(p5.width / 2, p5.height / 2); // Translate to the center of the canvas\r\n      p5.rotate(p5.radians(i * 30)); // Rotate the canvas by 30 degrees times the iteration\r\n\r\n      // Calculate the position of the square\r\n      const xPos = 0;\r\n      const yPos = -25 - size / 2;\r\n\r\n      p5.rect(xPos, yPos, size, size); // Draw the square\r\n\r\n      p5.pop(); // Restore the previous drawing state from the stack\r\n    }\r\n  };\r\n};\r\n',
        type: 'draw',
      },
      {
        id: 'JasonRectangleGrid',
        name: 'Jason Rectangle Grid',
        content:
          '// This it the trait wrapper area where\r\n// you will have access to the variables\r\n// p5, lib (utility library), and hash\r\n\r\nreturn function(inputFn) {\r\n    return (outputFn) => {\r\n        // The contents of the trait usually goes inside\r\n        // of this function\r\n\r\n        let [Color1, Color2, Color3, Color4, Color5, Color6, Color7, Color8, Color9, Color10, Color11, Color12,\r\n     ColorB1, ColorB2, ColorB3, ColorB4, ColorB5, ColorB6, ColorB7, ColorB8, ColorB9, ColorB10, ColorB11, ColorB12,\r\n     ColorC1, ColorC2, ColorC3, ColorC4, ColorC5, ColorC6, ColorC7, ColorC8, ColorC9, ColorC10, ColorC11, ColorC12,\r\n     ColorD1, ColorD2, ColorD3, ColorD4, ColorD5, ColorD6, ColorD7, ColorD8, ColorD9, ColorD10, ColorD11, ColorD12] = colors;\r\n\r\n\r\n    }\r\n}',
        type: 'draw',
      },
      {
        id: 'makeCircle',
        name: 'Circle',
        content:
          'const size = 10 + lib.leading0s(hash) * 10;\r\n\r\nreturn function(inputFn) {\r\n    return (outputFn) => {\r\n        inputFn(hash, outputFn);\r\n        p5.circle(0,0,size);\r\n    }\r\n}',
        type: 'draw',
      },
      {
        id: 'JasonSimpleSquare',
        name: 'Jason Simple Square',
        content:
          'return function(inputFn) {\r\n    return (outputFn) => {\r\n        inputFn(hash, outputFn);\r\n\r\n        //initialization variables  \r\n        let newHashes = [];\r\n        hash = hash.slice(2); // Truncate the \'0x\' from the hash \r\n        const colors = [];\r\n        generateNewHashes(hash);\r\n        assignColors();\r\n\r\n\r\nfunction generateNewHashes(initialHash) {\r\n  for (let n = 0; n < initialHash.length; n++) {\r\n    let newHash = "";\r\n\r\n    // Ignore the character at position n\r\n    let partialHash = initialHash.substring(0, n) + initialHash.substring(n + 1);\r\n\r\n    // Start the first chunk at character hash[n+1]\r\n    newHash += partialHash.substring(n);\r\n\r\n    // Append characters from position 0 to n-1\r\n    newHash += partialHash.substring(0, n);\r\n\r\n    newHashes.push(newHash);\r\n  }\r\n}\r\n\r\nfunction assignColors() {\r\n  for (let i = 0; i < newHashes.length; i++) {\r\n    let a = newHashes[i].slice(0, 21);\r\n    let b = newHashes[i].slice(21, 42);\r\n    let c = newHashes[i].slice(42, 63);\r\n\r\n    a = Math.round(parseInt(a, 16) / Math.pow(2, 76));\r\n    b = Math.round(parseInt(b, 16) / Math.pow(2, 76));\r\n    c = Math.round(parseInt(c, 16) / Math.pow(2, 76));\r\n\r\n    colors[i] = [a, b, c];\r\n  }\r\n}\r\n\r\n\r\n  //this loop assigns the colors array to Color1, Color2...to Color64\r\n  for (let i = 0; i < colors.length; i++) {\r\n    window[\'Color\' + (i + 1)] = colors[i];\r\n  }\r\n\r\n      let squareSize = 50;\r\n      let xStart = 0;\r\n      let yStart = 0;\r\n      p5.text("Color1 " + Color1, 0,20);\r\n      p5.text("Color2 " + Color2, 0,50);\r\n\r\n //temporarily closed loop that draws the squares --> sort the colors first!\r\n      for (let i = 0; i < 64; i++) {\r\n        let colorIndex = i % colors.length;\r\n        let x = xStart + (i % 8) * squareSize;\r\n        let y = yStart + Math.floor(i / 8) * squareSize;\r\n        p5.fill(colors[colorIndex]);\r\n        p5.square(x, y, squareSize);\r\n      }\r\n\r\n\r\n    } //closes output function\r\n}',
        type: 'draw',
      },
    ],
  },
  {
    description: 'Repeat a trait sequence to create patterns.',
    type: 'repeat',
    traits: [
      {
        id: 'horizontalRepeater',
        name: 'Horizontal',
        content:
          'let numRepeats = parseInt(lib.mapAttribute(\r\n    lib.longestStreakOf1s,\r\n    hash,\r\n    [4, 14],\r\n    [2, 10]\r\n));\r\n\r\nreturn function(inputFn) {\r\n    return (outputFn) => {\r\n        for(let i = 0; i < numRepeats; i++) {\r\n            p5.push();\r\n            switch (i % 4) {\r\n                case 0:\r\n                    p5.scale(0.8);\r\n                    p5.translate(-i * 40, 100);\r\n                    break;\r\n                case 1:\r\n                    p5.scale(0.8);\r\n                    p5.translate(i * 40, 100);\r\n                    break;\r\n                case 2:\r\n                    p5.scale(1.2);\r\n                    p5.translate(i * 40, -60);\r\n                    break;\r\n                case 3:\r\n                    p5.scale(1.2);\r\n                    p5.translate(-i * 40, -60);\r\n                    break;\r\n            }\r\n            inputFn(outputFn);\r\n            p5.pop();\r\n        }\r\n    }\r\n}',
        type: 'repeat',
      },
      {
        id: 'JasonHorizontalRepeater',
        name: 'Jason Horizontal',
        content:
          'let numRepeats = parseInt(lib.mapAttribute(\r\n  lib.longestStreakOf1s,\r\n  hash,\r\n  [4, 14],\r\n  [2, 10]\r\n));\r\n\r\n\r\n\r\nreturn function(inputFn) {\r\n  return (outputFn) => {\r\n    for (let i = 0; i < numRepeats; i++) {\r\n      p5.push();\r\n\r\n      switch (i % 4) {\r\n        case 0:\r\n          p5.scale(0.8);\r\n          p5.translate(-i * 40, 100);\r\n          break;\r\n        case 1:\r\n          p5.scale(0.8);\r\n          p5.translate(i * 40, 100);\r\n          break;\r\n        case 2:\r\n          p5.scale(1.2);\r\n          p5.translate(i * 40, -60);\r\n          break;\r\n        case 3:\r\n          p5.scale(1.2);\r\n          p5.translate(-i * 40, -60);\r\n          break;\r\n      }\r\n\r\n      inputFn(outputFn);\r\n\r\n      p5.pop();\r\n    }\r\n  };\r\n};\r\n',
        type: 'repeat',
      },
      {
        id: 'JasonRotationRepeater',
        name: 'Jason Rotation',
        content:
          'const maxRadius = 400;\r\nconst minRadius = 400;\r\nconst radius = lib.maxDrift(hash) % (maxRadius - minRadius) + minRadius;\r\nconst angle = lib.leading1s(hash) * 10;\r\nconst direction = lib.trailing1s(hash) >= 1 ? 1 : -1;\r\nlet rotation = 0;\r\n\r\nreturn function(inputFn) {\r\n    return function(outputFn) {\r\n        for (let i = 0; i < 12; i++) {\r\n            p5.push();\r\n            \r\n            // A: Rotate the canvas\r\n            p5.rotate(p5.radians(rotation));\r\n\r\n            // B: Move the canvas to the north of center by 50 pixels\r\n            const currentX = 0;\r\n            const currentY = -10;\r\n            p5.translate(currentX, currentY);\r\n\r\n            // Perform the shape drawing logic\r\n            inputFn(outputFn);\r\n\r\n            p5.pop();\r\n\r\n            // Increment the rotation by 30 degrees\r\n            rotation += 30;\r\n\r\n            // Move the canvas around the circle\r\n            const currentRadius = radius * p5.sin(p5.radians(i * angle * direction));\r\n            const offsetX = currentRadius * p5.cos(p5.radians(i));\r\n            const offsetY = currentRadius * p5.sin(p5.radians(i));\r\n            p5.translate(offsetX, offsetY);\r\n        }\r\n    };\r\n};\r\n',
        type: 'repeat',
      },
      {
        id: 'equalRepeater',
        name: 'Repeat All Equally',
        content:
          'const numRepeats = lib.maxDrift(hash);\r\n  const spacing = lib.longestStreakOf1s(hash);\r\n  const numRows = Math.ceil(p5.height / spacing);\r\n  const numCols = Math.ceil(numRepeats / numRows);\r\n  const xSpacing = (p5.width - spacing * numCols) / (numCols - 1);\r\n  const ySpacing = (p5.height - spacing * numRows) / (numRows - 1);\r\n\r\n  return function(inputFn) {\r\n    return function(outputFn) {\r\n      for (let i = 0; i < numRepeats; i++) {\r\n        const x = i % numCols;\r\n        const y = Math.floor(i / numCols);\r\n        const xOffset = p5.map(lib.hashAt(i, hash), 0, 15, -lib.maxDrift(hash), lib.maxDrift(hash));\r\n        const yOffset = p5.map(lib.hashAt(i + numRepeats, hash), 0, 15, -lib.maxDrift(hash), lib.maxDrift(hash));\r\n        p5.push();\r\n        p5.translate(x * (spacing + xSpacing), y * (spacing + ySpacing));\r\n        p5.translate(xOffset, yOffset);\r\n        inputFn(outputFn);\r\n        p5.pop();\r\n      }\r\n    };\r\n  };\r\n\r\n\r\n\r\n\r\n',
        type: 'repeat',
      },
      {
        id: 'verticalStripesRepeater',
        name: 'Vertical Stripes',
        content:
          'const numStripes = lib.maxDrift(hash);\r\n  const position = lib.trailing0s(hash);\r\n\r\n  return function (inputFn) {\r\n    return function (outputFn) {\r\n      let x = -20;\r\n      let y = 0;\r\n\r\n      while (x < p5.width) {\r\n        // Push transformation matrix\r\n        p5.push();\r\n        // Draw vertical line of boxes\r\n        for (let i = 0; i < numStripes; i++) {\r\n          p5.translate(x, y);\r\n          inputFn(outputFn);\r\n          y += 40;\r\n        }\r\n        p5.pop();\r\n        x += position * 3;\r\n        y = 0;\r\n      }\r\n    };\r\n  };',
        type: 'repeat',
      },
      {
        id: 'borderRepeater',
        name: 'Border',
        content:
          'const borderSize = lib.trailing0s(hash) + 1;\r\n  const borderSpacing = lib.leading1s(hash) + 1;\r\n\r\n  return function (inputFn) {\r\n    return function (outputFn) {\r\n      let x = borderSize;\r\n      let y = borderSize;\r\n\r\n      // Draw top border\r\n      for (let i = 0; i < p5.width; i += borderSpacing) {\r\n        p5.push();\r\n        p5.translate(x, y);\r\n        inputFn(outputFn);\r\n        p5.pop();\r\n        x += borderSpacing;\r\n      }\r\n\r\n      // Draw right border\r\n      x = p5.width - borderSize;\r\n      y = borderSize;\r\n      for (let i = 0; i < p5.height; i += borderSpacing) {\r\n        p5.push();\r\n        p5.translate(x, y);\r\n        inputFn(outputFn);\r\n        p5.pop();\r\n        y += borderSpacing;\r\n      }\r\n\r\n      // Draw bottom border\r\n      x = borderSize;\r\n      y = p5.height - borderSize;\r\n      for (let i = 0; i < p5.width; i += borderSpacing) {\r\n        p5.push();\r\n        p5.translate(x, y);\r\n        inputFn(outputFn);\r\n        p5.pop();\r\n        x += borderSpacing;\r\n      }\r\n\r\n      // Draw left border\r\n      x = borderSize;\r\n      y = borderSize;\r\n      for (let i = 0; i < p5.height; i += borderSpacing) {\r\n        p5.push();\r\n        p5.translate(x, y);\r\n        inputFn(outputFn);\r\n        p5.pop();\r\n        y += borderSpacing;\r\n      }\r\n    };\r\n  };\r\n',
        type: 'repeat',
      },
      {
        id: 'swirlRepeater',
        name: 'Swirl',
        content:
          'const maxRadius = 200;\r\n  const minRadius = 50;\r\n  const radius = lib.maxDrift(hash) % (maxRadius - minRadius) + minRadius;\r\n  const angle = lib.leading1s(hash) * 10;\r\n  const direction = lib.trailing1s(hash) >= 1 ? 1 : -1;\r\n\r\n  return function (inputFn) {\r\n    return function (outputFn) {\r\n      p5.push();\r\n      let x = 0;\r\n      let y = 0;\r\n      for (let i = 0; i < 360; i++) {\r\n        const currentRadius = radius * p5.sin(p5.radians(i * angle * direction));\r\n        const currentX = x + currentRadius * p5.cos(p5.radians(i));\r\n        const currentY = y + currentRadius * p5.sin(p5.radians(i));\r\n        p5.translate(currentX, currentY);\r\n        inputFn(outputFn);\r\n        p5.translate(-currentX, -currentY);\r\n      }\r\n      p5.pop();\r\n    };\r\n  };\r\n\r\n\r\n\r\n\r\n',
        type: 'repeat',
      },
      {
        id: 'splatter',
        name: 'Splatter',
        content:
          'return function(inputFn) {\r\n    return (outputFn) => {\r\n        inputFn(hash, outputFn);\r\n        var hexchar;\r\n        var num;\r\n        var coordinates = [];\r\n        for(var i = 0; i < hash.length; i++) {\r\n            hexchar = hash.substr(i, 1);\r\n            num = parseInt(hexchar, 16);\r\n            coordinates[i] = p5.round(num);\r\n        }\r\n        p5.strokeWeight(5);\r\n        p5.beginShape();\r\n        for(var i = 0; i < coordinates.length; i += 2) {\r\n            var scaledX = coordinates[i] * 5;\r\n            var scaledY = coordinates[i+1] * 5;\r\n            p5.vertex(scaledX, scaledY);\r\n        }\r\n        p5.endShape(p5.CLOSE);\r\n    }\r\n}',
        type: 'repeat',
      },
      {
        id: 'JasonSplatter',
        name: 'Jason Splatter',
        content:
          'return function(inputFn) {\r\n    return (outputFn) => {\r\n        inputFn(hash, outputFn);\r\n        var hexchar;\r\n        var num;\r\n        var coordinates = [];\r\n        for (var i = 0; i < hash.length; i++) {\r\n            hexchar = hash.substr(i, 1);\r\n            num = parseInt(hexchar, 16);\r\n            coordinates[i] = p5.round(num);\r\n        }\r\n        p5.strokeWeight(5);\r\n        p5.beginShape();\r\n\r\n        // Calculate center coordinates\r\n        var centerX = p5.width / 2;\r\n        var centerY = p5.height / 2;\r\n\r\n        // Translate to the center of the canvas\r\n        p5.translate(centerX, centerY);\r\n\r\n        for (var i = 0; i < coordinates.length; i += 2) {\r\n            var scaledX = coordinates[i] * 5;\r\n            var scaledY = coordinates[i + 1] * 5;\r\n\r\n            p5.vertex(scaledX, scaledY);\r\n        }\r\n        p5.endShape(p5.CLOSE);\r\n    }\r\n}\r\n',
        type: 'repeat',
      },
    ],
  },
  {
    description: 'Modify canvas before drawing.',
    type: 'pre-process',
    traits: [
      {
        id: 'JasonBackground',
        name: 'Jason Background',
        content:
          '\r\nreturn function(inputFn) {\r\n    return (outputFn) => {\r\n        inputFn(hash, outputFn);\r\n\r\n        var gp;\r\n        function setup() {\r\n  \t\t\tgp = createGraphics(400, 400);\r\n\t\t}\r\n        \r\n        var hexchar;\r\n        var num;\r\n        var coordinates = [];\r\n        for (var i = 0; i < hash.length; i++) {\r\n            hexchar = hash.substr(i, 1);\r\n            num = parseInt(hexchar, 16);\r\n            coordinates[i] = p5.round(num);\r\n        }\r\n  \r\n        let trimmedHashA = hash.slice(0, 63);\r\n        let a = trimmedHashA.slice(0, 21);\r\n        let b = trimmedHashA.slice(21, 42);\r\n        let c = trimmedHashA.slice(42, 63);\r\n        a = Math.round(parseInt(a, 16) / Math.pow(2, 76));\r\n        b = Math.round(parseInt(b, 16) / Math.pow(2, 76));\r\n        c = Math.round(parseInt(c, 16) / Math.pow(2, 76));\r\n\r\n        let Color1 = [a, b, c];\r\n\t\tlet Color2 = [b, c, a];\r\n        let Color3 = [c, a, b];\r\n           \r\n        p5.noFill();\r\n\r\n\t\t\t  \r\n\t\t\t\r\n\t\t\tp5.stroke(Color3);\r\n\t\t\t//p5.background(51);\r\n\t\t\t\r\n\t\t\tconst from = Color1;\r\n\t\t\tconst to = Color2;\r\n            //p5.text(from, 0, 50);\r\n            p5.colorMode(RGB);\r\n\t\t\tconst interA = p5.lerp(from, to, 0.33);\r\n            const interB = p5.lerp(from, to, 0.66);\r\n\t\t\t\r\n            p5.fill(from);\r\n\t\t\tp5.rect(10, 20, 20, 60);\r\n\t\t\tp5.fill(interA);\r\n\t\t\tp5.rect(30, 20, 20, 60);\r\n\t\t\tp5.fill(interB);\r\n\t\t\tp5.rect(50, 20, 20, 60);\r\n\t\t\tp5.fill(to);\r\n\t\t\tp5.rect(70, 20, 20, 60);\r\n\t\r\n\r\n\r\n    \r\n    }\r\n}',
        type: 'pre-process',
      },
      {
        id: 'fillShape',
        name: 'Fill Shape',
        content:
          'const colorData = [\r\n  {\r\n      "primaryColors":[[96,203,28],[203,28,96],[28,96,203]],"complimentaryColors":[[159,52,227],[52,227,159],[227,159,52]],"triadicColors":[[159,203,28],[96,52,28],[96,203,227]],"tetradicColors":[[203,28,159],[28,159,203],[159,203,28]]\r\n  },\r\n  {\r\n      "primaryColors":[[256,175,12],[175,12,256],[12,256,175]],"complimentaryColors":[[-1,80,243],[80,243,-1],[243,-1,80]],"triadicColors":[[-1,175,12],[256,80,12],[256,175,243]],"tetradicColors":[[175,12,-1],[12,-1,175],[-1,175,12]]\r\n  },\r\n  {   \r\n      "primaryColors":[[99,139,15],[139,15,99],[15,99,139]],"complimentaryColors":[[156,116,240],[116,240,156],[240,156,116]],"triadicColors":[[156,139,15],[99,116,15],[99,139,240]],"tetradicColors":[[139,15,156],[15,156,139],[156,139,15]]\r\n  },\r\n  {\r\n      "primaryColors":[[45,178,15],[178,15,45],[15,45,178]],"complimentaryColors":[[210,77,240],[77,240,210],[240,210,77]],"triadicColors":[[210,178,15],[45,77,15],[45,178,240]],"tetradicColors":[[178,15,210],[15,210,178],[210,178,15]]\r\n  }\r\n];\r\n\r\nconst colorSet = colorData[lib.leading0s(hash) % 4];\r\nconst colors = lib.trailing0s(hash) === 0\r\n  ? colorSet[\'primaryColors\']\r\n  : lib.trailing0s(hash) === 1\r\n  ? colorSet[\'complimentaryColors\']\r\n  : lib.trailing0s(hash) === 2\r\n  ? colorSet[\'triadicColors\']\r\n  : colorSet[\'tetradicColors\'];\r\n\r\nvar currentColor = 0;\r\n\r\nfunction changeColor() {\r\n    currentColor++;\r\n    if (currentColor >= colors.length) {\r\n      currentColor = 0;\r\n    }\r\n    return colors[currentColor];\r\n  }\r\n\r\nreturn function(inputFn) {\r\n  return (outputFn) => {\r\n    changeColor();\r\n    p5.stroke(colors[currentColor]);\r\n    changeColor();\r\n    p5.fill(colors[currentColor]);\r\n    inputFn(hash, outputFn);\r\n    \r\n\r\n  }\r\n}',
        type: 'pre-process',
      },
      {
        id: 'JasonFillShape',
        name: 'Jason Fill Shape',
        content:
          'const colorData = [\r\n  {\r\n      "primaryColors":[[96,203,28],[203,28,96],[28,96,203]],"complimentaryColors":[[159,52,227],[52,227,159],[227,159,52]],"triadicColors":[[159,203,28],[96,52,28],[96,203,227]],"tetradicColors":[[203,28,159],[28,159,203],[159,203,28]]\r\n  },\r\n  {\r\n      "primaryColors":[[256,175,12],[175,12,256],[12,256,175]],"complimentaryColors":[[-1,80,243],[80,243,-1],[243,-1,80]],"triadicColors":[[-1,175,12],[256,80,12],[256,175,243]],"tetradicColors":[[175,12,-1],[12,-1,175],[-1,175,12]]\r\n  },\r\n  {   \r\n      "primaryColors":[[99,139,15],[139,15,99],[15,99,139]],"complimentaryColors":[[156,116,240],[116,240,156],[240,156,116]],"triadicColors":[[156,139,15],[99,116,15],[99,139,240]],"tetradicColors":[[139,15,156],[15,156,139],[156,139,15]]\r\n  },\r\n  {\r\n      "primaryColors":[[45,178,15],[178,15,45],[15,45,178]],"complimentaryColors":[[210,77,240],[77,240,210],[240,210,77]],"triadicColors":[[210,178,15],[45,77,15],[45,178,240]],"tetradicColors":[[178,15,210],[15,210,178],[210,178,15]]\r\n  }\r\n];\r\n\r\nconst colorSet = colorData[lib.leading0s(hash) % 4];\r\nconst colors = lib.trailing0s(hash) === 0\r\n  ? colorSet[\'primaryColors\']\r\n  : lib.trailing0s(hash) === 1\r\n  ? colorSet[\'complimentaryColors\']\r\n  : lib.trailing0s(hash) === 2\r\n  ? colorSet[\'triadicColors\']\r\n  : colorSet[\'tetradicColors\'];\r\n\r\nvar currentColor = 0;\r\n\r\nfunction changeColor() {\r\n    currentColor++;\r\n    if (currentColor >= colors.length) {\r\n      currentColor = 0;\r\n    }\r\n    return colors[currentColor];\r\n  }\r\n\r\nreturn function(inputFn) {\r\n  return (outputFn) => {\r\n    changeColor();\r\n    p5.stroke(colors[currentColor]);\r\n    changeColor();\r\n    p5.fill(colors[currentColor]);\r\n    inputFn(hash, outputFn);\r\n  }\r\n}',
        type: 'pre-process',
      },
      {
        id: 'JasonColor',
        name: 'Jason Color',
        content:
          "return function(inputFn) {\r\n    return (outputFn) => {\r\n        inputFn(hash, outputFn);\r\n\r\n\r\nhash = hash.slice(2); // Truncate the '0x' from the hash \r\nvar hexchar;\r\nvar num;\r\nvar coordinates = [];\r\n\r\nfor (var i = 0; i < hash.length; i++) {\r\n  hexchar = hash.substr(i, 1);\r\n  num = parseInt(hexchar, 16);\r\n  coordinates[i] = p5.round(num);\r\n}\r\n\r\n// Loop to create 64 different RGB values based on ignoring 1 character in sequence\r\nconst colors = [];\r\n\r\nfor (var i = 0; i < 64; i++) {\r\n  let ignoredCharIndex = i; // Get the index of the character to ignore\r\n  let trimmedHash = \"\"; // Initialize an empty string to build the trimmed hash\r\n\r\n  for (var j = 0; j < hash.length; j++) {\r\n    if (j !== ignoredCharIndex) {\r\n      trimmedHash += hash[j]; // Build the trimmed hash excluding the ignored character\r\n    }\r\n  }\r\n\r\n  let a = trimmedHash.slice(0, 21);\r\n  let b = trimmedHash.slice(21, 42);\r\n  let c = trimmedHash.slice(42, 63);\r\n  a = Math.round(parseInt(a, 16) / Math.pow(2, 76));\r\n  b = Math.round(parseInt(b, 16) / Math.pow(2, 76));\r\n  c = Math.round(parseInt(c, 16) / Math.pow(2, 76));\r\n  colors[i] = [a, b, c]; // Store each RGB value in the colors array\r\n}\r\n\r\n  //this loop assigns the colors array to Color1, Color2 to Color64\r\n  for (let i = 0; i < colors.length; i++) {\r\n    window['Color' + (i + 1)] = colors[i];\r\n  }\r\n\r\n      let squareSize = 50;\r\n      let xStart = 0;\r\n      let yStart = 0;\r\n\r\n      for (let i = 0; i < 64; i++) {\r\n        let colorIndex = i % colors.length;\r\n        let x = xStart + (i % 8) * squareSize;\r\n        let y = yStart + Math.floor(i / 8) * squareSize;\r\n        p5.fill(colors[colorIndex]);\r\n        p5.square(x, y, squareSize);\r\n      }\r\n\r\n    }\r\n}",
        type: 'pre-process',
      },
      {
        id: 'arrangeShapes',
        name: 'Arrange Shapes',
        content:
          'let x = -20;\r\nlet y = 0;\r\nlet max_drift = lib.maxDrift(hash);\r\n\r\nreturn function(inputFn) {\r\n    return (outputFn) => {\r\n        while (x < p5.width) {\r\n            // Push transformation matrix\r\n            p5.push();\r\n            // Draw vertical line of boxes\r\n            for (let i = 0; i < 12; i++) {\r\n            p5.translate(x, y);\r\n            inputFn(outputFn);\r\n            y += 40;\r\n            }\r\n            p5.pop();\r\n            x += max_drift*3;\r\n            y = 0;\r\n        }\r\n\r\n        x=0;\r\n        while (x < p5.width) {\r\n            // Push transformation matrix\r\n            p5.push();\r\n            // Draw vertical line of boxes\r\n            for (let i = 0; i < 12; i++) {\r\n            p5.translate(x, y);\r\n            inputFn(outputFn);\r\n            y += 50; //this helps scale the y values up and down\r\n            }\r\n            p5.pop();\r\n            x += max_drift*3;\r\n            y = 0;\r\n        }\r\n    }\r\n}',
        type: 'pre-process',
      },
      {
        id: 'fractalTree',
        name: 'Fractal Tree',
        content:
          '\r\nangle = lib.mapAttribute(lib.maxDrift, hash, [10, 50], [0.1, p5.PI / 3]);\r\nlength = parseInt(lib.mapAttribute(lib.leading0s, hash, [0, 8], [50, 100]));\r\ndepth = parseInt(lib.mapAttribute(lib.longestStreakOf0s, hash, [4, 14], [2, 14]));\r\nleafSize = parseInt(lib.mapAttribute(lib.trailing0s, hash, [0, 8], [0, 50]));\r\n\r\nreturn function(inputFn) {\r\n    return (outputFn) => {\r\n        inputFn(outputFn);\r\n        p5.push();\r\n        p5.translate(p5.width / 2, p5.height);\r\n        branch(length, depth);\r\n        p5.pop();\r\n    }\r\n}\r\n\r\nfunction branch(len, depth) {\r\n  p5.line(0, 0, 0, -len);\r\n  p5.translate(0, -len);\r\n  if (depth > 0) {\r\n    p5.push();\r\n    p5.rotate(angle);\r\n    branch(len * 0.67, depth - 1);\r\n    p5.pop();\r\n    p5.push();\r\n    p5.rotate(-angle);\r\n    branch(len * 0.67, depth - 1);\r\n    p5.pop();\r\n    if (depth === 1) {\r\n      drawLeaf();\r\n    }\r\n  }\r\n}\r\n\r\nfunction drawLeaf() {\r\n  const leafPoints = [];\r\n  leafPoints.push({ x: 0, y: 0 });\r\n  leafPoints.push({ x: -leafSize/2, y: -leafSize });\r\n  leafPoints.push({ x: 0, y: -leafSize/2 });\r\n  leafPoints.push({ x: leafSize/2, y: -leafSize });\r\n  \r\n  p5.beginShape();\r\n \r\n  for (let i = 0; i < leafPoints.length; i++) {\r\n    p5.vertex(leafPoints[i].x, leafPoints[i].y);\r\n  }\r\n  p5.endShape(p5.CLOSE);\r\n}',
        type: 'pre-process',
      },
    ],
  },
  {
    description: 'Modify canvas after drawing.',
    type: 'post-process',
    traits: [
      {
        id: 'blurTrait',
        name: 'Blur',
        content:
          '  let blurAmount = lib.longestStreakOf0s(hash);\r\n  \r\n  return function(inputFn) {\r\n    return function(outputFn) {\r\n        inputFn(outputFn);\r\n        p5.loadPixels();\r\n        p5.filter(p5.BLUR, blurAmount);\r\n    }\r\n  }\r\n',
        type: 'post-process',
      },
      {
        id: 'pixelateTrait',
        name: 'Pixelate',
        content:
          '    let pixelSize = lib.longestStreakOf1s(hash);\r\n  \r\n  return function(inputFn) {\r\n    return function(outputFn) {\r\n        inputFn(outputFn);\r\n        p5.loadPixels();\r\n        for (let x = 0; x < p5.width; x += pixelSize) {\r\n            for (let y = 0; y < p5.height; y += pixelSize) {\r\n                let c = p5.get(x, y);\r\n                for (let i = x; i < x + pixelSize && i < p5.width; i++) {\r\n                    for (let j = y; j < y + pixelSize && j < p5.height; j++) {\r\n                        p5.set(i, j, c);\r\n                    }\r\n                }\r\n            }\r\n        }\r\n        p5.updatePixels();\r\n    }\r\n  }\r\n',
        type: 'post-process',
      },
      {
        id: 'JasonExploreLib',
        name: 'Jason Explore Lib',
        content:
          '// This it the trait wrapper area where\r\n// you will have access to the variables\r\n// p5, lib (utility library), and hash\r\n\r\nreturn function(inputFn) {\r\n    return (outputFn) => {\r\n\r\n      p5.text("Hash is " + hash, 30, 50);\r\n      p5.text("maxDrift is " + lib.maxDrift(hash), 30,70);\r\n      p5.text("leading0s is " + lib.leading0s(hash), 30,90);\r\n      p5.text("leading1s is " + lib.leading1s(hash), 30,110);\r\n      p5.text("trailing0s is " + lib.trailing0s(hash), 30,130);\r\n      p5.text("trailing1s is " + lib.trailing1s(hash), 30,150);\r\n      p5.text("longestStreakof0s is " + lib.longestStreakOf0s(hash), 30,170);\r\n      p5.text("longestStreakof1s is " + lib.longestStreakOf1s(hash), 30,190);\r\n\r\n\r\n//**********FUNCTION TO COUNT 1s and 0s\r\n\r\nlet hexValue = hash;\r\nlet count0s = 0;\r\nlet count1s = 0;\r\n\r\nhexValue = hexValue.slice(2);\r\nlet binaryValue = parseInt(hexValue, 16).toString(2);\r\np5.text("hexValue is " + hexValue, 30,210);\r\np5.text("binaryValue is " + binaryValue, 30,230);\r\ncount0s = countOccurrences(binaryValue, \'0\');\r\ncount1s = countOccurrences(binaryValue, \'1\');\r\n\r\n  p5.text("Original Hex Value: " + hexValue, 50, 250);\r\n  p5.text("Binary Value: " + binaryValue, 50, 270);\r\n  p5.text("Count0s: " + count0s, 50, 290);\r\n  p5.text("Count1s: " + count1s, 50, 310);\r\n\r\nfunction hexToBinary(hexString) {\r\n  let hexNumber = BigInt("0x" + hexString);\r\n  let binaryString = hexNumber.toString(2);\r\n  return binaryString;\r\n}\r\n\r\nfunction countOccurrences(string, char) {\r\n  let count = 0;\r\n  for (let i = 0; i < string.length; i++) {\r\n    if (string[i] === char) {\r\n      count++;\r\n    }\r\n  }\r\n  return count;\r\n}\r\n\r\nlet percent0s = count0s / binaryValue.length;\r\nlet percent1s = count1s / binaryValue.length;\r\n\r\np5.text("percent0s: " + percent0s, 50, 330);\r\np5.text("percent1s: " + percent1s, 50, 350);\r\n\r\n//***** \r\n\r\n};\r\n\r\n};',
        type: 'post-process',
      },
      {
        id: 'JasonSquareEntropy',
        name: 'Jason Square Entropy',
        content:
          "return function(inputFn) {\r\n    return (outputFn) => {\r\n        inputFn(hash, outputFn);\r\n\r\n        //initialization variables  \r\n        let newHashes = [];\r\n        hash = hash.slice(2); // Truncate the '0x' from the hash \r\n        const colors = [];\r\n        generateNewHashes(hash);\r\n        assignColors();\r\n\r\n\r\n        //function to generate 64 new hashes, 63 digits long, from the base hash by rearranging the order\r\n        function generateNewHashes(initialHash) {\r\n          for (let n = 0; n < initialHash.length; n++) {\r\n            let newHash = \"\";\r\n            // Ignore the character at position n\r\n            let partialHash = initialHash.substring(0, n) + initialHash.substring(n + 1);\r\n            newHash += partialHash.substring(n);\r\n            newHash += partialHash.substring(0, n);\r\n            newHashes.push(newHash);\r\n          }\r\n        }\r\n\r\n        //function to assign colors to each of the 64 new hashes by taking three 21-digit chunks and converting to RGB values\r\n        function assignColors() {\r\n          for (let i = 0; i < newHashes.length; i++) {\r\n            let a = newHashes[i].slice(0, 21);\r\n            let b = newHashes[i].slice(21, 42);\r\n            let c = newHashes[i].slice(42, 63);\r\n            a = Math.round(parseInt(a, 16) / Math.pow(2, 76));\r\n            b = Math.round(parseInt(b, 16) / Math.pow(2, 76));\r\n            c = Math.round(parseInt(c, 16) / Math.pow(2, 76));\r\n            colors[i] = [a, b, c];\r\n          }\r\n        }\r\n\r\n        //sets up variables for a grid of square with size = maxDrift for entropy\r\n        let squareSize = lib.maxDrift(hash);\r\n        let canvasSize = 400;\r\n        let xStart = 0;\r\n        let yStart = 0;\r\n        let numCols = Math.floor(canvasSize / squareSize);\r\n        let numRows = Math.floor(canvasSize / squareSize);\r\n        let totalSquares = numCols * numRows;\r\n        let colorIndex = 0;\r\n\r\n        //assigns colors based on rotating through the 64 Colors made before to each square in a grid that fits the canvas\r\n        for (let i = 0; i < colors.length; i++) {\r\n          window['Color' + (i + 1)] = colors[i];\r\n        }\r\n        let x = 0;\r\n        let y = 0;\r\n        for (let i = 0; i < totalSquares; i++) {\r\n          if (i >= totalSquares) {\r\n            colorIndex = 0;\r\n          } else {\r\n            colorIndex = i % colors.length;\r\n          }\r\n          let x = xStart + (i % numCols) * squareSize;\r\n          let y = yStart + Math.floor(i / numCols) * squareSize;\r\n          p5.fill(colors[colorIndex]);\r\n          p5.square(x, y, squareSize);\r\n        } \r\n\r\n\r\n\r\n    } //closes output function\r\n}",
        type: 'post-process',
      },
      {
        id: 'mosaicTrait',
        name: 'Mosaic',
        content:
          '  const tileSize = lib.longestStreakOf1s(hash);\r\n  const numRows = Math.ceil(p5.height / tileSize);\r\n  const numCols = Math.ceil(p5.width / tileSize);\r\n\r\n  return function(inputFn) {\r\n    return function(outputFn) {\r\n      inputFn(outputFn);\r\n      const pixels = p5.pixels;\r\n        // Create new pixels array\r\n        const newPixels = [];\r\n\r\n        // Iterate over each tile\r\n        for (let row = 0; row < numRows; row++) {\r\n          for (let col = 0; col < numCols; col++) {\r\n            // Get the average color of the current tile\r\n            let r = 0,\r\n              g = 0,\r\n              b = 0;\r\n            let count = 0;\r\n            for (let i = 0; i < tileSize; i++) {\r\n              const y = row * tileSize + i;\r\n              if (y >= p5.height) continue;\r\n              for (let j = 0; j < tileSize; j++) {\r\n                const x = col * tileSize + j;\r\n                if (x >= p5.width) continue;\r\n                const index = (y * p5.width + x) * 4;\r\n                r += pixels[index];\r\n                g += pixels[index + 1];\r\n                b += pixels[index + 2];\r\n                count++;\r\n              }\r\n            }\r\n            r /= count;\r\n            g /= count;\r\n            b /= count;\r\n\r\n            // Set the color of each pixel in the tile to the average color\r\n            for (let i = 0; i < tileSize; i++) {\r\n              const y = row * tileSize + i;\r\n              if (y >= p5.height) continue;\r\n              for (let j = 0; j < tileSize; j++) {\r\n                const x = col * tileSize + j;\r\n                if (x >= p5.width) continue;\r\n                const index = (y * p5.width + x) * 4;\r\n                newPixels[index] = r;\r\n                newPixels[index + 1] = g;\r\n                newPixels[index + 2] = b;\r\n                newPixels[index + 3] = 255;\r\n              }\r\n            }\r\n          }\r\n        }\r\n\r\n        // Set the pixels array and update the canvas\r\n        p5.loadPixels();\r\n        for (let i = 0; i < pixels.length; i++) {\r\n          pixels[i] = newPixels[i];\r\n        }\r\n        p5.updatePixels();\r\n    };\r\n  };\r\n',
        type: 'post-process',
      },
      {
        id: 'stretcherTrait',
        name: 'Stretch Trait',
        content:
          'const skewX = lib.maxDrift(hash) / 10;\r\nconst skewY = lib.longestStreakOf0s(hash) / 10;\r\n\r\nreturn function (inputFn) {\r\n  return function (outputFn) {\r\n      p5.push();\r\n      p5.applyMatrix(1, skewX, 0, skewY, 0, 0);\r\n      inputFn(outputFn);\r\n      p5.pop();\r\n  };\r\n};\r\n',
        type: 'post-process',
      },
      {
        id: 'swirlTrait',
        name: 'Swirl',
        content:
          '\r\n  const minRadius = 20;\r\n  const maxRadius = 200;\r\n  const numTurns = 2 + lib.trailing0s(hash) % 3;\r\n  const rotationDir = lib.leading0s(hash) >= 1 ? 1 : -1;\r\n\r\n  return function (inputFn) {\r\n    return function (outputFn) {\r\n      p5.push();\r\n      p5.noFill();\r\n      p5.strokeWeight(5);\r\n      p5.beginShape();\r\n      let currentRadius = maxRadius;\r\n      for (let theta = 0; theta < numTurns * p5.TWO_PI; theta += 0.1) {\r\n        const r = currentRadius * p5.sin(theta);\r\n        const x = r * p5.cos(theta);\r\n        const y = r * p5.sin(theta);\r\n        p5.curveVertex(x, y);\r\n        currentRadius -= (maxRadius - minRadius) / (numTurns * p5.TWO_PI / 0.1);\r\n        currentRadius = p5.max(currentRadius, minRadius);\r\n      }\r\n      p5.endShape();\r\n      p5.pop();\r\n\r\n      inputFn(outputFn);\r\n    };\r\n  };\r\n',
        type: 'post-process',
      },
      {
        id: 'fractalDistortion',
        name: 'Fractal Distortion',
        content:
          'let longest_streak_of_0s = lib.longestStreakOf0s(hash);\r\nlet longest_streak_of_1s = lib.longestStreakOf1s(hash);\r\nlet max_drift = lib.maxDrift(hash);\r\nlet cosdistortion = (longest_streak_of_0s/256);\r\nlet sindistortion = (longest_streak_of_1s/256);\r\nlet noiseScale = max_drift/10;\r\nlet distortionStrength = max_drift;\r\n\r\nreturn function(inputFn) {\r\n    return (outputFn) => {\r\n        inputFn(hash, outputFn);\r\n        p5.loadPixels();\r\n        for (let x = 0; x < p5.width; x++) {\r\n            for (let y = 0; y < p5.height; y++) {\r\n                let d = p5.dist(x, y, p5.width / 2, p5.height / 2);\r\n                let offset = p5.map(p5.noise(x * noiseScale, y * noiseScale), 0, 1, -distortionStrength, distortionStrength);\r\n                let sx = x + offset * p5.cos(d * cosdistortion);\r\n                let sy = y + offset * p5.sin(d * sindistortion);\r\n                let px = p5.constrain(p5.round(sx), 0, p5.width - 1);\r\n                let py = p5.constrain(p5.round(sy), 0, p5.height - 1);\r\n                let col = p5.get(px, py);\r\n                p5.set(x, y, col);\r\n            }\r\n        }\r\n        p5.updatePixels();\r\n    }\r\n}',
        type: 'post-process',
      },
    ],
  },
];

function mapTraitsToSections(traits: any) {
  return traitSectionMapping.map((section) => {
    const sectionTraits = traits.filter((trait: any) => trait.type === section.type);
    return {
      ...section,
      traits: sectionTraits,
    };
  });
}

export default async function Traits() {
  // const supabase = createServerComponentClient({ cookies });
  // const { data: traits } = await supabase.from('traits').select();
  // const parsedTraits = mapTraitsToSections(traits);

  return (
    <DragDropContext onDragEnd={() => {}}>
      {parsedTraits?.map(({ description, type, traits }) => (
        <TraitSet key={type} title={type.toUpperCase()} info={description}>
          <Droppable droppableId={type}>
            {(provided) => (
              <ul ref={provided.innerRef} {...provided.droppableProps}>
                {traits.map(({ id, name, content }: any, index: number) => (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided) => (
                      <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        {/* <DragTrait key={id} name={name} value={{ id, content }} /> */}
                        {name}
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}

            {/* @ts-ignore-next-line */}
            {/* {traits.map(({ id, name, content }) => (
              <DragTrait key={id} name={name} value={{ id, content }} />
            ))} */}
          </Droppable>
        </TraitSet>
      ))}
    </DragDropContext>
  );
}
