<template>
  <div class="server page">
    <Header title="Service"></Header>
    <div class="nav">
      <h3>Display all selections</h3>
      <!--国内市场和国外市场-->
      <div class="tab">
        <p :class="internal === 1?'on':''" @click="tab(1)"><span>Domestic product</span>
          <i :style="'background-image: url('+bg_icon1+')'"></i></p>
        <p :class="internal === 2?'on':''" @click="tab(2)"><span>Foreign product</span>
          <i :style="'background-image: url('+bg_icon2+')'"></i></p>
        <p :class="internal === 3?'on':''" @click="tab(3)"><span>Toys custom</span>
          <i :style="'background-image: url('+bg_icon3+')'"></i></p>
      </div>

      <!--分类-->
      <div class="cate-box" :style="foreign_cate_show||domestic_cate_show?'height: auto;':'height: 0;'">
        <div class="cate-item" :class="cate_id === 0?'on':''" @click="change_cate()">
          <div class="icon"><img :src="cate_id===0?icons[5]:icons[4]"/></div>
          <span>All</span>
        </div>
        <div class="cate-item" v-for="(item,index) in cate_list" :key="index" @click="change_cate(item.id)"
             :class="cate_id === item.id?'on':''">
          <div class="icon"><img :src="cate_id===item.id?icons[5]:icons[4]"/></div>
          <span>{{item.cate_name}}</span>
        </div>
      </div>
    </div>

    <!--产品列表-->
    <div class="product" v-if="internal!==3">
      <ul v-if="product_list.length">
        <router-link tag="li" :to="{path:'productdetail',query:{id:item.id}}" v-for="(item,index) in product_list"
                     :key="index">
          <div class="img-box" :style="'background-image: url('+item.pic+')'"></div>
          <h3 class="two-line-ellipsis">{{item.name}}</h3>
        </router-link>
      </ul>
      <div class="pagination" v-if="nodata">{{btn_text}}</div>
      <div class="pagination" @click="load_more" v-else>Load More</div>
    </div>

    <!--玩具定制-->
    <div class="customized" v-else>
      <div class="banner"><img :src="customized_banner"/></div>
      <!--定制产品-->
      <div class="customized-one">
        <h3>We can customize the following products:</h3>
        <ul>
          <li v-for="item in customized" :key="item.id">
            <div class="img"><img :src="item.pic"/></div>
            <p class="one-line-ellipsis">{{item.title}}</p>
          </li>
        </ul>
      </div>
      <div class="banner"><img :src="customized_banner2"/></div>
      <!--定制流程-->
      <ul class="customized-two">
        <li v-for="item in customized_liucheng" :key="item.id">
          <div class="liucheng-img" :style="'background-image: url('+item.pic+')'"></div>
          <div class="line"><i></i></div>
          <p class="one-line-ellipsis">{{item.name}}</p>
        </li>
      </ul>
      <!--Custom Message-->
      <div class="message" ref="message">
        <h3>Custom Message</h3>
        <div class="form">
          <div class="ipt-tip" :style="btn_no_cilck?'color: #ff4c4c;':'color: #50a8ec;'">{{ipt_tip}}</div>
          <div class="input">
            <div class="ipt-box"><input type="text" v-model="name" placeholder="Name"></div>
            <div class="ipt-box"><input type="text" v-model="phone" placeholder="Phone" maxlength="11"
                                        @blur="blur_reg_tel" oninput="value=value.replace(/[^\d]/g,'')"></div>
          </div>
          <div class="input textarea"><textarea v-model="desc" placeholder="Message contents..."></textarea></div>
          <div class="btn-submit" @click="submit_message" v-if="btn_no_cilck">Submit</div>
          <div class="btn-submit" style="opacity: 0.6;cursor: auto" v-else>Submit</div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
  import icon1 from '../assets/icons/icon-add.png'
  import icon2 from '../assets/icons/icon-reduce.png'
  import icon3 from '../assets/icons/icon-white-up.png'
  import icon4 from '../assets/icons/icon-white-down.png'
  import icon5 from '../assets/icons/icon-checkbox.png'
  import icon6 from '../assets/icons/icon-checked.png'

  export default {
    data() {
      return {
        // 玩具定制 start
        customized_banner: this.config.aliyun + 'static/customized-banner-en.jpg',//玩具定制banner图
        customized_banner2: this.config.aliyun + 'static/customized-banner2-en.png',//玩具定制..中间banner图
        customized: this.config.customized,
        customized_liucheng: this.config.customized_liucheng,

        // 留言中心
        name: '',
        phone: '',
        desc: '',
        ipt_tip: '',
        btn_no_cilck: true,

        //玩具定制 end

        icons: [icon1, icon2, icon3, icon4, icon5, icon6],
        bg_icon1: icon1,
        bg_icon2: icon1,
        bg_icon3: icon3,


        internal: 1,//1是国内产品；2是国外产品

        cate_id: 0,//分类的id，也是分类的活动项
        domestic_cate_id: 0,//选择国内分类
        foreign_cate_id: 0,//选择国外分类
        domestic_product: [],//国内产品列表，做数据保留使用
        foreign_product: [],//国外产品列表，做数据保留使用

        domestic_cate_show: false,//点击国内产品时显示分类
        foreign_cate_show: false,//点击国外产品时显示分类

        page: 1,
        perpage: 6,//每一页的请求条数
        total: 0,//所以产品总数

        cate_list: [],//分类列表
        product_list: [],//产品列表

        nodata: false,
        btn_text: 'Load More'
      };
    },
    mounted() {
      this.internal = parseInt(this.$route.query.on) || 1;
      this.internal_operate(this.internal);
      this.getCateList();
      this.$nextTick(() => {
        if (parseInt(this.$route.query.message) === 1) {
          window.scrollTo({
            top: this.$refs.message.offsetTop - 60,
            behavior: "smooth"
          });
        }

      });
    },
    methods: {
      // 点击国内国外产品时操作
      tab(index) {
        this.internal = index;
        this.internal_operate(index);
      },

      // 点击分类时操作
      change_cate(id) {
        this.page = 1;
        this.cate_id = id || 0;
        this.getProductList();
        if (this.internal === 1) {
          this.domestic_cate_id = id;
        } else {
          this.foreign_cate_id = id;
        }
      },

      // 分页页码改变时
      load_more() {
        this.page++;
        // console.log(this.page);
        this.getProductList(res => {
          if (this.internal === 1) {
            this.domestic_product = res;
          } else {
            this.foreign_product = res;
          }
        });
      },
      // 点击提交信息到后台
      submit_message() {
        if (!this.name.trim()) {
          this.ipt_tip = 'Please enter your name';
          // this.$message('请输入你的姓名');
        } else if (!this.phone.trim()) {
          this.ipt_tip = 'Please enter your contact information';
          // this.$message('请输入你的联系方式');
        } else if (!this.desc.trim()) {
          this.ipt_tip = 'Please enter the content and submit it';
          // this.$message('请输入内容后提交');
        } else if (!this.config.tel_reg.test(this.phone)) {
          this.ipt_tip = 'Please enter the correct mobile phone number';
          // this.$message('请输入内容后提交');
        } else {
          let post = {
            name: this.name,
            tel: this.phone,
            message: this.desc
          };
          // console.log(post);
          this.utils.ajax(this, 'leaveMessage', post).then(() => {
            this.$dialog.alert({
              title: 'success',
              message: 'Your message information has been submitted to the background. Thank you for your message.',
            }).then(() => {
              this.desc = '';
              this.name = '';
              this.phone = '';
              this.btn_no_cilck = false;
              // this.ipt_tip = 'Your message information has been submitted to the background. Thank you for your message.';
            });
          })
        }
      },
      // 验证电话号码
      blur_reg_tel() {
        if (!this.phone.trim()) {
          this.ipt_tip = '';
        } else {
          if (!this.config.tel_reg.test(this.phone)) {
            this.ipt_tip = 'Please enter the correct mobile phone number';
          } else {
            this.ipt_tip = '';
          }
        }
      },

      // 选择国内产品或者国外产品时的操作
      internal_operate(internal) {
        switch (internal) {
          case 1:
            this.page = 1;
            // this.product_list = this.domestic_product;
            this.domestic_cate_show = true;
            this.foreign_cate_show = false;
            this.cate_id = this.domestic_cate_id || 0;
            this.bg_icon1 = icon2;
            this.bg_icon2 = icon1;
            this.bg_icon3 = icon3;
            this.getProductList();
            break;
          case 2:
            this.page = 1;
            // this.product_list = this.foreign_product;
            this.domestic_cate_show = false;
            this.foreign_cate_show = true;
            this.cate_id = this.foreign_cate_id || 0;
            this.bg_icon1 = icon1;
            this.bg_icon2 = icon2;
            this.bg_icon3 = icon3;
            this.getProductList();
            break;
          case 3:
            this.domestic_cate_show = false;
            this.foreign_cate_show = false;
            this.bg_icon1 = icon1;
            this.bg_icon2 = icon1;
            this.bg_icon3 = icon4;
            break;
        }
      },
      // 获取分类列表
      getCateList() {
        this.utils.ajax(this, 'cateList').then(res => {
          this.cate_list = res;
          if (this.config.cate.cate_flag) {
            this.cate_id = parseInt(this.config.cate.cate_id);
            this.config.cate.cate_flag = false;
          } else {
            this.cate_id = 0;
          }
        })
      },
      // 获取产品列表
      getProductList(succ) {
        let arr = this.product_list;
        // console.log(this.page);
        if (this.page === 1) {
          arr = []
        }
        // else {
        //   console.log(this.domestic_product, 'this.domestic_product');
        //   console.log(this.foreign_product, 'this.foreign_product');
        //   if (this.internal === 1) {
        //     arr = this.domestic_product;
        //   } else {
        //     arr = this.foreign_product;
        //   }
        // }
        let post = {
          page: this.page,
          perpage: this.perpage,
          cate_id: this.cate_id,
          internal: this.internal
        };
        this.utils.ajax(this, 'productList', post).then(res => {
          if (!res.list.length) {
            this.nodata = true;
            this.btn_text = 'no data';
          } else {
            if (res.list.length < this.perpage) {
              this.nodata = true;
              this.btn_text = 'There is no more';
            } else {
              this.nodata = false;
            }
          }
          this.utils.aliyun_format(res.list, 'pic');
          for (let i = 0; i < res.list.length; i++) {
            arr.push(res.list[i]);
          }
          this.product_list = arr;
          this.total = res.count;
          if (succ) {
            succ(arr);
          }
        })
      }
    }
  };
</script>

<style lang="scss" scoped>
  .server {
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
          /*width: 33.333%;*/
          font-size: 26px;
          color: #ffffff;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          position: relative;

          i {
            margin-left: 20px;
            display: block;
            width: 15px;
            height: 15px;
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
          }

          &.on:after {
            content: '';
            position: absolute;
            background-color: #e6e6e6;
            height: 4px;
            width: 100%;
            bottom: 0;
          }
        }
      }

      /*分类的样式*/
      .cate-box {
        height: 0;
        overflow: hidden;
        display: flex;
        flex-flow: column;
        /*padding: 30px 0;*/
        box-sizing: border-box;

        .cate-item {
          height: 45px;
          display: flex;
          align-items: center;

          &:first-child {
            margin-top: 30px;
          }

          &:last-child {
            margin-bottom: 30px;
          }

          .icon {
            width: 16px;
            height: 16px;
            margin-right: 15px;
            flex-shrink: 0;
          }

          span {
            flex-grow: 1;
            color: #ffffff;
            font-size: 26px;
            display: block;
          }

          &.on {
          }
        }
      }
    }


    /*产品列表样式*/
    .product {
      margin-bottom: 80px;

      ul {
        margin: 60px 24px;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;

        li {
          width: calc(50% - 12px);
          margin-top: 40px;

          &:nth-child(-n+2) {
            margin-top: 0;
          }

          .img-box {
            width: 100%;
            padding-bottom: 100%;
            height: 0;
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
            border: solid 1px #ededed;
            border-radius: 10px;
          }

          h3 {
            margin-top: 24px;
            /*text-align: justify;*/
            font-weight: normal;
            font-size: 28px;
            color: #666;
          }
        }
      }

      .pagination {
        margin: 20px auto;
        width: 250px;
        height: 60px;
        background-color: #3f83cc;
        border-radius: 10px;
        font-size: 30px;
        text-align: center;
        line-height: 60px;
        color: #ffffff;
      }
    }


    /*玩具定制样式*/
    .customized {

      .customized-one {
        margin: 30px 24px 71px;

        h3 {
          font-size: 28px;
          color: #3f83cc;
          font-weight: normal;
          margin-top: 38px;
        }

        ul {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;

          li {
            width: 217px;
            margin-top: 107px;

            .img {
              margin: 0 auto 60px;
              width: 147px;
              height: 186px;
            }

            p {
              padding: 0 8px;
              text-align: center;
              color: #3f83cc;
              font-size: 24px;
              height: 44px;
              line-height: 44px;
              user-select: none;
            }

            &:hover {
              /*min-width: 217px;*/
              /*width: auto;*/
              position: relative;
              min-height: 290px;

              p {
                position: absolute;
                left: 50%;
                min-width: 100%;
                transform: translateX(-50%);
                background-color: #3f83cc;
                color: #ffffff;

                &:after {
                  content: '';
                  height: 100%;
                }
              }
            }
          }
        }
      }

      /*定制流程样式*/
      .customized-two {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;

        li {
          width: 25%;
          margin-top: 70px;
          position: relative;
          display: flex;
          flex-flow: column;
          align-items: center;


          .liucheng-img {
            width: 49px;
            height: 49px;
            background-size: contain;
            background-position: center;
            background-repeat: no-repeat;
          }

          .line {
            margin: 24px 0;
            height: 6px;
            width: 100%;
            background-color: #c5d9ee;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;

            i {
              background-color: #c5d9ee;
              display: block;
              width: 23px;
              height: 23px;
              border-radius: 50%;
              position: relative;
              z-index: 3;
            }
          }

          &:first-child {
            .line:after {
              content: '';
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              left: 0;
              width: 50%;
              height: 200%;
              background-color: #fff;
              z-index: 2;
            }
          }

          &:last-child {
            .line:after {
              content: '';
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              right: 0;
              width: 50%;
              height: 200%;
              background-color: #fff;
              z-index: 2;
            }
          }

          p {
            text-align: center;
            font-size: 18px;
            color: #3f83cc;
            user-select: none;
            width: 100%;
          }
        }
      }

      /*Custom Message*/
      .message {
        margin: 80px 24px;
        margin-bottom: 65px;
        border: solid 1px #c0c0c0;

        h3 {
          font-size: 30px;
          color: #3f83cc;
          text-align: center;
          font-weight: normal;
          margin-top: 41px;
        }

        .form {
          position: relative;
          margin: 45px 30px 60px;

          .ipt-tip {
            position: absolute;
            color: #ff4c4c;
            height: 45px;
            line-height: 45px;
            font-size: 28px;
            left: 0;
            top: -45px;
          }

          .input {
            margin: 30px 0 24px;

            .ipt-box {
              width: 100%;
              height: 80px;
              border-radius: 4px;
              border: solid 2px #c5d9ee;
              padding: 0 26px;
              box-sizing: border-box;
              margin-bottom: 34px;

              input {
                display: flex;
                align-items: center;
                height: 100%;
                width: 100%;
                border: none;
                outline: none;
                font-size: 28px;
                color: #666;
                background: unset;

                &::placeholder {
                  color: #999999;
                  opacity: 0.6;
                  font-size: 28px;
                }
              }
            }

            &.textarea {
              margin: 0;
              border: 2px solid #c5d9ee;
              border-radius: 4px;
              height: 362px;
              padding: 16px 14px;
              box-sizing: border-box;

              textarea {
                display: block;
                width: 100%;
                height: 100%;
                outline: none;
                border: none;
                background: unset;
                font-size: 28px;
                color: #666;
                resize: none;
                overflow: hidden;
                line-height: 40px;

                &::placeholder {
                  color: #999999;
                  opacity: 0.6;
                  font-size: 28px;
                }
              }
            }
          }

          .btn-submit {
            margin: 60px auto 0;
            width: 200px;
            height: 64px;
            background-color: #3f83cc;
            font-size: 30px;
            color: #ffffff;
            line-height: 64px;
            text-align: center;
          }
        }
      }
    }
  }
</style>
