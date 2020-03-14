export let change$=(val)=>{
    val=parseFloat(val)
return "￥"+val.toFixed(2)
}