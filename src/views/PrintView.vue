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
                    <v-col  align="left">姓名：测试哥</v-col>
                    <v-col  align="center"  >性别：女</v-col>
                    <v-col  align="right">年龄：100岁</v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col  cols='5'>门诊号：123456</v-col>
                    <v-col  cols='7'>就诊时间：2021-01-01</v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col align="left">就诊科室：内科门诊</v-col>
                    <v-col  align="right" >主诊医生：陈医生</v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col  cols="7">病人类别：特种病门诊</v-col>
                    <v-col  cols="5">收据号：123456</v-col>
                </v-row>
                <v-row no-gutters><v-col>收费时间：2021-01-01 10:00:00</v-col></v-row>
                <v-row no-gutters><hr style="border:1px solid #000000;width: 100%;" /></v-row>
                <v-row no-gutters>
                    <v-col>
                        <v-row no-gutters><v-col>费用总额：1000.00</v-col></v-row>
                        <v-row no-gutters><v-col>实收金额：1000.00</v-col></v-row>
                        <v-row no-gutters><v-col>社保记账：123456</v-col></v-row>
                        <v-row no-gutters><v-col>记账：123456.11</v-col></v-row>
                        <v-row no-gutters><v-col>POS：123456.11</v-col></v-row>
                        <v-row no-gutters><v-col>尾数：-0.01</v-col></v-row>
                        <v-row no-gutters><v-col>医保刷卡：487.11</v-col></v-row>
                        <v-row no-gutters><v-col>转账：76.5</v-col></v-row>
                        <v-row no-gutters><v-col>财政支付：0.00</v-col></v-row>
                        <v-row no-gutters><v-col>减免优惠：0.00</v-col></v-row>
                        <v-row no-gutters><v-col>民政补助：0.00</v-col></v-row>
                        <v-row no-gutters><v-col>减免：0.00</v-col></v-row>
                    </v-col>
                    <v-col >
                        <v-row style="height: 100px;"></v-row>
                        <v-row no-gutters><v-col align="center">扫码查看电子票据</v-col></v-row>
                        <v-row no-gutters><v-col align="center"><vue-qr :text="payurl" style="width: 300px;height: 300px;"></vue-qr></v-col></v-row>
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
                    <v-col  align="left">姓名：测试哥</v-col>
                    <v-col  align="center"  >性别：女</v-col>
                    <v-col  align="right">年龄：100岁</v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col  cols='5'>门诊号：123456</v-col>
                    <v-col  cols='7'>就诊时间：2021-01-01</v-col>
                </v-row>
                <v-row no-gutters>申请医师：陈医生</v-row>
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
                    <v-col  align="left">姓名：测试哥</v-col>
                    <v-col  align="center"  >性别：女</v-col>
                    <v-col  align="right">年龄：100岁</v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col  cols='5'>门诊号：123456</v-col>
                    <v-col  cols='7'>就诊时间：2021-01-01</v-col>
                </v-row>
                <v-row no-gutters>申请医师：陈医生</v-row>
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
                    <v-col  align="left">姓名：测试哥</v-col>
                    <v-col  align="center"  >性别：女</v-col>
                    <v-col  align="right">年龄：100岁</v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col  cols='5'>门诊号：123456</v-col>
                    <v-col  cols='7'>就诊时间：2021-01-01</v-col>
                </v-row>
                <v-row no-gutters>申请医师：陈医生</v-row>
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
                    <v-col  align="left">姓名：测试哥</v-col>
                    <v-col  align="center"  >性别：女</v-col>
                    <v-col  align="right">年龄：100岁</v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col  cols='5'>门诊号：123456</v-col>
                    <v-col  cols='7'>就诊时间：2021-01-01</v-col>
                </v-row>
                <v-row no-gutters>申请医师：陈医生</v-row>
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
                    <v-col  align="left">姓名：测试哥</v-col>
                    <v-col  align="center"  >性别：女</v-col>
                    <v-col  align="right">年龄：100岁</v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col  cols='5'>门诊号：123456</v-col>
                    <v-col  cols='7'>就诊时间：2021-01-01</v-col>
                </v-row>
                <v-row no-gutters>申请医师：陈医生</v-row>
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
            payurl: 'www.baidu.com',
            feibie:[
                {name:'住院费',money:713},
                {name:'门诊费',money:361},
                {name:'药费',money:0.5},
                {name:'治疗费',money:36},
                {name:'检查费',money:78},
            ]
        }
    },
    mounted() {
       
    },
    computed: {
       feibieArr: function () {
           let feibieS = [];
           for(let i=0;i<this.feibie.length;i++){
            feibieS.push(this.feibie[i].name);
            feibieS.push(this.feibie[i].money);
           }
           console.log(feibieS);
           return feibieS;
        }
    },
    methods: {
        ...mapActions(['clearData']),

        quit(){
            this.clearData();
            this.$router.replace('/'); 
        },
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