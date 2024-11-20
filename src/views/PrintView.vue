<template>
    <div>
        <v-container>
            <v-row>
                <v-col align="left" ><v-btn size="x-large" style="margin-top: 8px;" @click="$router.replace('/danju')">返回</v-btn></v-col>
                <v-col align="center" style="font-size: 40px;font-weight: bold;">打印</v-col>
                <v-col align="right"><v-btn size="x-large" style="margin-top: 8px;" @click="quit()">退出</v-btn></v-col>
            </v-row>
            <v-row><v-col align="center" style="font-size: 20px;">自动打印中，请稍候...</v-col></v-row>
            <v-row><v-progress-linear indeterminate ></v-progress-linear></v-row>
            <v-row>
                <v-col align="center"><v-btn size="x-large" @click="print('XP')">打印小票</v-btn></v-col>
                <v-col align="center"><v-btn size="x-large" @click="print('ZYD')">打印指引单</v-btn></v-col>
                <v-col align="center"><v-btn size="x-large" @click="print('YXD')">打印影像单</v-btn></v-col>
                <v-col align="center"><v-btn size="x-large" @click="print('WCLQD')">打印卫材领取单</v-btn></v-col>
                <v-col align="center"><v-btn size="x-large" @click="print('CXZYD')">打印采血指引单</v-btn></v-col>
                <v-col align="center"><v-btn size="x-large" @click="print('FKZLD')">打印妇科治疗单</v-btn></v-col>
                <v-col align="center"><v-btn size="x-large" @click="print('JY')">打印检验条码</v-btn></v-col>
                <v-col align="center"><v-btn size="x-large" @click="printFaPiao()">打印发票</v-btn></v-col>
            </v-row>
        </v-container>
        <div ref="xiaopiao" class="xiaopiao" > 
            <v-container  style="font-size:40px;padding-left: 40px;" >
                <v-row><v-col  align="center" style="font-size: 60px;">XXX医院收费凭据</v-col></v-row>
                <v-row no-gutters>
                    <v-col  align="left">姓名：{{fname}}</v-col>
                    <v-col  align="center"  >性别：{{fsex}}</v-col>
                    <v-col  align="right">年龄：{{fage}}</v-col>
                </v-row>
                <v-row no-gutters style="font-size: 32px;">
                    <v-col  align="left">门诊号：{{fmzh}}</v-col>
                    <v-col  align="right">就诊时间：{{fjzsj}}</v-col>
                </v-row>
                <v-row no-gutters style="font-size: 32px;">
                    <v-col align="left">就诊科室：{{fjzks}}</v-col>
                    <v-col  align="right" >主诊医生：{{ fzzys }}</v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col  cols="7">病人类别：{{ fbrlb }}</v-col>
                    <v-col  cols="5">收据号：{{fsjh}}</v-col>
                </v-row>
                <v-row no-gutters><v-col>收费时间：{{fsfsj}}</v-col></v-row>
                <v-row no-gutters><hr style="border:1px solid #000000;width: 100%;" /></v-row>
                <v-row no-gutters>
                    <v-col>
                        <v-row no-gutters><v-col>费用总额：{{fzfy}}</v-col></v-row>
                        <v-row no-gutters><v-col>现金支付：{{ fxjzf }}</v-col></v-row>
                        <v-row no-gutters><v-col>社保记账：{{fsbjz}}</v-col></v-row>
                        <v-row no-gutters><v-col>记账：{{fjz}}</v-col></v-row>
                        <v-row no-gutters><v-col>会员账户：{{fhyzh}}</v-col></v-row>
                        <v-row no-gutters><v-col>POS：{{fPOS}}</v-col></v-row>
                        <v-row no-gutters><v-col>尾数：{{ fws }}</v-col></v-row>
                        <v-row no-gutters><v-col>医保刷卡：{{ fybsk }}</v-col></v-row>
                        <v-row no-gutters><v-col>转账：{{ fzz }}</v-col></v-row>
                        <v-row no-gutters><v-col>财政支付：{{fczzf}}</v-col></v-row>
                        <v-row no-gutters><v-col>减免优惠：{{ fjmyh }}</v-col></v-row>
                        <v-row no-gutters><v-col>民政补助：{{ fmzbz }}</v-col></v-row>
                        <v-row no-gutters><v-col>减免：{{ fjm }}</v-col></v-row>
                    </v-col>
                    <v-col >
                        <v-row style="height: 100px;"></v-row>
                        <v-row no-gutters><v-col align="center">扫码查看电子票据</v-col></v-row>
                        <v-row no-gutters><v-col align="center"><vue-qr :text="furl" style="width: 300px;height: 300px;"></vue-qr></v-col></v-row>
                    </v-col>
                </v-row>
                <v-row no-gutters><hr style="border:1px solid #000000;width: 100%;" /></v-row>
                <v-row no-gutters>
                    <v-col cols="3">费别</v-col>
                    <v-col cols="3">金额</v-col>
                    <v-col cols="3">费别</v-col>
                    <v-col cols="3">金额</v-col>
                </v-row>
                <v-row no-gutters >
                    <v-col cols="3" v-for="(item) in feibieArr" >{{item}}</v-col>
                </v-row>
                <v-row no-gutters><hr style="border:1px solid #000000;width: 100%;" /></v-row>
                <v-row no-gutters><v-col align="left">注意事项：</v-col></v-row>
                <v-row no-gutters>    
                    <v-col align="left">1.如需查看或下载电子发票，请5分钟后使用手机扫描二维码。</v-col>
                </v-row>
                <v-row no-gutters>    
                    <v-col align="left">2.不提供纸质发票，如需请咨询收费员</v-col>
                </v-row>
            </v-container>
        </div>

        <div ref="zhiyindan" class="xiaopiao" v-show="zhiyindanFlag"> 
            <v-container  style="font-size:40px;padding-left: 40px;" >
                <v-row no-gutters><hr style="border:1px solid #000000;width: 100%;" /></v-row>
                <v-row><v-col  align="center" style="font-size: 60px;">指引单</v-col></v-row>
                <v-row no-gutters>
                    <v-col  align="left">姓名：{{fname}}</v-col>
                    <v-col  align="center"  >性别：{{fsex}}</v-col>
                    <v-col  align="right">年龄：{{fage}}</v-col>
                </v-row>
                <v-row no-gutters style="font-size: 32px;">
                    <v-col  align="left">门诊号：{{fmzh}}</v-col>
                    <v-col  align="right">就诊时间：{{fjzsj}}</v-col>
                </v-row>
                <v-row no-gutters>申请医师：{{fzzys}}</v-row>
                <!-- <v-row no-gutters>诊断：{{fzyzd}}</v-row> -->
                <v-row no-gutters style="height: 20px;"></v-row>
                <v-row no-gutters v-for="(item) in zhiyindan" style="font-size:30px;">
                    <v-row no-gutters>
                        <v-col  align="left">{{ item.fyznr }}</v-col>
                        <v-col  align="right">总量：{{ item.fzl }} {{ item.fbbbw }}</v-col>
                    </v-row>
                    <v-row no-gutters style="width:100%">
                        <v-col  align="left">{{ item.fcjg }}</v-col>
                        <v-col  align="right">{{ item.fyszt }}</v-col>
                    </v-row>
                    <v-row no-gutters style="width:100%">
                        <v-col  align="left">{{ item.fjcbw }}</v-col>
                        <v-col align="right">{{ item.fwz }}</v-col>
                    </v-row>
                    <v-row no-gutters style="width:100%">{{ item.jj }}</v-row>
                    <v-row no-gutters><hr style="border:1px solid #000000;width: 100%;" /></v-row>
                </v-row>
            </v-container>
        </div> 

        <div ref="yingxiangdan" class="xiaopiao" v-show="yingxiangdanFlag"> 
            <v-container  style="font-size:40px;padding-left: 40px;" >
                <!-- <v-row no-gutters><hr style="border:1px solid #000000;width: 100%;" /></v-row> -->
                <v-row><v-col  align="center" style="font-size: 60px;">影像单</v-col></v-row>
                <v-row no-gutters>
                    <v-col  align="left">姓名：{{fname}}</v-col>
                    <v-col  align="center"  >性别：{{fsex}}</v-col>
                    <v-col  align="right">年龄：{{fage}}</v-col>
                </v-row>
                <v-row no-gutters style="font-size: 32px;">
                    <v-col  align="left">门诊号：{{fmzh}}</v-col>
                    <v-col  align="right">就诊时间：{{fjzsj}}</v-col>
                </v-row>
                <v-row no-gutters>申请医师：{{fzzys}}</v-row>
                <v-row no-gutters>诊断：{{fzyzd}}</v-row>
                <v-row no-gutters style="height: 20px;"></v-row>
                <v-row no-gutters v-for="(item) in yingxiangdan" style="font-size:30px;">
                    <v-row no-gutters>
                        <v-col  align="left">{{ item.fyznr }}</v-col>
                        <v-col  align="right">总量：{{ item.fzl }} {{ item.fbbbw }}</v-col>
                    </v-row>
                    <v-row no-gutters style="width:100%">
                        <v-col  align="left">{{ item.fcjg }}</v-col>
                        <v-col  align="right">{{ item.fyszt }}</v-col>
                    </v-row>
                    <v-row no-gutters style="width:100%">
                        <v-col  align="left">{{ item.fjcbw }}</v-col>
                        <v-col align="right">{{ item.fwz }}</v-col>
                    </v-row>
                    <v-row no-gutters style="width:100%">{{ item.jj }}</v-row>
                    <v-row no-gutters><hr style="border:1px solid #000000;width: 100%;" /></v-row>
                </v-row>
            </v-container>
        </div> 

        <div ref="weicai" class="xiaopiao" v-show="weicaidanFlag"> 
            <v-container  style="font-size:40px;padding-left: 40px;" >
                <!-- <v-row no-gutters><hr style="border:1px solid #000000;width: 100%;" /></v-row> -->
                <v-row><v-col  align="center" style="font-size: 140px;">卫材领取单</v-col></v-row>
                <v-row><v-col  align="center" style="font-size: 130px;">此单请交给药房人员！</v-col></v-row>
                <v-row no-gutters>
                    <v-col  align="left">姓名：{{fname}}</v-col>
                    <v-col  align="center"  >性别：{{fsex}}</v-col>
                    <v-col  align="right">年龄：{{fage}}</v-col>
                </v-row>
                <v-row no-gutters style="font-size: 32px;">
                    <v-col  align="left">门诊号：{{fmzh}}</v-col>
                    <v-col  align="right">就诊时间：{{fjzsj}}</v-col>
                </v-row>
                <v-row no-gutters>申请医师：{{fzzys}}</v-row>
                <v-row no-gutters style="height: 20px;"></v-row>
                <v-row no-gutters v-for="(item) in weicaidan">
                    <v-row no-gutters style="width:100%"><v-col  align="left">{{ item.fyznr }}</v-col></v-row>
                    <v-row no-gutters style="width:100%"><v-col align="right">总量：{{ item.fzl }}</v-col></v-row>
                    <v-row no-gutters><hr style="border:1px solid #000000;width: 100%;" /></v-row>
                </v-row>
            </v-container>
        </div>

        <div ref="caixiedan" class="xiaopiao" v-show="caixiedanFlag"> 
            <v-container  style="font-size:40px;padding-left: 40px;" >
                <!-- <v-row no-gutters><hr style="border:1px solid #000000;width: 100%;" /></v-row> -->
                <v-row><v-col  align="center" style="font-size: 60px;">采血指引单</v-col></v-row>
                <v-row no-gutters>
                    <v-col  align="left">姓名：{{fname}}</v-col>
                    <v-col  align="center"  >性别：{{fsex}}</v-col>
                    <v-col  align="right">年龄：{{fage}}</v-col>
                </v-row>
                <v-row no-gutters style="font-size: 32px;">
                    <v-col  align="left">门诊号：{{fmzh}}</v-col>
                    <v-col  align="right">就诊时间：{{fjzsj}}</v-col>
                </v-row>
                <v-row no-gutters>申请医师：{{fzzys}}</v-row>
                <v-row no-gutters style="height: 20px;"></v-row>
                <v-row no-gutters v-for="(item) in caixiedan" style="font-size:30px;">
                    <v-row no-gutters>
                        <v-col  align="left">{{ item.fyznr }}</v-col>
                        <v-col  align="right">总量：{{ item.fzl }} {{ item.fbbbw }}</v-col>
                    </v-row>
                    <v-row no-gutters style="width:100%">
                        <v-col  align="left">{{ item.fcjg }}</v-col>
                        <v-col  align="right">{{ item.fyszt }}</v-col>
                    </v-row>
                    <v-row no-gutters style="width:100%">
                        <v-col  align="left">{{ item.fjcbw }}</v-col>
                        <v-col align="right">{{ item.fwz }}</v-col>
                    </v-row>
                    <v-row no-gutters style="width:100%">{{ item.jj }}</v-row>
                    <v-row no-gutters><hr style="border:1px solid #000000;width: 100%;" /></v-row>
                </v-row>
            </v-container>
        </div> 

        <div ref="fukezhiliao" class="xiaopiao" v-show="fukedanFlag"> 
            <v-container  style="font-size:40px;padding-left: 40px;" >
                <!-- <v-row no-gutters><hr style="border:1px solid #000000;width: 100%;" /></v-row> -->
                <v-row><v-col  align="center" style="font-size: 60px;">妇科治疗单</v-col></v-row>
                <v-row no-gutters>
                    <v-col  align="left">姓名：{{fname}}</v-col>
                    <v-col  align="center"  >性别：{{fsex}}</v-col>
                    <v-col  align="right">年龄：{{fage}}</v-col>
                </v-row>
                <v-row no-gutters style="font-size: 32px;">
                    <v-col  align="left">门诊号：{{fmzh}}</v-col>
                    <v-col  align="right">就诊时间：{{fjzsj}}</v-col>
                </v-row>
                <v-row no-gutters>申请医师：{{fzzys}}</v-row>
                <v-row no-gutters style="height: 20px;"></v-row>
                <v-row no-gutters v-for="(item) in fukedan" style="font-size:30px;">
                    <v-row no-gutters style="width:100%">
                        <v-col  align="left">{{ item.fyznr }}</v-col>
                        <v-col  align="right">总量：{{ item.fzl }} </v-col>
                    </v-row>
                    <v-row no-gutters ><v-col align="right">{{ item.fyszt }}</v-col></v-row>
                    <v-row no-gutters><hr style="border:1px solid #000000;width: 100%;" /></v-row>
                </v-row>
                <v-row no-gutters style="height: 20px;"></v-row>
                <v-row no-gutters style="padding-left: 30px;padding-right: 30px;">
                    <div v-for="(row, index) in 14" :key="index" class="row">
                        <div v-for="(col, colIndex) in 2" :key="colIndex" class="column">
                        </div>
                    </div>
                </v-row>
            </v-container>
        </div> 


        <div ref="jianyan" v-for="(item, index) in jianyantiaoma" class="tiaoma" v-show="jianyantiaomaFlag">
            <v-container style="font-size: 48px;padding: 10px">
                <v-row no-gutters>
                    <v-col cols="5" align="center" >{{fmzh}}</v-col>
                    <v-col cols="7" align="center">{{fjzsj}}</v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col cols="8" align="right" style="height: 280px;">
                        <JianYanTiaoMa :value="item.ftm"/>
                    </v-col>
                    <v-col cols="4">{{ item.fcjg + ' ' + item.fys }}</v-col>
                </v-row>
                <v-row no-gutters >
                    <v-col cols="4" align="center">{{fname}}</v-col>
                    <v-col cols="1">{{fsex}}</v-col>
                    <v-col cols="2">{{fage}}</v-col>
                    <v-col cols="5">{{fjzks}}</v-col>
                </v-row>
                <v-row no-gutters >{{ item.fyznr }}</v-row>
            </v-container>
        </div>
    </div>
</template>


<script>
import { mapState,mapActions } from 'vuex'
import JianYanTiaoMa from '@/components/JianYanTiaoMa.vue';
import vueQr from 'vue-qr/src/packages/vue-qr.vue'
import html2canvas from 'html2canvas'
export default {

    name: "PrintView",
    components: {
        vueQr,
        JianYanTiaoMa
    },
    data() {
        return {

            fname: '',
            fage: 0,
            fjzsj: '',
            fmzh: '',
            fsex: '',
            fsfsj: '',
            fsjh: '',
            fzzys: '',
            fjzks: '',
            fbrlb: '',

            fzfy: 0,

            fxjzf:0,
            fsbjz:0,
            fjz:0,
            fhyzh:0,
            fPOS:0,
            fws:0,
            fybsk:0,
            fzz:0,
            fczzf:0,
            fjmyh:0,
            fmzbz:0,
            fjm:0,

            furl:'',

            feibie:[
                {ffb:'住院费',fje:0},
                {ffb:'门诊费',fje:0},
                {ffb:'药费',fje:0},
                {ffb:'治疗费',fje:0},
                {ffb:'检查费',fje:0},
            ],

            zhiyindan:[],
            yingxiangdan:[],
            fzyzd:'',
            weicaidan:[],
            caixiedan:[],
            fukedan:[],
            jianyantiaoma:[],
            fapiao:[],

            zhiyindanFlag:false,
            yingxiangdanFlag:false,
            weicaidanFlag:false,
            caixiedanFlag:false,
            fukedanFlag:false,
            jianyantiaomaFlag:false,
            fapiaoFlag:false,



        }
    },
    mounted() {
       this.getHeadInfo();
       this.getFeiYong();
       this.getZhiYinDan();
       this.getYingXiangDan();
       this.getZhuYaoZhenDuan();
       this.getWeiCaiDan();
       this.getCaixieDan();
       this.getFuKeDan();
       this.getJianYanTiaoMa();
       this.getFaPiao();
       
    },
    computed: {
       feibieArr: function () {
           let feibieS = [];
           for(let i=0;i<this.feibie.length;i++){
            feibieS.push(this.feibie[i].ffb);
            feibieS.push(this.feibie[i].fje);
           }
           return feibieS;
        }
    },
    methods: {
        ...mapActions(['clearData']),

        quit(){
            this.clearData();
            this.$router.replace('/'); 
        },
        // 小票头部信息
        async getHeadInfo(){
            const response = await this.$axios.get('/zizhuji/printInfoHeader');
            if (response.data){
                if(response.data.code == 0){
                    let headerData = response.data.result[0]
                    this.fname = headerData.fname;
                    this.fage = headerData.fage;
                    this.fsex = headerData.fsex;
                    this.fjzsj = headerData.fjzsj;
                    this.fmzh = headerData.fmzh;
                    this.fsfsj = headerData.fsfsj;
                    this.fsjh = headerData.fsjh;
                    this.fzzys = headerData.fzzys;
                    this.fjzks = headerData.fjzks;
                    this.fbrlb = headerData.fbrlb;
                }else{
                    console.log(response.data);
                    this.errFlag = true;
                    this.errmsg = response.data.result + '，请重试，重试依然失败请联系管理员';
                }
            }
        },

        // 收费凭据
        async getFeiYong(){
            const response = await this.$axios.get('/zizhuji/feiYong');
            if (response.data){
                if(response.data.code == 0){
                    let result = response.data;
                    console.log(result);
                    this.fzfy = result.fzfy;
                    let fzff = result.fzffs[0];
                    this.fPOS = fzff.fPOS;
                    this.fczzf = fzff.fczzf;
                    this.fhyzh = fzff.fhyzh;
                    this.fjmj = fzff.fjmj;
                    this.fjmyh = fzff.fjmyh;
                    this.fjz = fzff.fjz;
                    this.fmzbz = fzff.fmzbz;
                    this.fsbjz = fzff.fsbjz;
                    this.fws = fzff.fws;
                    this.fxjzf = fzff.fxjzf;
                    this.fybsk = fzff.fybsk;
                    this.fzz = fzff.fzz;
                    this.furl = result.furl;

                    this.feibie = result.ffbs;
                    

                }else{
                    console.log(response.data);
                    this.errFlag = true;
                    this.errmsg = response.data.result + '，请重试，重试依然失败请联系管理员';
                }
            }
        },

        // 指引单信息
        async getZhiYinDan(){
            const response = await this.$axios.get('/zizhuji/zhiyindan');
            if (response.data){
                if(response.data.code == 0){
                    let result = response.data;
                    console.log(result);
                    this.zhiyindan =result.result;
                    this.zhiyindanFlag = true;
                }else{
                    this.zhiyindanFlag = false;
                    console.log(response.data);
                    this.errFlag = true;
                    this.errmsg = response.data.result + '，请重试，重试依然失败请联系管理员';
                }
            }
        },

        // 影像单信息
        async getYingXiangDan(){
            const response = await this.$axios.get('/zizhuji/yingxiangdan');
            if (response.data){
                if(response.data.code == 0){
                    let result = response.data;
                    console.log(result);
                    this.yingxiangdan =result.result;
                    this.yingxiangdanFlag = true;
                }else{
                    this.yingxiangdanFlag = false;
                    console.log(response.data);
                    this.errFlag = true;
                    this.errmsg = response.data.result + '，请重试，重试依然失败请联系管理员';
                }
            }
        },

        // 主要诊断
        async getZhuYaoZhenDuan(){
            const response = await this.$axios.get('/zizhuji/zhuyaozhenduan');
            if (response.data){
                if(response.data.code == 0){
                    let result = response.data;
                    console.log(result);
                    this.fzyzd =result.result;

                }else{
                    console.log(response.data);
                    this.errFlag = true;
                    this.errmsg = response.data.result + '，请重试，重试依然失败请联系管理员';
                }
            }
        },


        // 卫材单信息
        async getWeiCaiDan(){
            const response = await this.$axios.get('/zizhuji/weicaidan');
            if (response.data){
                if(response.data.code == 0){
                    let result = response.data;
                    console.log(result);
                    this.weicaidan =result.result;
                    this.weicaidanFlag = true;
                }else{
                    this.weicaidanFlag = false;
                    console.log(response.data);
                    this.errFlag = true;
                    this.errmsg = response.data.result + '，请重试，重试依然失败请联系管理员';
                }
            }
        },

        // 采血单信息
        async getCaixieDan(){
            const response = await this.$axios.get('/zizhuji/caixiedan');
            if (response.data){
                if(response.data.code == 0){
                    let result = response.data;
                    console.log(result);
                    this.caixiedan =result.result;
                    this.caixiedanFlag = true;
                }else{
                    this.caixiedanFlag = false;
                    console.log(response.data);
                    this.errFlag = true;
                    this.errmsg = response.data.result + '，请重试，重试依然失败请联系管理员';
                }
            }
        },

        // 妇科治疗单信息
        async getFuKeDan(){
            const response = await this.$axios.get('/zizhuji/fukedan');
            if (response.data){
                if(response.data.code == 0){
                    let result = response.data;
                    console.log(result);
                    this.fukedan =result.result;
                    this.fukedanFlag = true;
                }else{
                    this.fukedanFlag = false;
                    console.log(response.data);
                    this.errFlag = true;
                    this.errmsg = response.data.result + '，请重试，重试依然失败请联系管理员';
                }
            }
        },

        // 检验条码
        async getJianYanTiaoMa(){
            const response = await this.$axios.get('/zizhuji/jianyantiaoma');
            if (response.data){
                if(response.data.code == 0){
                    let result = response.data;
                    console.log(result);
                    this.jianyantiaoma =result.result;
                    this.jianyantiaomaFlag = true;
                }else{
                    this.jianyantiaomaFlag = false;
                    console.log(response.data);
                    this.errFlag = true;
                    this.errmsg = response.data.result + '，请重试，重试依然失败请联系管理员';
                }
            }
        },

        // 发票
        async getFaPiao(){
            const response = await this.$axios.get('/zizhuji/fapiao');
            if (response.data){
                if(response.data.code == 0){
                    let result = response.data;
                    console.log(result);
                    this.fapiao =result.result;
                }else{
                    console.log(response.data);
                    this.errFlag = true;
                    this.errmsg = response.data.result + '，请重试，重试依然失败请联系管理员';
                }
            }
        },



        // 打印小票
        async print(type) {
            var element = null;
            if (type === 'XP') {
                element = this.$refs.xiaopiao;
            } else if (type === 'ZYD') {
                element = this.$refs.zhiyindan;
            } else if (type === 'YXD') {
                element = this.$refs.yingxiangdan;
            }else if (type === 'WCLQD') {
                element = this.$refs.weicai;
            }else if (type === 'CXZYD') {
                element = this.$refs.caixiedan;
            }else if (type === 'FKZLD') {
                element = this.$refs.fukezhiliao;
            }else if (type === 'JY') {
                element = this.$refs.jianyan;
            }else {
                return;
            }
            if(Array.isArray(element)){
                for(let i=0;i<element.length;i++){
                    console.log(element[i]);
                    await this.printSingle(element[i],type);
                }
            } else {
                console.log(element);
                await this.printSingle(element,type);
            }
       
        },
        async printSingle(element,type) {
            const canvas = await  html2canvas(element);
            const dataURL = canvas.toDataURL('image/jpg');
            const response = await this.$axios.post('http://127.0.0.1:15588/print', 
                { image: dataURL,type:type } );
            console.log(response.data);
        },
        // 打印发票
        async printFaPiao() {
            for(let i=0;i<this.fapiao.length;i++){
                const response = await this.$axios.post('http://127.0.0.1:15588/print', 
                    { image: this.fapiao[i],type:'FP' } );
            console.log(response.data);
            }
        }

    }
};

</script>


<style scoped>
.xiaopiao{width:800px;}
.row {
  width: 100%;
  display: flex;
  height: 80px;
}

.column {
  border: 2.5px solid black;
  flex-basis: 50%;
}

.tiaoma{
    width:1100px;height:580px;display: inline-block;vertical-align:top;overflow:hidden;
}
</style>