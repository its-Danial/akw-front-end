<script setup lang="ts">
import adminService from '@/services/adminService'
import type { User } from '@/types'
import { formatTimeStamp, toSnakeCase } from '@/utilities/functions'
import { onBeforeMount, ref } from 'vue'

const users = ref([])

const mapUserPermissions = (user: User) => ({
  ...user,
  canView: !!user.permissions![0].canView,
  canEdit: !!user.permissions![0].canEdit,
  canDelete: !!user.permissions![0].canDelete,
  canViewAll: !!user.permissions![0].canViewAll
})

onBeforeMount(async () => {
  const response = await adminService.getUsers()
  users.value = response.data.users.map(mapUserPermissions)
})

const handlePermissionChange = async (userId: number, permissionKey: string, value: boolean) => {
  const newPermission = { [toSnakeCase(permissionKey)]: value }
  await adminService.updateUserPermission(userId, newPermission)
}
</script>

<template>
  <AccessControl role="admin">
    <Card :pt="{ content: 'pa-0' }" class="h-full">
      <template #title>All Users</template>
      <template #subtitle>Edit user permission</template>
      <template #content>
        <DataTable :value="users" tableStyle="min-width: 50rem">
          <Column field="id" header="ID"></Column>
          <Column field="email" header="Email"></Column>
          <Column field="createdAt" header="Created At">
            <template #body="{ data }">
              <div class="flex flex-col text-sm">
                <div>
                  {{ formatTimeStamp(data.createdAt as string).date }}
                </div>
                <div>
                  {{ formatTimeStamp(data.createdAt as string).time }}
                </div>
              </div>
            </template>
          </Column>
          <Column field="role" header="Role"></Column>
          <Column
            class="capitalize"
            v-for="permission in ['canView', 'canEdit', 'canDelete', 'canViewAll']"
            :key="permission"
            :field="permission"
            :header="permission.split(/(?=[A-Z])/).join(' ')"
          >
            <template #body="{ index, data }">
              <InputSwitch
                @update:modelValue="(value) => handlePermissionChange(data.id, permission, value)"
                v-model="users[index][permission]"
              />
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>
  </AccessControl>
</template>

<style lang=""></style>
