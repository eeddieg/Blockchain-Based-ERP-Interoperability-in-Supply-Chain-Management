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
            <div id="table-section" class="col-9">
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
            <div id="qr-section" class="col-3 d-flex align-items-center">
              <div id="qr-code justify-content-center">
                <h2>QR section</h2>
                <div class="border border-primary">
                  <div>
                    <img :src="qr" alt="qrCode" id="qr" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div id="table-section">
              <div class="formatted-token-table my-3">
                <h2 class="my-3">Formatted Trace Token Data</h2>
                <table
                  id="formatted-token-table"
                  class="table table-sm table-striped table-bordered table-hover table-secondary"
                >
                  <tbody>
                    <tr
                      v-for="(item, infoIndex) in info?.info"
                      :key="infoIndex"
                    >
                      <th>
                        Layer:
                        <span
                          class="badge bg-danger text-wrap"
                          style="width: 4rem"
                        >
                          {{ item.layer }}
                        </span>
                      </th>
                      <td>
                        <tr>
                          <th>Company</th>
                          <td>{{ item.company }}</td>
                        </tr>
                        <tr>
                          <th>Order ID</th>
                          <td>{{ item.orderId }}</td>
                        </tr>
                        <tr>
                          <th>Created At</th>
                          <td>{{ item.createdAt }}</td>
                        </tr>
                        <tr>
                          <th>Product Bought</th>
                          <td>{{ item.product }}</td>
                        </tr>
                        <tr>
                          <th>Product Info</th>
                          <td colspan="4">
                            <div class="col-2">
                              <button
                                class="btn btn-primary btn-sm"
                                @click="toggleProducts"
                              >
                                {{ productButtonText }}
                              </button>
                            </div>
                            <div v-show="isProductTableVisible">
                              <table
                                class="product-table table table-sm table-striped table-bordered table-hover table-secondary"
                              >
                                <tr
                                  v-for="(
                                    product, productIndex
                                  ) in item.productList"
                                  :key="productIndex"
                                >
                                  <td colspan="4">
                                    <table class="table">
                                      <tr>
                                        <th>Pedigree ID</th>
                                        <td class="px-1">
                                          {{ product.pedigreeId }}
                                        </td>
                                      </tr>
                                      <tr>
                                        <th>Order ID</th>
                                        <td class="px-1">
                                          {{ product.orderId }}
                                        </td>
                                      </tr>
                                      <tr>
                                        <th>Quantity</th>
                                        <td class="px-1">
                                          {{ product.quantity }}
                                        </td>
                                      </tr>
                                      <tr>
                                        <th>Date</th>
                                        <td class="px-1">
                                          {{ product.timestamp }}
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </div>
                          </td>
                        </tr>
                        <tr class="table-group-divider"></tr>
                        <tr>
                          <th>Process Info</th>
                          <td colspan="4">
                            <div class="col-2">
                              <button
                                class="btn btn-primary btn-sm"
                                @click="toggleProcesses"
                              >
                                {{ processButtonText }}
                              </button>
                            </div>
                            <div v-show="isProcessTableVisible">
                              <table
                                class="table table-sm table-striped table-bordered table-hover table-secondary"
                              >
                                <tr
                                  v-for="(
                                    process, processIndex
                                  ) in item.processList"
                                  :key="processIndex"
                                >
                                  <td>
                                    <div>
                                      <tr>
                                        <th>Process ID</th>
                                        <td class="px-1">
                                          {{ process.id }}
                                        </td>
                                      </tr>
                                      <tr>
                                        <th>Process Name</th>
                                        <td class="px-1">
                                          {{ process.name }}
                                        </td>
                                      </tr>
                                      <tr>
                                        <th>Description</th>
                                        <td class="px-1">
                                          {{ process.description }}
                                        </td>
                                      </tr>
                                      <tr>
                                        <th>Date</th>
                                        <td class="px-1">
                                          {{ process.timestamp }}
                                        </td>
                                      </tr>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </div>
                          </td>
                        </tr>
                        <tr class="table-group-divider"></tr>
                        <tr>
                          <th>Stakeholder Info</th>
                          <td colspan="4">
                            <div class="col-2">
                              <button
                                class="btn btn-primary btn-sm"
                                @click="toggleStakeholders"
                              >
                                {{ stakeholderButtonText }}
                              </button>
                            </div>
                            <div v-show="isStakeholderTableVisible">
                              <table
                                class="table table-sm table-striped table-bordered table-hover table-secondary"
                              >
                                <tr
                                  v-for="(
                                    stakeholder, stakeholderIndex
                                  ) in item.stakeholderList"
                                  :key="stakeholderIndex"
                                >
                                  <td>
                                    <div>
                                      <tr>
                                        <th>Stakeholder ID</th>
                                        <td class="px-1">
                                          {{ stakeholder.id }}
                                        </td>
                                      </tr>
                                      <tr>
                                        <th>Company Name</th>
                                        <td class="px-1">
                                          {{ stakeholder.company }}
                                        </td>
                                      </tr>
                                      <tr>
                                        <th>Description</th>
                                        <td class="px-1">
                                          {{ stakeholder.description }}
                                        </td>
                                      </tr>
                                      <tr>
                                        <th>Date</th>
                                        <td class="px-1">
                                          {{ stakeholder.timestamp }}
                                        </td>
                                      </tr>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </div>
                          </td>
                        </tr>
                      </td>
                    </tr>
                  </tbody>
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

const pedigreeHeaders: string[] = [
  "Pedigree ID",
  "Order ID",
  "Quantity",
  "Date",
];

const processHeaders: string[] = [
  "Process ID",
  "Process Name",
  "Description",
  "Date",
];

const stakeholderHeaders: string[] = [
  "Stakeholder ID",
  "Company Name",
  "Description",
  "Date",
];

let isProductTableVisible = false;
let isProcessTableVisible = false;
let isStakeholderTableVisible = false;

let productButtonText = "Show";
let processButtonText = "Show";
let stakeholderButtonText = "Show";

export default {
  name: "TokenModal",
  props: {
    token: Object,
    info: Object,
    qr: String,
  },
  data() {
    return {
      isProductTableVisible,
      isProcessTableVisible,
      isStakeholderTableVisible,
      productButtonText,
      processButtonText,
      stakeholderButtonText,
      tokenHeaders,
      pedigreeHeaders,
      processHeaders,
      stakeholderHeaders,
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    toggleProducts() {
      this.isProductTableVisible = !this.isProductTableVisible;
      if (this.isProductTableVisible) {
        this.productButtonText = "Hide";
      } else {
        this.productButtonText = "Show";
      }
    },
    toggleProcesses() {
      this.isProcessTableVisible = !this.isProcessTableVisible;
      if (this.isProcessTableVisible) {
        this.processButtonText = "Hide";
      } else {
        this.processButtonText = "Show";
      }
    },
    toggleStakeholders() {
      this.isStakeholderTableVisible = !this.isStakeholderTableVisible;
      if (this.isStakeholderTableVisible) {
        this.stakeholderButtonText = "Hide";
      } else {
        this.stakeholderButtonText = "Show";
      }
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
  text-align: center;
  overflow: visible;
  width: 100%;
}
#formatted-token-table th {
  text-align: center;
  vertical-align: middle;
}
</style>
