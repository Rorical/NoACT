<template>
  <section>
    <sui-container>
      <br>
      <h1 is="sui-header">Result</h1>
      <sui-divider />
      <sui-list>
        <sui-list-item></sui-list-item>
        <sui-list-item><h3>Total Result: <b class="now">{{ corrects }}/{{ this.correct.length }}</b></h3></sui-list-item>
      </sui-list>
      <sui-divider />
      <sui-table celled>
        <sui-table-header>
          <sui-table-row>
            <sui-table-header-cell collapsing>#</sui-table-header-cell>
            <sui-table-header-cell collapsing>Result</sui-table-header-cell>
            <sui-table-header-cell>Your Answer</sui-table-header-cell>
            <sui-table-header-cell>Answer</sui-table-header-cell>
          </sui-table-row>
        </sui-table-header>

        <sui-table-body>
          <sui-table-row v-for="(answer, index) in answers" :key="index">
            <sui-table-cell collapsing>
              {{ index }}
            </sui-table-cell>
            <sui-table-cell collapsing text-align="center">
              <template v-if="answer == correct[index]">
                <sui-icon size="large" name="check" color="green"/>
                Correct
              </template>
              <template v-else-if="answer == ''">
                <sui-icon size="large" name="x icon" color="red"/>
                Missing
              </template>
              <template v-else>
                <sui-icon size="large" name="x icon" color="red"/>
                Incorrect
              </template>
            </sui-table-cell>
            <sui-table-cell>{{ answer }}</sui-table-cell>
            <sui-table-cell>{{ correct[index] }}</sui-table-cell>
          </sui-table-row>
        </sui-table-body>
      </sui-table>
    </sui-container>
  </section>
</template>

<script>
export default {
  name: "Result",
  props: ["answers", "correct"],
  computed: {
    corrects() {
      let correct = 0
      for (let i = 0; i < this.answers.length; i ++) {
        if (this.answers[i] == this.correct[i]) correct ++;
      }
      return correct
    }
  }
}
</script>

<style scoped>

</style>