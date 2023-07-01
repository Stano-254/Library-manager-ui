<template>
  <table class="table">
    <thead>
      <slot name="columns">
        <tr>
          <th v-for="column in columns" :key="column">{{column}}</th>
        </tr>
      </slot>
    </thead>
    <tbody>
    <tr v-for="(item, index) in data" :key="index">
      <slot :row="item">
        <td v-for="column in columns" :key="column" v-if="hasValue(item, column)">{{itemValue(item, column)}}</td>
      </slot>
      <td>
        <base-button 
        v-for="action in itemActions"  :key="action.label" :type="action.color" 
        @click="handleAction(action, item)"
        class="mx-1" size="sm">{{ toCapitalize(action.label) }}</base-button>
                
         
          
          
      </td>
    </tr>
    </tbody>
  </table>
</template>
<script>
  export default {
    name: 'l-table',
    props: {
      columns: Array,
      data: Array,
      itemActions: Array
    },
    methods: {
      hasValue (item, column) {
        return item[column.toLowerCase()] !== 'undefined' && column.toLowerCase() !== 'actions'
      },
    
      itemValue (item, column) {
        return item[column.toLowerCase()]
      },
      toCapitalize(name){
        return name[0].toUpperCase() + name.slice(1)
      },
      handleAction(action, item) {
      // Perform action on the selected item
      this.$emit('action-clicked', action, item);
      // console.log('Action clicked:', action.label, 'for item:', item);
    },
    }
  }
</script>
<style>
</style>
