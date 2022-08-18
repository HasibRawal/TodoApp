const addTodo = task => {
  return {
    type: 'ADD_TODO',
    payload: {
      task,
      id: Math.floor(Math.random() * 99999),
      status: false,
    },
  };
};

const deleteTodo = id => {
  return {
    type: 'DELETE_TODO',
    payload: id,
  };
};

const toggleTodo = id => {
  return {
    type: 'TOGGLE_TODO',
    payload: {
      id,
    },
  };
};

const editTodo = (id, task) => {
  return {
    type: 'EDIT_TODO',
    payload: {
      id,
      task,
    },
  };
};

export {addTodo, deleteTodo, toggleTodo, editTodo};
