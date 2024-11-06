<template>
  <div class="container"></div>
  <!-- :속성명="데이터" -->
  <h1>영화정보</h1>
  <div :key="movie.id" v-for="(movie) in data" class="movie-box">
    <figure>
      <img :src="`${movie.imgUrl}`" :alt="`${movie.title} Flower`" />
    </figure>
    <div class="info">
      <h1 class="bg-yellow" :style="textRed">{{ movie.title }}</h1>
      <h3>개봉 : {{ movie.year }}</h3>
      <h3>장르 : {{ movie.category }}</h3>

      <div class="btns">
        <!-- <button @:click="increaseLike(i)">좋아요</button> -->
        <button @click="$emit('increaseLike', movie.id)">좋아요</button>
        <span>{{ movie.like }}</span>
      </div>
      <p>
        <button  @click= "$emit('openModal', movie.id)" >
          상세보기
        </button>
      </p>
    </div>
  </div>
  √
</template>
  
<script >
export default {
  name: "MoviesComponent",
  props: {
    data: Array,
    // isModal : Boolean,
    // increaseLike : Number,
     textRed: String, 
  },
   emits: ['openModal', 'increaseLike'],
};
</script>
  
<style>
.movie-box {
  display: flex;
  border: 1px solid rgb(215, 210, 210);
  gap: 0 2rem;
  margin: 10px 0;
}
.info {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
}
h3 {
  font-size: 1rem;
}
.bg-yellow {
  background-color: rgb(49, 49, 47);
  padding: 5px 10px;
  font-size: 1.2rem;
}
.btns {
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 10px;
  max-width: 100px;
}
.btns span {
  display: inline-block;
}
figure img {
  width: 200px;
}
button {
  border: none;
  background: rgb(254, 254, 140);
  padding: 5px 10px;
  border-radius: 10px;
  cursor: pointer;
}
button:hover {
  background: rgb(247, 247, 122);
}
</style>