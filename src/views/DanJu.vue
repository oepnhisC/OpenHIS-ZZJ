<template>
    <div>
        <v-container>
            <v-row>
                <v-col align="left" ><v-btn variant="plain"></v-btn></v-col>
                <v-col align="center" style="font-size: 40px;font-weight: bold;">未支付单据</v-col>
                <v-col align="right"><v-btn  size="x-large" style="margin-top: 8px;" @click="quit()">退出</v-btn></v-col>
            </v-row>
            <v-row><v-col align="center" style="font-size: 30px;">点击对应单据进入支付详情</v-col></v-row>
        </v-container>
        <v-data-table :headers="headers" :items="responseData" 
        hide-default-footer @click:row="selectRow"></v-data-table>
        <!-- show-select  select-strategy="single" item-value="fzyzd"  -->
        <div style="width: 100%;height: 100%;background-color: rgba(255, 255, 255, 0.5);">
            <v-progress-circular indeterminate :size="77"  v-if="loading" style="top:35%;left:45%;position:fixed;"></v-progress-circular>
        </div>
    </div>
</template>

<script>

import { mapState,mapActions } from 'vuex'


export default {
    name: 'DanJu',
   
    data() {
        return {

            headers: [
                { title: '姓名', value: 'fname' },
                { title: '年龄', value: 'fage' },
                { title: '门诊号', value: 'fno' },
                { title: '性别', value: 'fgender' },
                { title: '主要信息', value: 'fzyzd' },
                { title: '开单人', value: 'fkdr' },
                { title: '开单时间', value: 'fkdsj' }
            ],
            errmsg: '',
            errFlag: false,
            loading: false,
            firstLoad: false,
            danJuList: [],
        }
    },
    mounted() {
        if(this.firstLoad == false){
            this.danJuList = this.responseData;
            this.firstLoad = true;
        }
    },
    //重新回到此页面时，重新获取单据信息
    beforeRouteEnter(to, from, next) {
        next(vm => {
            if(vm.firstLoad) {vm.danjuAgain();}
        });
    },
    methods: {
        ...mapActions(['updateDanJuData','updateFjzid']),
        ...mapActions(['clearData']),
        async selectRow(item,obj) {
            var fjzid = obj.item.fjzid;
            var fdjh = obj.item.fdjh;
           
            try {
                this.loading = true;
                const response = await this.$axios.post('/zizhuji/danjumingxi', {
                    'fjzid': fjzid,'fdjh':fdjh
                });

                if (response.data){
                    if(response.data.code == 0){
                        console.log(response.data.result);
                        this.errmsg = response.data.result;
                        this.updateDanJuData(this.errmsg);
                        this.updateFjzid(fjzid);
                        this.errFlag = false;
                        this.$router.replace('/paydetails');
                    }else{
                        console.log(response.data);
                        this.errFlag = true;
                        this.errmsg = response.data.result + '，请重试，重试依然失败请联系管理员';
                    }
                }
                this.loading = false;

            } catch (error) {
                console.error('请求失败:', error);

                this.loading = false;
            }
        },
        quit() {
            this.clearData();
            this.$router.replace('/');
        },
        //再次获取单据信息
        async danjuAgain() {
            try {
                this.loading = true;
                const response = await this.$axios.get('/zizhuji/danJuAgain');
                if (response.data){
                    if(response.data.code == 0){
                        console.log(response.data.result);
                        this.danJuList = response.data.result;
                        this.errFlag = false;
                    }else{
                        console.log(response.data);
                        this.errFlag = true;
                        this.errmsg = response.data.result + '，请重试，重试依然失败请联系管理员';
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
        ...mapState(['responseData']),
        
        
    }
}

</script>