<template>
  <div class="dropdown-container" v-bind:class="[hoveredclass, customstyle]" v-on:click="toggle_open">
    <div class="dropdown-underlay"></div>
    <div class="fonts dropdown">
      <div class="category utility">{{category}}</div>
      <div class="title">

        <!-- big text -->
        <div v-if="subcategory.length < 14" class="sub-category h1">{{subcategory}}</div>
        <div v-else class="sub-category h2">{{subcategory}}</div>

        <div class="chevron">
          <chevron></chevron>
        </div>

      </div>
    </div>
    <div class="list">
      <div class="list-item" v-for="item in list" v-bind:key="item" v-on:click="navto(item.url)">
        <div class="h2">{{item.title}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import dropdown_chevron from '../SVG/dropdown_chevron_usable'
  export default {
    props: ['category', 'subcategory', 'list', 'customstyle'],
    components: {
      'chevron': dropdown_chevron
    },
    data () {
      return {
        hoveredclass: ''
      }
    },
    methods: {
      toggle_open: function () {
        this.hoveredclass === '' ? this.hoveredclass = 'hovered' : this.hoveredclass = ''
      },
      navto: function (url) {
        this.$emit('clicked', url)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '../../styles/colors.scss';
  @import '../../styles/breakpoints.scss';

  .dropdown-container {
    position: relative;
    display: inline-block;
    z-index: 2;
    cursor: pointer;
    user-select: none;
    &.block {
      display: block;
    }
    @media screen and (max-width: $tablet-size) {
      display: block;
      margin-left: 0px;
    }
    // &:hover {
    //   @media screen and (min-width: $desktop-size) {
    //     .dropdown {
    //       .title {
    //         .chevron {
    //           svg {
    //             transform: rotate(-180deg);
    //           }
    //         }
    //       }
    //     }
    //     .list {
    //       max-height: 360px;
    //     }
    //   }
    // }
    &.hovered {
      // @media screen and (max-width: $desktop-size) {
        .dropdown {
          background: $rice;
          .title {
            .chevron {
              svg {
                transform: rotate(-180deg);
              }
            }
          }
        }
        .list {
          max-height: 360px;
          box-shadow: 0px 10px 10px 0 rgba(0, 0, 0, 0.2);
        }
        .dropdown-underlay {
          pointer-events: auto;
        }
      // }
    }
  }
  .dropdown {
    position: relative;
    overflow: hidden;
    width: 500px;
    max-width: 100%;
    // background: white;
    transition: all 0.6s ease;
    @media screen and (max-width: $tablet-size) {
      width: 472px;
    }
    @media screen and (max-width: $mobile-grid) {
      // width: 272px;
      width: 100%;
    }
  }
  .category {
    height: 24px;
    text-align: left;
    // background: red;
  }
  .chevron {
    position: absolute;
    width: 24px;
    svg {
      transform-origin: 50% 40%;
      transition: all 0.6s ease;
    }
    top: 0;
    right: 0;
    margin-top: 32px;
    margin-right: 24px;
    @media screen and (max-width: $mobile-grid) {
      margin-top: 24px;
    }
  }
  .sub-category {
    position: absolute;
    text-align: left;
    bottom: 0;
    left: 0;
    margin-left: 12px;
    &.h2 {
      margin-bottom: 6px;
    }
    @media screen and (max-width: $mobile-grid) {
      margin-bottom: 6px;
    }
  }
  .title {
    position: relative;
    height: 72px;
    background: white;
    @media screen and (max-width: $mobile-grid) {
      height: 60px;
    }
  }
  .list {
    position: absolute;
    top: 0;
    margin-top: 96px;
    width: 500px;
    max-width: 100%;
    height: auto;
    max-height: 0px;
    overflow: auto;
    background: white;
    transition: all 0.8s ease;
    @media screen and (max-width: $tablet-size) {
      width: 472px;
    }
    @media screen and (max-width: $mobile-grid) {
      margin-top: 84px;
      // width: 272px;
      width: 100%;
    }
  }
  .list-item {
    width: 100%;
    height: 60px;
    display: flex;
    transition: all 0.4s ease-in-out;
    .h2 {
      height: 36px;
      margin: auto;
      margin-left: 12px;
    }
    &:hover {
      background: $rice;
    }
  }
  .dropdown-underlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    user-select: none;
    pointer-events: none;
  }
</style>