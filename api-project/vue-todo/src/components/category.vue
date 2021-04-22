<template>
  <!-- <transition-group name = "list" tag = "div" id = "categories"> -->
    <div id = "categories">
        <ul :key = "1">
            <li><span>지역 검색</span></li>
            <li><span>최근 검색한 지역</span></li>
            <li><span>내가 저장한 지역</span></li>
            <li><span>코멘트</span></li>
        </ul>
    </div>
  <!-- </transition-group> -->
</template>

<script>
export default {
    
}
</script>

<style>
    #categories {
        text-align : left;
    }

    ul {
        margin-top : 0;
        list-style : none;
        padding-left : 0;
        width : 200px;
        height : 200px;
    }

    div > ul > li {
        height : 50px;
        line-height : 50px;
        border : 1px solid red;
    }
</style>