<template>
   <div class="bg">
    <v-container class="content"><TaskTable/></v-container>
   </div>
</template>
  
  <script>
  import TaskTable from '~/components/TaskTable.vue';
  export default {
    name: 'TaskPage',
    components: {
      TaskTable,
    },
    
  };
  </script>
  
  <style lang="css" scoped>
.bg{
  background-image: url(~/assets/task.jpg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100%;
  position: relative;
}
.bg::before{
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0,0,0,0.4);
}

.content{
  position: relative;
  z-index: 1;
}
  </style>
  
  