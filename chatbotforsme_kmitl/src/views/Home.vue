/* eslint-disable */
<template>
  <v-app>
    <v-main class="main">
      <h1>จัดการสินค้า</h1>
      <v-card class="product">
        <v-card>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">ชื่อสินค้า</th>
                  <th class="text-left">จำนวนในสต็อก</th>
                  <th class="">วันที่ผลิต</th>
                  <th class="">ราคา</th>
                  <th class="">รายละเอียด</th>
                  <th class="text-center">รูปสินค้า</th>
                  <th class="text-center">Action</th>
                  <th>
                    <Popup />
                  </th>
                </tr>
                <!--<v-btn color="red" dark small absolute buttom right fab>
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>-->
              </thead>
              <tbody>
                <tr v-for="item in products" v-bind:key="item.idProduct">
                  <td>{{ item.Product_Name }}</td>
                  <td
                    v-if="item.Product_Count == 0"
                    class="red--text"
                    style="width: 100px"
                  >
                    สินค้าหมดสต็อก
                  </td>
                  <td v-else class="">{{ item.Product_Count }}</td>

                  <td>{{ formatDate(item.Product_Expire) }}</td>
                  <td>{{ item.Product_Cost }}</td>
                  <td style="width: 180px">{{ item.Product_Detail }}</td>
                  <td>
                    <img src="" alt="" />
                    <v-img
                      :src="'https://7a5c-2403-6200-88a2-46ad-650e-36d4-3826-4972.ngrok.io/' + item.Product_Picture"
                      contain
                      max-height="150"
                      max-width="120"
                    ></v-img>
                  </td>
                  <td>
                    <v-btn
                      class="button"
                      color="yellow"
                      elevation="2"
                      v-on="on"
                      :to="'/popup_upd_pd/' + item.idProduct"
                      >แก้ไข</v-btn
                    >

                    <v-btn
                      class="button"
                      color="red"
                      elevation="2"
                      v-on:click="deleteProduct(item.idProduct)"
                      >ลบ</v-btn
                    >
                  </td>

                  <!--{{item.Product_Picture}}-->
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import Popup from "../components/popup_add_pd.vue";
//import upDate from '../components/popup_upd_pd.vue'
import Swal from "sweetalert2";
import moment from "moment";
moment.locale("th");

Vue.use(VueAxios, axios, Swal);

export default {
  name: "home",
  components: {
    Popup,
    //upDate
  },

  data() {
    return {
      products: null,
      dialog: false,
    };
  },
  methods: {
    formatDate(value) {
      return moment(value).format("ll");
    },

    getData() {
      axios.get("https://7a5c-2403-6200-88a2-46ad-650e-36d4-3826-4972.ngrok.io/api/product").then((result) => {
        console.warn(result);
        this.products = result.data.data;
      });
    },

    deleteProduct(idProduct) {
      //axios.delete('http://localhost:3000/api/product/'+idProduct).then(()=>{
      Swal.fire({
        title: "ลบรายการสินค้า",
        text: "คุณต้องการลบสินค้านี้หรือไม่ ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "ยกเลิก",
        confirmButtonText: "ยืนยัน",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("ลบ!", "ลบสินค้าเรียบร้อยแล้ว", "success")
            .then(() => {
              axios.delete("https://7a5c-2403-6200-88a2-46ad-650e-36d4-3826-4972.ngrok.io/api/product/" + idProduct);
              this.getData();
            })
            .then(this.getData());
        }
        this.getData();
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
.product {
  margin: 2% 5% 5% 5%;
}
.main {
  margin: 2% 2%;
  font-family: "Prompt", sans-serif;
}
.button {
  margin: 5px;
}
</style>