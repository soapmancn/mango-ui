<template>
  <div class="page">
    <h2>Home Page</h2>
    <el-button type="primary" @click="testAxios()">测试axios调用</el-button>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";

function testAxios() {
  axios.get('http://localhost:8001/user').then(res => {alert(res.data.msg)})
}
</script>

<style scoped>

</style>