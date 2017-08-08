<template>
<div class='close-icon' v-on:click="emit_clicked">
  <svg width="48px" height="48px" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <g id="Final" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="Modal" transform="translate(-975.000000, 0.000000)">
              <g id="Close">
                  <g transform="translate(975.000000, 0.000000)">
                      <polygon id="Shape" points="0 24 24 24 24 48 0 48"></polygon>
                      <g id="Menu-Close" transform="translate(12.000000, 12.000000)">
                          <g id="Close" transform="translate(-1.000000, -1.000000)">
                              <polygon id="Shape" points="1 1 25 1 25 25 1 25"></polygon>
                              <polygon id="Rectangle" fill="#454545" transform="translate(13.435029, 13.435029) rotate(-315.000000) translate(-13.435029, -13.435029) " points="12.9350288 3.93502884 13.9350288 3.93502884 13.9350288 12.9350288 22.9350288 12.9350288 22.9350288 13.9350288 13.9350288 13.9350288 13.9350288 22.9350288 12.9350288 22.9350288 12.9350288 13.9350288 3.93502884 13.9350288 3.93502884 12.9350288 12.9350288 12.9350288"></polygon>
                          </g>
                      </g>
                  </g>
              </g>
          </g>
      </g>
  </svg>
</div>
</template>

<script>
    export default {
        methods: {
            emit_clicked: function () {
                this.$emit('clicked')
            }
        }
    }
</script>

<style scoped lang='scss'>
  .close-icon {
    width: 48px;
    height: 48px;
    background: #F8F8F8;
    user-select: none;
    cursor: pointer;
    svg {
        transition: all 0.2s ease;
    }
    &:hover {
        svg{ 
            transform: scale(1.2, 1.2)
        }
    }
  }
</style>
