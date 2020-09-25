<template>
  <div id="video-tag-manager">
    <el-container>
      <el-aside style="width:auto;">
        <youtube :video-id="videoId" ref="youtube" @playing="playing" @paused="paused"></youtube>
      </el-aside>
      <el-container>
        <el-main>
          <el-table v-if="currentTags.length" :data="currentTags">
            <el-table-column
              prop="tag"
              label="Tag"
              width="180">
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

export default {
  name: 'VideoTagManager',
  props: {
    videoId: String,
    tags: Array
  },
  data() {
    return {
      time: '00:00',
      progress: 0,
      processId: null,
      currentTags: []
    }
  },
  mounted() {
    this.currentTags = this.updateTags(0);
  },
  computed: {
    player() {
      return this.$refs.youtube.player;
    },
  },
  methods: {
    async playing() {
      this.processId = setInterval(() => {
        this.player.getCurrentTime().then((time) => {
          this.progress = time;
          this.updateTime(time + 1);
          this.currentTags = this.updateTags(time);
        });
      }, 100);
    },

    updateTime(time) {
      time = Math.round(time);
      let minutes = Math.floor(time / 60);
      let seconds = time - minutes * 60;

      seconds = seconds < 10 ? '0' + seconds : seconds;
      minutes = minutes < 10 ? '0' + minutes : minutes;

      this.time = minutes + ':' + seconds;
    },

    paused() {
      clearInterval(this.processId);
    },

    updateTags(time) {
      return this.tags.filter(tag => tag.start <= time && tag.end >= time);
    }
  }
}
</script>