<template>
    <div>
      <v-container>
        <v-row >
            <v-col align="left" ><v-btn variant="plain"></v-btn></v-col>
            <v-col align="center" style="font-size: 40px;font-weight: bold;">请选择功能</v-col>
            <v-col align="right"><v-btn size="x-large" style="margin-top: 8px;" @click="quit()" prepend-icon="mdi-logout" color="error">退出</v-btn></v-col>
        </v-row>
        <v-row style="margin-top: 200px;">
            <v-col>
                <v-card @click="this.$router.replace('/danju');" class="mx-auto" width="240" height="260">
                    <v-icon icon="mdi-cash-multiple" size="200" color="primary" style="margin:0 20px;"   ></v-icon>
                    <v-card-title style="text-align: center;font-size:25px;">门诊缴费</v-card-title>
                </v-card>
            </v-col>
            <v-col>
                <v-card @click="this.$router.replace('/jiezhangdanju');" class="mx-auto" width="240" height="260">
                    <v-icon icon="mdi-feature-search-outline" size="200" color="light-green-darken-2" style="margin:0 20px;"   ></v-icon>
                    <v-card-title style="text-align: center;font-size:25px;">查询已缴费门诊单据</v-card-title>
                </v-card>
            </v-col>
        </v-row>
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
        };
    },
  
    methods: {
        quit() {

            this.$router.replace('/');
        },
    },

  };
  </script>
  