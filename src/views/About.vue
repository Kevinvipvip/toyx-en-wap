<template>
  <div class="about page">
    <Header title="About"></Header>

    <div class="nav">
      <h3>The story goes</h3>
    </div>
    <!--公司介绍内容 Company profile-->
    <div class="title" @click="show_cp=!show_cp">
      <h3>Profile</h3><i><img :src="show_cp?icon[0]:icon[1]" alt=""></i>
    </div>
    <div class="cp-box m-30" v-show="show_cp">
      <div class="cp-name">Company Profile</div>
      <p>Tianjin Lucky Toy Co.,Ltd, founded in 1993, is expert in idea designing, developing and manufacturing of plush
        toys. It exports to North America, Europe, Australia etc for over 20 years with strong products development,
        whole manufacturing system and strict QC system. Now we are engaged in supplying all-age products, owning two
        labels, which are “Unicorn” and “One Happy Family”, and hope we can be your good partner on your way to good
        life. Our target is: put goodness to your life and make your life better.</p>
      <div class="imgs">
        <div class="img" v-for="item in cp_image.pics" :key="item" :style="'background-image: url('+item+');'"></div>
      </div>
    </div>

    <!--发展历程内容 development history-->
    <div class="title" @click="show_dh=!show_dh">
      <h3>History</h3><i><img :src="show_dh?icon[0]:icon[1]" alt=""></i>
    </div>
    <div class="dh-box" v-show="show_dh">
      <ul>
        <li v-for="(v,i) in dh_data" :key="'dh'+i">
          <h3>{{v.year}}</h3>
          <p>{{v.event}}</p>
        </li>
      </ul>
      <!--<div class="height-line">-->
      <!--<p v-for="(v,i) in Math.ceil(dh_data.length/2)" :key="'line'+i">-->
      <!--<i></i>-->
      <!--</p>-->
      <!--</div>-->
      <!--<ul>-->
      <!--<li :class="click_on ===v.id?'on':''" @click="hover_dh(v.id)"-->
      <!--v-for="v in dh_data_left" :key="v.id">-->
      <!--<div class="item left">-->
      <!--<div class="event"><span>{{v.event}}</span></div>-->
      <!--<p>{{v.year}}</p>-->
      <!--</div>-->
      <!--</li>-->
      <!--</ul>-->
      <!--<ul>-->
      <!--<li :class="click_on ===v.id?'on':''" @click="hover_dh(v.id)"-->
      <!--v-for="v in dh_data_right" :key="v.id">-->
      <!--<div class="item right">-->
      <!--<p>{{v.year}}</p>-->
      <!--<div class="event"><span>{{v.event}}</span></div>-->
      <!--</div>-->
      <!--</li>-->
      <!--</ul>-->
    </div>

    <!--企业文化内容 corporate culture-->
    <div class="title" @click="show_cc=!show_cc">
      <h3>Culture</h3><i><img :src="show_cc?icon[0]:icon[1]" alt=""></i>
    </div>
    <div class="cc-box m-30" v-show="show_cc">
      <div class="cc-item">
        <h3>Our advantages</h3>
        <p>27 years experience in plush toy production</p>
        <p>Vigorous staff</p>
        <p>Improve the lean management system</p>
      </div>
      <div class="cc-item">
        <h3>Our principles</h3>
        <p>Excellent quality</p>
        <p>Customer first</p>
        <p>Be honest and trustworthy</p>
      </div>
      <div class="cc-item">
        <h3>Our goal</h3>
        <p>External achievement customers</p>
        <p>Internal achievement of employees</p>
        <p>Give back to the society sincerely</p>
        <p>Realize the dream together</p>
      </div>
      <div class="cc-item">
        <h3>Production team</h3>
        <p>A vigorous and continuous staff team, </p>
        <p>And a set of perfect and capable, the pursuit of</p>
        <p>excellence management system.</p>
      </div>
      <div class="cc-item">
        <h3>Design team</h3>
        <p>An experienced, professional, dedicated and</p>
        <p>innovative team.</p>
      </div>
    </div>

    <!--荣誉资质内容 Honor and qualification-->
    <div class="title" @click="show_hq=!show_hq">
      <h3>Honor</h3><i><img :src="show_hq?icon[0]:icon[1]" alt=""></i>
    </div>
    <div class="hq-box m-30" v-show="show_hq">
      <ul>
        <li v-for="(item,index) in honor" :key="'hq' + index">
          <div class="img"><img :src="item.pic" alt=""></div>
          <p>{{item.title}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import up from '../assets/icons/icon-white-up.png'
  import down from '../assets/icons/icon-white-down.png'

  export default {
    data() {
      return {
        icon: [up, down],
        show_cp: true,//显示或隐藏关于我们
        show_dh: true,//显示或隐藏发展历程
        show_cc: true,//显示或隐藏企业文化
        show_hq: true,//显示或隐藏荣誉资质
        cp_image: {
          pics: [
            this.config.aliyun + 'static/cp-image1.jpg',
            this.config.aliyun + 'static/cp-image2.jpg',
            this.config.aliyun + 'static/cp-image3.jpg',
            this.config.aliyun + 'static/cp-image4.jpg']
        },// 公司介绍在阿里云oss中的图片

        dh_data: this.config.history,//发展历程
        // dh_data_left: [],//发展历程
        // dh_data_right: [],//发展历程
        // click_on: 1,//发展历程选中的选择项

        honor: this.config.honor,// 荣誉资质
      }
    },
    // mounted() {
    //   // this.handle_dh_data();
    // },
    // methods: {
    //   // hover展示该年份发生的事件
    //   hover_dh(index) {
    //     this.click_on = index;
    //   },
    //   // 将发展历程根据数组长度分别放在左右两个数组中
    //   handle_dh_data() {
    //     let arr = this.config.history, left = [], right = [], id = 0;
    //     for (let i = 0; i < arr.length; i++) {
    //       let num = i % 2;
    //       id++;
    //       arr[i].id = id;
    //       if (num === 0) {
    //         left.push(arr[i]);
    //       } else {
    //         right.push(arr[i]);
    //       }
    //     }
    //     this.dh_data_left = left;
    //     this.dh_data_right = right;
    //   }
    // }
  }
</script>
<style scoped lang="scss">
  .about {
    margin-bottom: 80px;

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
    }

    .title {
      background-color: #3f83cc;
      padding: 0 24px;
      height: 88px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      border-bottom: 1px solid rgba(0, 0, 0, 0.03);

      h3 {
        font-weight: normal;
        font-size: 26px;
        color: #ffffff;
      }

      i {
        width: 17px;
        height: 11px;
        display: block;
      }
    }

    .m-30 {
      margin: 0 24px 80px;
    }

    /*公司介绍内容样式*/
    .cp-box {
      transition: 0.5s;

      .cp-name {
        margin-top: 45px;
        font-size: 34px;
        color: #333333;
        font-weight: bold;
      }

      p {
        margin-top: 39px;
        font-size: 28px;
        color: #666666;
        line-height: 40px;
      }

      .imgs {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        margin-top: 46px;

        .img {
          width: calc(50% - 11px);
          height: 259px;
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
          margin-bottom: 22px;
        }
      }
    }

    /*发展历程内容样式*/
    .dh-box {
      margin: 60px 0;

      ul {
        li {
          display: flex;
          flex-grow: 1;
          background-color: #eaf4ff;
          padding: 0 24px;

          &:nth-child(2n) {
            background-color: #f7fbff;
          }

          h3 {
            width: 115px;
            padding-top: 50px;
            flex-shrink: 0;
            font-size: 30px;
            color: #333333;
            font-weight: normal;
            border-right: 6px solid #dcdcdc;
            position: relative;

            &:after {
              content: '';
              position: absolute;
              width: 15px;
              height: 15px;
              background-color: #dcdcdc;
              border-radius: 50%;
              overflow: hidden;
              right: -10px;
              top: 61px;
            }
          }

          p {
            padding: 50px 0;
            flex-grow: 1;
            margin-left: 35px;
            text-align: justify;
            font-size: 28px;
            color: #333333;
            line-height: 40px;
          }
        }
      }

      /*height: 1500px;
      position: relative;

      display: flex;
      justify-content: space-between;

      .height-line {
        position: absolute;
        width: 4px;
        height: 100%;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        background-color: #c5d9ee;

        p {
          width: 100%;
          height: 14.2857%;
          position: relative;

          i {
            position: absolute;
            top: 50%;
            left: 0;
            transform: translate(-5px, -50%);
            background-color: #c5d9ee;
            border-radius: 50%;
            display: block;
            width: 14px;
            height: 14px;
          }
        }
      }

      ul {
        width: 50%;
        display: flex;
        flex-flow: column;
        justify-content: space-between;

        li {
          width: 100%;
          height: 14.2857%;
          cursor: pointer;
          background-color: #eaf4ff;
          overflow: hidden;

          &.on {
            height: 34%;
            transition: 1s;

            .item {
              .event {
                opacity: 1;
                transition: 0.5s;
              }
            }
          }

          &:nth-child(2n) {
            background-color: #f7fbff;
          }

          .item {
            display: flex;
            height: 100%;

            .event {
              opacity: 0;
              flex-grow: 1;
              display: flex;
              justify-content: center;
              align-items: center;
              margin: 0 20px;
              font-size: 28px;
              color: #666666;

              span {
                /*display: -webkit-box;*/
      /*overflow: hidden;*/
      /*text-overflow: ellipsis;*/
      /*word-wrap: break-word;*/
      /*white-space: normal !important;*/
      /*-webkit-line-clamp: 6;*/
      /*-webkit-box-orient: vertical;*/
      /*      }
          }

          p {
            height: 100%;
            width: 100px;
            flex-shrink: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 28px;
            color: #3f83cc;
          }

          &.left {
            p {
              border-left: 1px solid #c5d9ee;
            }
          }

          &.right {
            p {
              border-right: 1px solid #c5d9ee;
            }
          }
        }
      }
    }*/
    }

    /*企业文化内容样式*/
    .cc-box {
      margin-top: 66px;

      .cc-item {
        margin-top: 63px;

        h3 {
          font-size: 30px;
          color: #3f83cc;
          margin-bottom: 27px;
        }

        p {
          line-height: 45px;
          color: #666666;
          font-size: 26px;
        }
      }
    }

    /*荣誉资质内容样式*/
    .hq-box {
      margin-top: 65px;

      ul {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;

        li {
          width: calc(50% - 30px);
          margin-bottom: 40px;

          p {
            font-size: 28px;
            color: #666666;
            margin-top: 30px;
          }
        }
      }
    }
  }
</style>
