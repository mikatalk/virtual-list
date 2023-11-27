import "./style.scss";

import "./virtual-list.ts";

const numChannels = 1000;

// create N channels of random heights
document.querySelector<HTMLElement>("virtual-list").channels = Array.from(
  Array(numChannels)
).map((value, index) => {
  const height = Math.floor(30 + 50 * Math.random());
  // const height = 30;
  return {
    name: `channel-${index} (${height}px)`,
    height,
    color: `hsl(${360 * Math.random()}deg 84.19% 49.61% / 25%)`,
  };
});
