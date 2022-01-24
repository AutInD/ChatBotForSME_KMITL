
<template>
    <v-app>
        
        <v-main class="main">
            <h1>สรุปยอดขาย</h1>
            <v-card class="sales">
                <v-card-title>จำนวนชนิดที่ขายได้</v-card-title>
                <v-card-subtitle>หน่วย : ชิ้น</v-card-subtitle>
                
                <template>
                    <div id="Sales">
                        
                    
                <GChart
                type="ColumnChart"
                :data="chartData"
                :option="chartOptions"/>
                
                    </div>
                </template>
            
            
            </v-card>
        </v-main>
        
    </v-app>
</template>

<script>
export default {

    data: () => ({
        chartData: [
            ["Mount","เห็ดหลินจือ", "กระชายดำผสมงาดำ", "ถังเช่าสีทอง", "กระชายขาวผสมขิง"],
            ["ก.พ.", 200, 120, 20, 262],
            ["มี.ค.", 220, 210, 120, 152],
            ["เม.ษ.", 211, 150, 98, 88],
            ["มิ.ย.", 232, 175, 78, 144],
            ["ก.ค.", 122, 320, 198, 105],
            ["ส.ค.", 152, 200, 123, 75],
        ],
        chartOptions: {
            chart: {
                title: "Performance",
                subtitle: "Sales, Expenses,and Profit: 2020-2022"
            }
        }
    }),
    name: "Sales",
    components: {

    },
};
</script>
<style scoped>
    .sales {
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