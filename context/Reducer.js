export const initialState = {
  tasks: [
    {
      title: 'Design team meeting',
      completed: true,
    },
    {
      title: 'Making Wireframes',
      completed: false,
    },
    {
      title: 'Create UI elements',
      completed: false,
    },
    {
      title: 'Meeting with Murman Khvadadze',
      completed: false,
    },
  ],
};

export const actionTypes = {
  UPDATE_TASKS: 'UPDATE_TASKS',
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_TASKS:
      return {
        tasks: action.tasks,
      };

    default:
      return state;
  }
};

export default reducer;
