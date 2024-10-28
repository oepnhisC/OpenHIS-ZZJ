<template>
    <div>
        <v-container>
            <v-row>
                <v-col align="left" ><v-btn size="x-large" style="margin-top: 8px;" @click="$router.replace('/danju')">返回</v-btn></v-col>
                <v-col align="center" style="font-size: 40px;font-weight: bold;">交易明细</v-col>
                <v-col align="right"><v-btn size="x-large" style="margin-top: 8px;" @click="quit()">退出</v-btn></v-col>
            </v-row>
            <v-row><v-col align="center" style="font-size: 30px;">合计：{{sumPrice}}元</v-col></v-row>
            <v-row>
                <v-col align="center"><v-btn size="x-large" color="success" @click="wechatPay()">微信支付</v-btn></v-col>
                <!-- <v-col align="center"><v-btn size="x-large" color="info">支付宝支付</v-btn></v-col> -->
            </v-row>
        </v-container>
        <v-data-table :headers="headers" :items="danJuData" item-key="name"  hide-default-footer></v-data-table>
    </div>
</template>

<script>
import { mapState,mapActions } from 'vuex'


export default {
    name: 'PayDetails',

    data: () => ({
      headers: [
        { title: '项目', value: 'fitem' },
        { title: '单价（元）', value: 'fprice' },
        { title: '单位', value: 'funit' },
        { title: '数量', value: 'fcount' },
        { title: '金额（元）', value: 'famount' }
      ],

    }),
    mounted() {


    },
    methods: {
        ...mapActions(['clearData']),
        quit(){
            this.clearData();
            this.$router.replace('/'); 
        },
        wechatPay(){
            this.$router.replace('/weixinpay');
        }
    },
    computed: {
        ...mapState(['danJuData']),

        sumPrice(){
            var sum = 0;
            for (let i = 0; i < this.danJuData.length; i++) {
                sum += this.danJuData[i].famount; // 累加金额
            }
            return sum.toFixed(2);
        }
    }
}
</script>