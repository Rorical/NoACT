<template>
  <section>
    <sui-container fluid>
      <sui-grid>
        <sui-grid-row>
          <sui-menu attached="top">
            <sui-menu-item></sui-menu-item>
            <sui-menu-item>
              <h1>{{ ExamTitle }}</h1>
            </sui-menu-item>
            <sui-menu-item>
              <sui-button-group>
                <sui-button basic content="Nav" @click.native="NavOpen=true"/>
                <sui-button basic content="Prev" @click.native="prevQues"/>
                <sui-button basic content="Next" @click.native="nextQues" />
              </sui-button-group>
            </sui-menu-item>
            <sui-menu-menu position="right">
              <sui-menu-item right>
                <sui-button basic content="End Section" @click.native="endSection"/>
              </sui-menu-item>
              <sui-menu-item right></sui-menu-item>
            </sui-menu-menu>
          </sui-menu>
        </sui-grid-row>
        <sui-grid-row>
          <sui-grid-column :width="9">
            <div class="ui text article-text" >
              <h5>{{ TextTitle }}</h5>
              <h4 is="sui-header">{{ TextName }}</h4>
              <p v-html="Text"></p>
            </div>
          </sui-grid-column>
          <sui-grid-column :width="6">
              <sui-form-fields grouped>
                <h4 is="sui-header">{{ NowQuestion }}</h4>
                <sui-form-field v-for="(text, key) in Choices" :key="key">
                  <sui-checkbox :label="text" radio :value="key" v-model="NowChoice"/>
                </sui-form-field>
              </sui-form-fields>
          </sui-grid-column>
        </sui-grid-row>
      </sui-grid>
    </sui-container>
    <sui-button-group basic class="pagination-section">
      <sui-button icon="left chevron" @click.native="menuScroll(-150)"/>
      <div class="pagination-container" ref="bottom_menu">
        <sui-menu pagination>
          <a is="sui-menu-item" v-for="i in Exam.length" :key="i" @click="goTo(i - 1)" :active="i == QuestionNum + 1">{{ i }}</a>
        </sui-menu>
      </div>
      <sui-button icon="right chevron" @click.native="menuScroll(150)"/>
    </sui-button-group>
    <sui-modal v-model="NavOpen">
      <sui-modal-header>Navigation</sui-modal-header>
      <sui-modal-content class="scroll-content">
        <sui-table celled>
          <sui-table-header>
            <sui-table-row>
              <sui-table-header-cell>#</sui-table-header-cell>
              <sui-table-header-cell>State</sui-table-header-cell>
              <sui-table-header-cell>Flagged</sui-table-header-cell>
              <sui-table-header-cell collapsing>Jump</sui-table-header-cell>
            </sui-table-row>
          </sui-table-header>

          <sui-table-body>
            <sui-table-row v-for="(answer, index) in Answers" :key="index">
              <sui-table-cell>{{ index + 1 }}</sui-table-cell>
              <sui-table-cell>{{ answer != "" ? "Answered" : "Unanswered" }}</sui-table-cell>
              <sui-table-cell><sui-checkbox v-model="Flags[index]" /></sui-table-cell>
              <sui-table-cell><sui-button content="Go" @click.native="goTo(index);NavOpen=false" /></sui-table-cell>
            </sui-table-row>
          </sui-table-body>
        </sui-table>
      </sui-modal-content>
      <sui-modal-actions>
        <sui-button @click.native="NavOpen=false">
          OK
        </sui-button>
      </sui-modal-actions>
    </sui-modal>
  </section>
</template>

<script>
export default {
  name: "Practice",
  props: ["exam"],
  data() {
    return {
      Exam: [],
      ExamTitle: "",
      Answers: [],
      Flags: [],
      TextTitle: "",
      TextName: "",
      Text: "",
      NavOpen: false,
      NowChoice: "",
      NowQuestion: "",
      QuestionNum: 0,
      Choices: {},
    }
  },
  created() {
    this.loadExam()
  },
  watch: {
    NowChoice() {
      this.saveQuestion()
    },
  },
  methods: {
    nextQues() {
      if (this.QuestionNum < this.Exam.length - 1) {
        this.QuestionNum += 1
        this.loadQuestion()
        this.isMenuMustScroll()
      } else {
        this.endSection()
      }
    },
    goTo(num) {
      this.QuestionNum = num
      this.loadQuestion()
      this.isMenuMustScroll()
    },
    prevQues() {
      if (this.QuestionNum > 0) {
        this.QuestionNum -= 1
        this.loadQuestion()
        this.isMenuMustScroll()
      }
    },
    loadExam() {
      this.Exam = this.exam["questions"]
      this.ExamTitle = this.exam["name"]
      this.Answers = Array(this.exam["questions"].length).fill("")
      this.Flags = Array(this.exam["questions"].length).fill(false)
      this.loadQuestion()
    },
    saveQuestion() {
      if (this.NowChoice != "") {
        this.Answers[this.QuestionNum] = this.NowChoice
      }
    },
    loadQuestion() {
      this.NowChoice = this.Answers[this.QuestionNum]
      this.NowQuestion = this.Exam[this.QuestionNum]["question"]
      this.TextTitle = this.Exam[this.QuestionNum]["title"]
      this.TextName = this.Exam[this.QuestionNum]["name"]
      this.Text = this.Exam[this.QuestionNum]["article"]
      this.Choices = this.Exam[this.QuestionNum]["choices"]
    },
    isMenuMustScroll() {
      if (48 * this.QuestionNum > this.$refs.bottom_menu.offsetWidth + this.$refs.bottom_menu.scrollLeft) {
        this.menuScroll(150)
      } else if(48 * this.QuestionNum < this.$refs.bottom_menu.scrollLeft) {
        this.menuScroll(-150)
      }
    },
    menuScroll(n) {
      this.$refs.bottom_menu.scrollBy({left: n, behavior: 'smooth'})
    },
    endSection() {
      this.$router.push({
        name: 'Result',
        params: {
          answers: this.Answers,
          correct: this.Exam.map(item => item["correct"])
        }
      })
    }
  }
}
</script>

<style>
  .ui.menu:not(.vertical) .item>.button {
    margin: 0 .25em 0 0 !important;
  }
  b {
    text-decoration: underline;
  }
  b.now {
    background-color: black;
    color: white;
    text-decoration: none;
  }
  .pagination-section {
    position: fixed;
    bottom: 0;
    padding: 13px;
    width: 100%;
  }
  .pagination-container {
    width: 100%;
    overflow-x: scroll;
  }
  .pagination-container::-webkit-scrollbar {
    height: 5px;
  }
  .radio.checkbox {
    margin-bottom: 20px;
  }
  .article-text {
    overflow-y: scroll;
    height: 78vh;
    width: 100% !important;
    padding-left: 3rem;
    padding-right: 4rem;
    font-size: larger;
  }
  .scroll-content {
    overflow-y: scroll;
    height: 78vh
  }
</style>