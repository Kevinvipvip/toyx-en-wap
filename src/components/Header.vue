<template>
  <div class="header" :style="show_nav?'':'height: 100%'">
    <div class="show-header">
      <h3 v-if="title">{{title}}</h3>
      <div class="logo" v-else><img src="../assets/logo-header.png"/></div>
      <div class="icon-box" @click="show_nav = !show_nav"><img :src="show_nav?icon_nav[0]:icon_nav[1]"/></div>
    </div>
    <div class="nav-cont">
      <ul>
        <li @click="show_nav = true">
          <router-link to="/">Home</router-link>
        </li>
        <li @click="show_nav = true">
          <router-link to="/server">Service</router-link>
        </li>
        <li @click="show_nav = true">
          <router-link to="/news">News</router-link>
        </li>
        <li @click="show_nav = true">
          <router-link to="/about">About</router-link>
        </li>
        <li @click="show_nav = true">
          <router-link to="/contact">Contact</router-link>
        </li>
        <li @click="show_nav = true">
          <a href="http://www.tjluckytoy.com">CN / EN</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import img_nav from '../assets/icon-nav.png'
  import img_nav_close from '../assets/icon-nav-close.png'

  export default {
    name: 'Header',
    props: {
      title: String
    },
    data() {
      return {
        icon_nav: [img_nav, img_nav_close],
        show_nav: true
      }
    }
  }
</script>

<style scoped lang="scss">
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 98px;
    overflow: hidden;
    transition: 0.2s;
    background-color: #ffffff;
    z-index: 999999;

    .show-header {
      padding: 0 30px;
      height: 98px;
      display: flex;
      box-sizing: border-box;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 2px 6px 0 rgba(199, 210, 227, 0.75);

      h3 {
        font-size: 37px;
        color: #333333;
        font-weight: normal;
      }

      .logo {
        height: 46px;

        img {
          height: 100%;
          width: auto;
        }
      }

      .icon-box {
        width: 40px;
        height: 34px;
      }
    }

    .nav-cont {
      ul {
        margin-top: 30px;

        li {
          margin: 20px 30px;
          border-bottom: 2px solid #2054a3;

          a {
            display: block;
            text-align: center;
            font-size: 32px;
            color: #333333;
            padding: 20px 0;
            box-sizing: border-box;
          }
        }
      }
    }
  }
</style>
