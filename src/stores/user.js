import { defineStore } from 'pinia'

const STORAGE_KEY = 'personal_user_store'

function readStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

/**
 * 用户 Store
 * - state：个人信息 userInfo、技能列表 skillList、登录状态 isLogin
 * - getters：loginState（登录态）、skillCount（技能数量）
 * - actions：login/logout/updateUserInfo，修改后调用 persist() 写入 localStorage
 */
export const useUserStore = defineStore('user', {
  state: () => {
    const saved = readStorage()
    return {
      userInfo: saved?.userInfo ?? {
        avatar: './01.png',
        name: '杨莹莹',
        studentId: '249981042',
        className: '24计科2班',
        desc: '计算机科学与技术专业学生，熟悉前端基础技术，正在学习项目开发，积极参与课程实践。'
      },
      skillList: saved?.skillList ?? ['HTML', 'CSS', 'JavaScript', 'Vue3', 'Python', 'MySQL', 'Git'],
      isLogin: saved?.isLogin ?? false
    }
  },
  getters: {
    loginState: (state) => state.isLogin,
    skillCount: (state) => state.skillList.length
  },
  actions: {
    /** 将当前状态同步到 localStorage，实现刷新后的状态恢复 */
    persist() {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          userInfo: this.userInfo,
          skillList: this.skillList,
          isLogin: this.isLogin
        })
      )
    },
    /** 登录：账号密码校验通过后更新登录态并持久化 */
    login(account, password) {
      if (account === 'admin' && password === '123456') {
        this.isLogin = true
        this.persist()
        return true
      }
      return false
    },
    /** 退出登录 */
    logout() {
      this.isLogin = false
      this.persist()
    },
    /** 更新个人信息与技能列表 */
    updateUserInfo(userInfo, skillList) {
      this.userInfo = { ...this.userInfo, ...userInfo }
      if (Array.isArray(skillList)) this.skillList = skillList
      this.persist()
    }
  }
})
