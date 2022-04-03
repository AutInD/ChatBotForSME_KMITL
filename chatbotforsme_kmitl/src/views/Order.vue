
<template>
    <v-app>
        
        <v-main class="main">
            <h1>คำสั่งซื้อสินค้า</h1>
            <v-card class="order">
            <v-card>
            <v-data-table
              dense
              
    :headers="headers"
    :items="orders"
    item-key="id"
    class="elevation-1"

            >
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            รหัสคำสั่งซื้อ
          </th>
          
          <th class="">
            ยอด
          </th>
          <th class="">
            เวลาที่สั่งซื้อ
          </th>
          <th class="">
            สถานะการชำระเงิน
          </th>
          <th class="">
            ชื่อลูกค้า
          </th>
          <th class="">
            เบอร์โทร
          </th>
          <th class="">
            Action
          </th>
        
        </tr>

        </thead>
        <tbody>
            <tr 
                v-for="item in orders" v-bind:key="item.id"
            >
                <td>{{ item.id }}</td>
                <td>฿ {{ item.Order_TotalCost }}</td>
                <td>{{ item.Order_Date }}</td>
                
                <td v-if="item.Order_Status === 'ชำระเงินแล้ว' " class='green--text'> {{ item.Order_Status }}</td>
                <td v-if="item.Order_Status === 'รอการตรวจสอบ' " class='blue--text'> {{ item.Order_Status }}</td>
                
                <td v-if="item.Order_Status === 'ยังไม่ได้ชำระเงิน'" class="red--text"> {{ item.Order_Status }} </td>
                
                <td>{{ item.Order_CusName }}</td>
                <td>{{ item.Order_CusTel }}</td>
               
            
                
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

                <template v-slot:item.actions="{ item }">
                  <v-btn class="button"
                color="blue"
                elevation="2"
                :to="'/orderdetails/'+item.id"
                >รายละเอียด</v-btn>
                </template>

                <template v-slot:item.Order_Status="{ item }">
                  <v-chip
                    :color="getColor(item.Order_Status)"
                    dark
                    >
                    {{ item.Order_Status }}
                  </v-chip>
                </template>
            
            </v-data-table>
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

        
        headers: [
        {
          text: 'รหัสคำสั่งซื้อ',
          align: 'start',
          sortable: false,
          value: 'id',
          
        },
        { text: 'ยอด', value: 'Order_TotalCost', align: 'end'},
        { text: 'เวลาที่สั่งซื้อ', value: 'Order_Date', align: 'center'},
        { text: 'สถานะการชำระเงิน', value: 'Order_Status' },
        { text: 'ชื่อลูกค้า', value: 'Order_CusName', sortable: false},
        { text: 'เบอร์โทร', value: 'Order_CusTel' ,sortable: false},
        { text: '', value: 'actions', sortable: false},
      ],
        
            orders: [       
            {
                id: '',
                Order_CountProduct: '',
                Order_TotalCost: '',
                Order_DeliveryType: '',
                Order_Status: '',
                Order_CusName: '',
                Order_CusTel: '',
                Order_Add: '',
            }
          ]
        }
  },
    methods: {

     getColor (Order_Status) {
        if (Order_Status == "ชำระเงินแล้ว") return 'green'
        else if (Order_Status == "รอการตรวจสอบ") return 'orange'
        else return 'red'
      },

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
@import url('https://fonts.googleapis.com/css2?family=Prompt:wght@200;400;500&display=swap');
    .order {
      margin: 2% 5% 5% 5%;
  }
    .main {
      font-family: 'Prompt', sans-serif;
      margin: 2% 2%;
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
      background-color: #2196F3;
      padding: 10px;
}

</style>