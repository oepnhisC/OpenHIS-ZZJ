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
            <v-row><v-col align="center"><v-btn size="x-large" @click="generateImage()">打印</v-btn></v-col></v-row>
        </v-container>
        <div ref="content" id="content" style="width:400px;display: inline-block;" > 
            <v-container  >
                <v-row><v-col  align="center" style="font-size: 25px;">XXX医院收费凭据</v-col></v-row>
                <v-row no-gutters>
                    <v-col  align="left">姓名：测试哥</v-col>
                    <v-col  align="center"  >性别：女</v-col>
                    <v-col  align="right">年龄：100岁</v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col  align="left">门诊号：123456</v-col>
                    <v-col  align="right">就诊时间：2021-01-01</v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col align="left">就诊科室：内科门诊</v-col>
                    <v-col  align="right" >主诊医生：陈医生</v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col  align="left">病人类别：特种病门诊</v-col>
                    <v-col  align="right">收据号：123456</v-col>
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
                        <v-row style="height: 50px;"></v-row>
                        <v-row no-gutters><v-col align="center">扫码查看电子票据</v-col></v-row>
                        <v-row no-gutters><v-col align="center"><vue-qr :text="payurl" ></vue-qr></v-col></v-row>
                    </v-col>
                </v-row>
                <v-row no-gutters><hr style="border:1px solid #000000;width: 100%;" /></v-row>
                <v-row no-gutters>
                    <v-col cols="3">费别</v-col>
                    <v-col cols="3">金额</v-col>
                    <v-col cols="3">费别</v-col>
                    <v-col cols="3">金额</v-col>
                </v-row>
                <v-row no-gutters v-for="(item,index) in feibie" :key="index">
                    <v-col cols="3">{{item.name}}</v-col>
                    <v-col cols="3">{{item.money}}</v-col>
                    <!-- <v-col cols="3">{{item.name}}</v-col>
                    <v-col cols="3">{{item.money}}</v-col> -->
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
        <div ref="jianyan"  style="width:275px;height:145px;display: inline-block;vertical-align:top;overflow:hidden;">
            <v-container style="font-size: 12px;padding: 5px">
                <v-row no-gutters>
                    <v-col cols="5" align="center" >0000259533    </v-col>
                    <v-col cols="7" align="center">2024-10-28 08:50:07</v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col cols="8" align="right" style="height: 70px;">
                        <vue-barcode tag="svg" style="height: 70px;"
                         value="24102813000021"></vue-barcode>
                         <!--    -->
                    </v-col>
                    <v-col cols="4">无菌密闭容器（金鱼）</v-col>
                </v-row>
                <v-row no-gutters style="font-size:12px">
                    <v-col cols="4" align="center">梁X珍</v-col>
                    <v-col cols="1">女</v-col>
                    <v-col cols="2">33岁</v-col>
                    <v-col cols="5">妇科门诊</v-col>
                </v-row>
                <v-row no-gutters style="font-size:12px">血常规五项、肝功三项、肾功四项、尿常规、尿蛋白、尿酸、血脂、血压、体温</v-row>
            </v-container>
        </div>
    </div>
</template>

<script>
import { mapState,mapActions } from 'vuex'
import vueQr from 'vue-qr/src/packages/vue-qr.vue'
import html2canvas from 'html2canvas'
export default {

    name: "PrintView",
    components: {
        vueQr
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
    methods: {
        ...mapActions(['clearData']),
        print() {
            this.generateImage();
        },
        quit(){
            this.clearData();
            this.$router.replace('/'); 
        },
        async generateImage() {
            const element = this.$refs.jianyan;
            const height = element.clientHeight;
            const width = element.clientWidth;
            console.log(height, width);

            // const canvas = await  html2canvas(element, { 
            //     scale: 2, // 提高分辨率
            //     // width: 595, // A4 width in pixels at 72dpi
            //     // height: 842 // A4 height in pixels at 72dpi
            //     width:226.4,
            //     height:226.4*height/width
            // });

            const canvas = await  html2canvas(element);

            // console.log(canvas);
            const dataURL = canvas.toDataURL('image/jpg');
            // const link = document.createElement('a');
            // link.href = dataURL;
            // link.download = 'print.png';
            // document.body.appendChild(link);
            // link.click();
            
            this.sendImageToFlask(dataURL);
        },
        
        async sendImageToFlask(dataURL) {
            const response = await this.$axios.post('http://127.0.0.1:15588/print', {
                image: dataURL
            });
            console.log(response.data);
        }
    }
};

</script>