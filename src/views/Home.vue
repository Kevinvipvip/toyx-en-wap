<template>
  <div class="home page">
    <Header></Header>
    <div class="swiper">
      <swiper v-if="slide_list.length>0" :options="swiperOption" class="swiper-wrap" ref="mySwiper">
        <swiper-slide class="swiper-item" v-for="(v,index) in slide_list" :key="index" :data-url="v.url">
          <div class="swiper-img" :style="'background-image: url('+v.pic+')'"></div>
        </swiper-slide>
        <!--分页器-->
        <div class="swiper-pagination mine-page" v-for="(item,index) in slide_list" :key="index"
             slot="pagination"></div>
      </swiper>
    </div>

    <div class="content">

      <div class="tab">
        <ul>
          <li class="one-line-ellipsis" :class="active===0?'active':''" @click="tab(0)">About Us</li>
          <li class="one-line-ellipsis" :class="active===1?'active':''" @click="tab(1)">R&D Center</li>
          <li class="one-line-ellipsis" :class="active===2?'active':''" @click="tab(2)">Incubation Centres</li>
          <li class="one-line-ellipsis" :class="active===3?'active':''" @click="tab(3)">Custom Services</li>
        </ul>
      </div>
      <!--关于我们-->
      <div class="tab-cont">
        <div class="cont">
          <h3>{{tab_cont.title}}</h3>
          <p>{{tab_cont.cont}}</p>
        </div>
      </div>
      <!--分类-->
      <div class="cate">
        <ul>
          <li v-for="(item,index) in cate_list" :key="index" @click="cateTo(item.id)">
            <div class="img"><img :src="item.icon"/></div>
            <p class="one-line-ellipsis">{{item.cate_name}}</p>
          </li>
        </ul>
      </div>

      <!--合作伙伴-->
      <div class="partner">
        <h3>Our Partner</h3>
        <ul>
          <li v-for="item in partner" :key="item.id">
            <div class="img"><img :src="item.icon"/></div>
            <p class="one-line-ellipsis">{{item.partner_name}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import 'swiper/dist/css/swiper.css'// 这里注意具体看使用的版本是否需要引入样式，以及具体位置。
  import { swiper, swiperSlide } from 'vue-awesome-swiper' // 引入slider组件
  var _self;
  export default {
    name: 'Home',
    components: {
      swiper,
      swiperSlide
    },
    data() {
      return {
        slide_list: [],//轮播图列表
        // 顶部轮播图配置
        swiperOption: {
          autoplay: {
            delay: 3000,
            stopOnLastSlide: false,
            disableOnInteraction: false
          },
          speed: 800,
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
            type: "bullets"
          },
          direction: 'horizontal',
          on: {
            tap() {
              _self.$nextTick(() => {
                if (this.clickedSlide) {
                  let url = this.clickedSlide.getAttribute('data-url');
                  _self.to_slide_detail(url)
                }
              });
            }
          }
        },

        active: 0,
        tab_cont: this.config.home_tab_cont[0],

        cate_list: [],//分类列表

        partner: [],// 合作伙伴

      }
    },
    mounted() {
      _self = this;
      this.getSlideList();
      this.getCateList();
      this.getPartnerList();
    },
    methods: {
      // 点击轮播图进详情
      to_slide_detail(url) {
        if (url) {
          if (url.indexOf('http') === 0) {
            window.open(url, "_blank");
          } else {
            let page = url.split('?');
            let query = page[1].split('=');
            switch (page[0]) {
              case 'newdetail':
                this.$router.push({
                  path: '/' + page[0],
                  query: {
                    id: query[1]
                  }
                });
                break;
              case 'productDetail':
                this.$router.push({
                  path: '/' + page[0],
                  query: {
                    id: query[1]
                  }
                });
                break;
            }
          }
        }
      },

      tab(index) {
        this.active = index;
        if (index === 3) {
          this.$router.push({
            name: 'server',
            query: {
              on: 3
            }
          })
        }
        this.tab_cont = this.config.home_tab_cont[index];
      },

      cateTo(id) {
        this.config.cate = { cate_id: id, cate_flag: true };
        this.$router.push({
          path: '/server',
          query: { on: 2 }
        });
      },
      // 获取轮播图列表
      getSlideList() {
        this.utils.ajax(this, 'slideList', { type: 5 }).then(res => {
          this.utils.aliyun_format(res, 'pic');
          // console.log(res);
          this.slide_list = res;
        })
      },
      // 获取分类列表
      getCateList() {
        this.utils.ajax(this, 'cateList').then(res => {
          this.utils.aliyun_format(res, 'icon');
          let arr = [];
          if (res.length > 6) {
            for (let i = 0; i < 6; i++) {
              arr.push(res[i])
            }
          } else {
            arr = res;
          }
          this.cate_list = arr;
        });
      },
      getPartnerList() {
        this.utils.ajax(this, 'partnerList').then(res => {
          this.utils.aliyun_format(res, 'icon');
          this.partner = res;
        })
      },
    }
  }
</script>
<style scoped lang="scss">
  .home {
    $classify-width: 216px;
    /*轮播图样式*/
    .swiper {
      height: 361px;

      .swiper-wrap {
        height: 100%;

        .swiper-item {
          height: 100%;

          .swiper-img {
            height: 100%;
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
          }
        }

        .mine-page {
          bottom: 0;

          /deep/ span {
            border-radius: unset;
            width: 22px;
            height: 3px;
            background-color: #ffffff;
            opacity: 0.4;
            margin: 0 2px;

            &.swiper-pagination-bullet-active {
              opacity: 1;
            }
          }
        }
      }
    }

    .content {

      .tab {
        height: 64px;
        margin: 15px 24px;

        ul {
          height: 100%;
          display: flex;
          align-items: center;

          li {
            margin-left: 25px;
            font-size: 28px;
            color: #333333;

            &:nth-child(1) {
              margin-left: 0;
            }

            &.active {
              color: #ffffff;
              background-color: #3f83cc;
              border: solid 1px #ededed;
              padding: 15px 22px;
              box-sizing: border-box;
            }
          }
        }
      }

      .tab-cont {
        margin: 55px 24px 0;

        .cont {
          h3 {
            font-size: 34px;
            color: #333333;
          }

          p {
            margin-top: 35px;
            font-size: 26px;
            line-height: 40px;
            color: #666666;
          }
        }
      }

      .cate {
        margin-top: 100px;
        background: #f7f9fb;
        overflow: hidden;

        ul {
          margin: 66px 24px 0;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;

          li {
            width: calc(50% - 24px);
            display: flex;
            flex-flow: column;
            align-items: center;
            margin-bottom: 89px;

            .img {
              height: 218px;

              img {
                width: auto;
                height: 100%;
              }
            }

            p {
              margin-top: 25px;
              width: 100%;
              font-size: 28px;
              color: #333333;
              text-align: center;
            }
          }
        }
      }

      .partner {
        margin: 98px 24px 64px;

        h3 {
          font-size: 34px;
          color: #333333;
          margin-bottom: 59px;
        }

        ul {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;

          li {
            width: calc(50% - 12px);
            margin-bottom: 30px;

            p {
              width: 100%;
              height: 98px;
              line-height: 98px;
              padding: 0 25px;
              box-sizing: border-box;
              background: #333333;
              text-align: center;
              color: #ffffff;
              font-size: 24px;
            }

            &:hover {
              p {
                background: #3f83cc;
              }
            }
          }
        }
      }
    }
  }
</style>
