<template>
  <div class="serch-box">
    <input
      type="serch"
      placeholder="검색어 입력"
      @change="
        $emit('serchMovie', $event.target.value);
        inputText = $event.target.value;
        $event.target.value = '';
      "
    />
    <!-- @input="inputText = $event.target.value" 과
     v-model="inputText" 은 동일하지만, v-model은 글자 하나마다 민감하게 검사하므로, 검색어 전체가 완성되었을 때  처리하기 위해서는 change로 변경한다. 
    -->

    <button>검색</button>
    <p>{{ inputText }}</p>
  </div>
</template>
  
<script >
export default {
  name: "SerchBarComponent",
  data() {
    return {
      inputText: "",
    };
  },
  props: {
    data: Array,
  },
  watch: {
    inputText(name) {
      //검사할 변수 명 동일하게 적기(data안의 inputText)
      //입력한 영화제목이 데이터에 있는지 확인
      const findName = this.data.filter((movie) => {
        return movie.title.includes(name);
      });
      // console.log(findName);
      if (findName.length == 0) {
        alert("해당 영화는 존재하지 않습니다.");
      }
    },
  },
};
</script>
  
<style>
.serch-box {
  width: 50%;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
}
.serch-box input {
  width: 80%;
  padding: 5px 10px;
}
.serch-box button {
  margin: 0;
}
</style>