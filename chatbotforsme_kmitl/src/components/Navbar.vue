<template>
    <v-app>
    <div >
        <v-app-bar color="gray" dark app class="line">
            <div class="">
                <v-toolbar-title class="text-uppercase red--text">
                    <span class="font-weight-light">Chatbot For</span>
                    <span> SME</span>
                </v-toolbar-title>
            </div>
            <v-spacer></v-spacer>
                
         <v-btn
            href=""
            target=""
            text
         >
            <span color="black" class="mr-2">Log out</span>
            <v-icon>mdi-account-arrow-right-outline</v-icon>
            </v-btn>
        </v-app-bar>
        </div>
        <div class="">
        <v-navigation-drawer v-model="darwer" dark app color="#FF5252">
            <v-list flat>
                <v-list-item class="mb-3">
                    <span class="font-weight-light">Chatbot For</span>
                    <span> SME</span>
                </v-list-item>

                <v-list-item to="/">
                    <v-list-item-action>
                        <div>
                        <v-icon>mdi-home</v-icon>
                        <span class="spanformenu">หน้าแรก</span> 
                        </div>
                    </v-list-item-action>
                </v-list-item>

                <v-list-item router to="/sales">
                    <v-list-item-action>
                        <div>
                        <v-icon>mdi-finance</v-icon>
                        <span class="spanformenu">สรุปยอดขาย</span> 
                        </div><!--mdi-finance-->
                    </v-list-item-action>
                </v-list-item>

                <v-list-item router to="/order">
                    <v-list-item-action>
                       <div>
                        <v-icon>mdi-note-edit</v-icon>
                        <span class="spanformenu">ออเดอร์</span> 
                        </div><!--mdi-note-edit-->
                    </v-list-item-action>
                </v-list-item>

                <v-list-item router to="/account">
                    <v-list-item-action>
                        <div>
                        <v-icon>mdi-card-account-details-outline</v-icon>
                        <span class="spanformenu">จัดการบัญชี</span> 
                        </div><!--mdi-card-account-details-outline-->
                    </v-list-item-action>
                </v-list-item>
                 

                <v-list-item router to="/jamemo">
                    <v-list-item-action>
                        <div>
                        <v-icon>mdi-robot</v-icon>
                        <span class="spanformenu">JameMo</span> 
                        </div><!--mdi-card-account-details-outline--><!--mdi-robot-->
                    </v-list-item-action>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        </div>
        <router-view></router-view>
        
    </v-app>

</template>

<script>

export default {
    data: () => ({
        darwer: true
    })
    
}
</script>

<style>
    .spanformenu {
        margin: 20px;
    }
</style>