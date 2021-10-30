var fs = require( 'fs' )

const path = require('path');

let rootPath = path.resolve(__dirname,'..'); //代码文件的根路径

// import axios from 'axios'
const axios = require('axios');
// import { MessageBox, Message } from 'element-ui'
// import store from '@/store'
// const store = require('@/store');
// import { getToken } from '@/utils/auth'

axios.defaults.withCredentials = true // 若跨域请求需要带 cookie 身份识别
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded'


// create an axios instance
const service = axios.create({
  baseURL: 'https://lvw509jgzi.execute-api.ap-southeast-1.amazonaws.com', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    config.headers['Content-Type']= 'text/plain'
    // if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
    //   config.headers['X-Token'] = getToken()
    //   config.headers['xzh-Token'] = getToken()
      config.headers['Content-Type']= 'text/plain'
    // }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    console.log(response)
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 200) {
    //   Message({
    //     message: res.message || 'Error',
    //     type: 'error',
    //     duration: 5 * 1000
    //   })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        // MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
        //   confirmButtonText: 'Re-Login',
        //   cancelButtonText: 'Cancel',
        //   type: 'warning'
        // }).then(() => {
        //   store.dispatch('user/resetToken').then(() => {
        //     location.reload()
        //   })
        // })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error)
  }
)

 function getTinyurlAPI(params) {
    return service({
      url: '/Stage/tinyurl/666',
      method: 'get',
      params
    })
  }
  
//   var params='{"url": "http://www.baidu.com/test6"}'
//   getTinyurlAPI(params)

// export default service


let  apiurl='https://lvw509jgzi.execute-api.ap-southeast-1.amazonaws.com/Stage/tinyurl/666?original_url=http://www.original.com/132'


// axios.get(apiurl)
//   .then(response => (
//     //   this.info = response.data.bpi
//         console.log(response.data)
//       )
//       )


      function axiosGet() {
        return axios.get(apiurl, {
            params: {
                id: 'testid',
            }    
        })
        .then((response) => {
            console.log(response.data);
            this.valid = response.data.status;    
            return this.valid;
        })
    }
    
      

  async  function testsync( ) {
         console.log('first')
       await  axiosGet()
         .then((valid) => {
             if(valid) {
                 console.log('axios get request over, and return valid to the sync code.')
             }
         })

         console.log('next')


    }

    testsync( )