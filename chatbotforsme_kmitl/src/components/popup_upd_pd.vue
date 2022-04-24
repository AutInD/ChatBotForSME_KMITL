<template>
    <v-app>
        <v-main class="main">
        <v-card class="product">
            <h1>แก้ไขสินค้า</h1>
            <v-card-title>

            
            </v-card-title>  
            <div v-for="item in items" v-bind:key="item.idProduct">
                <v-form  class="px-3">
                    <v-text-field disabled v-model="item.idProduc" label="รหัสสินค้า" outlined></v-text-field>
                    <v-text-field v-model="item.Product_Name" label="ชื่อสินค้า" outlined></v-text-field>
                    <v-text-field v-model="item.Product_Count" label="จำนวน" outlined></v-text-field>
                <v-menu
                    
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                >
                
                <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        v-model="item.Product_Expire"
                        label="วันที่ผลิต"
                        prepend-icon=""
                        outlined
                        readonly
                        v-bind="attrs"
                        v-on="on"
                    ></v-text-field>
                </template>
                    <v-date-picker
                        v-model="item.Product_Expire"
                        @input="menu2 = false"
                    > </v-date-picker>
                </v-menu> 
                <template>   
                    <v-text-field v-model="item.Product_Cost" label="ราคา" outlined></v-text-field>
                    <v-textarea v-model="item.Product_Detail" label="รายละเอียด" outlined></v-textarea>
                    
                    <!--<v-file-input v-model="form.Product_Picture"  label="รูปสินค้า" dense outlined></v-file-input>-->
                    <v-row align="center" justify="space-around">                
                        <v-btn event v-on:click="submit()" center class="px-12" color="success">บันทึกข้อมูล</v-btn>
                    </v-row>
                    <v-row>

                    </v-row>
                </template>    
                </v-form>
                
                </div>
                </v-card>
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
    name: "",
    components: {

    },
    

    data() {
        
        return {

            item: {
                idProduct: '',
                Product_Name: '',
                Product_Count: '',
                Product_Expire: '',
                Product_Cost: '',
                Product_Detail: '',
                Product_Picture: '',
            }
        }
    },
    async mounted() {

      const result = await axios.get('https://e621-2403-6200-88a0-3137-187f-3b13-b58c-8fb6.ngrok.io/api/product/'+this.$route.params.id)   
      this.items=result.data.data   
      
    },
   

    methods: {

        submit(){
            axios.post('https://e621-2403-6200-88a0-3137-187f-3b13-b58c-8fb6.ngrok.io/api/product:id',this.form).then(() => {

                Swal.fire({
                
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 4000
                
                })
            }).then()
            


                    
            .catch(error => console.log(error))
        },
    
    mounted() {
      
    },

    },
   
    
    
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Prompt:wght@200;400;500&display=swap');
  .product {
    margin: 2% 5% 5% 5%;
  }
  .main {
    margin: 2% 2%;
    font-family: 'Prompt', sans-serif;
  }
  .button {
    margin: 5px;
  }
</style>