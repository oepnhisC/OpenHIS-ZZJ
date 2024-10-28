<template>
  <div id="app">
    <div id="content" ref="content">
      <!-- 要打印的内容 -->
      <h1>这是一个A4尺寸的打印示例</h1>
      <p>测试</p>
    </div>
    <v-btn @click="generateImage">生成并发送至打印机</v-btn>
  </div>
</template>

<script>
import html2canvas from 'html2canvas';
import axios from 'axios';

export default {
  methods: {
    async generateImage() {
      const element = this.$refs.content;
      const canvas = await html2canvas(element, { 
        scale: 2, // 提高分辨率
        width: 595, // A4 width in pixels at 72dpi
        height: 842 // A4 height in pixels at 72dpi
      });
      
      const dataURL = canvas.toDataURL('image/png');
      this.sendImageToFlask(dataURL);
    },
    
    async sendImageToFlask(dataURL) {
      const response = await axios.post('http://127.0.0.1:13168/print', {
        image: dataURL
      });
      console.log(response.data);
    }
  }
}
</script>
