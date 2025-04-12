<template>
    <div>
        <v-container>
            <v-row>
                <v-col align="left" ><v-btn size="x-large" style="margin-top: 8px;" @click="$router.replace('/xuangongneng')" prepend-icon="mdi-arrow-left" color="warning">返回</v-btn></v-col>
                <v-col align="center" style="font-size: 40px;font-weight: bold;">已缴费单据</v-col>
                <v-col align="right"><v-btn  size="x-large" style="margin-top: 8px;" @click="this.$router.replace('/');" prepend-icon="mdi-logout" color="error">退出</v-btn></v-col>
            </v-row>
            <v-row><v-col align="center" style="font-size: 30px;">点击对应单据进入打印页面</v-col></v-row>
            <v-row><v-col><v-alert density="compact" title="失败" type="error"  v-show="errFlag">{{ errmsg }}</v-alert></v-col></v-row>
        </v-container>
        <v-data-table :headers="headers" :items="danJuList"   hide-default-footer @click:row="selectRow"></v-data-table>
        
        <div style="width: 100%;height: 100%;background-color: rgba(255, 255, 255, 0.5);">
            <v-progress-circular indeterminate :size="77"  v-if="loading" style="top:35%;left:45%;position:fixed;"></v-progress-circular>
        </div>
    </div>
</template>

<script>

export default {
    name: 'DanJu',
   
    data() {
        return {

            headers: [
                { title: '姓名', value: 'fname' },
                { title: '年龄', value: 'fage' },
                { title: '门诊号', value: 'fmzh' },
                { title: '性别', value: 'fsex' },
                { title: '总额(元)', value: 'fze' },
                { title: '开单人', value: 'fkdr' },
                { title: '开单时间', value: 'fkdsj' }
            ],
            errmsg: '',
            errFlag: false,
            loading: false,
            danJuList: [],
        }
    },
    mounted() {
        this.getYiJieZhangDanJu();
    },

    methods: {

        // 选择单据
        async selectRow(item,obj) {
            console.log(obj.item);
            let fjiezhangID = obj.item.fjiezhangID;
            this.$router.replace({path: '/printview',query: { fjiezhangID: fjiezhangID ,from:'jiezhangdanju'}});
           
        },
   
        //获取单据信息
        async getYiJieZhangDanJu() {
            try {
                this.loading = true;
                const response = await this.$axios.get('/zizhujiDanJu/getYiJieZhangDanJu');
                if (response.data){
                    let result = response.data;
                    if(result.code == 0){
                        this.danJuList = result.result;
                        this.errFlag = false;
                    }else{
                        this.danJuList = [];
                        this.errFlag = true;
                        this.errmsg = result.result ;
                    }
                }
                this.loading = false;
            } catch (error) {
                this.errmsg = '网络请求失败，请联系管理员';
                console.error('请求失败:', error);
                this.loading = false;
            }
        },


    },
    computed: {
        
    }
}

</script>