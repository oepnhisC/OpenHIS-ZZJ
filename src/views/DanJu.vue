<template>
    <div>
        <v-container>
            <v-row>
                <v-col align="left" ><v-btn size="x-large" style="margin-top: 8px;" @click="$router.replace('/xuangongneng')" prepend-icon="mdi-arrow-left" color="warning">返回</v-btn></v-col>
                <v-col align="center" style="font-size: 40px;font-weight: bold;">未支付单据</v-col>
                <v-col align="right"><v-btn  size="x-large" style="margin-top: 8px;" @click="this.$router.replace('/');" prepend-icon="mdi-logout" color="error">退出</v-btn></v-col>
            </v-row>
            <v-row><v-col align="center" style="font-size: 30px;">点击对应单据进入支付详情</v-col></v-row>
            <v-row><v-col><v-alert density="compact" title="失败" type="error"  v-show="errFlag">{{ errmsg }}</v-alert></v-col></v-row>
        </v-container>
        <v-data-table :headers="headers" :items="danJuList"   hide-default-footer  
        no-data-text="没有找到数据" :items-per-page="100"  style="font-size:20px;">
        <template v-slot:headers>
            <tr>
                <th style="width:100px;"><div >操作</div></th>
                <th v-for="column in headers" :key="column.key" :style="{width:column.width}">
                    <div >{{column.title}}</div>
                </th>
            </tr>
        </template>
        <template v-slot:item="{ item }">
            <tr  @click="selectRow(item)" style="height:60px;">
                <td >
                    <v-btn small  color="primary" @click="selectRow(item)" prepend-icon="mdi-cash-multiple">支付</v-btn>
                </td>
                <td v-for="column in headers" >
                    <div >{{ item[column.key] }}</div>
                </td>
            </tr>
        </template>
        </v-data-table>
        
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
            { title: '开单时间', key: 'fkdsj',width:'120px' },
                { title: '类别', key: 'fleibie' ,width:'60px'},
                { title: '姓名', key: 'fname' ,width:'60px'},
                { title: '年龄', key: 'fage' ,width:'40px'},
                { title: '性别', key: 'fsex' ,width:'40px'},
                { title: '诊断', key: 'fzhenduan' ,width:'120px'},
                { title: '开单人', key: 'fkdr' ,width:'80px'},
                
                { title: '门诊号', key: 'fmzh' ,width:'80px'},
            ],
            errmsg: '',
            errFlag: false,
            loading: false,
            danJuList: [],
        }
    },
    mounted() {
        this.getDaiJieZhangDanJu();
    },

    methods: {

        // 选择单据
        async selectRow(item) {
            var fjzid = item.fjzid;
            var fdjh = item.fdanju;
            this.$router.replace({path: '/paydetails',query: { fjzid: fjzid,fdjh:fdjh }});
           
        },
   
        //获取待结账单据
        async getDaiJieZhangDanJu() {
            try {
                this.loading = true;
                const response = await this.$axios.get('/zizhujiDanJu/getDaiJieZhangDanJu');
                if (response.data){
                    if(response.data.code == 0){
                        console.log(response.data.result);
                        this.danJuList = response.data.result;
                        this.errFlag = false;
                    }else{
                        this.danJuList = [];
                        console.log(response.data);
                        this.errFlag = true;
                        this.errmsg = response.data.result ;
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


<style scoped>
.v-table > .v-table__wrapper > table > tbody > tr > td, .v-table > .v-table__wrapper > table > tbody > tr > th, .v-table > .v-table__wrapper > table > thead > tr > td, .v-table > .v-table__wrapper > table > thead > tr > th, .v-table > .v-table__wrapper > table > tfoot > tr > td, .v-table > .v-table__wrapper > table > tfoot > tr > th{
	padding:0 3px;
}
</style>