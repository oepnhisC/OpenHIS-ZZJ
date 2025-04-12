

<template>
  <div>
    <RouterView  :key="$route.fullPath"/>
  </div>
</template>

<script >

export default {
  mounted() {
    // 全局禁用右键 
    document.addEventListener("contextmenu",  (e) => {
          e.preventDefault(); 
        });
    document.addEventListener('copy',  (e) => {
      e.preventDefault(); 
    });
    
    document.addEventListener('cut',  (e) => {
      e.preventDefault(); 
      console.log(" 全局禁止剪切");
    });
    
    document.addEventListener('dragstart',  (e) => {
      e.preventDefault(); 
      console.log(" 全局禁止拖拽");
    });
    document.addEventListener('selectstart',  (e) => {
        e.preventDefault(); 
    });
  },
  beforeDestroy() {
    // 移除监听（避免内存泄漏）
    document.removeEventListener("contextmenu",  (e) => {
      e.preventDefault(); 
    });
    document.removeEventListener('copy',  (e) => {
      e.preventDefault(); 
    });
    
    document.removeEventListener('cut',  (e) => {
      e.preventDefault(); 
      console.log(" 全局禁止剪切");
    });
    
    document.removeEventListener('dragstart',  (e) => {
      e.preventDefault(); 
      console.log(" 全局禁止拖拽");
    });
    document.removeEventListener('selectstart',  (e) => {
        e.preventDefault(); 
    });

  },
};
</script>

<style >
::-webkit-scrollbar {display: none;}
</style>

