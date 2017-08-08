<template>
  <!-- press and news page -->

  <div>

  <div class="fonts press-page">

    <div class="page-header" v-bind:class="[is_visible]">
      <dropdown category="News" v-bind:subcategory="capital_case" v-bind:list="news_dropdown_list" v-on:clicked="nav_to_dropdown"></dropdown>
      <div class="page-description">
        <div class="p">Brooks and Falotico’s award-winning work has been featured in many books and nationally distributed periodicals.</div>
        <router-link to="#" class="download-link">
          <div class="download-wrapper"><download></download></div>
          <div class="download-text" v-on:click="download_articles">List of Published Articles</div>
        </router-link>
      </div>
    </div>

    <div class="press-links">
      <!-- press page -->
      <div v-if="page === 'press'" class="links-container">
         <div v-for="article in press_articles" class="article-container reveal" v-bind:key="article" v-on:click="open_press_article(article.article_url, article.scans)">
          <press-article v-bind:image="article.main_image.url" v-bind:overlay="article.overlay_image.url" v-bind:scan="article.scans">{{article.title}}</press-article>
        </div> 
      </div>
      <!-- news page -->
      <div v-else class="links-container">
        <div v-for="article in news_articles" class="article-container reveal" v-bind:key="article" v-on:click="nav_to_blog(article.url)">
          <press-article v-bind:image="article.image" customclass="noshadow-override">{{article.title}}</press-article>
        </div>
      </div>
    </div>

    <div class="load-more">
      <vbutton v-if="page === 'news' && news_queue.length" type="standard" v-on:clicked="load_more">Load More</vbutton> 
      <vbutton v-if="page === 'press' && press_queue.length" type="standard" v-on:clicked="load_more_press">Load More</vbutton>
    </div>

  </div>

  <vfooter v-bind:wait="wait" v-bind:color="footer_color" v-bind:list="footer_list" footertype="twentyfive-percent">{{footer_title}}</vfooter>

  <popup v-bind:inactive="popup_state" v-on:clicked="close_popup" v-bind:imagelist="popup_image_list" v-bind:wait="popup_wait" type="popup-swiper-press"></popup>
  
  </div>
</template>

<script>
  import dropdown from '../components/molecules/dropdown'
  import footer from '../components/organisms/footer'
  import button from '../components/atoms/button'
  import press_article from '../components/molecules/press_article'
  import download from '../components/SVG/download'
  import popup from '../components/organisms/popup'

  import scroll_reveal from '../utils/scroll_reveal'
  import sr_options from '../utils/sr_options'
  import chars from '../utils/replace_wp_chars'
  import addresses from '../utils/api_addresses'
  import "babel-polyfill";
  import axios from 'axios'

  export default {
    components: {
      'dropdown': dropdown,
      'vfooter': footer,
      'vbutton': button,
      'press-article': press_article,
      'download': download,
      'vfooter': footer,
      'popup': popup
    },
    data () {
      return {
        news_dropdown_list: [
          {
            title: 'News',
            url: '/press/news'
          },
          {
            title: 'Press',
            url: '/press/press'
          }
        ],
        is_visible: 'invisible',
        press_articles: [],
        press_queue: [],
        news_articles: [],
        news_queue: [],
        footer_title: '',
        footer_color: 'eggshell',
        wait: true,
        footer_list: [],
        popup_wait: true,
        popup_state: 'inactive',
        popup_image_list: [],
        published_articles: ''
      }
    },
    props: ['page'],
    methods: {
      nav_to_blog: function (str) {
        this.$emit('nav')
        var context = this
        setTimeout(function() {
          window.scrollTo(0, 0)
          context.$router.push({
            path: '/blog/' + str
          })
        }, 600)
      },
      close_popup: function () {
        this.popup_wait = true
        this.popup_state = 'inactive'
      },
      download_articles: function () {
        // download press articles
        window.open(this.published_articles)
      },
      open_press_article: function (url, scans) {
        if (scans) {
          var scan_images = scans.map(function (scan) {
            return scan.url
          })
          //open popup with scan images
          var context = this
          this.popup_state = ''
          this.popup_image_list = scan_images
          setTimeout(function () {
            context.popup_wait = false
          }, 3000)
        } else {
          window.open(url)
        }
      },
      load_more: function () {
        this.news_articles = this.news_articles.concat(this.news_queue.slice(0, 4))
        this.news_queue = this.news_queue.slice(4)
        setTimeout(function () {
          sr.reveal('.reveal')
        })
      },
      load_more_press: function () {
        this.press_articles = this.press_articles.concat(this.press_queue.slice(0, 4))
        this.press_queue = this.press_queue.slice(4)
        setTimeout(function () {
          sr.reveal('.reveal')
        })
      },
      nav_to_dropdown: function (url) {
        this.$emit('nav')
        var context = this
        setTimeout(function () {
          window.scrollTo(0, 0)
          context.$router.push({
            path: url
          })
        }, 600)
      },
      init: function () {
        this.wait = true
        var context = this
        setTimeout(function () {
          context.is_visible = ''
        }, 600)

        //get press articles
        axios.get(addresses.live_production + 'pages?slug=press')
        .then(function (response) {
          context.published_articles = response.data[0].acf.published_articles_link

          var press_articles = response.data[0].acf.press_article
          // context.press_articles = press_articles
            context.press_articles = press_articles.slice(0, 4)
            context.press_queue = press_articles.slice(4)
          
          
          //init sr if on press page, otherwise set footer to press content
          if (context.page === 'press') {
            setTimeout(function () {
              window.sr = scroll_reveal(sr_options)
              sr.reveal('.reveal')
            })
          } else {
            context.footer_title = 'Press'
            context.footer_list = press_articles.map(function (item) {
              return {
                image: item.main_image.url,
                label: item.title,
                url: 'press'
              }
            })
            setTimeout(function () {
              context.wait = false
            })
          }
        })

        // get news posts
        axios.get(addresses.live_production + 'categories')
        .then(function (response) {
          var news_id = response.data.filter(function (category) {
            return category.slug === 'news'
          })[0].id
          axios.get(addresses.live_production + 'posts?categories=' + news_id)
          .then(function (response) {
            context.news_queue = response.data.map(function (item) {
              return {
                title: chars(item.title.rendered),
                image: item.acf.header_image.url,
                url: item.slug
              }
            })
            context.news_articles = context.news_queue.slice(0, 4)
            context.news_queue = context.news_queue.slice(4)

            //set footer to news page if not on news page, same as press.
            if(context.page === 'news') {
              setTimeout(function () {
                window.sr = scroll_reveal(sr_options)
                sr.reveal('.reveal')
              })
            } else {
              context.footer_title = 'B&F News'
              context.footer_list = response.data.map(function (item) {
                return {
                  image: item.acf.header_image.url,
                  label: chars(item.title.rendered),
                  url: 'news' //item.slug
                }
              })
              setTimeout(function () {
                context.wait = false
              })
            }
          })
        })
      }
    },
    computed: {
      capital_case: function () {
        var temp = this.page.split('')
        var end = temp.slice(1).join('')
        return temp[0].toUpperCase() + end
      }
    },
    mounted () {
      this.init()
    },
    watch: {
      '$route': function () {
        this.init()
      }
    }
  }
</script>

<style scoped lang='scss'>

  @import '../styles/breakpoints.scss';
  @import '../styles/page_headers.scss';

  .press-page {
    @media screen and (min-width: 1281px) {
      width: calc(100% - 10%);
      margin-left: 10%;
    }
  }

  .load-more {
    position: relative;
    display: inline-block;
    margin-top: 120px;
    margin-bottom: 120px;
    @media screen and (max-width: $tablet-size) {
      margin-top: 48px;
      margin-bottom: 48px;
    }
  }
  
  .press-links {
    position: relative;
    margin: auto;
    margin-left: 128px;
    @media screen and (min-width: 1281px) {
      margin-left: 0px;
    }
    @media screen and (max-width: $mobile-grid) {
      width: 100%;
      margin-left: 0px;
    }
  }

  .links-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    width: 100%;
    margin-left: -12px;
    @media screen and (max-width: $mobile-grid) {
      margin-left: 0px;
    }
  }

  .article-container {
    margin: 12px;
    width: calc(50% - 24px);
    @media screen and (max-width: $mobile-grid) {
      width: 100%;
      margin-left: 0px;
      margin-right: 0px;
    }
  }

  .download-link {
    position: relative;
    &:hover {
      .download-wrapper {
        opacity: 0.75;
      }
    }
  }

  .download-text {
    padding-left: 12px;
  }

  .download-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    margin-top: 2px;
    transition: all 0.4s ease;
  }
</style>