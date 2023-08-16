<template>
  <div>
    <div class="head">仙桃数据谷</div>
    <div class="station">
        <div class="item" v-for="(item, index) in stationList" :key="item.routeSideName">
          <div class="item-car">
            <img
                v-if="currentIndex === index"
                :src="getCarIcon()"
                alt=""
            />
          </div>
          <div class="item-top">
            <img
              class="item-img"
              v-if="[0, currentIndex, stationList.length - 1].includes(index)"
              :src="getSrc(index)"
            />
            <div class="item-point" v-else></div>
          </div>
          <span class="item-title">{{ item.routeSideName }}</span>
        </div>
        <div class="no-data" v-if="!stationList.length">暂无站点数据</div>
    </div>
    <div class="form">
      <van-form @submit="onSubmit" :colon="true" :show-error="false">
        <van-field
          v-model="form.ridingName"
          :border="true"
          label="姓名"
          maxlength="10"
          placeholder="请输入乘车人姓名"
          :rules="[{ required: true, message: '请输入乘车人姓名' }]"
        />
        <van-field
          v-model="form.ridingPhone"
          label="手机号"
          name="pattern"
          placeholder="请输入手机号"
          :rules="[{  required: true, message: '请输入手机号' },{pattern,message:'请输入正确的手机号'}]"
        />
        <van-field name="stepper" label="乘车人数">
          <template #input>
            <van-stepper v-model="form.ridingNum" />
          </template>
        </van-field>
        <van-field
          readonly
          clickable
          name="picker"
          :value="form.startStation"
          label="上车点"
          placeholder="请选择上车点"
          :rules="[{ required: true, message: '请选择上车点' }]"
          @click="showPickerUp = true"
        />
        <van-field
          readonly
          clickable
          name="picker"
          :value="form.endStation"
          label="下车点"
          placeholder="请选择下车点"
          :rules="[{ required: true, message: '请选择下车点' }]"
          @click="showPickerDown = true"
        />
        <van-popup v-model="showPickerUp" position="bottom">
          <van-picker
            show-toolbar
            :columns="stationPickerList"
            @confirm="onConfirmUp"
            @cancel="showPickerUp = false"
          />
        </van-popup>
        <van-popup v-model="showPickerDown" position="bottom">
          <van-picker
            show-toolbar
            :columns="stationPickerList"
            @confirm="onConfirmDown"
            @cancel="showPickerDown = false"
          />
        </van-popup>
        <div class="station-btn">
          <van-button round block type="primary" native-type="submit" :disabled="!hasCar"
            >亮码乘车</van-button
          >
        </div>
      </van-form>
    </div>
    <van-dialog
      v-model="showDialog"
      title="乘车二维码"
      :cancelButtonColor="'#0dc79a'"
      @close="closeDialog"
      :closeOnClickOverlay="true"
      :showConfirmButton="false"
      :showCancelButton="true"
      cancelButtonText="关闭"
    >
      <div class="dialog-content" id="canvasQrcode"></div>
    </van-dialog>
  </div>
</template>

<script>
import {saveRiding, queryCar, queryStationList} from "@/api/station.js";
import QRCode from "qrcodejs2";
import nextIcon from "@/assets/img/next.png";
import endIcon from "@/assets/img/end.png";
import startIcon from "@/assets/img/start.png";
import carIcon from "@/assets/img/car.png";
import carGrayIcon from "@/assets/img/car_gray.png";

export default {
  data() {
    return {
      form: {
        ridingName: "",
        ridingPhone: "",
        ridingNum: 1,
        startStation: "",
        endStation: "",
        carId:1,
        lineName:'test'
      },
      pattern: /^1[3-9]\d{9}$/,
      showPickerUp: false,
      showPickerDown: false,
      stationList: [],
      stationPickerList: [],
      currentIndex: 0,
      showDialog: false,
      timer: null,
      hasCar: false
    };
  },
  async created() {
    this.stationList = (await queryStationList()).data.routeSiteInfo
    this.stationPickerList = this.stationList.map(item=>item.routeSideName)
    await this.getCarPosition()
    this.timer = setInterval(this.getCarPosition, 20 * 1000)
  },
  methods: {
    async getCarPosition() {
      const carData = (await queryCar()).data
      if(carData.length){
        const carText = carData[0].cstaName
        this.form.carId = carData[0].carId
        this.form.lineName = carData[0].lineName
        this.currentIndex = this.stationPickerList.indexOf(carText)
        this.hasCar = true
      }else{
        this.hasCar = false
      }
    },
    getSrc(index) {
      if (index === this.currentIndex) return nextIcon;
      if (index === 0) return startIcon;
      else if (index === this.stationList.length - 1) return endIcon;
    },
    getCarIcon(){
      if(this.hasCar)
        return carIcon
      else
        return carGrayIcon
    },
    onConfirmUp(value) {
      this.form.startStation = value;
      this.showPickerUp = false;
    },
    onConfirmDown(value) {
      this.form.endStation = value;
      this.showPickerDown = false;
    },
    closeDialog() {
      document.getElementById("canvasQrcode").innerHTML = "";
      this.showDialog = false;
    },
    async onSubmit() {
      const { data } = await saveRiding(this.form);
      this.showDialog = true;
      this.$nextTick(() => {
        let qrcode = new QRCode(document.getElementById("canvasQrcode"), {
          width: document.documentElement.clientWidth * (300 / 375), //设置宽高
          height: document.documentElement.clientWidth * (300 / 375),
        });
        qrcode.makeCode(data.ridingCode);
      });
    },
    beforeDestroy() {
      clearInterval(this.timer);
      this.timer = null;
    },
  },
};
</script>

<style scoped lang="less">
.head {
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 700;
  background-color: #f0f0f0;
  margin-bottom: 10px;
}
.station {
  width: 356px;
  height: 173px;
  border: 2px #8f8f94 solid;
  margin: 0 auto;
  position: relative;
  border-radius: 10px;
  padding-top: 5px;
  display: flex;
  overflow: scroll;
  .item {
    min-width: 42px;
    height: 100%;
    display: flex;
    flex-direction: column;
    &-car {
      width: 48px;
      height: 27px;
      margin-bottom: 10px;
      img {
        width: 100%;
        height: 100%;
        transform: translate(-5%,0)
      }
    }
    .item-top {
      width: 25px;
      height: 25px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      .item-img {
        width: 25px;
        height: 25px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center center;
      }
      .item-point {
        width: 12px;
        height: 12px;
        background-color: #0dc79a;
        border-radius: 50% 50%;
      }
    }
    .item-title {
      width: 21px;
      font-size: 15px;
      margin: 4px auto;
      color: #8f8f94;
      writing-mode: vertical-lr;
      align-items: center;
    }
  }
  .no-data{
    font-size: 20px;
    margin: 20px auto;
    color: grey;
  }
}
.form {
  margin-top: 20px;
  padding: 0 10px;
}
.dialog-content {
  width: 300px;
  height: 300px;
  margin: 10px auto;
  img {
    width: 100%;
    height: 100%;
  }
}
.station-btn {
  margin: 20px auto;
  width: 240px;
}
</style>
