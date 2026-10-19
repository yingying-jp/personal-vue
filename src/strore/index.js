import { reactive } from 'vue'
import { projectList } from '../data/projectData.js'

// 全局共享状态：个人信息 + 项目列表，Admin 修改后 Home 实时响应
export const appState = reactive({
  userInfo: {
    avatar: "/01.png",
    name: "杨莹莹",
    studentId: "249981042",
    className: "24计科2班",
    desc: "计算机科学与技术专业学生，熟悉前端基础技术，正在学习项目开发，积极参与课程实践。"
  },
  skillList: ["HTML", "CSS", "JavaScript", "Vue3", "Python", "MySQL", "Git"],
  projectList: JSON.parse(JSON.stringify(projectList))
})
