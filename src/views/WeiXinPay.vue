<template>
    <div>
        <v-container>
            <v-row>
                <v-col align="left" ><v-btn size="x-large" style="margin-top: 8px;" @click="$router.replace({path:'/paydetails',query:{fjzid:this.fjzid,fdjh:this.fdjh}})">返回</v-btn></v-col>
                <v-col align="center" style="font-size: 40px;font-weight: bold;">微信支付</v-col>
                <v-col align="right"><v-btn size="x-large" style="margin-top: 8px;" @click="this.$router.replace('/'); ">退出</v-btn></v-col>
            </v-row>
            <v-row><v-col align="center" style="font-size: 30px;">金额：{{money}}元</v-col></v-row>
            <v-row><v-col align="center" style="font-size: 20px;">{{ countdown }}秒后自动关闭，请及时支付，超时后订单将自动取消。</v-col></v-row>
            <v-row><v-col align="center"><vue-qr :text="payurl" size="250"></vue-qr></v-col></v-row>
            <!-- <v-row><v-col align="center" ><v-btn size="x-large" @click="jiezhang()" >本地结账</v-btn></v-col></v-row> -->
            <v-row><v-col align="center" ><v-btn size="x-large" @click="succeed()" >假装支付成功</v-btn></v-col></v-row>
            <v-row><v-col><v-alert density="compact" title="失败" type="error"  v-show="errFlag">{{ errmsg }}</v-alert></v-col></v-row>
            <v-row><v-col><v-alert density="compact"  title="成功" type="success"  v-show="succeedFlag">{{ successMsg }}</v-alert></v-col></v-row>
        </v-container>
        
        
    </div>    
</template>

<script>
import vueQr from 'vue-qr/src/packages/vue-qr.vue'
export default {
    name: 'WeiXinPay',
    components: {
        vueQr
    },

    data() {
        return {
            errmsg: '操作失败',
            errFlag: false,
            money: 0,
            payurl: '',
            succeedFlag: false,
            successMsg: '支付成功,3秒后自动跳转到打印页面',
            timer: null,
            countdown: 120,
            timer2: null,

            fjzid: '',
            fdjh: '',
            
        }
    },
    mounted() { 
        this.fjzid = this.$route.query.fjzid;
        this.fdjh = this.$route.query.fdjh;
        this.getQRCode();
        this.startCountdown();
    },
    computed: {

    },
    beforeUnmount(){
        clearInterval(this.timer); // 组件销毁时清除定时器
        clearTimeout(this.timer2); 
    },
    methods: {

        // 获取微信支付二维码
        async getQRCode(){
            const response = await this.$axios.get('/zizhuji/wechatpayQRCode');
            if (response.data){
                if(response.data.code == 0){
                    var result = response.data.result;
                    this.payurl = result.payurl;
                    this.money = result.money;
                    this.errmsg = response.data.result;
                    this.errFlag = false;

                }else{
                    console.log(response.data);
                    this.errFlag = true;
                    this.errmsg = response.data.result + '，请重试，重试依然失败请联系管理员';
                }
            }
        },

        // 本地结账
        async jiezhang(){
            const response = await this.$axios.get('/zizhuji/jiezhang');
            if (response.data){
                if(response.data.code == 0){
                    let result = response.data;
                    console.log(result);
                    this.succeed();
                }else{

                    console.log(response.data);
                    this.errFlag = true;
                    this.errmsg = response.data.result ;
                }
            }
        },

        succeed(){
            this.succeedFlag = true;
            clearInterval(this.timer); // 支付成功后清除定时器
            this.timer2 = setTimeout(() => {
                this.succeedFlag = false;
                this.$router.replace('/printview'); 
            }, 3000);
        },
        startCountdown() {
            this.timer = setInterval(() => {
                if (this.countdown >= 1) {
                    this.countdown -= 1;
                } else {
                    clearInterval(this.timer); // 倒计时结束后清除定时器
                    this.$router.replace('/danju'); 

                }
            }, 1000);
        }
    },


}
</script>