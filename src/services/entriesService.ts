import { Api } from '@/utilities/api'

export default {
  createEntry(formData: FormData) {
    return Api().post('/entry', formData)
  },
  getEntries({ entryId, order = 'desc' }: { entryId?: string; order?: string }) {
    return Api().get(`/entry${order ? `?order=${order}` : ''}${entryId ? `&id=${entryId}` : ''}`)
  },
  updateEntry(entryId: string, formData: FormData) {
    return Api().put(`/entry/${entryId}`, formData)
  },
  deleteEntry(entryId: number) {
    return Api().delete(`/entry/${entryId}`)
  }
}
