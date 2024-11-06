<template>
  <h1 v-if="userName" class="searchH1">
    Hello, {{ userName }}! Ready to search?
  </h1>

  <div class="characters-container">
    <div class="search-container">
      <input
        type="text"
        v-model="searchQuery"
        @input="fetchSearchSuggestions"
        placeholder="Search for your members!"
        class="search-input"
      />
      <button @click="fetchCharacterDetails(searchQuery)" class="search-button">
        Search
      </button>

      <!-- 검색 -->
      <div v-if="suggestions.length" class="suggestions-container">
        <ul>
          <li
            v-for="(suggestion, index) in suggestions"
            :key="index"
            @click="selectSuggestion(suggestion.name)"
          >
            {{ suggestion.name }}
          </li>
        </ul>
      </div>
    </div>

    <div v-if="character" class="character-card">
      <div class="character-image">
        <img :src="character.thumbnail" alt="Character Thumbnail" />
      </div>
      <div class="character-info">
        <h2>{{ character.name }}</h2>
        <p>{{ character.description }}</p>

        <!-- 스토리 목록 -->
        <div v-if="character.stories && character.stories.length">
          <h3>Stories</h3>
          <ul>
            <li
              v-for="story in visibleStories(character.stories)"
              :key="story.resourceURI"
            >
              {{ story.name }}
            </li>
          </ul>
          <button
            v-if="character.stories.length > 5"
            @click="toggleShowMore('stories')"
            class="moreBtn"
          >
            {{ showMoreStories ? "Close" : "More" }}
          </button>
        </div>

        <!-- 시리즈 목록 -->
        <div v-if="character.series && character.series.length">
          <h3>Series</h3>
          <ul>
            <li
              v-for="series in visibleSeries(character.series)"
              :key="series.resourceURI"
            >
              {{ series.name }}
            </li>
          </ul>
          <button
            v-if="character.series.length > 5"
            @click="toggleShowMore('series')"
            class="moreBtn"
          >
            {{ showMoreSeries ? "Close" : "More" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import md5 from "js-md5";

export default {
  name: "Search",
  data() {
    return {
      userName: localStorage.getItem("userName") || "",
      searchQuery: "Hulk",
      suggestions: [],
      character: null,
      showMoreStories: false,
      showMoreSeries: false,
    };
  },
  mounted() {
    window.addEventListener("storage", this.handleStorageChange);
  },
  beforeDestroy() {
    window.removeEventListener("storage", this.handleStorageChange);
  },
  created() {
    this.fetchCharacterDetails(this.searchQuery);
  },
  methods: {
    search() {
      if (this.searchQuery) {
        console.log(`Searching for: ${this.searchQuery}`);
      }
    },
    handleStorageChange(event) {
      if (event.key === "userName") {
        this.userName = event.newValue || "";
      }
    },

    async fetchSearchSuggestions() {
      if (this.searchQuery.length < 2) {
        this.suggestions = [];
        return;
      }

      const publicKey = "f6d21e0f62b8c8f5a68c905db658999c";
      const privateKey = "f9bd226255f02ade0e85632cf867ad8bcd0d1f4e";
      const ts = Date.now();
      const hash = md5(ts + privateKey + publicKey);

      try {
        const response = await axios.get(
          `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${this.searchQuery}&ts=${ts}&apikey=${publicKey}&hash=${hash}`
        );

        this.suggestions = response.data.data.results.slice(0, 5);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        this.suggestions = [];
      }
    },

    // 캐릭터 정보 가져오기
    async fetchCharacterDetails(characterName) {
      const publicKey = "f6d21e0f62b8c8f5a68c905db658999c";
      const privateKey = "f9bd226255f02ade0e85632cf867ad8bcd0d1f4e";
      const ts = Date.now();
      const hash = md5(ts + privateKey + publicKey);

      try {
        const response = await axios.get(
          `https://gateway.marvel.com/v1/public/characters?name=${characterName}&ts=${ts}&apikey=${publicKey}&hash=${hash}`
        );

        if (response.data.data.results.length > 0) {
          const character = response.data.data.results[0];
          this.character = {
            name: character.name,
            description: character.description || "No description available.",
            thumbnail: character.thumbnail
              ? `${character.thumbnail.path}.${character.thumbnail.extension}`
              : null,
            stories: character.stories ? character.stories.items : [],
            series: character.series ? character.series.items : [],
          };
        } else {
          console.warn("Character not found.");
          this.character = null;
        }
      } catch (error) {
        console.error("Error fetching character data:", error);
      }
    },

    selectSuggestion(characterName) {
      this.searchQuery = characterName;
      this.fetchCharacterDetails(characterName);
      this.suggestions = [];
    },

    visibleStories(stories) {
      return this.showMoreStories ? stories : stories.slice(0, 5);
    },

    visibleSeries(series) {
      return this.showMoreSeries ? series : series.slice(0, 5);
    },

    toggleShowMore(type) {
      if (type === "stories") {
        this.showMoreStories = !this.showMoreStories;
      } else if (type === "series") {
        this.showMoreSeries = !this.showMoreSeries;
      }
    },
  },
};
</script>

<style>
.characters-container {
  text-align: center;
  padding: 20px;
  margin-bottom: 50px;
  user-select: none;
}

.searchH1 {
  text-align: center;
}

.search-container {
  margin-bottom: 20px;
  position: relative;
}

.search-input {
  padding: 10px;
  font-size: 1rem;
  border-radius: 5px;
  border: none;
  width: 250px;
  margin-right: 10px;
  color: rgb(41, 39, 39);
  border: 1px solid rgba(26, 25, 25, 0.69);
}

.search-button {
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  color: rgb(41, 39, 39);

  /* backdrop-filter: blur(15px); */
  cursor: pointer;
  transition: all 0.3s;
}

.search-button:hover {
  background: linear-gradient(
    to left,
    rgba(255, 255, 255, 0) 10%,
    rgb(100, 96, 96) 50%,
    rgba(255, 255, 255, 0) 90%
  );
}

.suggestions-container {
  width: 100%;
  margin-top: 10px;
  background-color: #ffffff88;
  backdrop-filter: blur(5px);
  max-width: 300px;
  margin: 0 auto;
  border-radius: 5px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 55;
}

.suggestions-container ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.suggestions-container li {
  padding: 10px;
  cursor: pointer;
  font-size: 1rem;
  text-align: left;
}

.suggestions-container li:hover {
  background-color: rgb(43, 42, 40);
  color: white;
}

.character-card {
  width: 80%;
  min-height: 420px;

  display: grid;
  grid-template-columns: 2fr 5fr;
  justify-items: center;
  align-items: center;
  margin-top: 20px;
  margin: 0 auto;
}

.character-image {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25%;
}
.character-image img {
  width: 200px;
  height: 300px;
  border-radius: 8px;

  box-shadow: 22px 22px 10px rgba(166, 162, 162, 0.453);
  animation: little 5s infinite ease-in-out;
}

@keyframes little {
  0% {
    transform: rotate(0deg)  translateY(0px) translateX(0px);
  }
  55% {
    transform: rotate(-3deg) translateY(15px) translateX(10px);
  }
  100% {
    transform: rotate(0deg)  translateY(0px) translateX(0px);
  }
}

.character-info {
  width: 80%;
  text-align: left;
}

.character-info h2 {
  font-size: 1.5rem;
}

.character-info p {
  font-size: 1.2rem;
  color: #555;
}

.character-info h3 {
  margin-top: 20px;
  font-size: 1.3rem;
}

.character-info ul {
  list-style-type: none;
  padding: 0;
}

.character-info ul li {
  font-size: 1rem;
  color: #555;
}
.moreBtn,
.search-container button {
  font-size: 1rem;
  background: linear-gradient(
    to left,
    rgb(100, 96, 96) 10%,
    rgba(255, 255, 255, 0) 50%,
    rgb(100, 96, 96) 90%
  );
  backdrop-filter: blur(15px);
  color: rgb(41, 39, 39);

  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;
}

.moreBtn:hover,
.search-container button:hover {
  background: linear-gradient(
    to left,
    rgba(255, 255, 255, 0) 10%,
    rgb(100, 96, 96) 50%,
    rgba(255, 255, 255, 0) 90%
  );
  color: white;
}

.moreBtn {
  padding: 5px 20px;
}

@media screen and (max-width: 850px) {
  .character-card {
    display: flex;
    flex-direction: column;
    gap: 2em;
  }
}
@media screen and (max-width: 600px) {
  .character-info {
    width: 100%;
  }
}
@media screen and (max-width: 450px) {
  .search-container {
    display: flex;
    flex-direction: column;
  }
  .search-input {
    margin: 0 auto;
    margin-bottom: 10px;
  }
  .search-button {
    width: 30%;
    min-width: 80px;
    margin: 0 auto;
    font-size: 0.8em;
  }
}
</style>
