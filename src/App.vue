<template>
  <div id="app">
    <VideoManager :meta-data="Data"/>
  </div>
</template>

<script>
import VideoManager from './components/VideoManager.vue'
import Data from './assets/data.json';

export default {
  name: 'App',
  components: {
    VideoManager
  },
  // Data that could come from API
  data() {
    return {
      Data,
    }
  },
}
</script>
