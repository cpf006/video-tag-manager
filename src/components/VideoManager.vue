<template>
  <div id="video-manager">
    <h4>Name: {{metaData.metadata.name}}<br>Time: {{ time }}<br>Remaining Time : {{ remainingTime }}</h4>
    <el-container>
      <videoPlayer 
        class="vjs-custom-skin"
        ref="videoPlayer"
        :options="playerOptions"
        :playsinline="true"
        @timeupdate="onPlayerTimeupdate($event)"
      >
      </videoPlayer>
      <el-table :data="asrWord">
        <el-table-column label="Asr Word">
          <el-table-column
            prop="word"
            label="Word"
            width="180">
          </el-table-column>
        </el-table-column>
      </el-table>
      <el-table :data="namedEntities">
        <el-table-column label="Named Entities">
          <el-table-column
            prop="entity_name"
            label="Entity Name"
            width="180">
          </el-table-column>
          <el-table-column
            prop="entity_type"
            label="Entity Type"
            width="180">
          </el-table-column>
        </el-table-column>
      </el-table>
            <el-table :data="onScreenText">
        <el-table-column label="On Screen Text">
          <el-table-column
            prop="ocr_string"
            label="OCR String"
            width="180">
          </el-table-column>
        </el-table-column>
      </el-table>
    </el-container>
    <el-container>
      <el-table :data="recognizedPeople">
        <el-table-column label="Recognized People">
          <el-table-column
            prop="speaker_name"
            label="Speaker Name"
            width="180">
          </el-table-column>
          <el-table-column
            prop="confidence"
            label="Confidence"
            width="180">
          </el-table-column>
        </el-table-column>
      </el-table>
      <el-table :data="scenes">
        <el-table-column label="Scenes">
          <el-table-column
            prop="scene_tags"
            label="Scene Tag"
            width="180">
          </el-table-column>
          <el-table-column
            prop="confidence"
            label="Confidence"
            width="180">
          </el-table-column>
        </el-table-column>
      </el-table>
      <el-table :data="visualDetections">
        <el-table-column label="Visual Detections">
          <el-table-column
            prop="tags"
            label="Tag"
            width="180">
          </el-table-column>
          <el-table-column
            prop="confidence"
            label="Confidence"
            width="180">
          </el-table-column>
        </el-table-column>
      </el-table>
    </el-container>
  </div>
</template>

<style>
.el-table__empty-block {
    display: none!important;
}
</style>

<script>

import 'video.js/dist/video-js.css'

import { videoPlayer } from 'vue-video-player'

export default {
  components: {
    videoPlayer
  },
  name: 'VideoManager',
  props: {
    metaData: Object
  },
  data() {
    return {
      time: '00:00',
      remainingTime: '00:00',
      playerOptions: {
        height: '480',
        width: '640',
        sources: [{
          type: "video/mp4",
          src: require('../assets/video.mp4'),
        }],
      },
      asrWord: [],
      namedEntities: [],
      onScreenText: [],
      recognizedPeople: [],
      scenes: [],
      visualDetections: []
    }
  },
  mounted() {
    this.updateData(0);
  },
  methods: {
    onPlayerTimeupdate(player) {
      this.updateData(player.currentTime());
      this.updateTimeDisplay(player.currentTime());
    },
    updateTimeDisplay(time) {
      this.time = this.getDisplayTime(time);
      this.remainingTime = this.getDisplayTime(this.metaData.metadata.duration - time);
    },
    getDisplayTime(time) {
      time = Math.round(time);
      let minutes = Math.floor(time / 60);
      let seconds = time - minutes * 60;

      seconds = seconds < 10 ? '0' + seconds : seconds;
      minutes = minutes < 10 ? '0' + minutes : minutes;

      return minutes + ':' + seconds;
    },
    updateData(time) {
      this.asrWord = this.metaData.metadata.asr_word.filter(o => o.start <= time && o.end >= time);
      this.namedEntities = this.metaData.metadata.named_entities.filter(o => o.start <= time && o.end >= time);
      this.onScreenText = this.metaData.metadata.on_screen_text.filter(o => o.start <= time && o.end >= time);
      this.recognizedPeople = this.metaData.metadata.recognized_people.filter(o => o.start <= time && o.end >= time);
      this.scenes = this.metaData.metadata.scenes.filter(o => o.start <= time && o.end >= time);
      this.visualDetections = this.metaData.metadata.visual_detections.filter(o => o.start <= time && o.end >= time);
    },
  }
}
</script>