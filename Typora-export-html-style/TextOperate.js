/**
 * Created by Administrator on 2017/9/8.
 */
window.onload = function(){
    // 去除子节点中的空白文本节点
    function removeBlankNode(id){
        var reg = /\>[\s]+\</g; //正则匹配空白文本节点
        var content = document.getElementById(id).innerHTML;
        document.getElementById(id).innerHTML  = content.replace(reg, '><');
    }

    removeBlankNode('write');
};