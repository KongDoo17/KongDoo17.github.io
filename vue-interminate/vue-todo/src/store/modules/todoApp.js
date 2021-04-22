const storage = {
    fetch() {
        const arr = [];
        if (localStorage.length > 0) {
            for (let i = 0; i < localStorage.length; i++) {
                if (localStorage.key(i) !== 'loglevel:webpack-dev-server') {
                    arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
                }
            }
        }
        return arr;
    },
}

const state = {
    headerText: 'TODO it!',
    todoItem: storage.fetch(),
};

const getters = {
    storedTodoItems(state) {
        console.log(state.todoItem);
        return state.todoItem;
    }
};

const mutations = {
    addOneItem(state, todoItem) {
        const obj = { completed: false, item: todoItem };
        localStorage.setItem(todoItem, JSON.stringify(obj));
        state.todoItem.push(obj);
        console.log(state.todoItem);
    },
    removeOneItem(state, obj) {
        localStorage.removeItem(obj.todoItem.item);
        state.todoItem.splice(obj.index, 1);
    },
    toggleOneItem(state, obj) {
        obj.todoItem.completed = !obj.todoItem.completed;
        console.log(state);
        localStorage.setItem(obj.todoItem.item, JSON.stringify(obj.todoItem));
    },
    clearAllItem(state) {
        localStorage.clear();
        state.todoItem = [];
    }
};

export default {
    state,
    getters,
    mutations
}