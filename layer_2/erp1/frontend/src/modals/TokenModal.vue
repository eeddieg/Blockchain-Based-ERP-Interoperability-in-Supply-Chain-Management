<template>
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <slot name="header"> This is the default title! </slot>
        <button type="button" class="btn-close" @click="close">x</button>
      </header>
      <section class="modal-body">
        <div class="container">
          <div class="row">
            <div id="table-section" class="col-8">
              <div class="actual-token-table my-3">
                <h2 class="my-3">Actual Trace Token Data</h2>
                <table
                  id="actual-token-table"
                  class="table table-sm table-striped table-bordered table-hover table-secondary"
                >
                  <tr id="id">
                    <th>{{ tokenHeaders[0] }}</th>
                    <td>{{ token?.id }}</td>
                  </tr>
                  <tr id="mutable">
                    <th>{{ tokenHeaders[1] }}</th>
                    <td>{{ token?.mutable }}</td>
                  </tr>
                  <tr id="name">
                    <th>{{ tokenHeaders[2] }}</th>
                    <td>{{ token?.name }}</td>
                  </tr>
                  <tr id="information">
                    <th>{{ tokenHeaders[3] }}</th>
                    <td>{{ token?.information }}</td>
                  </tr>
                  <tr id="timestamp">
                    <th>{{ tokenHeaders[4] }}</th>
                    <td>{{ token?.timestamp }}</td>
                  </tr>
                  <tr id="pedigreeToken">
                    <th>{{ tokenHeaders[5] }}</th>
                    <td>{{ token?.pedigreeToken }}</td>
                  </tr>
                  <tr id="processesToken">
                    <th>{{ tokenHeaders[6] }}</th>
                    <td>{{ token?.processesToken }}</td>
                  </tr>
                  <tr id="stakeholdersToken">
                    <th>{{ tokenHeaders[7] }}</th>
                    <td>{{ token?.stakeholdersToken }}</td>
                  </tr>
                  <tr id="owner">
                    <th>{{ tokenHeaders[8] }}</th>
                    <td>{{ token?.owner }}</td>
                  </tr>
                  <tr id="active">
                    <th>{{ tokenHeaders[9] }}</th>
                    <td>{{ token?.active }}</td>
                  </tr>
                  <tr id="hashIPFS">
                    <th>{{ tokenHeaders[10] }}</th>
                    <td>{{ token?.hashIPFS }}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer class="modal-footer">
        <slot name="footer"> This is the default footer! </slot>
        <button type="button" class="btn-green" @click="close">Close</button>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
const tokenHeaders: string[] = [
  "token id",
  "Is mutable",
  "name",
  "information",
  "timestamp",
  "pedigree id",
  "process Id",
  "stakeholder id",
  "owner",
  "active",
  "hashIPFS",
];

export default {
  name: "TokenModal",
  props: {
    token: Object,
    info: Object,
  },
  data() {
    return {
      tokenHeaders,
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  position: relative;
  border-bottom: 1px solid #eeeeee;
  color: #4aae9b;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  flex-direction: column;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}

.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: #4aae9b;
  background: transparent;
}

.btn-green {
  color: white;
  background: #4aae9b;
  border: 1px solid #4aae9b;
  border-radius: 2px;
}
table th {
  text-align: left;
  overflow-wrap: normal;
  width: 20%;
}
table td {
  text-align: left;
  overflow-wrap: normal;
  width: 80%;
}
table {
  font-size: small;
  justify-content: left;
  justify-self: center;
  margin: auto;
  width: 70% !important;
  text-align: center;
  overflow: visible;
}
/* #layer-info {
  all: initial;
  background-color: rgba(0, 0, 0, 0.3);
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: small;
  justify-content: left;
  justify-self: center;
  margin: auto;
  width: 70% !important;
  text-align: center;
} */
#token-info {
  width: 400px;
}
</style>
