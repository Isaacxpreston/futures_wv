<template>
  <div class="expand-wrapper">
    <!-- <div v-bind:class="container_class">
        <div class='svg-container-1'>
          <svg class="arrow-1" width="9px" height="9px" viewBox="0 0 9 9" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <polygon fill="#454545" points="4.37867966 -0.131727984 3.7990218 0.381198745 7.30692087 3.99980535 -0.131727984 3.99980535 -0.131727984 4.84776246 7.30692087 4.84776246 3.7990218 8.31543084 4.37867966 8.8890873 8.8890873 4.37867966"></polygon>
          </svg>
        </div>
        <div class='svg-container-2'>
          <svg class="arrow-2" width="9px" height="9px" viewBox="0 0 9 9" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <polygon fill="#454545" points="4.37867966 -0.131727984 3.7990218 0.381198745 7.30692087 3.99980535 -0.131727984 3.99980535 -0.131727984 4.84776246 7.30692087 4.84776246 3.7990218 8.31543084 4.37867966 8.8890873 8.8890873 4.37867966"></polygon>
          </svg>
        </div>
        <div class='svg-container-3'>
          <svg class="arrow-3" width="9px" height="9px" viewBox="0 0 9 9" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <polygon fill="#454545" points="4.37867966 -0.131727984 3.7990218 0.381198745 7.30692087 3.99980535 -0.131727984 3.99980535 -0.131727984 4.84776246 7.30692087 4.84776246 3.7990218 8.31543084 4.37867966 8.8890873 8.8890873 4.37867966"></polygon>
          </svg>
        </div>
        <div class='svg-container-4'>
          <svg class="arrow-4" width="9px" height="9px" viewBox="0 0 9 9" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <polygon fill="#454545" points="4.37867966 -0.131727984 3.7990218 0.381198745 7.30692087 3.99980535 -0.131727984 3.99980535 -0.131727984 4.84776246 7.30692087 4.84776246 3.7990218 8.31543084 4.37867966 8.8890873 8.8890873 4.37867966"></polygon>
          </svg>
        </div>
    </div> -->

    <div class="svg-wrapper">
      <svg width="18px" height="18px" viewBox="0 0 18 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="Zoom-In" transform="translate(-15.000000, -15.000000)" fill="#454545">
                  <g id="Combined-Shape">
                      <path d="M21.3786797,15 L21.4258657,15.772574 L16.3866652,15.850856 L21.6465843,21.1107751 L21.046988,21.7103713 L15.787069,16.4504522 L15.8155164,21.3829233 L15,21.3786797 L15,15 L21.3786797,15 Z M26,15 L32.3786797,15 L32.3786797,21.3786797 L31.5631633,21.3829233 L31.5916107,16.4504522 L26.3316916,21.7103713 L25.7320954,21.1107751 L30.9920145,15.850856 L25.952814,15.772574 L26,15 Z M26,32.3786797 L25.952814,31.6061057 L30.9920145,31.5278236 L25.7320954,26.2679046 L26.3316916,25.6683084 L31.5916107,30.9282274 L31.5631633,25.9957564 L32.3786797,26 L32.3786797,32.3786797 L26,32.3786797 Z M21.3786797,32.3786797 L15,32.3786797 L15,26 L15.8155164,25.9957564 L15.787069,30.9282274 L21.046988,25.6683084 L21.6465843,26.2679046 L16.3866652,31.5278236 L21.4258657,31.6061057 L21.3786797,32.3786797 Z"></path>
                  </g>
              </g>
          </g>
      </svg>   
    </div>

  </div>
</template>

<script>
  import detect_browser from '../../utils/detect_browser'
  export default {
    data () {
      return {
        container_class: 'expand-container'
      }
    },
    beforeMount () {
      if(detect_browser().is_windows) {
        !detect_browser().isFirefox ? 
          this.container_class = 'expand-container is-windows' : 
          this.container_class = 'expand-container is-windows-firefox'
      }
    }
  }
</script>

<style scoped lang='scss'>
.expand-wrapper {
  background: white;
  display: flex;
  position: relative;
  cursor: pointer;
  height: 48px;
  width: 48px;
  &:hover {
    .expand-container {
      .svg-container-1 {
        transform: translate(-1.5px, -1.5px);
      }
      .svg-container-2 {
        transform: translate(1.5px, -1.5px);
      }
      .svg-container-3 {
        transform: translate(-1.5px, 1.5px);
      }
      .svg-container-4 {
        transform: translate(1.5px, 1.5px);
      }
    }
    .svg-wrapper {
      transform: scale(1.15, 1.15)
    }
  }
}
.expand-container {
  height: 32px;
  width: 19px;
  position: relative;
  margin: auto;
  &.is-windows {
    height: 28.5px;
  }
  &.is-windows-firefox {
    height: 30px;
  }
} 
.svg-container-1 {
  position: absolute;
  top: 0;
  left: 0;
  transition: all 0.2s ease;
}
.svg-container-2 {
  position: absolute;
  top: 0;
  right: 0;
  transition: all 0.2s ease;
}
.svg-container-3 {
  position: absolute;
  bottom: 0;
  left: 0;
  transition: all 0.2s ease;
}
.svg-container-4 {
  position: absolute;
  bottom: 0;
  right: 0;
  transition: all 0.2s ease;
}
.arrow-1 {
  transform: rotate(-135deg);
}
.arrow-2 {
  transform: rotate(-45deg);
}
.arrow-3 {
  transform: rotate(135deg);
}
.arrow-4 {
  transform: rotate(45deg);
}

.svg-wrapper {
  position: relative;
  margin: auto;
  height: 18px;
  width: 18px;
  user-select: none;
  transition: all 0.2s ease-in-out
}
</style>
