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
            <v-row><v-col><v-alert density="compact" title="失败" type="error"  v-show="errFlag">{{ errmsg }}</v-alert></v-col></v-row>
        </v-container>
        <v-data-table :headers="headers" :items="getDanJuMingXiList" item-key="name"  hide-default-footer items-per-page="999"></v-data-table>
        <div style="width: 100%;height: 100%;background-color: rgba(255, 255, 255, 0.5);">
            <v-progress-circular indeterminate :size="77"  v-if="loading" style="top:35%;left:45%;position:fixed;"></v-progress-circular>
        </div>
    </div>
</template>

<script>

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
        getDanJuMingXiList: [],
        errFlag: false,
        errmsg: '',
        loading: false,
        fjzid : '',
        fdjh : ''
    }),
    mounted() {
        this.getDanJuMingXi();

    },
    methods: {
        quit(){
            this.$router.replace('/'); 
        },
        wechatPay(){
            this.$router.replace({path:'/weixinpay',query: { fjzid: this.fjzid,fdjh:this.fdjh }});
        },
        // 获取单据明细
        async getDanJuMingXi(){
            console.log(this.$route.query)
            this.fjzid = this.$route.query.fjzid;
            this.fdjh = this.$route.query.fdjh;
            try {
                this.loading = true;
                const response = await this.$axios.post('/zizhuji/danjumingxi', {
                    'fjzid': this.fjzid,'fdjh':this.fdjh
                });

                if (response.data){
                    if(response.data.code == 0){
                        this.getDanJuMingXiList = response.data.result;
                        this.errFlag = false;
                    }else{
                        this.errFlag = true;
                        this.errmsg = response.data.result ;
                    }
                }
                this.loading = false;

            } catch (error) {
                console.error('请求失败:', error);
                this.errFlag = true;
                this.errmsg = '请求失败，请检查网络或联系管理员';
                this.loading = false;
            }
        }

    },
    computed: {

        sumPrice(){
            var sum = 0;
            for (let i = 0; i < this.getDanJuMingXiList.length; i++) {
                sum += this.getDanJuMingXiList[i].famount; // 累加金额
            }
            return sum.toFixed(2);
        }
    }
}
</script>