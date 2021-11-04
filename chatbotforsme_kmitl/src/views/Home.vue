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
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Count
          </th>
          <th class="">
            Expire
          </th>
          <th class="">
            Cost
          </th>
          <th class="">
            Detail
          </th>
          <th class="text-center">
            Picture
          </th>
          <th class="text-center">
            Action
          </th>
          <th>
            
            <v-dialog
      v-model="dialog"
      width="500"
    >

      <template v-slot:activator="{ on, attrs }">
        <v-btn
          small absolute buttom right fab
          color="red lighten-2"
          dark
          v-bind="attrs"
          v-on="on"
          
        >
        <v-icon>mdi-plus</v-icon>
         
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Add new items
        </v-card-title>

        <v-card-text>
          <v-text-field
                  label="ชื่อสินค้า"
                  required
                ></v-text-field>
          <v-text-field
                  label="จำนวน"
                  required
                ></v-text-field>
          <v-text-field
                  label="วันหมดอายุ"
                  required
                ></v-text-field>
          <v-text-field
                  label="ราคา"
                  required
                ></v-text-field>
          <v-text-field
                  label="รายละเอียด"
                  required
                ></v-text-field>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
          </th>
          
        </tr>
        <!--<v-btn color="red" dark small absolute buttom right fab>
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>-->
      </thead>
      <tbody>
        <tr
         v-for="item in products" v-bind:key="item.idProduct"
        >
          <td>{{ item.Product_Name }}</td>
          <td>{{ item.Product_Count }}</td>
          <td>{{item.Product_Expire}}</td>
          <td>{{item.Product_Cost}}</td>
          <td>{{item.Product_Detail}}</td>
          <td> <v-img
  contain
  
  max-height="150"
  max-width="120"
  src="https://th-test-11.slatic.net/p/a85fb067cd4f1b4b2e28bb1bb15597cd.jpg"
></v-img></td>

          <td>
            <v-btn class="button"
                color="yellow"
                elevation="2"
              >แก้ไข</v-btn>
          
            <v-btn class="button"
                color="red"
                elevation="2"
                v-on:click="deleteProduct(item.idProduct)"
              >ลบ</v-btn></td>
          
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
  name: "home",
  data() {
    
    return {
      products:null,
      dialog: false,
      }
  },
  methods: {

    getData()
    {
      axios.get('http://localhost:3000/api/product').then((result)=>{
        console.warn(result)
        this.products=result.data.data
      })
    },

    deleteProduct(idProduct)
    {
      confirm("ต้องการลบ ? ");
      axios.delete('http://localhost:3000/api/product/'+idProduct).then(()=>{

        this.getData()

      })
        
      
    }

  },
  

  mounted() {
    this.getData()
    
    

  },

  components: {


  },
 


};
</script>
<style scoped>
  .product {
    margin: 2% 5% 5% 5%;
  }
  .main {
    margin: 2% 2%;
  }
  .button {
    margin: 5px;
  }
</style>