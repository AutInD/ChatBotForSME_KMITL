
<template>
  <v-app>
    <v-main class="main">
      <h1>คำสั่งซื้อสินค้า</h1>
      Current time : {{ formatTime(timestamp()) }} <br />
      Current Date : {{ formatDate2(timestamp()) }}
      <v-card class="order">
        <v-card>
          <v-row align="right">
            <v-col class="d-flex" cols="12" sm="6">
              <v-select
                :items="status"
                label="สถานะการชำระเงิน"
                v-model="StatusFilterValue"
                dense
              ></v-select>

              <v-select
                :items="tracking"
                label="สถานะการจัดส่ง"
                v-model="TrackingFilterValue"
                dense
              ></v-select>
            </v-col>
          </v-row>

          <v-data-table
            dense
            :headers="headers"
            :items="orders"
            item-key="id"
            class="elevation-1"
          >
            <template v-slot:item.actions="{ item }">
              <v-btn
                class="button"
                color="blue"
                elevation="2"
                :to="'/orderdetails/' + item.id"
                >รายละเอียด</v-btn
              >
            </template>

            <template v-slot:item.Order_Status="{ item }">
              <v-chip :color="getColor(item.Order_Status)" dark>
                {{ item.Order_Status }}
              </v-chip>
            </template>
            <template v-slot:item.Order_Date="{ item }">
              {{ formatDate(item.Order_Date) }}
            </template>

            <template v-slot:item.Order_Tracking="{ item }">
              {{ getStatusTracking(item.Order_Tracking) }}
            </template>
          </v-data-table>
        </v-card>
      </v-card>
    </v-main>
  </v-app>
</template>
<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import moment from "moment";
moment.locale("th");
Vue.use(VueAxios, axios, moment);

export default {
  name: "order",
  components: {},
  data() {
    return {
      headers: [
        {
          text: "รหัสคำสั่งซื้อ",
          align: "start",
          sortable: false,
          value: "id",
        },
        { text: "ยอด", value: "Order_TotalCost", align: "end" },
        { text: "เวลาที่สั่งซื้อ", value: "Order_Date" },
        {
          text: "สถานะการชำระเงิน",
          value: "Order_Status",
          filter: this.StatusFilter,
        },
        {
          text: "สถานะการจัดส่ง",
          value: "Order_Tracking",
          filter: this.TrackingFilter,
        },
        { text: "ชื่อลูกค้า", value: "Order_CusName", sortable: false },
        { text: "เบอร์โทร", value: "Order_CusTel", sortable: false },
        { text: "", value: "actions", sortable: false },
      ],

      orders: [
        {
          id: "",
          Order_CountProduct: "",
          Order_TotalCost: "",
          Order_Date: "",
          Order_DeliveryType: "",
          Order_Status: "",
          Order_CusName: "",
          Order_CusTel: "",
          Order_Add: "",
          Order_Tracking: "",
        },
      ],
      status: [
        { text: "คำสั่งซื้อทั้งหมด", value: null },
      
        { text: "รอการตรวจสอบ", value: "รอการตรวจสอบ" },

        { text: "ยังไม่ได้ชำระเงิน", value: "ยังไม่ได้ชำระเงิน" },

        { text: "ชำระเงินแล้ว", value: "ยืนยันการชำระเงินแล้ว" },
      ],
      tracking: [

        { text: "สถานะการจัดส่งทั้งหมด", value: null },

        { text: "ยังไม่ได้จัดส่ง", value: "ยังไม่มีพัสดุ" },

        { text: "จัดส่งแล้ว", value: "จัดส่งแล้ว" }
        
        ],

      StatusFilterValue: null,
      TrackingFilterValue: null,
    };
  },
  methods: {
    StatusFilter(value) {
      // If this filter has no value we just skip the entire filter.
      if (!this.StatusFilterValue) {
        return true;
      }
      // Check if the current loop value (The calories value)
      // equals to the selected value at the <v-select>.
      return value === this.StatusFilterValue;
    },

    TrackingFilter(value,Order_Tracking) {
      // If this filter has no value we just skip the entire filter.
      if (!this.TrackingFilterValue) {
        return true;
      } else if (Order_Tracking != "ยังไม่มีพัสดุ")
      // Check if the current loop value (The calories value)
      // equals to the selected value at the <v-select>.
      return value === this.TrackingFilterValue;
    },

    formatDate(value) {
      return moment(value).format("lll");
    },
    formatDate2(value) {
      return moment(value).format("ll");
    },
    formatTime(value) {
      return moment(value).format("LT");
    },

    timestamp() {
      const today = new Date();
      const date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      const time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const timestamp = date + " " + time;
      return timestamp;
    },

    getColor(Order_Status) {
      if (Order_Status == "ยืนยันการชำระเงินแล้ว") return "green";
      else if (Order_Status == "รอการตรวจสอบ") return "orange";
      else return "red";
    },

    getStatusTracking(Order_Tracking) {
      if (Order_Tracking == "ยังไม่มีพัสดุ") return "ยังไม่จัดส่ง";
      else if (Order_Tracking != "ยังไม่มีพัสดุ")  return "จัดส่งแล้ว";
      
    },


    getData() {
      axios.get("https://7a5c-2403-6200-88a2-46ad-650e-36d4-3826-4972.ngrok.io/api/order").then((result) => {
        console.warn(result);
        this.orders = result.data.data;
      });
    },
  },

  mounted() {
    this.getData();
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Prompt:wght@200;400;500&display=swap");
.order {
  margin: 2% 5% 5% 5%;
}
.main {
  font-family: "Prompt", sans-serif;
  margin: 2% 2%;
}
.main .v-select {
  margin: 2% 2%;
}
.main .v-text-field {
}
.button {
  margin: 5px;
}
.subtitle {
  margin: 2% 2% 2% 2%;
}

.grid-container {
  display: grid;
  grid-template-columns: auto auto auto;
  background-color: #2196f3;
  padding: 10px;
}
</style>