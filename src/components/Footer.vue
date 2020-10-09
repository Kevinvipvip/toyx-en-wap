<template>
  <div class="footer">
    <div class="footer-cont">
      <div class="cont">
        <h3>About Us</h3>
        <div class="nav">
          <router-link :to="{path: '/about',query: {on:1}}" class="router">About</router-link>
          <router-link :to="{path: '/about',query: {on:2}}" class="router">History</router-link>
          <router-link :to="{path: '/about',query: {on:3}}" class="router">Culture</router-link>
          <router-link :to="{path: '/about',query: {on:4}}" class="router">Honor</router-link>
        </div>
        <h3>Quick Entry</h3>
        <div class="nav">
          <router-link to="/contact" class="router">Contact</router-link>
          <router-link to="/news" class="router">News</router-link>
          <router-link :to="{path: '/server',query: {on:3,message:1}}" class="router">Message</router-link>
        </div>
      </div>
      <div class="cont">
        <h3>Service Globalization</h3>
        <ul>
          <router-link :to="{path:'/server',query:{nav:2,on:1}}" tag="li">Domestic product</router-link>
          <router-link :to="{path:'/server',query:{nav:2,on:2}}" tag="li">Foreign product</router-link>
          <router-link :to="{path:'/server',query:{nav:2,on:3}}" tag="li">Toys custom</router-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Footer'
  };
</script>

<style lang="scss" scoped>
  .footer {
    height: 500px;
    background-color: #546c81;
    overflow: hidden;

    .footer-cont {
      padding: 70px 24px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      overflow: hidden;


      .cont {
        width: 45%;

        h3 {
          font-size: 32px;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 35px;
        }

        /*快捷导航*/
        .nav {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          margin-bottom: 40px;

          .router {
            width: 33%;
            display: block;
            font-size: 30px;
            color: #ffffff;
            opacity: 0.8;
            margin-bottom: 30px;
            text-align: center;
            position: relative;
            box-sizing: border-box;
          }
        }

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            font-size: 30px;
            color: #ffffff;
            opacity: 0.8;
            margin-bottom: 30px;
            margin-right: 46px;
          }
        }
      }
    }
  }
</style>
