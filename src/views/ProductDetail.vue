<template>
  <div class="product-detail page">
    <Header title="Product Details"></Header>
    <div class="detail-swiper">
      <!-- swiper1 -->
      <div class="product-swiper">
        <swiper :options="swiperOption" class="swiper" ref="swiperTop">
          <swiper-slide class="swiper-item" v-for="(item,index) in detail.pics" :key="index">
            <div class="img" :style="'background-image: url('+item+')'"></div>
          </swiper-slide>
        </swiper>
      </div>
      <div class="product-thumbs">
        <!--swiper2 Thumbs-->
        <swiper :options="swiperOptionThumbs" class="swiper" ref="swiperThumbs">
          <swiper-slide class="swiper-item" v-for="(item,index) in detail.pics" :key="index">
            <div class="img" :style="'background-image: url('+item+')'"
                 :class="activeIndex === index?'on':''"></div>
          </swiper-slide>
        </swiper>
      </div>
    </div>

    <div class="product-name">{{detail.name}}</div>
    <div class="price">${{detail.price}}</div>

    <!--购买方式-->
    <div class="to-buy">
      <div class="btn-1688-buy">
        <a :href="detail.alibaba_url">BUY IT NOW</a>
      </div>
    </div>

    <!--产品详情-->
    <div class="detail"><p>{{detail.desc}}</p></div>
  </div>
</template>

<script>
  import 'swiper/dist/css/swiper.css'// 这里注意具体看使用的版本是否需要引入样式，以及具体位置。
  import { swiper, swiperSlide } from 'vue-awesome-swiper' // 引入slider组件
  var _self;
  export default {
    components: {
      swiper,
      swiperSlide
    },
    data() {
      return {
        id: 0,//当前产品的id
        detail: { pics: [] },//产品详情
        activeIndex: 0,// 当前轮播图索引值

        // swiper1
        swiperOption: {
          autoplay: { delay: 3000, stopOnLastSlide: false, disableOnInteraction: false },
          speed: 800, direction: 'horizontal', on: {
            slideChange() {
              _self.activeIndex = this.realIndex;
            }
          }
        },
        // swiper2 Thumbs
        swiperOptionThumbs: {
          slidesPerView: 4, direction: 'vertical', spaceBetween: 20, on: {
            tap() {
              if (this.clickedSlide) {
                const swiperTop = _self.$refs.swiperTop.swiper;
                _self.activeIndex = this.clickedIndex;
                swiperTop.slideTo(this.clickedIndex);
              }
            }
          }
        }
      };
    },
    mounted() {
      _self = this;
      this.id = parseInt(this.$route.query.id);
      this.getProductDetail();
    },
    methods: {
      // 获取产品详情
      getProductDetail() {
        let post = { id: this.id };
        this.utils.ajax(this, 'productDetail', post).then(res => {
          this.utils.aliyun_format(res.pics);
          this.detail = res;
        })
      }
    }
  };
</script>

<style lang="scss" scoped>
  .product-detail {
    .detail-swiper {
      height: 570px;
      margin: 0 24px;
      display: flex;
      justify-content: space-between;

      .swiper {
        height: 100%;

        .swiper-item {
          .img {
            width: 100%;
            height: 100%;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            border: solid 1px #999999;
            box-sizing: border-box;
          }
        }
      }

      .product-swiper {
        width: 570px;
        height: 100%;
      }

      .product-thumbs {
        width: 113px;
        height: 100%;

        .swiper {

          .swiper-item {
            .img {
              border: none;

              &.on {
                border: solid 1px #999999;
              }
            }
          }
        }
      }
    }

    /*标题*/
    .product-name {
      font-size: 30px;
      color: #333333;
      margin: 40px 24px;
    }

    /*价格*/
    .price {
      margin: 0 24px;
      font-size: 32px;
      color: #333333;
      display: flex;
      align-items: center;
    }

    /*购买方式*/
    .to-buy {
      margin: 47px 24px 0;

      .btn-1688-buy, a {
        width: 100%;
        height: 80px;
        background-color: #50a7ec;
        border-radius: 4px;
        font-size: 30px;
        color: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    /*产品详情*/
    .detail {
      margin: 64px 24px;
      border-top: 3px solid #e6e6e6;

      p {
        margin-top: 25px;
        font-size: 28px;
        line-height: 40px;
        color: #666666;
      }
    }
  }
</style>
