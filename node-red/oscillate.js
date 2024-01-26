
function oscillate(timestamp, intervalMs, rangeStart, rangeEnd) {
  // Calculate the midpoint and the amplitude of the range
  const midRange = (rangeStart + rangeEnd) / 2;
  const amplitude = (rangeEnd - rangeStart) / 2;

  // Calculate the phase of the sine wave based on the current timestamp
  // and the interval. The phase needs to go from 0 to 2π for one full cycle.
  const phase = (2 * Math.PI * timestamp) / intervalMs;

  // Use the sine function to get an oscillating value between -1 and 1
  // Scale and shift it to fit within the desired range
  const oscillatingValue = midRange + amplitude * Math.sin(phase);

  return oscillatingValue;
}

