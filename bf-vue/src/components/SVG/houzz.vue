<template>
  <svg width="18px" height="18px" viewBox="0 0 18 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" v-on:click="emit_clicked">
      <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="Houzz">
              <path d="M9,18 C4.02943725,18 0,13.9705627 0,9 C0,4.02943725 4.02943725,0 9,0 C13.9705627,0 18,4.02943725 18,9 C18,13.9705627 13.9705627,18 9,18 Z M9,17 C13.418278,17 17,13.418278 17,9 C17,4.581722 13.418278,1 9,1 C4.581722,1 1,4.581722 1,9 C1,13.418278 4.581722,17 9,17 Z M9,14.4612766 L9.00420457,10.8634239 L11.9992624,9.03829787 L12,12.6452282 L9,14.4612766 Z M6,9.03829787 L6.00420457,5.44044522 L8.99926236,3.61531915 L9,7.22224946 L6,9.03829787 Z M6,12.653617 L6.00420457,9.03829787 L9,10.8287522 L6,12.653617 Z M12,9.03829787 L9,7.21343309 L11.9957954,5.42297872 L12,9.03829787 Z" id="Combined-Shape"></path>
          </g>
      </g>
  </svg>
</template>

<script>
    export  default {
        methods: {
            emit_clicked: function () {
                this.$emit('clicked')
            }
        }
    }
</script>

<style scoped lang="scss">
    @import '../../styles/colors.scss';
    svg {
        cursor: pointer;
        user-select: none;
        #Houzz {
            transition: all 0.4s ease;
            fill: $anchor;
        }
        &:hover {
            #Houzz {
                opacity: 0.75;
                fill: $houzz;
            }
        }
    }
</style>