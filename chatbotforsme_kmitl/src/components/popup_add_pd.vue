<template>
    <v-dialog max-width="600px">
        <template v-slot:activator="{ on }">
            <v-btn
                small absolute buttom right fab
                color="red lighten-2"
                dark    
                slot="activator"
                v-on="on" 
                >
                <v-icon>mdi-plus</v-icon>
            </v-btn>
        </template>

        <v-card>
            <v-card-title>
                <h2 class="">สร้างสินค้า</h2>
            </v-card-title>  
            <v-card-text>
                <v-form class="px-3">
                    <v-text-field v-model="form.Product_Name" label="ชื่อสินค้า" outlined></v-text-field>
                    <v-text-field v-model="form.Product_Count" label="จำนวน" outlined></v-text-field>
                <v-menu
                    
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                >
                
                <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        v-model="form.Product_Expire"
                        label="วันที่ผลิต"
                        prepend-icon=""
                        outlined
                        readonly
                        v-bind="attrs"
                        v-on="on"
                    ></v-text-field>
                </template>
                    <v-date-picker
                        v-model="form.Product_Expire"
                        @input="menu2 = false"
                    > </v-date-picker>
                </v-menu> 
                <template>   
                    <v-text-field v-model="form.Product_Cost" label="ราคา" outlined></v-text-field>
                    <v-textarea v-model="form.Product_Detail" label="รายละเอียด" outlined></v-textarea>

                    <v-file-input id="file" ref="file" v-model="Product_Picture" label="รูปสินค้า" dense outlined></v-file-input>    

                    <v-row align="center" justify="space-around">                
                        <v-btn event v-on:click="submit()" center class="px-12" color="success">บันทึกข้อมูล</v-btn>
                    </v-row>
                    
                </template>    
                </v-form>
            </v-card-text>   
        </v-card>
    </v-dialog>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Swal from 'sweetalert2'
Vue.use(VueAxios,axios,Swal)
export default {
    
    data() {
        
        return {
            
            form: {
                
                Product_Name: '',
                Product_Count: '',
                Product_Expire: '',
                Product_Cost: '',
                Product_Detail: '',
                
            },
            Product_Picture: [],
                
                
            
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

        submit: function(){

            console.log(this.Product_Picture);

            let formData = new FormData();
            formData.append('Product_Name',this.form.Product_Name)
            formData.append('Product_Count',this.form.Product_Count)
            formData.append('Product_Expire',this.form.Product_Expire)
            formData.append('Product_Cost',this.form.Product_Cost)
            formData.append('Product_Detail',this.form.Product_Detail)
            formData.append('Product_Picture',this.Product_Picture)
            
            
            axios.post('http://localhost:3000/create_product/',formData,{ 

                    headers: { 
                        'Content-Type': 'multipart/form-data'
                    }

                }).then(() => {

                Swal.fire({
                
                icon: 'success',
                title: 'บันทึกสำเร็จ',
                showConfirmButton: false,
                timer: 1000
                
                })
            }).then(()=> {
                window.location.reload()
            })
             
            .catch(error => console.log(error))
        },
       
     
    


    },
    
}
</script>