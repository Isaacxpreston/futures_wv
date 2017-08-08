<template>
  <svg width="18px" height="18px" viewBox="0 0 18 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" v-on:click="emit_clicked">
      <g id="Final" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="Desktop-Menu-Contacts" transform="translate(-872.000000, -581.000000)" fill="#454545">
              <g id="Secondary-Menu" transform="translate(578.000000, 24.000000)">
                  <g id="Follow-Us" transform="translate(0.000000, 554.000000)">
                      <g id="Social-Media" transform="translate(84.000000, 3.000000)">
                          <g id="Dering-Hall" transform="translate(210.000000, 0.000000)">
                              <path d="M9,18 C4.02943725,18 0,13.9705627 0,9 C0,4.02943725 4.02943725,0 9,0 C13.9705627,0 18,4.02943725 18,9 C18,13.9705627 13.9705627,18 9,18 Z M9,17 C13.418278,17 17,13.418278 17,9 C17,4.581722 13.418278,1 9,1 C4.581722,1 1,4.581722 1,9 C1,13.418278 4.581722,17 9,17 Z M11.8806818,6.22159091 C12.5056849,6.86932142 12.8181818,7.79544852 12.8181818,9 C12.8181818,10.2045515 12.5056849,11.1306786 11.8806818,11.7784091 C11.2556787,12.4261396 10.3560665,12.75 9.18181818,12.75 L6,12.75 L6,5.25 L9.18181818,5.25 C10.3560665,5.25 11.2556787,5.5738604 11.8806818,6.22159091 Z M10.375,10.7045455 C10.670456,10.3257557 10.8181818,9.75757955 10.8181818,9 C10.8181818,8.24242045 10.670456,7.67424432 10.375,7.29545455 C10.079544,6.91666477 9.61742739,6.72727273 8.98863636,6.72727273 L7.95454545,6.72727273 L7.95454545,11.2727273 L8.98863636,11.2727273 C9.61742739,11.2727273 10.079544,11.0833352 10.375,10.7045455 Z" id="Combined-Shape"></path>
                          </g>
                      </g>
                  </g>
              </g>
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
        #Dering-Hall {
            fill: $anchor;
            transition: all 0.4s ease;
        }
        &:hover {
            #Dering-Hall {
                opacity: 0.75;
                fill: $pinterest;
            }
        }
    }
</style>