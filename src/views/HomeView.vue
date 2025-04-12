<template>
  <div>
    <div style="text-align: center;font-size:40px;font-weight: bold;">请选择查询方式</div>
    <v-container style="margin-top:100px;">
        <v-row>
            <v-col>
                <v-card @click="usePingZheng()" class="mx-auto" width="240" height="260">
                    <v-icon icon="mdi-qrcode-scan" size="200" color="primary" style="margin:0 20px;"   ></v-icon>
                    <v-card-title style="text-align: center;font-size:25px;">电子医保凭证</v-card-title>
                </v-card>
            </v-col>
            <v-col>
                <v-card @click="dialogFlag = true;searchType = 1" class="mx-auto" width="240" height="260">
                    <v-icon icon="mdi-wechat" size="200" color="success" style="margin:0 20px;"  ></v-icon>
                    <v-card-title style="text-align: center;font-size:25px;">公众号就诊二维码</v-card-title>
                </v-card>
            </v-col>
            <v-col>
                <v-card @click="dialogFlag = true;searchType = 2" class="mx-auto" width="240" height="260">
                    <v-icon icon="mdi-file" size="200" color="lime-lighten-2" style="margin:0 20px;"  ></v-icon>
                    <v-card-title style="text-align: center;font-size:25px;">小票二维码</v-card-title>
                </v-card>
            </v-col>
        </v-row>
    </v-container>

    <v-dialog  v-model="dialogFlag" style="width:700px;height:500px;">
        <div style="width:700px;height:500px;background-color:#fff;margin:0 auto;">
            <div style="font-size:50px;text-align: center;margin-top:100px;">请扫码</div>
            <v-textarea  v-model="searchText"  @keyup.enter="useQiTa" label=""  height="50px"
                autofocus  @blur="$event.target.focus()"  :loading="loading"  no-resize rows="1"
                style="width:500px;margin:0 auto;margin-top:30px;"></v-textarea>
            <div style="width:92px;margin:0 auto;margin-top:30px;">
                <v-btn @click="dialogFlag = false" size="x-large" prepend-icon="mdi-close" color="error">返回</v-btn>
            </div>
        </div>
    </v-dialog>

    <v-snackbar v-model="warningFlag"  color="warning" height="130px" ><v-icon icon="mdi-alert"></v-icon> <span style="font-size:40px;">{{ warningmsg }}</span></v-snackbar>
    <v-snackbar v-model="successFlag"  color="success" height="130px" ><v-icon icon="mdi-check"></v-icon><span style="font-size:40px;">{{ successmsg }}</span> </v-snackbar>
  </div>
</template>

<script>
import { createWebSocket } from '@/utils/ws'
export default {
    name: 'HomeView',
    data() {
        return {
            postData:{
                url: "电子医保凭证解码地址",
                indata: {
                    data: {
                        businessType: "01301",
                        deviceType: "SelfService",
                        officeId: "888",
                        officeName: "自助终端",
                        operatorId: "888",
                        operatorName: "自助终端",
                        orgId: "医院ID",
                    },
                    orgId: "医院ID",
                    transType: "ec.query",
                },
            },
            ws: null,
            responseData: "",

            ecToken : "",
            idNo : "",
            insuOrg : "",
            userName : "",

            warningFlag: false,
            warningmsg: "",
            successFlag: false,
            successmsg: "",

            dialogFlag: false,
            searchText: "",
            searchType: 0, //0电子医保凭证，1公众号就诊二维码，2小票二维码
            loading: false,
        };
    },
    mounted() {
        this.ws = createWebSocket("ws://127.0.0.1:8899");
        this.ws.onMessage((response)  => {
            this.dealResult(response)
        })
    },
    methods: {
        //使用凭证查询
        usePingZheng() {
         
            this.ws.send(this.postData);

        },
        //处理凭证查询结果
        async dealResult(resultData){
            let result = resultData;
            console.log(result);
            
            if(result.code === 0){
                let data = result.data;
                this.ecToken = data.ecToken;
                this.idNo = data.idNo;
                this.insuOrg = data.insuOrg;
                this.userName = data.userName;
                const response = await this.$axios.post('/ziZhuJiChaXun/yiBaoPingZhengChaXun',{ecToken:this.ecToken,idNo:this.idNo,insuOrg:this.insuOrg,userName:this.userName});
                if (response.data){
                    let result = response.data;
                    console.log(result);
                    if(result.code == 0){
                        this.$router.replace('/xuangongneng');
                    }else{
                        this.warningFlag = true;
                        this.warningmsg = result.result;
                    }
                }
            }else{
                if(result.code === -2){
                    return;
                }
                this.warningFlag = true;
                this.warningmsg = result.message;
            }
            this.searchText = "";
        },
        //使用其他方式查询
        async useQiTa() {
            if (this.searchText.length < 0) {
                this.warningFlag = true;
                this.warningmsg = "请输入内容！";
                return;
            }
            let text = this.searchText;
            if(this.searchType === 2){
                if(this.searchText.startsWith("https")){
                    let lastColonIndex = this.searchText.lastIndexOf(':'); 
                    text = this.searchText.substring(lastColonIndex  + 1);
                }else{
                    this.warningFlag = true;
                    this.warningmsg = "小票二维码格式错误，请重试";
                    this.searchText = "";
                    return;
                }
            }
            
            this.loading = true;
            const response = await this.$axios.post('/ziZhuJiChaXun/getRenYuanXinXi', { text: text, type:this.searchType });
            if (response.data){
                let result = response.data;
                console.log(result);
                if(result.code == 0){
                    this.$router.replace('/xuangongneng');
                }else{
                    this.warningFlag = true;
                    this.warningmsg = result.result ;
                }
            }
            this.loading = false;
            this.searchText = '';

            
        },

    },

};
</script>


<style scoped>

</style>