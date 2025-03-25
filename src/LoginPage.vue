<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
      <div class="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
        <h2 class="text-2xl font-bold text-white text-center">广告管理系统</h2>
        <p class="text-blue-100 text-center mt-2">新闻类社交媒体平台</p>
      </div>
      
      <div class="p-6">
        <form @submit.prevent="handleLogin">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
              用户名
            </label>
            <input 
              v-model="username" 
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              id="username" 
              type="text" 
              placeholder="请输入用户名"
              required
            >
          </div>
          
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
              密码
            </label>
            <input 
              v-model="password" 
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              id="password" 
              type="password" 
              placeholder="请输入密码"
              required
            >
          </div>
          
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2">
              用户类型
            </label>
            <div class="flex space-x-4">
              <label class="inline-flex items-center">
                <input type="radio" v-model="userType" value="advertiser" class="form-radio text-blue-600">
                <span class="ml-2">广告主</span>
              </label>
              <label class="inline-flex items-center">
                <input type="radio" v-model="userType" value="admin" class="form-radio text-blue-600">
                <span class="ml-2">管理员</span>
              </label>
            </div>
          </div>
          
          <div class="flex items-center justify-between">
            <button 
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" 
              type="submit"
              :disabled="isLoading"
            >
              {{ isLoading ? '登录中...' : '登录' }}
            </button>
          </div>
          
          <div v-if="errorMessage" class="mt-4 text-center text-red-500">
            {{ errorMessage }}
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const username = ref('');
const password = ref('');
const userType = ref('advertiser');
const isLoading = ref(false);
const errorMessage = ref('');

const handleLogin = async () => {
  isLoading.value = true;
  errorMessage.value = '';
  
  try {
    // 模拟登录API调用
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 根据用户类型跳转到不同的仪表盘
    if (userType.value === 'advertiser') {
      router.push('/advertiser-dashboard');
    } else {
      router.push('/admin-dashboard');
    }
  } catch (error) {
    errorMessage.value = '登录失败，请检查用户名和密码';
  } finally {
    isLoading.value = false;
  }
};
</script>

