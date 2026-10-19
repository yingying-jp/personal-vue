import { defineStore } from 'pinia'
import { projectList as defaultProjects } from '../data/projectData.js'

const STORAGE_KEY = 'personal_project_store'

function readStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function deepClone(list) {
  return JSON.parse(JSON.stringify(list))
}

/**
 * 项目 Store
 * - state：projectList（项目列表，首次从默认数据或 localStorage 恢复）
 * - getters：projectCount、getProjectById
 * - actions：addProject/updateProject/removeProject，修改后同步 localStorage
 */
export const useProjectStore = defineStore('project', {
  state: () => ({
    projectList: readStorage()?.projectList ?? deepClone(defaultProjects)
  }),
  getters: {
    projectCount: (state) => state.projectList.length,
    getProjectById: (state) => (id) => state.projectList.find((p) => p.id === Number(id))
  },
  actions: {
    persist() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ projectList: this.projectList }))
    },
    /** 新增项目，返回新 id */
    addProject(payload) {
      const nextId = this.projectList.length
        ? Math.max(...this.projectList.map((p) => p.id)) + 1
        : 1
      this.projectList.push({ id: nextId, ...payload })
      this.persist()
      return nextId
    },
    /** 按 id 更新项目 */
    updateProject(id, payload) {
      const idx = this.projectList.findIndex((p) => p.id === Number(id))
      if (idx > -1) {
        this.projectList[idx] = { ...this.projectList[idx], ...payload }
        this.persist()
        return true
      }
      return false
    },
    /** 按 id 删除项目 */
    removeProject(id) {
      const idx = this.projectList.findIndex((p) => p.id === Number(id))
      if (idx > -1) {
        this.projectList.splice(idx, 1)
        this.persist()
        return true
      }
      return false
    }
  }
})
