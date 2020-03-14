import Vue from 'vue'

let download={
  install:()=>{
    let timer='';
    Vue.prototype.$download=({page,total,crr=10},callback)=>{
      clearTimeout(timer)
        timer=setTimeout(()=>{
        let win=document.documentElement||document.body;
        let {scrollTop,clientHeight,scrollHeight}=win;
        if(scrollTop+clientHeight>scrollHeight-100){
            if(page>total){
                return
            }
           callback(page,crr)
        }
        },300)
    }
  }
}
export default download