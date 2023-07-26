export const traits = [
  {
    section: 'Drawing',
    description: 'Draw elements on the canvas.',
    traits: [
      {
        id: 'makeCircle',
        name: 'Circle',
        functionContent:
          'const size = 10 + lib.leading0s(hash) * 10;\n\nreturn function(inputFn) {\n    return (outputFn) => {\n        inputFn(hash, outputFn);\n        p5.circle(0,0,size);\n    }\n}',
      },
      {
        id: 'makeSquare',
        name: 'Square',
        functionContent:
          'const size = 20 + lib.leading1s(hash) * 10;\n\nreturn function(inputFn) {\n    return (outputFn) => {\n        inputFn(outputFn);\n        p5.rect(0,0,size,size);\n    }\n}',
      },
      {
        id: 'JasonSimpleSquare',
        name: 'Jason Simple Square',
        functionContent:
          'return function(inputFn) {\n    return (outputFn) => {\n        inputFn(hash, outputFn);\n\n        //initialization variables  \n        let newHashes = [];\n        hash = hash.slice(2); // Truncate the \'0x\' from the hash \n        const colors = [];\n        generateNewHashes(hash);\n        assignColors();\n\n\nfunction generateNewHashes(initialHash) {\n  for (let n = 0; n < initialHash.length; n++) {\n    let newHash = "";\n\n    // Ignore the character at position n\n    let partialHash = initialHash.substring(0, n) + initialHash.substring(n + 1);\n\n    // Start the first chunk at character hash[n+1]\n    newHash += partialHash.substring(n);\n\n    // Append characters from position 0 to n-1\n    newHash += partialHash.substring(0, n);\n\n    newHashes.push(newHash);\n  }\n}\n\nfunction assignColors() {\n  for (let i = 0; i < newHashes.length; i++) {\n    let a = newHashes[i].slice(0, 21);\n    let b = newHashes[i].slice(21, 42);\n    let c = newHashes[i].slice(42, 63);\n\n    a = Math.round(parseInt(a, 16) / Math.pow(2, 76));\n    b = Math.round(parseInt(b, 16) / Math.pow(2, 76));\n    c = Math.round(parseInt(c, 16) / Math.pow(2, 76));\n\n    colors[i] = [a, b, c];\n  }\n}\n\n\n  //this loop assigns the colors array to Color1, Color2...to Color64\n  for (let i = 0; i < colors.length; i++) {\n    window[\'Color\' + (i + 1)] = colors[i];\n  }\n\n      let squareSize = 50;\n      let xStart = 0;\n      let yStart = 0;\n      p5.text("Color1 " + Color1, 0,20);\n      p5.text("Color2 " + Color2, 0,50);\n\n //temporarily closed loop that draws the squares --> sort the colors first!\n      for (let i = 0; i < 64; i++) {\n        let colorIndex = i % colors.length;\n        let x = xStart + (i % 8) * squareSize;\n        let y = yStart + Math.floor(i / 8) * squareSize;\n        p5.fill(colors[colorIndex]);\n        p5.square(x, y, squareSize);\n      }\n\n\n    } //closes output function\n}',
      },
      {
        id: 'JasonSquare',
        name: 'Jason Square',
        functionContent:
          'const size = 20 + lib.leading1s(hash) * 10;\n\nreturn function(inputFn) {\n  return (outputFn) => {\n    inputFn(outputFn);\n\n    for (let i = 0; i < 12; i++) {\n      p5.push(); // Push the current drawing state onto the stack\n      p5.translate(p5.width / 2, p5.height / 2); // Translate to the center of the canvas\n      p5.rotate(p5.radians(i * 30)); // Rotate the canvas by 30 degrees times the iteration\n\n      // Calculate the position of the square\n      const xPos = 0;\n      const yPos = -25 - size / 2;\n\n      p5.rect(xPos, yPos, size, size); // Draw the square\n\n      p5.pop(); // Restore the previous drawing state from the stack\n    }\n  };\n};\n',
      },
      {
        id: 'JasonRectangleGrid',
        name: 'Jason Rectangle Grid',
        functionContent:
          '// This it the trait wrapper area where\n// you will have access to the variables\n// p5, lib (utility library), and hash\n\nreturn function(inputFn) {\n    return (outputFn) => {\n        // The contents of the trait usually goes inside\n        // of this function\n\n        let [Color1, Color2, Color3, Color4, Color5, Color6, Color7, Color8, Color9, Color10, Color11, Color12,\n     ColorB1, ColorB2, ColorB3, ColorB4, ColorB5, ColorB6, ColorB7, ColorB8, ColorB9, ColorB10, ColorB11, ColorB12,\n     ColorC1, ColorC2, ColorC3, ColorC4, ColorC5, ColorC6, ColorC7, ColorC8, ColorC9, ColorC10, ColorC11, ColorC12,\n     ColorD1, ColorD2, ColorD3, ColorD4, ColorD5, ColorD6, ColorD7, ColorD8, ColorD9, ColorD10, ColorD11, ColorD12] = colors;\n\n\n    }\n}',
      },
    ],
  },
  {
    section: 'Repeater',
    description: 'Repeat a trait sequence to create patterns.',
    traits: [
      {
        id: 'horizontalRepeater',
        name: 'Horizontal',
        functionContent:
          'let numRepeats = parseInt(lib.mapAttribute(\n    lib.longestStreakOf1s,\n    hash,\n    [4, 14],\n    [2, 10]\n));\n\nreturn function(inputFn) {\n    return (outputFn) => {\n        for(let i = 0; i < numRepeats; i++) {\n            p5.push();\n            switch (i % 4) {\n                case 0:\n                    p5.scale(0.8);\n                    p5.translate(-i * 40, 100);\n                    break;\n                case 1:\n                    p5.scale(0.8);\n                    p5.translate(i * 40, 100);\n                    break;\n                case 2:\n                    p5.scale(1.2);\n                    p5.translate(i * 40, -60);\n                    break;\n                case 3:\n                    p5.scale(1.2);\n                    p5.translate(-i * 40, -60);\n                    break;\n            }\n            inputFn(outputFn);\n            p5.pop();\n        }\n    }\n}',
      },
      {
        id: 'JasonHorizontalRepeater',
        name: 'Jason Horizontal',
        functionContent:
          'let numRepeats = parseInt(lib.mapAttribute(\n  lib.longestStreakOf1s,\n  hash,\n  [4, 14],\n  [2, 10]\n));\n\n\n\nreturn function(inputFn) {\n  return (outputFn) => {\n    for (let i = 0; i < numRepeats; i++) {\n      p5.push();\n\n      switch (i % 4) {\n        case 0:\n          p5.scale(0.8);\n          p5.translate(-i * 40, 100);\n          break;\n        case 1:\n          p5.scale(0.8);\n          p5.translate(i * 40, 100);\n          break;\n        case 2:\n          p5.scale(1.2);\n          p5.translate(i * 40, -60);\n          break;\n        case 3:\n          p5.scale(1.2);\n          p5.translate(-i * 40, -60);\n          break;\n      }\n\n      inputFn(outputFn);\n\n      p5.pop();\n    }\n  };\n};\n',
      },
      {
        id: 'JasonRotationRepeater',
        name: 'Jason Rotation',
        functionContent:
          'const maxRadius = 400;\nconst minRadius = 400;\nconst radius = lib.maxDrift(hash) % (maxRadius - minRadius) + minRadius;\nconst angle = lib.leading1s(hash) * 10;\nconst direction = lib.trailing1s(hash) >= 1 ? 1 : -1;\nlet rotation = 0;\n\nreturn function(inputFn) {\n    return function(outputFn) {\n        for (let i = 0; i < 12; i++) {\n            p5.push();\n            \n            // A: Rotate the canvas\n            p5.rotate(p5.radians(rotation));\n\n            // B: Move the canvas to the north of center by 50 pixels\n            const currentX = 0;\n            const currentY = -10;\n            p5.translate(currentX, currentY);\n\n            // Perform the shape drawing logic\n            inputFn(outputFn);\n\n            p5.pop();\n\n            // Increment the rotation by 30 degrees\n            rotation += 30;\n\n            // Move the canvas around the circle\n            const currentRadius = radius * p5.sin(p5.radians(i * angle * direction));\n            const offsetX = currentRadius * p5.cos(p5.radians(i));\n            const offsetY = currentRadius * p5.sin(p5.radians(i));\n            p5.translate(offsetX, offsetY);\n        }\n    };\n};\n',
      },
      {
        id: 'equalRepeater',
        name: 'Repeat All Equally',
        functionContent:
          'const numRepeats = lib.maxDrift(hash);\n  const spacing = lib.longestStreakOf1s(hash);\n  const numRows = Math.ceil(p5.height / spacing);\n  const numCols = Math.ceil(numRepeats / numRows);\n  const xSpacing = (p5.width - spacing * numCols) / (numCols - 1);\n  const ySpacing = (p5.height - spacing * numRows) / (numRows - 1);\n\n  return function(inputFn) {\n    return function(outputFn) {\n      for (let i = 0; i < numRepeats; i++) {\n        const x = i % numCols;\n        const y = Math.floor(i / numCols);\n        const xOffset = p5.map(lib.hashAt(i, hash), 0, 15, -lib.maxDrift(hash), lib.maxDrift(hash));\n        const yOffset = p5.map(lib.hashAt(i + numRepeats, hash), 0, 15, -lib.maxDrift(hash), lib.maxDrift(hash));\n        p5.push();\n        p5.translate(x * (spacing + xSpacing), y * (spacing + ySpacing));\n        p5.translate(xOffset, yOffset);\n        inputFn(outputFn);\n        p5.pop();\n      }\n    };\n  };\n\n\n\n\n',
      },
      {
        id: 'verticalStripesRepeater',
        name: 'Vertical Stripes',
        functionContent:
          'const numStripes = lib.maxDrift(hash);\n  const position = lib.trailing0s(hash);\n\n  return function (inputFn) {\n    return function (outputFn) {\n      let x = -20;\n      let y = 0;\n\n      while (x < p5.width) {\n        // Push transformation matrix\n        p5.push();\n        // Draw vertical line of boxes\n        for (let i = 0; i < numStripes; i++) {\n          p5.translate(x, y);\n          inputFn(outputFn);\n          y += 40;\n        }\n        p5.pop();\n        x += position * 3;\n        y = 0;\n      }\n    };\n  };',
      },
      {
        id: 'borderRepeater',
        name: 'Border',
        functionContent:
          'const borderSize = lib.trailing0s(hash) + 1;\n  const borderSpacing = lib.leading1s(hash) + 1;\n\n  return function (inputFn) {\n    return function (outputFn) {\n      let x = borderSize;\n      let y = borderSize;\n\n      // Draw top border\n      for (let i = 0; i < p5.width; i += borderSpacing) {\n        p5.push();\n        p5.translate(x, y);\n        inputFn(outputFn);\n        p5.pop();\n        x += borderSpacing;\n      }\n\n      // Draw right border\n      x = p5.width - borderSize;\n      y = borderSize;\n      for (let i = 0; i < p5.height; i += borderSpacing) {\n        p5.push();\n        p5.translate(x, y);\n        inputFn(outputFn);\n        p5.pop();\n        y += borderSpacing;\n      }\n\n      // Draw bottom border\n      x = borderSize;\n      y = p5.height - borderSize;\n      for (let i = 0; i < p5.width; i += borderSpacing) {\n        p5.push();\n        p5.translate(x, y);\n        inputFn(outputFn);\n        p5.pop();\n        x += borderSpacing;\n      }\n\n      // Draw left border\n      x = borderSize;\n      y = borderSize;\n      for (let i = 0; i < p5.height; i += borderSpacing) {\n        p5.push();\n        p5.translate(x, y);\n        inputFn(outputFn);\n        p5.pop();\n        y += borderSpacing;\n      }\n    };\n  };\n',
      },
      {
        id: 'swirlRepeater',
        name: 'Swirl',
        functionContent:
          'const maxRadius = 200;\n  const minRadius = 50;\n  const radius = lib.maxDrift(hash) % (maxRadius - minRadius) + minRadius;\n  const angle = lib.leading1s(hash) * 10;\n  const direction = lib.trailing1s(hash) >= 1 ? 1 : -1;\n\n  return function (inputFn) {\n    return function (outputFn) {\n      p5.push();\n      let x = 0;\n      let y = 0;\n      for (let i = 0; i < 360; i++) {\n        const currentRadius = radius * p5.sin(p5.radians(i * angle * direction));\n        const currentX = x + currentRadius * p5.cos(p5.radians(i));\n        const currentY = y + currentRadius * p5.sin(p5.radians(i));\n        p5.translate(currentX, currentY);\n        inputFn(outputFn);\n        p5.translate(-currentX, -currentY);\n      }\n      p5.pop();\n    };\n  };\n\n\n\n\n',
      },
      {
        id: 'splatter',
        name: 'Splatter',
        functionContent:
          'return function(inputFn) {\n    return (outputFn) => {\n        inputFn(hash, outputFn);\n        var hexchar;\n        var num;\n        var coordinates = [];\n        for(var i = 0; i < hash.length; i++) {\n            hexchar = hash.substr(i, 1);\n            num = parseInt(hexchar, 16);\n            coordinates[i] = p5.round(num);\n        }\n        p5.strokeWeight(5);\n        p5.beginShape();\n        for(var i = 0; i < coordinates.length; i += 2) {\n            var scaledX = coordinates[i] * 5;\n            var scaledY = coordinates[i+1] * 5;\n            p5.vertex(scaledX, scaledY);\n        }\n        p5.endShape(p5.CLOSE);\n    }\n}',
      },
      {
        id: 'JasonSplatter',
        name: 'Jason Splatter',
        functionContent:
          'return function(inputFn) {\n    return (outputFn) => {\n        inputFn(hash, outputFn);\n        var hexchar;\n        var num;\n        var coordinates = [];\n        for (var i = 0; i < hash.length; i++) {\n            hexchar = hash.substr(i, 1);\n            num = parseInt(hexchar, 16);\n            coordinates[i] = p5.round(num);\n        }\n        p5.strokeWeight(5);\n        p5.beginShape();\n\n        // Calculate center coordinates\n        var centerX = p5.width / 2;\n        var centerY = p5.height / 2;\n\n        // Translate to the center of the canvas\n        p5.translate(centerX, centerY);\n\n        for (var i = 0; i < coordinates.length; i += 2) {\n            var scaledX = coordinates[i] * 5;\n            var scaledY = coordinates[i + 1] * 5;\n\n            p5.vertex(scaledX, scaledY);\n        }\n        p5.endShape(p5.CLOSE);\n    }\n}\n',
      },
    ],
  },
  {
    section: 'Pre-Process',
    description: 'Modify canvas before drawing (ex: setup the background, adjust stroke, fill).',
    traits: [
      {
        id: 'JasonBackground',
        name: 'Jason Background',
        functionContent:
          '\nreturn function(inputFn) {\n    return (outputFn) => {\n        inputFn(hash, outputFn);\n\n        var gp;\n        function setup() {\n  \t\t\tgp = createGraphics(400, 400);\n\t\t}\n        \n        var hexchar;\n        var num;\n        var coordinates = [];\n        for (var i = 0; i < hash.length; i++) {\n            hexchar = hash.substr(i, 1);\n            num = parseInt(hexchar, 16);\n            coordinates[i] = p5.round(num);\n        }\n  \n        let trimmedHashA = hash.slice(0, 63);\n        let a = trimmedHashA.slice(0, 21);\n        let b = trimmedHashA.slice(21, 42);\n        let c = trimmedHashA.slice(42, 63);\n        a = Math.round(parseInt(a, 16) / Math.pow(2, 76));\n        b = Math.round(parseInt(b, 16) / Math.pow(2, 76));\n        c = Math.round(parseInt(c, 16) / Math.pow(2, 76));\n\n        let Color1 = [a, b, c];\n\t\tlet Color2 = [b, c, a];\n        let Color3 = [c, a, b];\n           \n        p5.noFill();\n\n\t\t\t  \n\t\t\t\n\t\t\tp5.stroke(Color3);\n\t\t\t//p5.background(51);\n\t\t\t\n\t\t\tconst from = Color1;\n\t\t\tconst to = Color2;\n            //p5.text(from, 0, 50);\n            p5.colorMode(RGB);\n\t\t\tconst interA = p5.lerp(from, to, 0.33);\n            const interB = p5.lerp(from, to, 0.66);\n\t\t\t\n            p5.fill(from);\n\t\t\tp5.rect(10, 20, 20, 60);\n\t\t\tp5.fill(interA);\n\t\t\tp5.rect(30, 20, 20, 60);\n\t\t\tp5.fill(interB);\n\t\t\tp5.rect(50, 20, 20, 60);\n\t\t\tp5.fill(to);\n\t\t\tp5.rect(70, 20, 20, 60);\n\t\n\n\n    \n    }\n}',
      },
      {
        id: 'fillShape',
        name: 'Fill Shape',
        functionContent:
          'const colorData = [\n  {\n      "primaryColors":[[96,203,28],[203,28,96],[28,96,203]],"complimentaryColors":[[159,52,227],[52,227,159],[227,159,52]],"triadicColors":[[159,203,28],[96,52,28],[96,203,227]],"tetradicColors":[[203,28,159],[28,159,203],[159,203,28]]\n  },\n  {\n      "primaryColors":[[256,175,12],[175,12,256],[12,256,175]],"complimentaryColors":[[-1,80,243],[80,243,-1],[243,-1,80]],"triadicColors":[[-1,175,12],[256,80,12],[256,175,243]],"tetradicColors":[[175,12,-1],[12,-1,175],[-1,175,12]]\n  },\n  {   \n      "primaryColors":[[99,139,15],[139,15,99],[15,99,139]],"complimentaryColors":[[156,116,240],[116,240,156],[240,156,116]],"triadicColors":[[156,139,15],[99,116,15],[99,139,240]],"tetradicColors":[[139,15,156],[15,156,139],[156,139,15]]\n  },\n  {\n      "primaryColors":[[45,178,15],[178,15,45],[15,45,178]],"complimentaryColors":[[210,77,240],[77,240,210],[240,210,77]],"triadicColors":[[210,178,15],[45,77,15],[45,178,240]],"tetradicColors":[[178,15,210],[15,210,178],[210,178,15]]\n  }\n];\n\nconst colorSet = colorData[lib.leading0s(hash) % 4];\nconst colors = lib.trailing0s(hash) === 0\n  ? colorSet[\'primaryColors\']\n  : lib.trailing0s(hash) === 1\n  ? colorSet[\'complimentaryColors\']\n  : lib.trailing0s(hash) === 2\n  ? colorSet[\'triadicColors\']\n  : colorSet[\'tetradicColors\'];\n\nvar currentColor = 0;\n\nfunction changeColor() {\n    currentColor++;\n    if (currentColor >= colors.length) {\n      currentColor = 0;\n    }\n    return colors[currentColor];\n  }\n\nreturn function(inputFn) {\n  return (outputFn) => {\n    changeColor();\n    p5.stroke(colors[currentColor]);\n    changeColor();\n    p5.fill(colors[currentColor]);\n    inputFn(hash, outputFn);\n    \n\n  }\n}',
      },
      {
        id: 'JasonFillShape',
        name: 'Jason Fill Shape',
        functionContent:
          'const colorData = [\n  {\n      "primaryColors":[[96,203,28],[203,28,96],[28,96,203]],"complimentaryColors":[[159,52,227],[52,227,159],[227,159,52]],"triadicColors":[[159,203,28],[96,52,28],[96,203,227]],"tetradicColors":[[203,28,159],[28,159,203],[159,203,28]]\n  },\n  {\n      "primaryColors":[[256,175,12],[175,12,256],[12,256,175]],"complimentaryColors":[[-1,80,243],[80,243,-1],[243,-1,80]],"triadicColors":[[-1,175,12],[256,80,12],[256,175,243]],"tetradicColors":[[175,12,-1],[12,-1,175],[-1,175,12]]\n  },\n  {   \n      "primaryColors":[[99,139,15],[139,15,99],[15,99,139]],"complimentaryColors":[[156,116,240],[116,240,156],[240,156,116]],"triadicColors":[[156,139,15],[99,116,15],[99,139,240]],"tetradicColors":[[139,15,156],[15,156,139],[156,139,15]]\n  },\n  {\n      "primaryColors":[[45,178,15],[178,15,45],[15,45,178]],"complimentaryColors":[[210,77,240],[77,240,210],[240,210,77]],"triadicColors":[[210,178,15],[45,77,15],[45,178,240]],"tetradicColors":[[178,15,210],[15,210,178],[210,178,15]]\n  }\n];\n\nconst colorSet = colorData[lib.leading0s(hash) % 4];\nconst colors = lib.trailing0s(hash) === 0\n  ? colorSet[\'primaryColors\']\n  : lib.trailing0s(hash) === 1\n  ? colorSet[\'complimentaryColors\']\n  : lib.trailing0s(hash) === 2\n  ? colorSet[\'triadicColors\']\n  : colorSet[\'tetradicColors\'];\n\nvar currentColor = 0;\n\nfunction changeColor() {\n    currentColor++;\n    if (currentColor >= colors.length) {\n      currentColor = 0;\n    }\n    return colors[currentColor];\n  }\n\nreturn function(inputFn) {\n  return (outputFn) => {\n    changeColor();\n    p5.stroke(colors[currentColor]);\n    changeColor();\n    p5.fill(colors[currentColor]);\n    inputFn(hash, outputFn);\n  }\n}',
      },
      {
        id: 'JasonColor',
        name: 'Jason Color',
        functionContent:
          "return function(inputFn) {\n    return (outputFn) => {\n        inputFn(hash, outputFn);\n\n\nhash = hash.slice(2); // Truncate the '0x' from the hash \nvar hexchar;\nvar num;\nvar coordinates = [];\n\nfor (var i = 0; i < hash.length; i++) {\n  hexchar = hash.substr(i, 1);\n  num = parseInt(hexchar, 16);\n  coordinates[i] = p5.round(num);\n}\n\n// Loop to create 64 different RGB values based on ignoring 1 character in sequence\nconst colors = [];\n\nfor (var i = 0; i < 64; i++) {\n  let ignoredCharIndex = i; // Get the index of the character to ignore\n  let trimmedHash = \"\"; // Initialize an empty string to build the trimmed hash\n\n  for (var j = 0; j < hash.length; j++) {\n    if (j !== ignoredCharIndex) {\n      trimmedHash += hash[j]; // Build the trimmed hash excluding the ignored character\n    }\n  }\n\n  let a = trimmedHash.slice(0, 21);\n  let b = trimmedHash.slice(21, 42);\n  let c = trimmedHash.slice(42, 63);\n  a = Math.round(parseInt(a, 16) / Math.pow(2, 76));\n  b = Math.round(parseInt(b, 16) / Math.pow(2, 76));\n  c = Math.round(parseInt(c, 16) / Math.pow(2, 76));\n  colors[i] = [a, b, c]; // Store each RGB value in the colors array\n}\n\n  //this loop assigns the colors array to Color1, Color2 to Color64\n  for (let i = 0; i < colors.length; i++) {\n    window['Color' + (i + 1)] = colors[i];\n  }\n\n      let squareSize = 50;\n      let xStart = 0;\n      let yStart = 0;\n\n      for (let i = 0; i < 64; i++) {\n        let colorIndex = i % colors.length;\n        let x = xStart + (i % 8) * squareSize;\n        let y = yStart + Math.floor(i / 8) * squareSize;\n        p5.fill(colors[colorIndex]);\n        p5.square(x, y, squareSize);\n      }\n\n    }\n}",
      },
      {
        id: 'arrangeShapes',
        name: 'Arrange Shapes',
        functionContent:
          'let x = -20;\nlet y = 0;\nlet max_drift = lib.maxDrift(hash);\n\nreturn function(inputFn) {\n    return (outputFn) => {\n        while (x < p5.width) {\n            // Push transformation matrix\n            p5.push();\n            // Draw vertical line of boxes\n            for (let i = 0; i < 12; i++) {\n            p5.translate(x, y);\n            inputFn(outputFn);\n            y += 40;\n            }\n            p5.pop();\n            x += max_drift*3;\n            y = 0;\n        }\n\n        x=0;\n        while (x < p5.width) {\n            // Push transformation matrix\n            p5.push();\n            // Draw vertical line of boxes\n            for (let i = 0; i < 12; i++) {\n            p5.translate(x, y);\n            inputFn(outputFn);\n            y += 50; //this helps scale the y values up and down\n            }\n            p5.pop();\n            x += max_drift*3;\n            y = 0;\n        }\n    }\n}',
      },
      {
        id: 'fractalTree',
        name: 'Fractal Tree',
        functionContent:
          '\nangle = lib.mapAttribute(lib.maxDrift, hash, [10, 50], [0.1, p5.PI / 3]);\nlength = parseInt(lib.mapAttribute(lib.leading0s, hash, [0, 8], [50, 100]));\ndepth = parseInt(lib.mapAttribute(lib.longestStreakOf0s, hash, [4, 14], [2, 14]));\nleafSize = parseInt(lib.mapAttribute(lib.trailing0s, hash, [0, 8], [0, 50]));\n\nreturn function(inputFn) {\n    return (outputFn) => {\n        inputFn(outputFn);\n        p5.push();\n        p5.translate(p5.width / 2, p5.height);\n        branch(length, depth);\n        p5.pop();\n    }\n}\n\nfunction branch(len, depth) {\n  p5.line(0, 0, 0, -len);\n  p5.translate(0, -len);\n  if (depth > 0) {\n    p5.push();\n    p5.rotate(angle);\n    branch(len * 0.67, depth - 1);\n    p5.pop();\n    p5.push();\n    p5.rotate(-angle);\n    branch(len * 0.67, depth - 1);\n    p5.pop();\n    if (depth === 1) {\n      drawLeaf();\n    }\n  }\n}\n\nfunction drawLeaf() {\n  const leafPoints = [];\n  leafPoints.push({ x: 0, y: 0 });\n  leafPoints.push({ x: -leafSize/2, y: -leafSize });\n  leafPoints.push({ x: 0, y: -leafSize/2 });\n  leafPoints.push({ x: leafSize/2, y: -leafSize });\n  \n  p5.beginShape();\n \n  for (let i = 0; i < leafPoints.length; i++) {\n    p5.vertex(leafPoints[i].x, leafPoints[i].y);\n  }\n  p5.endShape(p5.CLOSE);\n}',
      },
    ],
  },
  {
    section: 'Post-Process',
    description: 'Modify canvas after drawing (ex: apply filters, re-arrange pixels).',
    traits: [
      {
        id: 'blurTrait',
        name: 'Blur',
        functionContent:
          '  let blurAmount = lib.longestStreakOf0s(hash);\n  \n  return function(inputFn) {\n    return function(outputFn) {\n        inputFn(outputFn);\n        p5.loadPixels();\n        p5.filter(p5.BLUR, blurAmount);\n    }\n  }\n',
      },
      {
        id: 'pixelateTrait',
        name: 'Pixelate',
        functionContent:
          '    let pixelSize = lib.longestStreakOf1s(hash);\n  \n  return function(inputFn) {\n    return function(outputFn) {\n        inputFn(outputFn);\n        p5.loadPixels();\n        for (let x = 0; x < p5.width; x += pixelSize) {\n            for (let y = 0; y < p5.height; y += pixelSize) {\n                let c = p5.get(x, y);\n                for (let i = x; i < x + pixelSize && i < p5.width; i++) {\n                    for (let j = y; j < y + pixelSize && j < p5.height; j++) {\n                        p5.set(i, j, c);\n                    }\n                }\n            }\n        }\n        p5.updatePixels();\n    }\n  }\n',
      },
      {
        id: 'JasonExploreLib',
        name: 'Jason Explore Lib',
        functionContent:
          '// This it the trait wrapper area where\n// you will have access to the variables\n// p5, lib (utility library), and hash\n\nreturn function(inputFn) {\n    return (outputFn) => {\n\n      p5.text("Hash is " + hash, 30, 50);\n      p5.text("maxDrift is " + lib.maxDrift(hash), 30,70);\n      p5.text("leading0s is " + lib.leading0s(hash), 30,90);\n      p5.text("leading1s is " + lib.leading1s(hash), 30,110);\n      p5.text("trailing0s is " + lib.trailing0s(hash), 30,130);\n      p5.text("trailing1s is " + lib.trailing1s(hash), 30,150);\n      p5.text("longestStreakof0s is " + lib.longestStreakOf0s(hash), 30,170);\n      p5.text("longestStreakof1s is " + lib.longestStreakOf1s(hash), 30,190);\n\n\n//**********FUNCTION TO COUNT 1s and 0s\n\nlet hexValue = hash;\nlet count0s = 0;\nlet count1s = 0;\n\nhexValue = hexValue.slice(2);\nlet binaryValue = parseInt(hexValue, 16).toString(2);\np5.text("hexValue is " + hexValue, 30,210);\np5.text("binaryValue is " + binaryValue, 30,230);\ncount0s = countOccurrences(binaryValue, \'0\');\ncount1s = countOccurrences(binaryValue, \'1\');\n\n  p5.text("Original Hex Value: " + hexValue, 50, 250);\n  p5.text("Binary Value: " + binaryValue, 50, 270);\n  p5.text("Count0s: " + count0s, 50, 290);\n  p5.text("Count1s: " + count1s, 50, 310);\n\nfunction hexToBinary(hexString) {\n  let hexNumber = BigInt("0x" + hexString);\n  let binaryString = hexNumber.toString(2);\n  return binaryString;\n}\n\nfunction countOccurrences(string, char) {\n  let count = 0;\n  for (let i = 0; i < string.length; i++) {\n    if (string[i] === char) {\n      count++;\n    }\n  }\n  return count;\n}\n\nlet percent0s = count0s / binaryValue.length;\nlet percent1s = count1s / binaryValue.length;\n\np5.text("percent0s: " + percent0s, 50, 330);\np5.text("percent1s: " + percent1s, 50, 350);\n\n//***** \n\n};\n\n};',
      },
      {
        id: 'JasonSquareEntropy',
        name: 'Jason Square Entropy',
        functionContent:
          "return function(inputFn) {\n    return (outputFn) => {\n        inputFn(hash, outputFn);\n\n        //initialization variables  \n        let newHashes = [];\n        hash = hash.slice(2); // Truncate the '0x' from the hash \n        const colors = [];\n        generateNewHashes(hash);\n        assignColors();\n\n\n        //function to generate 64 new hashes, 63 digits long, from the base hash by rearranging the order\n        function generateNewHashes(initialHash) {\n          for (let n = 0; n < initialHash.length; n++) {\n            let newHash = \"\";\n            // Ignore the character at position n\n            let partialHash = initialHash.substring(0, n) + initialHash.substring(n + 1);\n            newHash += partialHash.substring(n);\n            newHash += partialHash.substring(0, n);\n            newHashes.push(newHash);\n          }\n        }\n\n        //function to assign colors to each of the 64 new hashes by taking three 21-digit chunks and converting to RGB values\n        function assignColors() {\n          for (let i = 0; i < newHashes.length; i++) {\n            let a = newHashes[i].slice(0, 21);\n            let b = newHashes[i].slice(21, 42);\n            let c = newHashes[i].slice(42, 63);\n            a = Math.round(parseInt(a, 16) / Math.pow(2, 76));\n            b = Math.round(parseInt(b, 16) / Math.pow(2, 76));\n            c = Math.round(parseInt(c, 16) / Math.pow(2, 76));\n            colors[i] = [a, b, c];\n          }\n        }\n\n        //sets up variables for a grid of square with size = maxDrift for entropy\n        let squareSize = lib.maxDrift(hash);\n        let canvasSize = 400;\n        let xStart = 0;\n        let yStart = 0;\n        let numCols = Math.floor(canvasSize / squareSize);\n        let numRows = Math.floor(canvasSize / squareSize);\n        let totalSquares = numCols * numRows;\n        let colorIndex = 0;\n\n        //assigns colors based on rotating through the 64 Colors made before to each square in a grid that fits the canvas\n        for (let i = 0; i < colors.length; i++) {\n          window['Color' + (i + 1)] = colors[i];\n        }\n        let x = 0;\n        let y = 0;\n        for (let i = 0; i < totalSquares; i++) {\n          if (i >= totalSquares) {\n            colorIndex = 0;\n          } else {\n            colorIndex = i % colors.length;\n          }\n          let x = xStart + (i % numCols) * squareSize;\n          let y = yStart + Math.floor(i / numCols) * squareSize;\n          p5.fill(colors[colorIndex]);\n          p5.square(x, y, squareSize);\n        } \n\n\n\n    } //closes output function\n}",
      },
      {
        id: 'mosaicTrait',
        name: 'Mosaic',
        functionContent:
          '  const tileSize = lib.longestStreakOf1s(hash);\n  const numRows = Math.ceil(p5.height / tileSize);\n  const numCols = Math.ceil(p5.width / tileSize);\n\n  return function(inputFn) {\n    return function(outputFn) {\n      inputFn(outputFn);\n      const pixels = p5.pixels;\n        // Create new pixels array\n        const newPixels = [];\n\n        // Iterate over each tile\n        for (let row = 0; row < numRows; row++) {\n          for (let col = 0; col < numCols; col++) {\n            // Get the average color of the current tile\n            let r = 0,\n              g = 0,\n              b = 0;\n            let count = 0;\n            for (let i = 0; i < tileSize; i++) {\n              const y = row * tileSize + i;\n              if (y >= p5.height) continue;\n              for (let j = 0; j < tileSize; j++) {\n                const x = col * tileSize + j;\n                if (x >= p5.width) continue;\n                const index = (y * p5.width + x) * 4;\n                r += pixels[index];\n                g += pixels[index + 1];\n                b += pixels[index + 2];\n                count++;\n              }\n            }\n            r /= count;\n            g /= count;\n            b /= count;\n\n            // Set the color of each pixel in the tile to the average color\n            for (let i = 0; i < tileSize; i++) {\n              const y = row * tileSize + i;\n              if (y >= p5.height) continue;\n              for (let j = 0; j < tileSize; j++) {\n                const x = col * tileSize + j;\n                if (x >= p5.width) continue;\n                const index = (y * p5.width + x) * 4;\n                newPixels[index] = r;\n                newPixels[index + 1] = g;\n                newPixels[index + 2] = b;\n                newPixels[index + 3] = 255;\n              }\n            }\n          }\n        }\n\n        // Set the pixels array and update the canvas\n        p5.loadPixels();\n        for (let i = 0; i < pixels.length; i++) {\n          pixels[i] = newPixels[i];\n        }\n        p5.updatePixels();\n    };\n  };\n',
      },
      {
        id: 'stretcherTrait',
        name: 'Stretch Trait',
        functionContent:
          'const skewX = lib.maxDrift(hash) / 10;\nconst skewY = lib.longestStreakOf0s(hash) / 10;\n\nreturn function (inputFn) {\n  return function (outputFn) {\n      p5.push();\n      p5.applyMatrix(1, skewX, 0, skewY, 0, 0);\n      inputFn(outputFn);\n      p5.pop();\n  };\n};\n',
      },
      {
        id: 'swirlTrait',
        name: 'Swirl',
        functionContent:
          '\n  const minRadius = 20;\n  const maxRadius = 200;\n  const numTurns = 2 + lib.trailing0s(hash) % 3;\n  const rotationDir = lib.leading0s(hash) >= 1 ? 1 : -1;\n\n  return function (inputFn) {\n    return function (outputFn) {\n      p5.push();\n      p5.noFill();\n      p5.strokeWeight(5);\n      p5.beginShape();\n      let currentRadius = maxRadius;\n      for (let theta = 0; theta < numTurns * p5.TWO_PI; theta += 0.1) {\n        const r = currentRadius * p5.sin(theta);\n        const x = r * p5.cos(theta);\n        const y = r * p5.sin(theta);\n        p5.curveVertex(x, y);\n        currentRadius -= (maxRadius - minRadius) / (numTurns * p5.TWO_PI / 0.1);\n        currentRadius = p5.max(currentRadius, minRadius);\n      }\n      p5.endShape();\n      p5.pop();\n\n      inputFn(outputFn);\n    };\n  };\n',
      },
      {
        id: 'fractalDistortion',
        name: 'Fractal Distortion',
        functionContent:
          'let longest_streak_of_0s = lib.longestStreakOf0s(hash);\nlet longest_streak_of_1s = lib.longestStreakOf1s(hash);\nlet max_drift = lib.maxDrift(hash);\nlet cosdistortion = (longest_streak_of_0s/256);\nlet sindistortion = (longest_streak_of_1s/256);\nlet noiseScale = max_drift/10;\nlet distortionStrength = max_drift;\n\nreturn function(inputFn) {\n    return (outputFn) => {\n        inputFn(hash, outputFn);\n        p5.loadPixels();\n        for (let x = 0; x < p5.width; x++) {\n            for (let y = 0; y < p5.height; y++) {\n                let d = p5.dist(x, y, p5.width / 2, p5.height / 2);\n                let offset = p5.map(p5.noise(x * noiseScale, y * noiseScale), 0, 1, -distortionStrength, distortionStrength);\n                let sx = x + offset * p5.cos(d * cosdistortion);\n                let sy = y + offset * p5.sin(d * sindistortion);\n                let px = p5.constrain(p5.round(sx), 0, p5.width - 1);\n                let py = p5.constrain(p5.round(sy), 0, p5.height - 1);\n                let col = p5.get(px, py);\n                p5.set(x, y, col);\n            }\n        }\n        p5.updatePixels();\n    }\n}',
      },
    ],
  },
];
