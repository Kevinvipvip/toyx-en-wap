<template>
  <div class="contact page">
    <Header title="Contact"></Header>
    <ul class="address">
      <li>
        <h3>Phone</h3>
        <p>{{us.tel}}</p>
      </li>
      <li>
        <h3>E-mail</h3>
        <p>{{us.email}}</p>
      </li>
      <li>
        <h3>Fax</h3>
        <p>传真：{{us.fax}}</p>
      </li>
      <li>
        <h3>Address</h3>
        <p>{{us.address}}</p>
      </li>
    </ul>

    <!--百度地图-->
    <div class="map">
      <baidu-map class="baidu-map" :zoom="18" :scroll-wheel-zoom="true" :dragging="false" :center="location"
                 @ready="map_init"></baidu-map>
    </div>
  </div>
</template>

<script>
  import icon_address from '../assets/icon-map.png'

  export default {
    data() {
      return {
        // 百度地图
        location: {
          lng: 117.416798,
          lat: 39.95455
        },
        us: {}
      };
    },
    mounted() {
      this.getAboutUs();
    },
    methods: {
      map_init({ BMap, map }) {
        this.$nextTick(() => {
          // 初始化地图,设置中心点坐标
          var point = new BMap.Point(this.location.lng, this.location.lat);
          map.centerAndZoom(point, 18);

          // 添加鼠标滚动缩放
          map.enableScrollWheelZoom();
          // 添加缩略图控件
          // map.addControl(new BMap.OverviewMapControl({ isOpen: false, anchor: BMAP_ANCHOR_BOTTOM_RIGHT }));
          // 添加缩放平移控件
          // map.addControl(new BMap.NavigationControl());
          //添加比例尺控件
          // map.addControl(new BMap.ScaleControl());
          //添加地图类型控件
          //map.addControl(new BMap.MapTypeControl());

          //设置标注的图标
          var icon = new BMap.Icon(icon_address,
            new BMap.Size(28, 39),
            {
              imageSize: new BMap.Size(28, 39),
              anchor: new BMap.Size(14, 39)
            },
          );
          //设置标注的经纬度
          var marker = new BMap.Marker(new BMap.Point(this.location.lng, this.location.lat), { icon: icon });
          //把标注添加到地图上
          map.addOverlay(marker);
          this.utils.ajax(this, 'aboutUs').then(us => {
            // var content = "<table>";
            // // content = content + "<tr><td> 编号：001</td></tr>";
            // content = content + "<tr><td style='text-align: center;line-height: 25px'>" + us.name + "</td></tr>";
            // content = content + "<tr><td> address：" + us.address + "</td></tr>";
            // content = content + "<tr><td style='text-align: center;font-size: 18px;line-height: 30px'><a style='background: #50a7ec;color: #ffffff;padding: 2px 10px' href='http://api.map.baidu.com/marker?location=" + this.location.lat + "," + this.location.lng + "&title=天津同缘兴科技股份有限公司&content=" + us.address + "&output=html&src=webapp.baidu.openAPIdemo' target='_blank'>to here</a></td></tr>";
            // content += "</table>";
            // var infowindow = new BMap.InfoWindow(content);
            // 图标点击的时候显示标注
            marker.addEventListener("click", () => {
              // this.openInfoWindow(infowindow);
              window.location.href = "http://api.map.baidu.com/marker?location=" + this.location.lat + "," + this.location.lng + "&title=天津同缘兴科技股份有限公司&content=" + us.address + "&output=html&src=webapp.baidu.openAPIdemo"
            });
          });

          // 标注默认显示
          // var infoWindow = new BMap.InfoWindow(content) // 创建信息窗口对象
          // map.openInfoWindow(infoWindow, point)
        });
      },

      getAboutUs() {
        this.utils.ajax(this, 'aboutUs').then(res => {
          this.us = res;
        })
      }
    }
  };
</script>

<style lang="scss" scoped>
  .contact {
    margin: 40px 24px 50px;

    .address {
      li {
        margin-bottom: 40px;

        h3 {
          color: #3f83cc;
          font-size: 32px;
        }

        p {
          font-size: 28px;
          color: #666666;
          margin-top: 23px;
        }
      }
    }

    /*百度地图*/
    .map {
      height: 417px;
      margin-top: 50px;
      background-color: #ffffff;

      .baidu-map {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
