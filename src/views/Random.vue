<template>
  <div class="characters-container">
    <h1 v-if="userName" class="searchH1">
      {{ userName }}, What about other members?
    </h1>
    <button class="fetch-button" @click="fetchCharacters">New Serch</button>

    <div v-if="loading" class="modal">
      <div class="modal-content">
        <img src="@/assets/circle.png" alt="marvel logo" />
        <p>Please wait a moment..</p>
      </div>
    </div>

    <div class="characters-grid">
      <div
        v-for="character in characters"
        :key="character.id"
        class="character_card_container"
      >
        <div class="character_container_image">
          <img
            :src="
              character.thumbnail.path + '.' + character.thumbnail.extension
            "
            alt="Character Image"
          />
        </div>
        <div class="character_title">{{ character.name }}</div>
        <p class="character_description">
          {{ character.description || "No description." }}
        </p>
      </div>
    </div>
    <button class="fetch-button" @click="fetchCharacters">New Serch</button>
  </div>
</template>


<script>
import axios from "axios";
import md5 from "js-md5";

export default {
  name: "Random",
  data() {
    return {
      userName: "",
      characters: [],
      loading: true,
    };
  },
  mounted() {
    this.userName = localStorage.getItem("userName") || "Guest";
    this.fetchCharacters();
  },
  methods: {
    handleStorageChange(event) {
      if (event.key === "userName") {
        this.userName = event.newValue || "Guest";
      }
    },

    async fetchCharacters() {
      this.loading = true;

      const publicKey = "f6d21e0f62b8c8f5a68c905db658999c";
      const privateKey = "f9bd226255f02ade0e85632cf867ad8bcd0d1f4e";
      const ts = Date.now();
      const hash = md5(ts + privateKey + publicKey);

      try {
        const response = await axios.get(
          `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=100&offset=${Math.floor(
            Math.random() * 1500
          )}`
        );

        // console.log(response.data.data); // 데이터 구조 확인

        if (response.data.data.results.length === 0) {
          console.warn("No characters found.");
          this.characters = [];
          return;
        }

        this.characters = response.data.data.results
          .filter((character) => {
            const hasImage =
              character.thumbnail &&
              character.thumbnail.path &&
              character.thumbnail.extension;
            const hasDescription = character.description;
            return hasDescription || hasImage;
          })
          .map((character) => ({
            id: character.id,
            name: character.name,
            thumbnail: character.thumbnail,
            description: character.description
              ? character.description.length > 200
                ? character.description.substring(0, 200) + "..."
                : character.description
              : "No description.",
          }))
          .slice(0, 8);
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style>
.characters-container {
  text-align: center;
  padding: 20px;
}

.title {
  font-size: 2rem;
  margin-bottom: 20px;
}

.characters-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.character_card_container {
  margin: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  display: inline-block;
  width: 300px;
  text-align: left;
  height: 500px;
  overflow: hidden;

  justify-items: center;
  cursor: pointer;
  user-select: none;
}

.character_container_image {
  position: relative;
}

.character_container_image img {
  max-width: 100%;
  height: 300px;
  border-radius: 8px;
  transition: transform 1s;
}

.character_card_container:hover .character_container_image img {
  animation: spin 1s linear 0s 1;
}

@keyframes spin {
  0% {
    transform: rotateY(0);
  }
  50% {
    transform: rotateY(180deg);
  }
  100% {
    transform: rotateY(360deg);
  }
}

.character_title {
  font-size: 1.3rem;
  margin: 10px 0;
}

.character_description {
  font-size: 1rem;
  color: #555;
}

.fetch-button {
  margin-bottom: 10px;
  padding: 10px 20px;
  font-size: 1rem;
  color: rgb(41, 39, 39);

  border: none;
  border-radius: 5px;
  background: linear-gradient(
    to left,
    rgb(100, 96, 96) 10%,
    rgba(255, 255, 255, 0) 50%,
    rgb(100, 96, 96) 90%
  );

  backdrop-filter: blur(15px);
  cursor: pointer;
  transition: all 0.3s;
}

.fetch-button:hover {
  background: linear-gradient(
    to left,
    rgba(255, 255, 255, 0) 10%,
    rgb(100, 96, 96) 50%,
    rgba(255, 255, 255, 0) 90%
  );
  color: white;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.716);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  color: white;
}

.modal-content {
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.modal-content img {
  width: 200px;
  height: 200px;
  animation: ratate 5s infinite ease-in-out;
}
@keyframes ratate {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(0);
  }
}
</style>
