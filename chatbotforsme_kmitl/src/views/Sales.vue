
<template>
  <v-app>
    <v-main class="main">
      <h1>สรุปยอดขาย</h1>
      <v-container>
        <v-layout row wrap>
          <v-flex sm6 xs12 md6 lg3>
            <v-card class="ma-3">
              <v-list-item>
                <v-list-item-avatar tile class="mt-n7">
                  <v-sheet color="green" width="80" height="80" elevation="10">
                    <v-icon dark large>store</v-icon>
                  </v-sheet>
                </v-list-item-avatar>
                <v-list-item-content>
                  <div class="text-right"> ยอดรวมสินค้าที่ขายไป</div>
                  <v-list-item-title class="mb-8 text-right"
                    >{{ totalSumm() }} บาท</v-list-item-title
                  >
                  <div><v-divider></v-divider></div>
                </v-list-item-content>
              </v-list-item>
              <v-card-actions>
                <v-icon text class="ma-2">receipt</v-icon>
                <div class="overline">Total</div>
              </v-card-actions>
            </v-card>
          </v-flex>
          <v-flex sm6 xs12 md6 lg3>
            <v-card class="ma-3">
              <v-list-item>
                <v-list-item-avatar tile class="mt-n7">
                  <v-sheet
                    color="#F44336"
                    width="80"
                    height="80"
                    elevation="10"
                  >
                    <v-icon dark large>shopping_basket</v-icon>
                  </v-sheet>
                </v-list-item-avatar>
                <v-list-item-content>
                  <div class="text-right">สินค้าในสต็อก</div>
                  <v-list-item-title class="mb-8 text-right"
                    >{{ stock() }} ชิ้น</v-list-item-title
                  >
                  <div><v-divider></v-divider></div>
                </v-list-item-content>
              </v-list-item>
              <v-card-actions>
                <v-icon text class="ma-2">inventory</v-icon>
                <div class="overline">Stock</div>
              </v-card-actions>
            </v-card>
          </v-flex>
          <v-flex sm6 xs12 md6 lg3>
            <v-card class="ma-3">
              <v-list-item>
                <v-list-item-avatar tile class="mt-n7">
                  <v-sheet
                    color="#03A9F4"
                    width="80"
                    height="80"
                    elevation="10"
                  >
                    <v-icon dark large>add_shopping_cart</v-icon>
                  </v-sheet>
                </v-list-item-avatar>
                <v-list-item-content>
                  <div class="text-right">จำนวนออเดอร์ทั้งหมด</div>
                  <v-list-item-title class="mb-8 text-right "
                    >{{ orderCount() }} ออเดอร์</v-list-item-title
                  >
                  <div><v-divider></v-divider></div>
                </v-list-item-content>
              </v-list-item>
              <v-card-actions>
                <v-icon text class="ma-2">credit_card</v-icon>
                <div class="overline">ORDER</div>
              </v-card-actions>
            </v-card>
          </v-flex>
          <v-flex sm6 xs12 md6 lg3>
            <v-card class="ma-3">
              <v-list-item>
                <v-list-item-avatar tile class="mt-n7">
                  <v-sheet
                    color="#FFC107"
                    width="80"
                    height="80"
                    elevation="10"
                  >
                    <v-icon dark large>folder_shared</v-icon>
                  </v-sheet>
                </v-list-item-avatar>
                <v-list-item-content>
                  <div class="overline text-right">Folder shared</div>
                  <v-list-item-title class="headline mb-1 text-right"
                    >1730</v-list-item-title
                  >
                  <div><v-divider></v-divider></div>
                </v-list-item-content>
              </v-list-item>
              <v-card-actions>
                <v-icon text class="ma-2">folder</v-icon>
                <div class="overline">Prodect</div>
              </v-card-actions>
            </v-card>
          </v-flex>
          <v-flex xs12 sm6 md4 lg3 v-for="person in team" :key="person.name">
            <v-card class="text-center ma-3">
              <v-responsive class="pt-4">
                <v-avatar size="100" class="red lighten-2">
                  <img :src="person.avatar" alt="" />
                </v-avatar>
              </v-responsive>
              <v-card-text>
                <div class="subheading">{{ person.name }}</div>
                <div class="grey--text">{{ person.role }}</div>
              </v-card-text>
              <v-card-actions>
                <v-btn outlined color="orange">
                  <v-icon small left>message</v-icon>
                  <span>Message</span>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>

      <v-row>
        <v-col class="sales2">
          <v-card>
            <v-layout row justify-center align-center>
              <h2>ยอดรวมสินค้าทั้งหมดที่ขายได้ {{ totalSumm() }}บาท</h2>
            </v-layout>
            <v-progress-circular
              :value="1"
              size="250"
              width="60"
              color="primary lighten-2"
            >
            </v-progress-circular>
          </v-card>
        </v-col>
        <v-col class="sales3">
          <v-card>
            <v-layout row justify-center align-center>
              <h2>
                จำนวนสินค้าทั้งหมดที่ขายไปแล้ว {{ totalRequest(od_qty) }} ชิ้น
              </h2>
              <h2></h2>
            </v-layout>
            <v-progress-circular
              :value="90"
              size="250"
              width="60"
              color="deep-orange lighten-2"
            >
            </v-progress-circular>
          </v-card>
        </v-col>
      </v-row>
      <v-card class="sales">
        <v-card-title>จำนวนชนิดที่ขายได้</v-card-title>
        <v-card-subtitle>หน่วย : ชิ้น</v-card-subtitle>

        <template>
          <div id="Sales">
            <GChart type="PieChart" :data="chartData" :option="chartOptions" />
          </div>
        </template>
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import Swal from "sweetalert2";
import lodash from "lodash";

Vue.use(VueAxios, axios, Swal, lodash);

export default {
  data: () => ({
    chartData: [
      ["Task", "Hours per Day"],
      ["Work", 3],
      ["Eat", 2],
      ["Commute", 2],
      ["Watch TV", 2],
      ["Sleep", 7],
    ],
    orders_d: {
      idOrder_detail: "",
      fk_order_id: "",
      fk_product_id: "",
      od_status: "",
      od_qty: "",
      od_total: "",
      Product_Name: "",
      Product_Cost: "",
    },
    product: {
      Product_Count: "",
    },
    ordercount: {
      id: "",
    },
  }),
  methods: {
    totalRequest() {
      return this.orders_d.reduce((acc, item) => acc + item.od_qty, 0);
    },

    stock() {
      return this.product.reduce((acc, item) => acc + item.Product_Count, 0);
    },

    totalSumm: function () {
      return this.orders_d.reduce(function (total, item) {
        return total + item.od_qty * item.Product_Cost;
      }, 0);
    },

    orderCount: function () {		
		this.result4 = this.ordercount.length;
      return this.result4;
    },
  },

  name: "Sales",
  components: {},

  async mounted() {
    const result2 = await axios.get(
      "https://e621-2403-6200-88a0-3137-187f-3b13-b58c-8fb6.ngrok.io/api/orderdetailss/"
    );
    this.orders_d = result2.data.data;
    console.log(this.orders_d);

    const result3 = await axios.get(
      "https://e621-2403-6200-88a0-3137-187f-3b13-b58c-8fb6.ngrok.io/api/product/"
    );
    this.product = result3.data.data;
    console.log(this.product);

    const result4 = await axios.get(
      "https://e621-2403-6200-88a0-3137-187f-3b13-b58c-8fb6.ngrok.io/api/order/"
    );
    this.ordercount = result4.data.data;
    console.log(this.ordercount);
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Prompt:wght@200;400;500&display=swap");
.sales {
  margin: 2% 5% 2% 5%;
}
.sales2 {
  margin: 20px 1% 2% 5%;
}
.sales3 {
  margin: 20px 5% 2% 1px;
}

.text-sale3 {
  margin: 5%;
}
.main {
  margin: 2% 2%;
  font-family: "Prompt", sans-serif;
}
.button {
  margin: 5px;
}
.subtitle {
  margin: 2% 2% 2% 2%;
}
.pie {
  margin: 2% 2% 2% 2%;
}
.v-progress-circular {
  margin: 1rem;
}
.v-col-margin {
  margin: 2% 2% 2% 2%;
}
</style>