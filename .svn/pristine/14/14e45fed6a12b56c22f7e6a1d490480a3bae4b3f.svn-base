<template>
<div class="div1">
      <v-header :header="parentMsg"></v-header>
      <section>
          <div class="showhtml" id="myChart"></div>
      </section>
      <v-foot></v-foot>
</div>
</template>

 <script>
export default {
  name: "saocode",
  data() {
    return {
      parentMsg: this.$route.query.name
    };
  },
  methods: {
    AssetClasses(Data, dispose) {
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
          textStyle: {
            fontWeight: "normal",
            fontSize: 18
          }
        },
        legend: {
                    top:10,
          orient: "vertical",
          x: "left",
          data: dispose
        },
        series: [
          {
            name: "资产分类数量统计",
            type: "pie",
            selectedMode: "single",
            radius: [0, "30%"],
            color: ["#C98525", "#90C6AE", "#739E83", "#C13531"],
            label: {
              normal: {
                position: "inner",
                textStyle: {
                  fontWeight: "normal",
                  fontSize: 16
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: Data.data1
          },
          {
            name: "资产分类原值统计",
            type: "pie",
            radius: ["40%", "55%"],
            label: {
              normal: {
                textStyle: {
                  fontWeight: "normal",
                  fontSize: 16
                }
              }
            },
            data: Data.data2
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    Statement(a, b, c) {
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      let labelOption = {
        normal: {
          formatter: "{c}  {name|{a}}",
          fontSize: 16,
          rich: {
            name: {
              textBorderColor: "#fff"
            }
          }
        }
      };

      let option = {
        color: ["#003366", "#006699"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
            top:15,
          data: ["数量", "原值"]
        },
        toolbox: {
          show: true,
          orient: "vertical",
          left: "right",
          top: "center"
        },
        grid: { containLabel: true },
        xAxis: [
          {
            type: "category",
            data: a
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "数量",
            type: "bar",
            barGap: 0,
            label: labelOption,
            data: b
          },
          {
            name: "原值",
            type: "bar",
            label: labelOption,
            data: c
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    Statistical(d1, d2, d3) {
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      let option = {
        title: {
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
            top:20,
          data: ["原值", "数量"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: d1
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "原值",
            type: "line",
            data: d3
          },
          {
            name: "数量",
            type: "line",
            data: d2
          }
        ]
      };
      myChart.setOption(option);
    }
  },
  mounted() {
    if (this.parentMsg == "资产分类汇总表") {
      let Data = [],
        dispose = [];
      this.$http
        .get("/API/reportservice/GetAssetCategoryChar",{params:{"menuId":this.$route.query.id}},{ emulateJSON: true })
        .then(res => {
          Data = JSON.parse(res.data);
          if (Data != "") {
            for (let i = 0, len = Data.data3.length; i < len; i++) {
              dispose.push(Data.data3[i].name);
            }
          }
          this.AssetClasses(Data, dispose);
        });
    } else if (this.parentMsg == "资产状态汇总表") {
      let data1 = [],
        data2 = [],
        data3 = [];
      this.$http
        .get("/API/reportservice/GetAssetStatusChar", { emulateJSON: true })
        .then(res => {
          let ReturnData = JSON.parse(res.data);
          for (let i = 0, len = ReturnData.data.length; i < len; i++) {
            data1.push(ReturnData.data[i].BAS_A1_40);
            data2.push(ReturnData.data[i].COUNTS);
            data3.push(ReturnData.data[i].WORTH);
          }
          console.log(data1,data2,data3)
          this.Statement(data1, data2, data3);
        });
    } else if (this.parentMsg == "资产统计走势图") {
      let data1 = [],
        data2 = [],
        data3 = [];
      this.$http
        .get("/API/reportservice/GetAssetChar",{params:{"menuId":this.$route.query.id}}, { emulateJSON: true })
        .then(res => {
          let ReturnData = JSON.parse(res.data);
          for (let i = 0, len = ReturnData.data.length; i < len; i++) {
            data1.push(ReturnData.data[i].StaticTime);
            data2.push(ReturnData.data[i].Quantity);
            data3.push(ReturnData.data[i].AssetOriWorth);
          }
          this.Statistical(data1, data2, data3);
        });
    }
  }
};
</script>
<style>
.showhtml {
  width: 100%;
  height: 550px;
}
</style>
