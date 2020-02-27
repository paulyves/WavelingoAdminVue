<template>
  <div class="UpdgradeModal">
  <div>
    <b-button variant="success" v-b-modal.modal-lg class="btn btn-sm">Upgrade</b-button>

    <b-modal ref="my-modal" hide-footer id="modal-lg" size="lg" title="Upgrade">
      <transition name="slide-fade">
        <div v-show="upgrade == false">
          <b-table-simple
            hover
            borderhover
            class="b-table"
            responsive
            v-show="upgrade == false"
            v-on:blur="upgrade  == true"
          >
            <b-thead>
              <b-tr>
                <b-th variant="info" colspan="3" class="txt">
                  <b-row>
                    <b-col>Package of hours</b-col>
                  </b-row>
                  <b-row>
                    <b-col>(Hours of Translation Per Month)</b-col>
                  </b-row>
                </b-th>
                <b-th variant="info" class="txt">Price</b-th>
              </b-tr>
            </b-thead>
            <b-tbody>
              <tr class="txt">
                <b-td colspan="3">
                  <div>1-9 hours</div>
                </b-td>
                <b-td>
                  <div>$0.99 per minute</div>
                </b-td>
              </tr>
              <tr>
                <b-td colspan="3">
                  <div>10-99 hours</div>
                </b-td>
                <b-td>
                  <div>$0.89 per minute</div>
                </b-td>
              </tr>

              <tr>
                <b-td colspan="3">
                  <div>100-999 hours</div>
                </b-td>
                <b-td>
                  <div>$0.79 per minute</div>
                </b-td>
              </tr>
              <tr>
                <b-td colspan="3">
                  <div>1000 and up hours</div>
                </b-td>
                <b-td>
                  <div>$0.69 per minute</div>
                </b-td>
              </tr>
            </b-tbody>
          </b-table-simple>

          <div class="row mt-4">
            <div class="col-md-6">
              <p>Numbers of Hours</p>
            </div>
            <div class="col-md-6">
              <input type="number" v-model="totalHours" class="form-control" @keyup="total" />
            </div>
          </div>

          <div class="mt-4 mb-6">
            <b-alert variant="success" show>Your monthly subscription: {{final}}</b-alert>
          </div>
        </div>
      </transition>
      <div v-show="upgrade == false">
        <b-button pill variant="danger" class="float-left mr-3" @click="hideModal">
          <i class="material-icons">clear</i>
        </b-button>
        <b-button pill variant="success" @click="enter">
          <i class="material-icons">done</i>
        </b-button>
      </div>
      <transition name="slide-fade">
        <div v-show="upgradePayment  == true">
          <b-card>
            <b-card-body>
              <b-table-simple hover borderhover class="b-table" responsive>
                <b-thead>
                  <b-tr>
                    <b-th variant="info" colspan="3" class="txt">
                      <b-row>
                        <b-col>First Name</b-col>
                      </b-row>
                    </b-th>
                    <b-th variant="info" class="txt">Last Name</b-th>
                    <b-th variant="info" class="txt">Job Title</b-th>
                    <b-th variant="info" class="txt">Billing Email</b-th>
                  </b-tr>
                </b-thead>
                <b-tbody>
                  <tr class="txt">
                    <b-td colspan="3">
                      <div>{{fname}}</div>
                    </b-td>
                    <b-td>
                      <div>{{lname}}</div>
                    </b-td>
                    <b-td>
                      <div>{{job}}</div>
                    </b-td>
                    <b-td>
                      <div>{{billingEmail}}</div>
                    </b-td>
                  </tr>
                </b-tbody>
                <b-thead>
                  <b-tr>
                    <b-th variant="info" colspan="3" class="txt">Street</b-th>
                    <b-th variant="info" class="txt">City</b-th>
                    <b-th variant="info" class="txt">Country</b-th>
                    <b-th variant="info" class="txt">State</b-th>
                  </b-tr>
                </b-thead>
                <b-tbody>
                  <tr class="txt">
                    <b-td colspan="3">
                      <div>{{street}}</div>
                    </b-td>
                    <b-td>
                      <div>{{city}}</div>
                    </b-td>
                    <b-td>
                      <div>{{country}}</div>
                    </b-td>
                    <b-td>
                      <div>{{state}}</div>
                    </b-td>
                  </tr>
                </b-tbody>
                <b-thead>
                  <tr>
                    <b-th variant="info" class="txt">Zip Code</b-th>
                    <b-th variant="info" colspan="4" class="txt">Company Name</b-th>
                    <b-th variant="info" class="txt">Tax ID</b-th>
                  </tr>
                </b-thead>
                <b-tbody>
                  <tr class="txt">
                    <b-td>
                      <div>{{zipCode}}</div>
                    </b-td>
                    <b-td colspan="4">
                      <div>{{companyName}}</div>
                    </b-td>
                    <b-td>
                      <div>{{taxId}}</div>
                    </b-td>
                  </tr>
                </b-tbody>
              </b-table-simple>
            </b-card-body>
          </b-card>

          <div class="row mt-4">
            <div class="col-4">
              <div class="text body">
                <div class="ml-3 mt-2">
                  <p class="float-left">Immediate Payment</p>
                  <br />
                  <br />
                  <p v-for="price in price" :key="price" class="float-left">
                    <b>{{price}}</b>
                  </p>
                  <p>
                    <i>Entitles you to use the speech translation service for 500 hours for 1 month upon payment.</i>
                  </p>
                </div>
              </div>
            </div>
            <div class="col-4">
              <div class="text body">
                <div class="ml-3 mt-2">
                  <p class="float-left">Monthly Payment</p>
                  <br />
                  <br />
                  <p v-for="price in price" :key="price" class="float-left">
                    <b>{{price}}</b>
                  </p>
                  <p v-for="hour in hours" :key="hour">
                    <i>Entitles you to use the speech translation service for {{hour}} hours for 1 month upon payment.</i>
                  </p>
                </div>
              </div>
            </div>
            <div class="col-4">
              <div class="text body">
                <div class="ml-3 mt-2">
                  <p class="float-left">Paypall Billing Payment</p>
                  <br />
                  <br />
                  <p class="float-left">
                    <b>B-77L840678947UB</b>
                  </p>
                  <p v-for="hour in hours" :key="hour">
                    <i>Entitles you to use the speech translation service for {{hour}} hours for 1 month upon payment.</i>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-4">
              <b-button class="float-left mr-3 btn1 mt-5" variant="success" @click="back">Back</b-button>
              <b-button variant="success" class="float-left btn1 mt-5" @click="pay">Pay</b-button>
            </div>
          </div>
        </div>
      </transition>

      <transition name="slide-fade">
        <div v-show="payment  == true">
          <b-card bg-variant="info">
            <b-card-body body-bg-variant="light">
              <div class="row">
                <div class="col-12">
                  <p
                    class="float-left"
                    v-for="hour in hours"
                    :key="hour"
                  >Your subscription was successfully set to {{hour}} hours per month.</p>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <p class="float-left" v-for="price in price" :key="price">
                    Your account was charged
                    <b>{{price}} USD</b> as initial payment.
                  </p>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <p class="float-left" v-for="price in price" :key="price">
                    Recurring payments to be charged each month automatically:
                    <b>{{price}} USD</b>
                  </p>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <b-button variant="info">Submit</b-button>
                  <br />
                  <b-button variant="success" class="btn1 mt-5" @click="back1">Back</b-button>
                </div>
              </div>
            </b-card-body>
          </b-card>
        </div>
      </transition>
    </b-modal>
  </div>
  </div>
</template>
<script>
export default {
  name: "upgradeModal",
  props: [
    "fname",
    "lname",
    "job",
    "billingEmail",
    "companyName",
    "taxId",
    "street",
    "city",
    "country",
    "state",
    "zipCode"
  ],
  data() {
    return {
      upgrade: false,
      upgradePayment: false,
      payment: false,
      price: [],
      hours: [],
      totalHours: "",
      ftotal: 0,
      final: 0
    };
  },
  methods: {
    hideModal() {
      this.totalHours = "";
      this.final = 0;
      this.price = [];
      this.hours = [];
      this.$refs["my-modal"].hide();
    },
    total() {
      let tHours = this.totalHours;
      if (tHours >= 1 && tHours <= 9) {
        this.ftotal = this.totalHours * 60;
        this.final = this.ftotal * 0.99;
        this.final = parseFloat(Math.round(this.final * 100) / 100).toFixed(2);
      } else if (tHours >= 10 && tHours <= 99) {
        this.ftotal = this.totalHours * 60;
        this.final = this.ftotal * 0.89;
      } else if (tHours >= 100 && tHours <= 999) {
        this.ftotal = this.totalHours * 60;
        this.final = this.ftotal * 0.79;
        this.final = parseFloat(Math.round(this.final * 100) / 100).toFixed(2);
      } else if (tHours >= 1000) {
        this.ftotal = this.totalHours * 60;
        this.final = this.ftotal * 0.69;
        this.final = parseFloat(Math.round(this.final * 100) / 100).toFixed(2);
      } else if (tHours == "") {
        this.final = 0;
      }
    },
    enter() {
      let tHours = this.totalHours;

      if (tHours == 0 && this.final == 0) {
        this.upgradePayment = false;
      } else if (tHours >= 1 && tHours <= 9) {
        this.upgrade = true;
        this.upgradePayment = true;
        this.hours.push(this.totalHours);
        this.price.push(this.final);
      } else if (tHours >= 10 && tHours <= 99) {
        this.upgrade = true;
        this.upgradePayment = true;
        this.hours.push(this.totalHours);
        this.price.push(this.final);
      } else if (tHours >= 100 && tHours <= 999) {
        this.upgrade = true;
        this.upgradePayment = true;
        this.hours.push(this.totalHours);
        this.price.push(this.final);
      } else if (tHours >= 1000) {
        this.upgrade = true;
        this.upgradePayment = true;
        this.hours.push(this.totalHours);
        this.price.push(this.final);
      } else if (tHours == "") {
        this.hours.splice(this.totalHours);
        this.price.splice(this.final);
      }
    },
    back() {
      this.upgrade = false;
      this.upgradePayment = false;
      this.totalHours = "";
      this.final = 0;
      this.price = [];
      this.hours = [];
    },
    pay() {
      this.upgrade = true;
      this.upgradePayment = false;
      this.payment = true;
    },
    back1() {
      this.upgrade = false;
      this.payment = false;
      this.totalHours = "";
      this.final = 0;
      this.price = [];
      this.hours = [];
    }
  }
};
</script>
<style scoped>
.btn{
  width: 90px;
}
.test {
  float: center;
}
p {
  float: right;
}
.alert {
  float: right;
}
.blue {
  border: black;
  background-color: lightblue;
}
.col-h {
  height: 100px;
}

.row {
  width: 85%;
}

.text {
  float: left;
}
.body {
  background-color: lightblue;
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0s cubic-bezier(1, 0.1, 0.1, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>