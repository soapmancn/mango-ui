<template>
  <div class="common-layout">
    <el-container>
      <!-- 头部 -->
      <el-header height="80px">
        <el-row :gutter="20">
          <el-col :span="4"><img class="logo" src="../assets/logo.png" alt=""></el-col>
          <el-col :span="16"><h2>后台系统</h2></el-col>
          <el-col :span="4" class="btn-username"><el-button type="text" @click="logout">Lao Wang</el-button></el-col>
        </el-row>
      </el-header>

      <el-container>
        <!-- 左侧菜单 -->
        <el-aside width="200px">
          <el-menu router active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo" default-active="1" text-color="#fff">
            <el-menu-item v-for="i in list" :key="i.path" :index="i.path">
              <el-icon></el-icon>
              <span>{{i.meta.title}}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>

        <!-- 右侧主体 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import {router} from "../router";
const list = router.getRoutes().filter(v=>v.meta.isShow);

function logout() {
  localStorage.removeItem("token")
  router.push('/login')
}

</script>

<style lang="scss" scoped>
  .logo {
    height: 80px;
  }
  h2 {
    text-align: center;
    color: #eeeeee;
    line-height: 80px;
  }
  .el-header {
    background-color: #545c64;
  }
  .btn-username {
    text-align: right;
    line-height: 80px;
    .el-button--text{
      color: #eeeeee;
    }
  }
  .el-aside {
    .el-menu {
      height: calc(100vh - 80px);
    }
  }

</style>