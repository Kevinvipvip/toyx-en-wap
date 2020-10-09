<template>
  <div class="new-detail page">
    <Header title="News Detail"></Header>
    <div class="detail">
      <div class="title">{{detail.title}}</div>
      <div class="date" v-if="detail.create_time">
        <p>[{{detail.create_time}}]</p>
        <p>Tianjin Lucky Toy Co.,Ltd</p>
      </div>
      <div class="rich-text" v-html="detail.content"></div>
      <!--<div class="share-box">-->
      <!--<i @click="share_page('wb')"><img :src="share_img[0]"/></i>-->
      <!--<i @click="share_page('wx')"><img :src="share_img[1]"/></i>-->
      <!--</div>-->
      <!--<div class="recommend-read" v-if="recommend.length>0">-->
      <!--<div class="title">-->
      <!--<div class="title-l">-->
      <!--<div class="line">-->
      <!--<p></p>-->
      <!--<p></p>-->
      <!--</div>-->
      <!--<div class="content"><p>推荐阅读</p><span>RECOMMEND READING</span></div>-->
      <!--</div>-->
      <!--</div>-->
      <!--<ul>-->
      <!--<li v-for="(v,index) in recommend" :key="index" @click="to_detail(v.id)">-->
      <!--<div class="new-cont">-->
      <!--<h3>{{v.title}}</h3>-->
      <!--<p>{{v.create_time}}</p>-->
      <!--</div>-->
      <!--<div class="new-img" :style="'background-image: url('+v.pic+')'"></div>-->
      <!--</li>-->
      <!--</ul>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        id: 1,//当前新闻资讯的id

        detail: {},//新闻详情
      };
    },
    mounted() {
      this.id = parseInt(this.$route.query.id);
      this.getNewsDetail();
    },
    methods: {
      // 获取新闻资讯详情
      getNewsDetail() {
        let post = {
          id: this.id
        };
        this.utils.ajax(this, 'newsDetail', post).then((res) => {
          res.create_time = this.utils.date_format(res.create_time, 'yyyy-MM-dd hh:mm:ss');
          res.content = res.content.replace(/\/ueditor\/php\/upload\//g, this.config.url + 'ueditor/php/upload/');
          this.detail = res;
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .new-detail {
    overflow: hidden;
    .detail {
      .title {
        font-size: 32px;
        color: #333333;
        text-align: justify;
        margin: 37px 25px 0;
      }

      .date {
        display: flex;
        align-items: center;
        margin: 20px 25px 35px;

        p {
          margin-right: 48px;
          font-size: 24px;
          color: #999999;
        }
      }

      .rich-text {
        margin: 0 25px;
        font-size: 28px;
        line-height: 50px;
        text-align: justify;

        /deep/ img {
          max-width: 100%;
          height: auto;
        }
      }
    }
  }
</style>
