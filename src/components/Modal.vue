<template>
  <div class="modal" v-if="isModal">
    <div class="inner">
      <h3>Detail</h3>
      <p>Title : {{ data[selectedMovie].title }}</p>
      <h3>개봉 : {{ data[selectedMovie].year }}</h3>
      <h3>장르 : {{ data[selectedMovie].category }}</h3>

      <!-- <button @click="isModal = false">닫기</button> 
      //props로 받은 데이터는 부모만 변경 가능함. 따라서 아래와 같이 emit사용하여 수정하기!!-->
      <button @click="$emit('closeModal')">닫기</button>
    </div>
  </div>
</template>
  
<script >
export default {
  name: "ModalComponent",
  props: {
    data: Array,
    isModal: Boolean, //props로 받은 데이터는 부모만 변경 가능함.
    selectedMovie: Number,
  },
};
</script>
  
<style>
.modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(31, 29, 29, 0.212);
}
.inner {
  width: 500px;
  height: auto;
  background-color: white;
  padding: 20px 30px;
  border-radius: 20px;
}
</style>