<template>
  <svg class='down-arrow' width="10px" height="15px" viewBox="0 0 10 15" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="Down-Arrow" fill="#454545">
              <polygon transform="translate(5.000000, 7.500000) rotate(-270.000000) translate(-5.000000, -7.500000) " points="7.5 2.5 6.85742188 3.06860352 10.7460938 7.07999992 -2.5 7.07999992 -2.5 8.02000046 10.7460938 8.02000046 6.85742188 11.8640747 7.5 12.5 12.5 7.5"></polygon>
          </g>
      </g>
  </svg>
</template>

<style scoped lang="scss">
  .down-arrow {
    cursor: pointer; 
    user-select: none;
    transition: all 0.2s ease;
    &:hover {
      transform: translateY(4px);
    } 
  }
</style>
