<template>
  <div>
    <BaseDialog
      :width="'75%'"
      :title="'新增座位'"
      ref="dialog"
      @confirm="confirmAdd"
      @cancle="cancleAdd"
    >
      <el-form
        ref="mapform"
        :model="mapform"
        label-width="20px"
        :rules="rules"
        class="map_form"
      >
        <el-form-item label="名称" class="map_form_item_seat" prop="confName">
          <el-input v-model="mapform.confName" placeholder="座位名称"></el-input>
        </el-form-item>
        <el-form-item label="行" class="map_form_item_seat1" prop="rows">
          <el-input v-model.number="mapform.rows" placeholder="每一行多少个"></el-input>
        </el-form-item>
        <el-form-item label="列" class="map_form_item_seat1" prop="cols">
          <el-input v-model.number="mapform.cols" placeholder="每一列多少个"></el-input>
        </el-form-item>
      </el-form>

      <div style="margin-top: 20px;">
        <maps :seats="seat" :row="row"></maps>
      </div>
    </BaseDialog>
  </div>
</template>

<script>
import maps from "@/views/journey/map";
import _ from 'lodash'
export default {
  components: {
    maps
  },
  data() {
    return {
      seat: [],
      row: 0,
      options: [],
      value: "",
      flag: false,
      mapform: {
        confName: "",
        rows: "",
        cols: ""
      },
      rules: {
        confName: [
          { required: true, message: "请输入座位名称", trigger: "blur" }
        ],
        rows: [
          { required: true, message: "请输入行", trigger: "blur" },
          { pattern: /^(?:[0-2]?[0-9]?|30)$/, message: '最多只能输入30行',trigger: 'blur' }
        ],
        cols: [
          { required: true, message: "请输入列", trigger: "blur" },
          { pattern: /^(?:[0-2]?[0-9]?|30)$/, message: '最多只能输入30行',trigger: 'blur' }
        ]
      },
    };
  },
  watch: {
      mapform: {
          deep: true,
          handler: function (val, oldval) {
              if ((0 <= val.rows && val.rows <= 30) && (0 <= val.cols && val.cols <= 30)) {
                let test = []
                for(let key in val) {
                    test.push(val[key] ? true : false)
                }
                this.flag = test.every(x => x === true)
                if (this.flag) this.onSubmit()
              }
          }
      }
  },
  methods: {
    open() {
      this.$refs.dialog.open();
    },
    close() {
      this.$refs.dialog.close();
    },
    //确认
    confirmAdd() {
      if (this.flag) {
        let data = {
            seatConf: {
              ...this.mapform,
              createBy: this.$store.state.met.id
            },
            seatDetail: _.flattenDeep(this.seat)
        };
        this.seatHttp(this.$seatQuery, "post", data).then(res => {
            this.$emit("addSucess")
        })
      } else {
        this.$message("数据不正确");
      }
    },
    //取消
    cancleAdd() {

    },

    // 生成座位方法
    onSubmit() {
      this.seat = []; // 生成前先清空
      this.row = this.mapform.rows;
      for (let i = 0; i < this.mapform.cols; i++) {
        this.seat.push([]);
      }
      this.seat.map((item, index) => {
        for (let i = 0; i < this.mapform.rows; i++) {
          item.push({
            seatRow: Number(i + 1),
            seatCol: Number(index + 1),
            seatStatus: 0
          });
        }
      });
    },

    // 座位请求方法
    async seatHttp(url, method, data) {
      let test;
      await this.$axios({
        url: url,
        method: method,
        data: data
      }).then(({ data }) => {
        if (data.flag) {
          this.$message(data.message);
          test = data.data;
        }
      });
      return Promise.resolve(test);
    },

  }
}
</script>

<style lang="scss">
.map_form {
    display: flex !important;
  .map_form_item_seat {
    flex: 2;
    .el-form-item__label {
      width: 50px !important;
    }
    .el-input {
      width: 88%;
    }
  }
  .map_form_item_seat1 {
    flex: 1;
    .el-input {
      width: 88%;
    }
    .el-form-item__label {
      width: 38px !important;
    }
  }
}
</style>
