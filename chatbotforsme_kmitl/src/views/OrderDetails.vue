<template>
    <v-app>
      
        <v-main class="main">
         <h1>รายละเอียดคำสั่งซื้อ</h1>
         <tr v-for="item in orders" v-bind:key="item.id">
          <v-card class="order">
            
            
            รหัสออเดอร์ : {{item.id}} <br>
            จำนวนสินค้าในออเดอร์ : {{item.Order_CountProduct}} <br>
            ราคารวม : {{item.Order_TotalCost}} <br>
            วันที่รับออเดอร์ : {{item.Order_Date}} <br>
            รูปแบบการขนส่ง : {{item.Order_DeliveryType}} <br>
            <p class="danger">สถานะ : {{item.Order_Status}} </p>
            </v-card>
         </tr>
          
            <tr v-for="item in orders" v-bind:key="item.id">
            <v-card class="order2">
            ผู้สั่ง : {{item.Order_CusName}} , {{item.Order_CusTel}} <br>
                  {{item.Order_CusAdd}}
            </v-card>
            </tr>
          
        </v-main>
     
    </v-app>

</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios,axios)

export default {
    name: "orderdetails",
    components: {

    },
    data() {
    
      return {
            orders: {
                id: '',
                Order_CountProduct: '',
                Order_TotalCost: '',
                Product_DeliveryType: '',
                Product_Status: '',
                Product_CusName: '',
                Product_CusTel: '',
                Product_Add: '',
            }
        }
  },
     async mounted() {
      const result = await axios.get('http://localhost:3000/api/orderdetails/'+this.$route.params.id)   
      
      this.orders=result.data.data   
      
    }
}


</script>

<style scoped>
    .order {
    margin: 2% 5% 5% 5%;
    font-size: 24px;
  } 
    .danger {
      color: rgb(218, 58, 58);
    }
    .order2 {
      margin: 2% 5% 5% 5%;
      
      font-size: 24px;
    }
    .main {
    margin: 2% 2%;
  }
    .button {
    margin: 5px;
  }
    .subtitle {
        margin: 2% 2% 2% 2%;
    }

</style>