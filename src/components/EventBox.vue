<template>
  <div class="event" :class="{ showEvent: isOpen }">
    <p>{{ text }}</p>
    <button class="closeBtn" @click="isOpen = false">X</button>
  </div>
</template>
  
<script >
export default {
  name: "EventComponent",
  props: {
    text: String,
    isEventOpen: Boolean,
  },
  data() {
    return {
      isOpen: true,
    };
  },
};
</script>
  
<style>
.event {
  width: 100%;
  background-color: rgb(29, 26, 26);
  transition: all 0.3s;
  text-align: center;
  align-items: center;
  font-size: 1.3rem;
  display: none;
  padding: 10px;
  justify-content: center;
}
.showEvent {
  display: flex;
}
.showEvent p {
  min-width: 450px;
  margin: 0 10px;
  color: rgb(245, 241, 241);
}

.event button {
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: white;
  transition: all 0.3s;
}
.event button.closeBtn:hover {
  background-color: transparent;
  color: white;
}

@media (max-width: 670px) {
  .event {
    font-size: 0.8rem;
  }
  .showEvent p {
    min-width: 260px;
  }
}
</style>