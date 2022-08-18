const initialState = [
  {
    id: '1',
    task: 'Gym - Back bicep',
    status: true,
  },
  {
    id: '2',
    task: 'React Native Archetecture revision',
    status: false,
  },
  {
    id: '3',
    task: 'Shopping ',
    status: false,
  },
];

export const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return (
        action.payload.task && [
          ...state,
          {
            id: action.payload.id,
            task: action.payload.task,
            status: action.payload.status,
          },
        ]
      );
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.payload);
    case 'TOGGLE_TODO':
      return state.map(todo => {
        return todo.id === action.payload.id
          ? {...todo, status: !todo.status}
          : todo;
      });

    case 'EDIT_TODO':
      return state.map(todo => {
        return todo.id === action.payload.id
          ? {...todo, task: action.payload.task}
          : todo;
      });

    default:
      return state;
  }
};

export default todoReducer;
