<template>
  <div class="flex h-screen bg-gray-100">
    <!-- 侧边栏 -->
    <aside class="w-64 bg-gray-800 text-white">
      <div class="p-4 border-b border-gray-700">
        <h2 class="text-xl font-bold">广告管理系统</h2>
        <p class="text-sm text-gray-400">{{ isAdmin ? '管理员' : '广告主' }}仪表盘</p>
      </div>
      
      <!-- 广告主菜单 -->
      <nav v-if="!isAdmin" class="mt-4">
        <div class="px-4 py-2 text-xs text-gray-400 uppercase">广告管理</div>
        <a 
          v-for="item in advertiserMenu" 
          :key="item.name"
          @click="activeMenu = item.name"
          class="block px-4 py-2 mt-1 text-sm cursor-pointer"
          :class="activeMenu === item.name ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700'"
        >
          <component :is="item.icon" class="inline-block w-5 h-5 mr-2" />
          {{ item.title }}
        </a>
      </nav>
      
      <!-- 管理员菜单 -->
      <nav v-else class="mt-4">
        <div class="px-4 py-2 text-xs text-gray-400 uppercase">系统管理</div>
        <a 
          v-for="item in adminMenu" 
          :key="item.name"
          @click="activeMenu = item.name"
          class="block px-4 py-2 mt-1 text-sm cursor-pointer"
          :class="activeMenu === item.name ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700'"
        >
          <component :is="item.icon" class="inline-block w-5 h-5 mr-2" />
          {{ item.title }}
        </a>
      </nav>
      
      <div class="absolute bottom-0 w-64 border-t border-gray-700">
        <a @click="logout" class="block px-4 py-3 text-sm text-gray-300 hover:bg-gray-700 cursor-pointer">
          <LogOut class="inline-block w-5 h-5 mr-2" />
          退出登录
        </a>
      </div>
    </aside>
    
    <!-- 主内容区域 -->
    <div class="flex-1 overflow-auto">
      <header class="bg-white shadow">
        <div class="px-4 py-3 flex justify-between items-center">
          <h1 class="text-xl font-semibold text-gray-800">
            {{ currentMenuTitle }}
          </h1>
          <div class="flex items-center">
            <span class="mr-2 text-sm text-gray-600">{{ username }}</span>
            <div class="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
              {{ username.charAt(0).toUpperCase() }}
            </div>
          </div>
        </div>
      </header>
      
      <main class="p-6">
        <!-- 广告主内容 -->
        <div v-if="!isAdmin">
          <AdApplication v-if="activeMenu === 'adApplication'" />
          <ApplicationHistory v-else-if="activeMenu === 'applicationHistory'" />
        </div>
        
        <!-- 管理员内容 -->
        <div v-else>
          <AccountManagement v-if="activeMenu === 'accountManagement'" />
          <AdReview v-else-if="activeMenu === 'adReview'" />
          <AiCopywriter v-else-if="activeMenu === 'aiCopywriter'" />
          <AdManagement v-else-if="activeMenu === 'adManagement'" />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { 
  FileText, 
  History, 
  Users, 
  CheckSquare, 
  MessageSquare, 
  LayoutDashboard, 
  LogOut 
} from 'lucide-vue-next';

// 导入组件
import AdApplication from './advertiser/AdApplication.vue';
import ApplicationHistory from './advertiser/ApplicationHistory.vue';
import AccountManagement from './admin/AccountManagement.vue';
import AdReview from './admin/AdReview.vue';
import AiCopywriter from './admin/AiCopywriter.vue';
import AdManagement from './admin/AdManagement.vue';

const router = useRouter();
const isAdmin = ref(false);
const username = ref('用户名');
const activeMenu = ref('');

// 广告主菜单
const advertiserMenu = [
  { name: 'adApplication', title: '广告申请', icon: FileText },
  { name: 'applicationHistory', title: '申请历史', icon: History }
];

// 管理员菜单
const adminMenu = [
  { name: 'accountManagement', title: '账号管理', icon: Users },
  { name: 'adReview', title: '广告审核', icon: CheckSquare },
  { name: 'aiCopywriter', title: 'AI文案助手', icon: MessageSquare },
  { name: 'adManagement', title: '广告管理', icon: LayoutDashboard }
];

// 计算当前菜单标题
const currentMenuTitle = computed(() => {
  if (isAdmin.value) {
    return adminMenu.find(item => item.name === activeMenu.value)?.title || '管理员仪表盘';
  } else {
    return advertiserMenu.find(item => item.name === activeMenu.value)?.title || '广告主仪表盘';
  }
});

// 退出登录
const logout = () => {
  router.push('/login');
};

onMounted(() => {
  // 根据路由判断用户类型
  const path = window.location.pathname;
  isAdmin.value = path.includes('admin');
  
  // 设置默认活动菜单
  activeMenu.value = isAdmin.value ? 'accountManagement' : 'adApplication';
});
</script>

