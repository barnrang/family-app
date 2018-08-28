Vue.use(Vuex);

const findIdx = (data, jobs) => {
    var id = data.id;
    for(var i = 0; i < jobs.length; i++){
        if(jobs[i].id == id){
            return i
        }            
    }
}

const store = new Vuex.Store({
    state: {
        jobs: [
            {id:0, name: "test1", money:0, done: false, acted: ['Pat'], resp: ['David']},
            {id:1, name: "test2", money:100, done: false, acted: ['Pat'], resp: ['David']}
        ],
        max_id: 1,
        peopleList: [{id:0, name:'John'}, {id:1, name:'Pat'}, {id:2, name:'David'}],
        payHistory: [],
        currentPayStatus: [[0]],
    },

    mutations: {
        deleteElement (state, data) {
            var idx = findIdx(data, state.jobs);
            state.jobs.splice(idx,1);
        },
        updateElement (state, data) {
            var idx = findIdx(data, state,state.jobs);
            state.jobs[idx] = data;
        },
        addElement(state, data) {
            state.jobs.push(data);
        },
        updateCurrentPayStatus(state, data){
            //Update payment status (if done manually)
        },
        addPayHistory(state, data) {
            //add payment history when user finish pay job
        },
        deletePayHistory(state, data) {
            //delete payment history when user undo the complete pay job
        }
    }
})