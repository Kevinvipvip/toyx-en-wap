<template>
  <div class="news page">
    <Header title="News"></Header>
    <div class="nav">
      <h3>News information</h3>
      <div class="tab">
        <p :class="tab_on === 1?'on':''" @click="tab_change(1)"><span>Company news</span>
          <i :style="'background-image: url('+bg_icon1+')'"></i></p>
        <p :class="tab_on === 2?'on':''" @click="tab_change(2)"><span>Industry trends</span>
          <i :style="'background-image: url('+bg_icon2+')'"></i></p>
      </div>
    </div>
    <div class="nodata" v-if="news_list.length === 0">Content filling</div>
    <div class="news-list">
      <ul>
        <router-link tag="li" :to="{path:'/newdetail',query:{id:item.id}}" v-for="(item,index) in news_list"
                     :key="index">
          <div class="img" :style="'background-image: url('+item.pic+')'"></div>
          <div class="new-cont">
            <h3 class="one-line-ellipsis">{{item.title}}</h3>
            <p class="two-line-ellipsis">{{item.desc}}</p>
            <span>{{item.create_time}}</span>
          </div>
        </router-link>
      </ul>

      <div class="pagination" v-if="total>perpage">
        <van-pagination
                v-model="page"
                :total-items="total"
                :show-page-size="3"
                prev-text="<"
                next-text=">"
                :items-per-page="perpage"
                force-ellipses
                @change="page_change"/>
      </div>
    </div>
  </div>
</template>

<script>
  import icon1 from '../assets/icons/icon-white-up.png'
  import icon2 from '../assets/icons/icon-white-down.png'

  export default {
    data() {
      return {
        tab_on: 1,//当前tab选中项

        bg_icon1: '',
        bg_icon2: '',

        perpage: 3,//每次请求新闻资讯条数
        page: 1,//当前页码
        total: 0,//新闻资讯总数

        news_list: [],// 新闻列表
      };
    },
    mounted() {
      this.tab_on = parseInt(this.$route.query.on) || 1;
      if (this.tab_on === 1) {
        this.bg_icon1 = icon2;
        this.bg_icon2 = icon1;
      } else {
        this.bg_icon1 = icon1;
        this.bg_icon2 = icon2;
      }
      this.getNewsList();
    },
    methods: {
      // 公司动态和行业动态的切换
      tab_change(tab) {
        if (tab !== this.tab_on) {
          this.$router.push({
            path: '/center',
            query: {
              on: tab
            }
          });
        }
      },

      // 分页页码改变时
      page_change(page) {
        this.page = page;
        this.getNewsList();
      },

      // 获取新闻资讯列表
      getNewsList() {
        let post = {
          page: this.page,
          perpage: this.perpage,
          type: this.tab_on
        };
        this.utils.ajax(this, 'newsList', post).then(res => {
          this.utils.aliyun_format(res.list, 'pic');
          for (let i = 0; i < res.list.length; i++) {
            res.list[i].create_time = this.utils.date_format(res.list[i].create_time, 'yyyy-MM-dd');
          }
          console.log(res);
          this.news_list = res.list;
          this.total = res.count;
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .news {
    margin-bottom: 100px;

    .nav {
      background-color: #3f83cc;
      padding: 0 25px;

      h3 {
        font-size: 26px;
        color: #e6e6e6;
        padding: 24px 0;
        box-sizing: border-box;
        border-bottom: 2px solid #e6e6e6;
      }

      /*国内和国外切换的样式*/
      .tab {
        display: flex;
        height: 88px;
        justify-content: space-between;

        p {
          width: calc(50% - 25px);
          font-size: 26px;
          color: #ffffff;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 100%;

          i {
            margin-left: 20px;
            display: block;
            width: 15px;
            height: 15px;
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
          }
        }
      }
    }

    .nodata {
      font-size: 32px;
      text-align: center;
    }

    .news-list {
      margin: 40px 30px;

      ul {
        li {
          display: flex;
          justify-content: space-between;
          margin-bottom: 30px;

          .img {
            flex-shrink: 0;
            width: 270px;
            height: 180px;
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
            margin-right: 24px;
          }

          .new-cont {
            flex: 1;
            min-width: 0;
            display: flex;
            flex-flow: column;
            justify-content: space-between;

            h3 {
              font-size: 28px;
              font-weight: normal;
              color: #333333;
            }

            p {
              font-size: 26px;
              color: #666666;
              margin-bottom: 20px;
              text-align: justify;
            }

            span {
              font-size: 24px;
              color: #999999;
            }
          }
        }
      }

      .pagination {
        margin-top: 80px;

        /deep/ ul {
          margin: 0;
          justify-content: center;
          flex-wrap: unset;

          li {
            min-width: 55px;
            width: 55px;
            height: 55px;
            flex-shrink: 0;
            font-size: 22px;
            color: #666666;
            margin-left: 15px;
            border-radius: 4px;
            border: solid 1px #999999;
            flex: none;
            padding: 0;

            &:first-child {
              margin-left: 0;
            }

            &:after {
              content: unset;
            }

            &.van-pagination__item--active {
              color: #fff;
              border: none;
            }
          }
        }
      }
    }
  }
</style>
