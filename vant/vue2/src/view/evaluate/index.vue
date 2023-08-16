<template>
  <div>
    <div class="head">仙桃智驾体验评价</div>
    <div style="padding: 0 10px">
      <van-divider content-position="left" :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0' ,margin:0}">
        <p class="title">智驾体验内容</p>
      </van-divider>
      <img
          style="width: 100%;height: 200px"
          src="@/assets/img/introduce.png"
          alt=""
      />
      <div class="introduce">
        <p class="subTitle">仙桃国际大数据谷自动驾驶正式运营，包含：</p>
        <p class="subTitle">1，自动驾驶小巴</p>
        <p class="subTitle">2，自动驾驶环卫车</p>
        <p class="subTitle">3，自动驾驶末端配送车</p>
      </div>
      <van-divider content-position="left" :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0',margin:'10px 0 0' }">
        <p class="title" style="margin: 0">用户体验评价</p>
      </van-divider>
      <div class="form">
        <van-form @submit="onSubmit" :colon="true" :show-error="false">
          <van-field
              v-model="form.userName"
              :border="true"
              label="用户昵称"
              maxlength="10"
              placeholder="请输入用户昵称"
              :rules="[{ required: true, message: '请输入乘车人姓名' }]"
          />
          <van-field name="stepper" label="体验评分">
            <template #input>
            <van-rate
                v-model="form.score"
                :size="25"
                color="#ffd21e"
                void-icon="star"
                void-color="#eee"
            />
            </template>
          </van-field>
          <van-field
              v-model="form.content"
              label="其他建议"
              placeholder="更多建议（200字以内）"
              maxlength="200"
              rows="3"
              autosize
              type="textarea"
              show-word-limit
              :rules="[{  required: true, message: '请输入建议' }]"
          />
          <div class="evaluate-btn">
            <van-button round block type="info" native-type="submit"
            >提交</van-button
            >
          </div>
        </van-form>
      </div>
    </div>
    <van-dialog
        v-model="showDialog"
        title="提交成功"
        :cancelButtonColor="'#0dc79a'"
        :closeOnClickOverlay="true"
        :showConfirmButton="false"
        :showCancelButton="true"
        cancelButtonText="返回"
        @close="closeDialog"
    >
      <p class="subTitle" style="padding: 30px">感谢你对仙桃智驾的意见，我们会持续改进和优化</p>
    </van-dialog>
  </div>
</template>

<script>

import {saveEvaluate} from "@/api/evaluate";

export default {
  data() {
    return {
      form: {
        userName: "",
        score: 0,
        content: "",
      },
      showDialog: false
    };
  },
  async created() {

  },
  methods: {
    async onSubmit() {
      const {code} = (await saveEvaluate(this.form))
      if (+code === 200){
        this.showDialog = true
      }
    },
    closeDialog() {
      this.form = {
        userName: "",
        score: 0,
        content: "",
      }
    }
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
.title {
  font-size: 14px;
  font-weight: 600;
  margin: 5px 0;
}
.subTitle {
  font-size: 14px;
  margin: 5px 0;
  color: #8f8f94;
}
.form {
  margin-top: 5px;
  padding: 0 10px;
}
.evaluate-btn {
  margin: 20px auto;
  width: 240px;
}
</style>
