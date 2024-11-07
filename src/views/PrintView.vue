<template>
    <div>
        <v-container>
            <v-row>
                <v-col align="left" ><v-btn size="x-large" style="margin-top: 8px;" @click="$router.replace('/danju')">返回</v-btn></v-col>
                <v-col align="center" style="font-size: 40px;font-weight: bold;">打印</v-col>
                <v-col align="right"><v-btn size="x-large" style="margin-top: 8px;" @click="quit()">退出</v-btn></v-col>
            </v-row>
            <v-row><v-col align="center" style="font-size: 20px;">自动打印中，请稍候...</v-col></v-row>
            <!-- <v-row><v-progress-linear indeterminate ></v-progress-linear></v-row> -->
            <v-row>
                <v-col align="center"><v-btn size="x-large" @click="print('XP')">打印小票</v-btn></v-col>
                <v-col align="center"><v-btn size="x-large" @click="print('ZYD')">打印指引单</v-btn></v-col>
                <v-col align="center"><v-btn size="x-large" @click="print('YXD')">打印影像单</v-btn></v-col>
                <v-col align="center"><v-btn size="x-large" @click="print('WCLQD')">打印卫材领取单</v-btn></v-col>
                <v-col align="center"><v-btn size="x-large" @click="print('CXZYD')">打印采血指引单</v-btn></v-col>
                <v-col align="center"><v-btn size="x-large" @click="print('FKZLD')">打印妇科治疗单</v-btn></v-col>
                <v-col align="center"><v-btn size="x-large" @click="print('JY')">打印检验条码</v-btn></v-col>
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

        <div ref="zhiyindan" class="xiaopiao" > 
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
                <v-row no-gutters style="height: 20px;"></v-row>
                <v-row no-gutters>
                    <v-col  align="left">尿液分析+镜检</v-col>
                    <v-col  align="right">总量：1</v-col>
                </v-row>
                <v-row no-gutters ><v-col align="right">门诊楼二层检验科</v-col></v-row>
                <v-row no-gutters><hr style="border:1px solid #000000;width: 100%;" /></v-row>
            </v-container>
        </div> 

        <div ref="yingxiangdan" class="xiaopiao" > 
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
                <v-row no-gutters style="height: 20px;"></v-row>
                <v-row no-gutters>
                    <v-col  align="left">DR</v-col>
                    <v-col  align="right">总量：1 胸部DR</v-col>
                </v-row>
                <v-row no-gutters >
                    <v-col align="left">正位</v-col>
                    <v-col align="right">门诊楼二层检验科</v-col>
                </v-row>
                <v-row no-gutters><hr style="border:1px solid #000000;width: 100%;" /></v-row>
            </v-container>
        </div> 

        <div ref="weicai" class="xiaopiao" > 
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
                <v-row no-gutters>
                    <v-col  align="left">卫材aaaaaa</v-col>
                </v-row>
                <v-row no-gutters >
                    <v-col align="right">数量：2</v-col>
                </v-row>
                <v-row no-gutters><hr style="border:1px solid #000000;width: 100%;" /></v-row>
            </v-container>
        </div>

        <div ref="caixiedan" class="xiaopiao" > 
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
                <v-row no-gutters>
                    <v-col  align="left">肝功五项</v-col>
                    <v-col  align="right">总量：1 </v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col  align="left">生化管（红/黄）</v-col>
                </v-row>
                <v-row no-gutters >
                    <v-col align="right">综合楼一层输液区</v-col>
                </v-row>
                <v-row no-gutters><hr style="border:1px solid #000000;width: 100%;" /></v-row>
            </v-container>
        </div> 

        <div ref="fukezhiliao" class="xiaopiao" > 
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
                <v-row no-gutters>
                    <v-col  align="left">肝功五项</v-col>
                    <v-col  align="right">总量：1 </v-col>
                </v-row>
                <v-row no-gutters >
                    <v-col align="right">嘱托</v-col>
                </v-row>
                <!-- <v-row no-gutters><hr style="border:1px solid #000000;width: 100%;" /></v-row> -->
                <v-row no-gutters style="padding-left: 30px;padding-right: 30px;">
                    <div v-for="(row, index) in 14" :key="index" class="row">
                        <div v-for="(col, colIndex) in 2" :key="colIndex" class="column">
                        </div>
                    </div>
                </v-row>
            </v-container>
        </div> 


        <div ref="jianyan"  style="width:1100px;height:580px;display: inline-block;vertical-align:top;overflow:hidden;">
            <v-container style="font-size: 48px;padding: 10px">
                <v-row no-gutters>
                    <v-col cols="5" align="center" >0000259533    </v-col>
                    <v-col cols="7" align="center">2024-10-28 08:50:07</v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col cols="8" align="right" style="height: 280px;">
                        <JianYanTiaoMa :value="'24102813000021'"/>
                    </v-col>
                    <v-col cols="4">无菌密闭容器（金鱼）</v-col>
                </v-row>
                <v-row no-gutters >
                    <v-col cols="4" align="center">梁X珍</v-col>
                    <v-col cols="1">女</v-col>
                    <v-col cols="2">33岁</v-col>
                    <v-col cols="5">妇科门诊</v-col>
                </v-row>
                <v-row no-gutters >血常规五项、肝功三项、肾功四项、尿常规、尿蛋白、尿酸、血脂、血压、体温</v-row>
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

        }
    },
    mounted() {
       this.getHeadInfo();
       this.getFeiYong();
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
            
            const canvas = await  html2canvas(element);
            const dataURL = canvas.toDataURL('image/jpg');
            
            const response = await this.$axios.post('http://127.0.0.1:15588/print', 
                { image: dataURL,type:type } );
            console.log(response.data);
        },
        

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
</style>