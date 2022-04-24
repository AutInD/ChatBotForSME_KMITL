<template>
  <v-app>
    <v-main class="main">
      <div class="no-print">
        <h1>รายละเอียดคำสั่งซื้อ</h1>
        <div class="cursor-point">
          <span @click="printWindow()" class="d-flex flex-row-reverse"
            >พิมพ์คำสั่งซื้อ</span
          >
        </div>
        <v-card class="text-center" height="70%" elevation="6" text-center>
          <v-toolbar color="grey" dark dense flat>
            <v-toolbar-title> แจ้งการชำระเงิน </v-toolbar-title>
          </v-toolbar>

          <div class="" v-for="item in orders" v-bind:key="item.id">
            <div class="status">
              <v-chip
                class="ma-1"
                x-large
                :color="getColor(item.Order_Status)"
                dark
                he
              >
                {{ item.Order_Status }}
              </v-chip>
            </div>

            <v-content>
              <v-container>
                <v-row>
                  <v-col cols="">
                    <img src="" alt="" />

                    <v-img
                      :src="item.Order_Payment"
                      contain
                      max-height="500"
                      max-width="500"
                    ></v-img>
                  </v-col>
                </v-row>
              </v-container>
            </v-content>

            <v-spacer></v-spacer>

            <v-btn
              event
              v-on:click="confirm()"
              color="green"
              style="margin: 10px"
              >ยืนยันการชำระเงิน</v-btn
            >
            <v-btn event v-on:click="dismiss()" color="red" style="margin: 10px"
              >ปฎิเสธการชำระเงิน</v-btn
            >
          </div>
        </v-card>
      </div>

      <v-spacer></v-spacer>

      <div v-for="item in orders" v-bind:key="item.id">
        <br />
        <v-card>
          <v-toolbar color="white">
            <v-toolbar-title class="header-text"
              >คำสั่งซื้อ #{{ item.id }}</v-toolbar-title
            >
          </v-toolbar>

          <div class="flex-container">
            <div class="">
              <h2>สรุปรายการสินค้า</h2>
              <!--จำนวนสินค้าในออเดอร์ : {{item.Order_CountProduct}}<br>-->
              <table border="0" style="width: 100%">
                <thead>
                  <tr>
                    <th align="left">ชื่อรายการสินค้า</th>
                    <th align="right">จำนวน</th>
                    <th align="right">ราคา</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in orders_d"
                    v-bind:key="item.idOrder_detail"
                    style=""
                  >
                    <td>{{ item.Product_Name }}</td>
                    <td align="right">{{ item.od_qty }}</td>
                    <td align="right">
                      {{ item.od_qty * item.Product_Cost }}.-
                    </td>
                    {{
                      Sum
                    }}
                  </tr>

                  <tr style="font-size: 22px; border-top: 1px solid black">
                    <td>ราคาสุทธิ</td>
                    <td></td>
                    <td align="right">.-</td>
                  </tr>
                </tbody>
              </table>
              <br />

              <template> </template>
            </div>

            <div class="order2">
              ผู้สั่ง : {{ item.Order_CusName }} <br />
              เบอร์โทร : {{ item.Order_CusTel }} <br />
              {{ item.Order_CusAdd }}<br /><br />
              <v-form>
                ประเภทการขนส่ง : {{ item.Order_DeliveryType }} <br />
                <div>Tracking Number : {{ item.Order_Tracking }}</div>
                <v-text-field
                  hint="สำหรับกรอกเลขพัสดุ"
                  label="Tracking Number : "
                  v-model="orders.Order_Tracking"
                ></v-text-field>
                <br />
                <v-row align="center" justify="space-around">
                  <v-btn
                    event
                    v-on:click="submit()"
                    center
                    class="px-12"
                    color="success"
                    >บันทึกเลขพัสดุ</v-btn
                  >
                </v-row>
              </v-form>
            </div>
          </div>
        </v-card>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import Swal from "sweetalert2";

Vue.use(VueAxios, axios, Swal);

export default {
  name: "orderdetails",
  components: {},

  data() {
    return {
      orders: {
        id: "",
        Order_CountProduct: "",
        Order_TotalCost: "",
        Order_Date: "",
        Order_DeliveryType: "",
        Order_Status: "",
        Order_CusName: "",
        Order_CusTel: "",
        Order_CusAdd: "",
        Order_Tracking: "",
      },

      orders_d: {
        idOrder_detail: "",
        fk_order_id: "",
        fk_product_id: "",
        od_status: "",
        od_qty: "",
        od_total: "",
        Product_Name: "",
        Prodduct_Cost: "",
      },
    };
  },

  async mounted() {
    const result = await axios.get(
      "https://e621-2403-6200-88a0-3137-187f-3b13-b58c-8fb6.ngrok.io/api/orderdetails/" + this.$route.params.id
    );
    this.orders = result.data.data;

    const result2 = await axios.get(
      "https://e621-2403-6200-88a0-3137-187f-3b13-b58c-8fb6.ngrok.io/api/orderdetailss/" + this.$route.params.id
    );
    this.orders_d = result2.data.data;
  },
  methods: {
    getColor(Order_Status) {
      if (Order_Status == "ยืนยันการชำระเงินแล้ว") return "green";
      else if (Order_Status == "รอการตรวจสอบ") return "orange";
      else return "red";
    },

    printWindow() {
      window.print();
    },

    getData() {
      axios.get("https://e621-2403-6200-88a0-3137-187f-3b13-b58c-8fb6.ngrok.io/api/product").then((result) => {
        console.warn(result);
        this.products = result.data.data;
      });
    },
    getDataOrder() {
      axios.get("https://e621-2403-6200-88a0-3137-187f-3b13-b58c-8fb6.ngrok.io/api/orderdetailss/").then((result2) => {
        console.warn(result2);
        this.products = result2.data.data;
      });
    },
    confirm() {
      Swal.fire({
        title: "ยืนยันการชำระเงิน",
        text: "ต้องการยืนยันการชำระเงินหรือไม่ ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "ยกเลิก",
        confirmButtonText: "ยืนยัน",
      }).then((result) => {
        if (result.isConfirmed) {
          let order_status = new FormData();
          order_status.append("Order_Status", "ยืนยันการชำระเงินแล้ว");
          axios
            .post(
              "https://e621-2403-6200-88a0-3137-187f-3b13-b58c-8fb6.ngrok.io/api/update_status/" +
                this.$route.params.id,
              order_status,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            )
            .then(Swal.fire("Saved!", "", "success"), window.location.reload());
        }
      });
    },
    dismiss() {
      Swal.fire({
        title: "ปฎิเสธการชำระเงิน",
        text: "ต้องการปฎิเสธการชำระเงินการชำระเงินหรือไม่ ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "ยกเลิก",
        confirmButtonText: "ยืนยัน",
      }).then((result) => {
        if (result.isConfirmed) {
          let order_status = new FormData();
          order_status.append("Order_Status", "ปฎิเสธการชำระเงินโดยผู้ขาย");
          axios
            .post(
              "https://e621-2403-6200-88a0-3137-187f-3b13-b58c-8fb6.ngrok.io/api/update_status/" +
                this.$route.params.id,
              order_status,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            )
            .then(Swal.fire("Saved!", "", "success"), window.location.reload());
        }
      });
    },

    submit() {
      let formData = new FormData();
      formData.append("Order_Tracking", this.orders.Order_Tracking);

      axios
        .post(
          "https://e621-2403-6200-88a0-3137-187f-3b13-b58c-8fb6.ngrok.io/update_trackingnumber/" +
            this.$route.params.id,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then(() => {
          //swal
        })
        .then(() => {
          window.location.reload();
        });
    },

    mounted() {
      this.getDataOrder();
    },
  },
  setDisable(colName) {
    return (
      this.entryState === "read" || colName.toLowerCase().indexOf("id") !== -1
    );
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Prompt:wght@200;400;500&display=swap");

.card-outter {
  padding-bottom: 50px;
}

.cursor-point {
  cursor: pointer;
}

.header-text {
  font-size: 28px;
}
.order {
  display: flex;
  flex-direction: row;
  margin: 2% 5% 5% 5%;
  font-size: 22px;
}
.order2 {
  margin: 2% 5% 5% 5%;
  font-size: 22px;
}

.status {
  display: flex;
  margin: 2%;

  border-radius: 10px;

  padding: 20px;
  width: 270px;
  height: 30px;
  font-size: 22px;
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
.flex-container {
  display: flex;
}

.slip {
  margin: 2%;
}
.flex-container {
  display: flex;
  /*background-color: DodgerBlue;*/
  flex-direction: row;
}

.flex-container > div {
  /*background-color: #f1f1f1;*/
  margin: 10px;
  padding: 20px;
  font-size: 18px;
  height: 2%;
  width: 650px;
}

.space {
  padding: 1%;
}
</style>