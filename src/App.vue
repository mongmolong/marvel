<template>
  <Navbar />
  <EventBox :text="text01[eventTextNum]" />
  <router-view />
</template>
<script >
import Navbar from "./components/NavBar.vue";
import EventBox from "./components/EventBox.vue";

export default {
  name: "app",
  data() {
    return {
      textRed: "color:white",
      text01: [
        "일일 Manager가 되신 것을 환영합니다.",
        "Hero 정보 조회는 Search탭에서 찾아보세요.",
        "당신이 몰랐던 HERO! Random 탭에서 만나보세요!",
      ],
      eventTextNum: 0, //text01의 순서를 매기기 위해 설정!
    };
  },
  components: {
    Navbar: Navbar,
    EventBox: EventBox,
  },
  mounted() {
    console.log("mounted");
    this.interval = setInterval(() => {
      //언마운트될때 interval의 타이머를 강제 해제하기 위해 interval 변수 null로 설정하여 보강했음.
      if (this.eventTextNum == this.text01.length - 1) {
        this.eventTextNum = 0;
      } else {
        this.eventTextNum += 1;
      }
    }, 3000);
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Hubot+Sans:ital,wght@0,200..900;1,200..900&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap");

body {
  padding: 0;
  margin: 0;
  overflow-x: hidden;

  font-family: "Hubot Sans", sans-serif;
  color: rgb(41, 39, 39);
}

h1 {
  font-weight: 300;
}
</style>
