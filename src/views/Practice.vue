<template>
  <section>
    <sui-container fluid>
      <sui-grid>
        <sui-grid-row>
          <sui-menu attached="top">
            <sui-menu-item></sui-menu-item>
            <sui-menu-item>
              <h1>ACT</h1>
            </sui-menu-item>
            <sui-menu-item>
              <sui-button-group>
                <sui-button basic content="Nav" @click.native="NavOpen=true"/>
                <sui-button basic content="Prev"/>
                <sui-button basic content="Next"/>
              </sui-button-group>
            </sui-menu-item>
            <sui-menu-menu position="right">
              <sui-menu-item>
                <sui-button-group>
                  <sui-button icon="search plus"/>
                  <sui-button icon="redo"/>
                  <sui-button icon="search minus"/>
                </sui-button-group>
              </sui-menu-item>
              <sui-menu-item right>
                <sui-button basic content="Clear Highlight"/>
                <sui-button basic content="End Section"/>
              </sui-menu-item>
              <sui-menu-item right>
                <sui-button>31:28</sui-button>
              </sui-menu-item>
              <sui-menu-item right></sui-menu-item>
            </sui-menu-menu>
          </sui-menu>
        </sui-grid-row>
        <sui-grid-row>
          <sui-grid-column :width="8">
            <sui-container text>
              <h5>Passage One</h5>
              <h4 is="sui-header">Changing the Face of Journalism</h4>
              <p v-html="Text"></p>
            </sui-container>
          </sui-grid-column>
          <sui-grid-column :width="1"><sui-divider vertical /></sui-grid-column>
          <sui-grid-column :width="7">
              <sui-form-fields grouped>
                <h4 is="sui-header">5.</h4>
                <sui-form-field>
                  <sui-checkbox label="A. NO CHANGE" radio :value="1" v-model="NowChoice"/>
                </sui-form-field>
                <sui-form-field>
                  <sui-checkbox label="B. NO CHANGE" radio :value="2" v-model="NowChoice"/>
                </sui-form-field>
                <sui-form-field>
                  <sui-checkbox label="C. NO CHANGE" radio :value="3" v-model="NowChoice"/>
                </sui-form-field>
                <sui-form-field>
                  <sui-checkbox label="D. NO CHANGE" radio :value="4" v-model="NowChoice"/>
                </sui-form-field>
              </sui-form-fields>
          </sui-grid-column>
        </sui-grid-row>
      </sui-grid>
    </sui-container>
    <sui-button-group basic class="pagination-section">
      <sui-button icon="left chevron" />
      <div class="pagination-container">
        <sui-menu pagination>
          <a is="sui-menu-item" v-for="i in 60" :key="i">{{ i }}</a>
        </sui-menu>
      </div>
      <sui-button icon="right chevron" />
    </sui-button-group>
    <sui-modal v-model="NavOpen">
      <sui-modal-header>Navigation</sui-modal-header>
      <sui-modal-content>
        <sui-table celled>
          <sui-table-header>
            <sui-table-row>
              <sui-table-header-cell>#</sui-table-header-cell>
              <sui-table-header-cell>State</sui-table-header-cell>
              <sui-table-header-cell>Flagged</sui-table-header-cell>
            </sui-table-row>
          </sui-table-header>

          <sui-table-body>
            <sui-table-row>
              <sui-table-cell>1</sui-table-cell>
              <sui-table-cell>Answered</sui-table-cell>
              <sui-table-cell><sui-checkbox /></sui-table-cell>
            </sui-table-row>
            <sui-table-row>
              <sui-table-cell>2</sui-table-cell>
              <sui-table-cell>Answered</sui-table-cell>
              <sui-table-cell><sui-checkbox /></sui-table-cell>
            </sui-table-row>
            <sui-table-row>
              <sui-table-cell>3</sui-table-cell>
              <sui-table-cell>Unanswered</sui-table-cell>
              <sui-table-cell><sui-checkbox /></sui-table-cell>
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
  data() {
    return {
      Text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do <b>eiusmod tempor incididunt</b> ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. <br> At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit <b>quo minus id</b> quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. <b class='now'>Temporibus autem quibusdam</b> et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Sed ut perspiciatis unde omnis iste natus error sit <b>voluptatem accusantium doloremque laudantium</b>, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
      NavOpen: false,
      NowChoice: -1,
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
</style>