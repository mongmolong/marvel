<template>
  <div class="home-container">
    <div class="homeImg">
      <img src="/assets/captin.jpg" alt="captin" />
    </div>

    <div class="homeLogin">
      <h1 v-if="userName" class="loginFirst">Welcome, {{ userName }}</h1>

      <div v-if="!userName" class="homeBtn">
        <input
          v-model="loginInput"
          placeholder="Enter your ID"
          class="loginSecond"
        />
        <button @click="login(loginInput)">Login</button>
      </div>

      <div v-else class="homeBtn">
        <button @click="logout">Logout</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      userName: localStorage.getItem("userName") || "", // 로컬 스토리지에서 이름 읽어오기
      loginInput: "", // 로그인 입력 값
    };
  },
  mounted() {
    // 다른 탭에서 localStorage가 변경되었을 때 자동으로 반영되도록 처리
    window.addEventListener("storage", this.handleStorageChange);
  },
  beforeDestroy() {
    // 컴포넌트가 파괴될 때 eventListener 제거
    window.removeEventListener("storage", this.handleStorageChange);
  },
  methods: {
    login(userName) {
      // localStorage에 사용자 이름 저장
      localStorage.setItem("userName", userName);
      this.userName = userName; // Vue의 data에 저장
    },
    logout() {
      // localStorage에서 사용자 이름 삭제
      localStorage.removeItem("userName");
      this.userName = ""; // Vue의 data에서 삭제
    },
    handleStorageChange(event) {
      // localStorage 값이 변경되었을 때 업데이트
      if (event.key === "userName") {
        this.userName = event.newValue || ""; // 새로 저장된 값으로 업데이트
      }
    },
  },
};
</script>

<style>
.home-container {
  max-width: 900px;
  height: 100vh;
  display: flex;
  justify-content: space-between;
  align-items: center; 
  margin: 0 auto; /* 페이지 내에서 가운데 정렬 */
  position: relative;
  }

.homeImg {

}

.homeLogin {
  padding: 5px 0;
  width: 50%;
  height: 100px;
  text-align: center;

  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

.loginFirst {
  height: 40px;
  backdrop-filter: blur(15px);
}
.homeLogOut {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.homeBtn {
  display: flex;
  flex-direction: column;
}
.homeBtn input {
  border: none;
  padding: 5px;
  padding-left: 50px;

  border-radius: 25px;
  height: 40px;

  background: linear-gradient(
    to left,
    rgba(255, 255, 255, 0) 10%,
    rgb(100, 96, 96) 50%,
    rgba(255, 255, 255, 0) 90%
  );
  backdrop-filter: blur(5px);
}

.homeBtn button {
  width: 100%;
  margin: 0 auto;
  margin-top: 1em;
  padding: 5px;
  background-color: transparent;
  border: none;
  cursor: pointer;

  background: linear-gradient(
    to left,
    rgba(255, 255, 255, 0) 10%,
    rgba(255, 255, 255, 1) 50%,
    rgba(255, 255, 255, 0) 90%
  );
  backdrop-filter: blur(5px);
}

.homeLogin h1 {
  padding: 5px 0;
  margin: 0;
  align-items: center;

  align-content: center;
  font-size: 1.3rem;
}

@media (max-width: 670px) {
  input::placeholder {
    color: white;
  }
  input {
    padding-left: 10px;
    color: white;
  }
}
</style>
