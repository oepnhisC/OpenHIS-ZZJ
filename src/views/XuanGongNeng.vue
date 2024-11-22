<template>
    <div>
      <v-container>
        <v-row >
          <v-col align="left" ><v-btn variant="plain"></v-btn></v-col>
          <v-col align="center" style="font-size: 40px;font-weight: bold;">请选择功能</v-col>
          <v-col align="right"><v-btn size="x-large" style="margin-top: 8px;" @click="quit()">退出</v-btn></v-col>
        </v-row>
        <v-row>
          <v-col align="center"><v-btn @click="this.$router.replace('/danju');" size="x-large">缴费</v-btn> </v-col>
          <v-col align="center"><v-btn @click="this.$router.replace('/jiezhangdanju');" size="x-large">查询已缴费单据</v-btn> </v-col>
        </v-row>
        <v-row><v-col><v-alert density="compact" title="失败" type="error"  v-show="errFlag">{{ errmsg }}</v-alert></v-col></v-row>
      </v-container>
      
    </div>
  </template>
  
  <script>
  
  
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
      quit() {
            this.$router.replace('/');
      },
    },

  };
  </script>
  