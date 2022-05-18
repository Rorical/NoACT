<template>
  <section>
    <sui-container text>
      <br>
      <h2 is="sui-header">Select a EXAM</h2>
      <sui-button primary @click.native="openFile">Select from File</sui-button>
      <input ref="file_input" type="file" style="display: none;" @change="handleFile" accept="json"/>
      <sui-segment>
        <sui-list divided relaxed>
          <sui-list-item v-for="(file, index) in files" :key="index" @click="loadFile(file)" class="pointer">
            <sui-list-content>
              <sui-list-header>{{ index + 1 }} . {{ file.split(".")[0] }}</sui-list-header>
            </sui-list-content>
          </sui-list-item>
        </sui-list>
      </sui-segment>
    </sui-container>
  </section>
</template>

<script>
import files from '@/files.json'

export default {
  name: "Landing",
  data() {
    return {
      files: files
    }
  },
  methods: {
    loadFile(filename) {
      fetch(`files/${filename}`).then(res => res.json().then(res => {
        this.$router.push({ name: "Practice", params: { exam: res } })
      }))
    },
    openFile() {
      this.$refs.file_input.click()
    },
    handleFile(f) {
      let fr = new FileReader();
      fr.onload = () => {
        this.$router.push({ name: "Practice", params: { exam: JSON.parse(fr.result) } })
      }

      fr.readAsText(f.target.files[0]);
    }
  }
}
</script>

<style>
.pointer {
  cursor: pointer;
}
</style>