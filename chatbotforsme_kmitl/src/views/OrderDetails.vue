<template>
    <v-app>
      
        <v-main class="main">
          <div class="no-print" >
            <h1>รายละเอียดคำสั่งซื้อ </h1>  
            <div class="cursor-point">
              <span @click="printWindow()" class="d-flex flex-row-reverse">พิมพ์คำสั่งซื้อ</span>
            </div>   
             
          
          
         <v-card
          class="text-center"
          height="70%"
          elevation="6"
          text-center

         >
         <v-toolbar
      color="grey"
      dark
      dense
      flat
    >
    <v-toolbar-title>
      แจ้งการชำระเงิน
    </v-toolbar-title>

    </v-toolbar>
    
           <div class="" v-for="item in orders" v-bind:key="item.id">
             <div class="status">
               <v-chip
                class="ma-2"
                x-large
                :color="getColor(item.Order_Status)"
                dark
                >
                {{ item.Order_Status }}
                </v-chip>
             </div>
                
                
                <img class="slip" src="../img/testslip.png" alt="" width="220" height="">
                <v-spacer></v-spacer>
                
                  <v-btn color="green" style="margin: 10px;">ยืนยันการชำระเงิน</v-btn>
                  
                  <v-btn color="red">ปฎิเสธการชำระเงิน</v-btn>
                  
          </div>
          
         </v-card>
        </div>
         
              <v-spacer></v-spacer>

         <div v-for="item in orders" v-bind:key="item.id">
           <br>
          <v-card>
          <v-toolbar
            color="white"
            >
            <v-toolbar-title class="header-text">คำสั่งซื้อ #{{item.id}}</v-toolbar-title>
          </v-toolbar>
          
          <div class="flex-container">
            
            
            <div class="">
              
              
              <!--จำนวนสินค้าในออเดอร์ : {{item.Order_CountProduct}}<br>-->
              <table border="0" style="width:100%; ">
                <h3>สรุปรายการสินค้า</h3>
              <tr style="border-bottom: 1px solid black">
                 <td> รายการสินค้า</td>
                 <td> จำนวน</td>
                 <td> ราคา</td>
              </tr>
              <tr style="">
                 <td> เห็ดหลินจือ </td>
                 <td> 2 </td>
                 <td> 500.- </td>
              </tr>
              <tr style="border-bottom: 1px solid black">
                 <td> ถังเช่าสีทอง </td>
                 <td> 2 </td>
                 <td> 500.- </td>
              </tr>
              <tr style="font-size: 22px;">
                 <td> ราคาสุทธิ </td>
                 <td></td>
                 <td> {{item.Order_TotalCost}}.-</td>
              </tr>
              </table><br>
                   
               <template>  
              
              </template>  
            </div>
            
            <div class="order2">
                  ผู้สั่ง : {{item.Order_CusName}} <br> เบอร์โทร : {{item.Order_CusTel}} <br>
                  {{item.Order_CusAdd}}<br><br>
                  <v-form>
                ประเภทการขนส่ง : {{item.Order_DeliveryType}} <br>
                <div>
                 Tracking Number : {{ item.Order_Tracking }}
                </div>
                <v-text-field hint="สำหรับกรอกเลขพัสดุ" label="Tracking Number : " v-model="orders.Order_Tracking" ></v-text-field>
                <br>
                <v-row align="center" justify="space-around">
                  <v-btn event v-on:click="submit()" center class="px-12" color="success">บันทึกเลขพัสดุ</v-btn>
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
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Swal from 'sweetalert2'

Vue.use(VueAxios,axios,Swal)

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
                Order_Date: '',
                Order_DeliveryType: '',
                Order_Status: '',
                Order_CusName: '',
                Order_CusTel: '',
                Order_CusAdd: '',
                Order_Tracking: '',

            }
        }
  },
     async mounted() {

      const result = await axios.get('http://localhost:3000/api/orderdetails/'+this.$route.params.id)   
      
      this.orders=result.data.data   
      
    },
    methods: {

     getColor (Order_Status) {
        if (Order_Status == "ชำระเงินแล้ว") return 'green'
        else if (Order_Status == "รอการตรวจสอบ") return 'orange'
        else return 'red'
      },
      
      printWindow() {
        window.print();
      },

      submit() {
        
          let formData = new FormData();
          formData.append('Order_Tracking',this.orders.Order_Tracking)

        axios.post('http://localhost:3000/api/update_trackingnumber/'+this.$route.params.id,formData,{
        
                    headers: { 
                        'Content-Type': 'multipart/form-data'
                    }
          }).then(()=>{

            //swal
                

          }).then(()=> {
                window.location.reload()
            })


        }
        
    }

}


</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Prompt:wght@200;400;500&display=swap');

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
      font-family: 'Prompt', sans-serif;
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