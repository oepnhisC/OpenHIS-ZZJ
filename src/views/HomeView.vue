<template>
  <div>
    <v-container>
      <v-row ><v-col align="center" style="font-size: 40px;font-weight: bold;">欢迎使用自助终端</v-col></v-row>
      <v-row><v-col align="center" style="font-size: 20px;">请出示电子医保凭证扫码</v-col></v-row>
      <v-row>
        <v-col align="center">
          <v-text-field v-model="yibaopingzheng" label="" type="password" autofocus @blur="$event.target.focus()" ></v-text-field>
        </v-col>
      </v-row>
      
      <v-row><v-progress-linear v-if="loading" indeterminate></v-progress-linear></v-row>
      <v-row><v-col><v-alert density="compact" title="失败" type="error"  v-show="errFlag">{{ errmsg }}</v-alert></v-col></v-row>
      <!-- <v-row><v-col align="center" v-if="errFlag" style="color:red;font-size: 16px;" >{{errmsg}}</v-col></v-row> -->
      <v-row><v-col align="center"  ><v-btn @click="sendData()" size="large">假装已扫码</v-btn> </v-col></v-row>
      
    </v-container>
    
  </div>
</template>

<script>

import { mapActions } from 'vuex';

export default {
  name: 'HomeView',
  data() {
    return {
      currentKey: '',
      yibaopingzheng: '',
      loading: false,
      errFlag: false,
      errmsg: ''
    };
  },

  methods: {
    handleKeydown(event) {
      if (event.key === 'Enter') {
        if(this.yibaopingzheng != ''){
          this.sendData();
        }
        
      }
    },
    ...mapActions(['updateResponseData']),
    async sendData() {
      try {
        this.loading = true;
        const response = await this.$axios.post('/zizhuji/test', {
          number: this.yibaopingzheng
        });
        // console.log('请求成功:', response.data);
        if (response.data){
          if(response.data.code == 0){
            console.log(response.data.result);
            this.errmsg = response.data.result;
            this.errFlag = false;
            this.updateResponseData(this.errmsg);
            this.$router.replace('/danju');
          }else{
            console.log(response.data);
            this.errFlag = true;
            this.errmsg = response.data.result ;
          }
        }
        this.loading = false;
        this.yibaopingzheng = '';
      } catch (error) {
        this.errmsg = '网络请求失败，请联系管理员';
        console.error('请求失败:', error);
        this.yibaopingzheng = '';
        this.loading = false;
      }
    },

  },
  mounted() {
    window.addEventListener('keydown', this.handleKeydown);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.handleKeydown);
  },
};
</script>
