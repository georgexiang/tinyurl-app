<template>
  <div v-loading="listLoading" class="app-container">
    <el-form  v-loading="listLoading" ref="form" :model="form" label-width="120px">
      <el-form-item label="Original URL">
        <el-input v-model="form.original_url" placeholder="http://www.baidu.com"   />
      </el-form-item>
      <el-form-item label="Tiny URL">
         <el-input v-model="form.tiny_url" />
      </el-form-item>
      <el-form-item label="Message">
         <el-input v-model="form.message" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="onSubmit">Create</el-button>
        <el-button @click="onClear" type="warning" icon="el-icon-remove-outline" >Clear</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { MessageBox, Message } from 'element-ui'
// import moment from 'moment'
import { getTinyurlAPI } from '@/api/tinyurl'
import axios from 'axios'

export default {
  data() {
    return {
      listLoading: false,
      form: {
        original_url: '',
        tiny_url: '',
        message: '',
        name: '',
        region: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit() {
    this.$message('submit!')
    this.listLoading = true
    this.listQueryParams={original_url : this.form.original_url }

    getTinyurlAPI(this.listQueryParams).then(response => {
           this.form.message=JSON.stringify(response)
           this.form.tiny_url='https://lvw509jgzi.execute-api.ap-southeast-1.amazonaws.com/Stage/tinyurl/'+response.data.tiny_id
          //  response.data.tiny_id
           console.log(response.data)
           this.listLoading = false
    }).catch (error => {
           console.log(error)
    })
    // axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    // axios.get('https://lvw509jgzi.execute-api.ap-southeast-1.amazonaws.com/Stage/tinyurl/666?original_url=http://www.original.com/132')
    // .then(response => (
    // //   this.info = response.data.bpi
    //     console.log(response.data)
        
    //   )
    //   )

    },
    onClear() {
      this.form.message=''
      this.form.tiny_url=''
      this.form.original_url=''

    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

