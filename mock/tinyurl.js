const Mock = require('mockjs')
// import axios from 'axios'

const axios = require('axios')
 module.exports  = [
  {
    // url: '/tinyurl/{tinyid}',
    url: '/tinyurl',
    type: 'get',
    response:   config  =>   {
        var items      
        // console.log('222')  
          
        (async () => {  
           items= await callTinyUrlAPI(config)

           items=  await callTinyUrlAPI(config)
        })();
        
        console.log('next')   
        console.log(items)  
         return  { code: 20000, data: items }
         
    }
  }
]


async function getTinyurl(config ){
     
  console.log('first')
  items=  await callTinyUrlAPI(config)
  
  console.log('next')   
  console.log(items.message) 

  return { code: 20000, data: items }
}

async function  callTinyUrlAPI  (params) { 
  try{
      console.log('123 callTinyUrlAPI__') 
      const queryResponse = await axios.get('https://lvw509jgzi.execute-api.ap-southeast-1.amazonaws.com/Stage/tinyurl/666?original_url=http://www.original.com/132')
      console.log(queryResponse.data)
      // console.log(queryResponse.Items[0])
      return queryResponse.data
  }catch (error) {
      console.log(error)
      return false
    }

} 