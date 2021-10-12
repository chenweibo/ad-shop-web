<template>
  <task-detail :is-edit="false" />
</template>

<script>
import TaskDetail from './components/TaskDetail'

export default {
  name: 'CreateTask',
  components: { TaskDetail }
}
</script>
