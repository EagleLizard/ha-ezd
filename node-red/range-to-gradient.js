
/*
const gradientArr = [
  [114, 245, 24], // green
  [255, 255, 0], // yellow
  // [160, 252, 78], // orange
  [ 242, 165, 60], // orange
  [255, 0, 0], // red
  // [ 130, 0, 0 ], // red
  [255, 0, 255], // magenta
];
*/

/*
  Vaporwave color gradient
    https://www.color-hex.com/color-palette/94934
*/
// const gradientArr = [
//   // [ 1, 205, 254 ], // blue
//   // [ 5, 255, 161 ], // green
//   [ 5, 255, 21 ], // green
//   // [ 255, 251, 150 ], // yellow
//   [ 255, 242, 0 ], // yellow
//   [ 255, 162, 12 ], // orange
//   [ 255, 113, 206 ], // pink
//   [ 185, 103, 255 ], // purple
// ];
// const gradientArr = [
//   [ 0, 255, 255 ],
//   [ 37, 191, 255 ],
//   [ 75, 127, 255 ],
//   [ 112, 63, 255 ],
//   [ 150, 0, 255 ],
// ];
const gradientArr = [
  [ 255, 0, 193 ],
  [ 150, 0, 255 ],
  [ 73, 0, 255 ],
  [ 0, 184, 255 ],
  [ 0, 255, 249 ],
].reverse();






let gradientVals = gradientArr.map((gradientTuple) => {
  return {
      r: gradientTuple[0],
      g: gradientTuple[1],
      b: gradientTuple[2],
  };
});

let num = +msg.payload;

if(isNaN(num)) {
  //(1,205,254)
  return {
      payload: {
          r: 1,
          g: 205,
          b: 254,
      },
  };
}

let rangeStart = 500;
// let rangeEnd = 1300;
let rangeEnd = 1500;

let nextColor = rangeToGradient(num, rangeStart, rangeEnd, gradientVals);

return { payload: nextColor };

function rangeToGradient(n, rangeStart, rangeEnd, gradient) {
  // Validate that the gradient array has at least two colors
  if (gradient.length < 2) {
      throw new Error('Gradient needs at least two colors');
  }
  if (n < rangeStart) {
      n = rangeStart;
  } else if (n > rangeEnd) {
      n = rangeEnd;
  }

  // Normalize n to a value between 0 and 1
  const normalized = (n - rangeStart) / (rangeEnd - rangeStart);

  // Calculate position in the gradient
  const position = normalized * (gradient.length - 1);

  // Find the two closest colors in the gradient
  const index1 = Math.floor(position);
  const index2 = Math.min(index1 + 1, gradient.length - 1);

  // Calculate the ratio of interpolation
  const ratio = position - index1;

  // Interpolate between the two colors
  const color1 = gradient[index1];
  const color2 = gradient[index2];

  return {
      r: Math.round(color1.r + ratio * (color2.r - color1.r)),
      g: Math.round(color1.g + ratio * (color2.g - color1.g)),
      b: Math.round(color1.b + ratio * (color2.b - color1.b)),
  };
}
