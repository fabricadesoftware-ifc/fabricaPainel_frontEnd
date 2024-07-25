import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { WorkService } from '@/services'



export const useWorkStore = defineStore('works', () => {
  const state = reactive({
    works: [],
    selectedWork: null,
    loading: false,
    error: null
  })
  const isLoading = computed(() => state.loading)
  const workCount = computed(() => state.works.length)


  const getWorks = async () => {
    state.loading = true
    try {
      state.works = await WorkService.getWorks()
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }


  const createWork = async (newWork) => {
    state.loading = true
    try {
      state.works.push(await WorkService.createWork(newWork))
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }


  const updateWork = async (work) => {
    state.loading = true
    try {
      const index = state.works.findIndex((s) => s.id === work.id)
      state.works[index] = await WorkService.updateWork(work)
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }

  const deleteWork = async (id) => {
    state.loading = true
    try {
      const index = state.works.findIndex((s) => s.id === id)
      state.works.splice(index, 1)
      await WorkService.deleteWork(id)
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }

  return {
    state,
    isLoading,
    workCount,
    getWorks,
    createWork,
    updateWork,
    deleteWork,

  }
})
