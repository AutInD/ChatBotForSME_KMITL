
<template>
    <v-app>
        
        <v-main class="main">
            <h1>คำสั่งซื้อสินค้า</h1>
            <v-card class="order">
            <v-card>
            <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Order ID.
          </th>
          <th class="text-left">
            จำนวนสินค้าที่สั่งซื้อ
          </th>
          <th class="">
            ราคารวม
          </th>
          <th class="">
            เวลาที่สั่งซื้อ
          </th>
          <th class="">
            สถานะการชำระเงิน
          </th>
          <th class="text-center">
            ชื่อลูกค้า
          </th>
          <th class="text-center">
            เบอร์โทร
          </th>
          <th>
            ที่อยู่              
          </th>
          <th>
            การจัดส่ง              
          </th>
          <th>
            Tracking              
          </th>
          <th>
                       
          </th>
        </tr>

        </thead>
        <tbody>
            <tr 
                v-for="item in orders" v-bind:key="item.id"
            >
                <td>{{ item.id }}</td>
                <td>{{ item.Order_CountProduct }}</td>
                <td>{{ item.Order_TotalCost }}</td>
                <td>{{ item.Order_Date }}</td>
                <td class="red--text">{{ item.Order_Status }}</td>
                <td>{{ item.Order_CusName }}</td>
                <td>{{ item.Order_CusTel }}</td>
                <td>{{ item.Order_CusAdd }}</td>
                <td>{{ item.Order_DeliveryType }}</td>
                <td>{{ item.Order_Tracking }}</td>
                <!--<td>{{ item.Payment_idPayment }}</td>-->
                <!--<td>{{ item.Payment_idProduct }}</td>-->
                <td> 
            
                <v-btn class="button"
                color="blue"
                elevation="2"
                :to="'/orderdetails/'+item.id"
                >รายละเอียด</v-btn>
                </td>
                
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
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios,axios)

export default {
    name: "order",
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
    methods: {

    getData()
    {
        axios.get('http://localhost:3000/api/order').then((result)=>{
          console.warn(result)
          this.orders=result.data.data
        })
    }
   
    },

    mounted() {
      this.getData()
    },
}

</script>

<style scoped>
    .order {
    margin: 2% 5% 5% 5%;
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