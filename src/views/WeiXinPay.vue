<template>
    <div>
        <v-container>
            <v-row>
                <v-col align="left" ><v-btn size="x-large" style="margin-top: 8px;" @click="$router.replace('/paydetails')">返回</v-btn></v-col>
                <v-col align="center" style="font-size: 40px;font-weight: bold;">微信支付</v-col>
                <v-col align="right"><v-btn size="x-large" style="margin-top: 8px;" @click="quit()">退出</v-btn></v-col>
            </v-row>
            <v-row><v-col align="center" style="font-size: 30px;">金额：{{money}}元</v-col></v-row>
            <v-row><v-col align="center" style="font-size: 20px;">{{ countdown }}秒后自动关闭，请及时支付，超时后订单将自动取消。</v-col></v-row>
            <v-row><v-col align="center"><vue-qr :text="payurl" size="250"></vue-qr></v-col></v-row>
            <v-row><v-col align="center" v-if="succeedFlag" style="color:green;font-size: 16px;" >{{successMsg}}</v-col></v-row>
            <v-row><v-col align="center" ><v-btn size="x-large" @click="succeed()" >假装支付成功</v-btn></v-col></v-row>
        </v-container>
        

    </div>
</template>

<script>
import { mapState,mapActions } from 'vuex'
import vueQr from 'vue-qr/src/packages/vue-qr.vue'
export default {
    name: 'WeiXinPay',
    components: {
        vueQr
    },

    data() {
        return {
            errmsg: '',
            errFlag: false,
            money: 0,
            payurl: '',
            succeedFlag: false,
            successMsg: '支付成功,3秒后自动跳转到打印页面',
            timer: null,
            countdown: 120,
            timer2: null,
        }
    },
    mounted() { 
        this.getQRCode();
        this.startCountdown();
    },
    computed: {
       ...mapState(['fjzid','fzyzd']),
    },
    beforeUnmount(){
        clearInterval(this.timer); // 组件销毁时清除定时器
        clearTimeout(this.timer2); 
    },
    methods: {
        ...mapActions(['clearData']),
        quit(){
            this.clearData();
            this.$router.replace('/'); 
        },
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