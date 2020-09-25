<template>
  <div id="app">
    <VideoTagManager :video-id="videoId" :tags="tags"/>
  </div>
</template>

<script>
import VideoTagManager from './components/VideoTagManager.vue'

export default {
  name: 'App',
  components: {
    VideoTagManager
  },
  // Data that could come from API
  data() {
    return {
      videoId: 'iHibnmosKkM',
      tags: [{
        tag: 'Human',
        start: 0,
        end: 6.8,
      }, {
        tag: 'Ball',
        start: 2,
        end: 2.5,
      }, {
        tag: 'Axe',
        start: 6.5,
        end: 6.8,
      }, {
        tag: 'The End',
        start: 6.81,
        end: 10,
      }]
    }
  },
}
</script>
