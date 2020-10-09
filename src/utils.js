import config from './config';
import qs from 'qs';

const date_format = (date, fmt = 'yyyy.MM.dd') => {
  if (date) {
    // 如果是数字类型
    if (typeof date === 'number') {
      date = new Date(date * 1000);
    }

    var o = {
      "M+": date.getMonth() + 1, //月份
      "d+": date.getDate(), //日
      "h+": date.getHours(), //小时
      "m+": date.getMinutes(), //分
      "s+": date.getSeconds(), //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  } else {
    return '';
  }
};

const ajax = (vue, url, data, handle_code_list = []) => {
  data = data || {};
  // let token = localStorage.getItem('token');
  // if (data instanceof FormData) {
  //   data.append('token', token)
  // } else {
  //   data.token = token
  // }

  return new Promise((resolve, reject) => {
    vue.$axios({
      method: 'post',
      url: config.api + url,
      data: data instanceof FormData ? data : qs.stringify(data),  // 如果是FormData类型则为上传文件，data原样上传
      timeout: 5000  // 请求超时时间
    }).then(res => {
      if (res.data.code === 1) {
        resolve(res.data.data)  // 接口正确则直接返回数据
      } else {
        // 如果错误码在自行处理的列表里，则reject回去
        if (handle_code_list.indexOf(res.data.code) !== -1) {
          reject(res.data)
        } else {
          switch (res.data.code) {
            case -3:  // token无效
            case -5:  // token未传
              // 重新跳转授权
              localStorage.clear();
              // auth(vue.$route.fullPath);
              break;
            default:
              vue.$toast(res.data.message);
              break;
          }
        }
      }
    }).catch(() => {
      vue.$toast('network timeout')
    })
  })
};
// 处理阿里云图片路径
const aliyun_format = (obj, aliyun_field = 'pic') => {
  if (obj instanceof Array) {
    if (typeof obj[0] === 'string') {
      for (let i = 0; i < obj.length; i++) {
        obj[i] = aliyun_empty_or(obj[i]);
      }
    } else {
      for (let i = 0; i < obj.length; i++) {
        obj[i][aliyun_field] = aliyun_empty_or(obj[i][aliyun_field]);
      }
    }
  } else if (typeof obj === 'object') {
    obj[aliyun_field] = aliyun_empty_or(obj[aliyun_field]);
  } else {
    return aliyun_empty_or(obj);
  }
};
const aliyun_empty_or = (aliyun) => {
  if (aliyun) {
    if (aliyun.indexOf('https') === 0) {
      return aliyun;
    } else {
      return config.aliyun + aliyun;
    }
  }
};
const format_img = (obj, img_field = 'pic') => {
  if (obj instanceof Array) {
    if (typeof obj[0] === 'string') {
      for (let i = 0; i < obj.length; i++) {
        obj[i] = empty_or(obj[i]);
      }
    } else {
      for (let i = 0; i < obj.length; i++) {
        obj[i][img_field] = empty_or(obj[i][img_field]);
      }
    }
  } else if (typeof obj === 'object') {
    obj[img_field] = empty_or(obj[img_field]);
  } else {
    return empty_or(obj);
  }
};
const empty_or = (img) => {
  if (img) {
    if (img.indexOf('https') === 0) {
      return img;
    } else {
      return config.url + img;
    }
  }
};

export default {
  date_format,    //格式化时间
  ajax,           //请求后台数据
  format_img,     //补全图片路径
  aliyun_format,  //补全阿里云图片路径
}
