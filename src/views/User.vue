<template>
  <div>
    <div class ="select-box">
      <el-form :inline="true" :model="formSelect" class="demo-form-inline">
        <el-form-item label="姓名">
          <el-input v-model="formSelect.username" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="formSelect.nickname" placeholder="请输入昵称" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="name" label="姓名" width="180" />
      <el-table-column prop="nickName" label="昵称" />
      <el-table-column prop="avatar" label="头像" />
      <el-table-column prop="password" label="密码" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="mobile" label="手机" />
    </el-table>
    <el-pagination @current-change="currentChange" layout="prev, pager, next" :total="formSelect.total" />
  </div>
</template>

<script setup lang="ts">
import {queryByPage} from "../http/modules/userApi"
import {reactive, ref} from "vue";

const formSelect = reactive({
  username: '',
  nickname: '',
  total: 0
})

const tableData = ref()

function currentChange(pageNum:number){
  queryByPage({pageNum: pageNum, name: formSelect.username, nickName: formSelect.nickname})
      .then((res:any) => {
        if (res.code == 200){
          tableData.value = res.data.records
          formSelect.total = res.data.total
          console.log(formSelect.total)
        } else {
          alert(res.msg)
        }
      })
      .catch(err => console.log(err))
}

function onSubmit() {
  queryByPage({name: formSelect.username, nickName: formSelect.nickname})
      .then((res:any) => {
        if (res.code == 200){
          tableData.value = res.data.records
          formSelect.total = res.data.total
          console.log(formSelect.total)
        } else {
          alert(res.msg)
        }
      })
      .catch(err => console.log(err))
}
</script>

<style lang="scss" scoped>

</style>