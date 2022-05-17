<template>
  <section>
    <sui-container text>
      <br>
      <h2 is="sui-header">Select A File To Start</h2>
      <sui-button primary @click.native="openFile">Select</sui-button>
      <input ref="file_input" type="file" style="display: none;" @change="handleFile" accept="json"/>
    </sui-container>
  </section>
</template>

<script>
export default {
  name: "Landing",
  methods: {
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

</style>