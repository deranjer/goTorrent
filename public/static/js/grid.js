Vue.use(Vuetable);

var demo = new Vue({
    delimiters: ['((', '))'],
    el: '#torrentlist',
    components:{
        'vuetable-pagination': Vuetable.VuetablePagination
    },
    data: {
        fields: ['Torrent Name', 'Status','Percent Complete','Size','Total Peers','Storage Location']
    },
    computed:{
        /*httpOptions(){
          return {headers: {'Authorization': "my-token"}} //table props -> :http-options="httpOptions"
        },*/
    },
    methods: {
        onPaginationData (paginationData) {
            this.$refs.pagination.setPaginationData(paginationData)
        },
        onChangePage (page) {
            this.$refs.vuetable.changePage(page)
        },
        editRow(rowData){
            alert("You clicked edit on"+ JSON.stringify(rowData))
        },
        deleteRow(rowData){
            alert("You clicked delete on"+ JSON.stringify(rowData))
        }
    }
})