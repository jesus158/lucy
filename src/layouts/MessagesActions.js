
export const addMessage = message => (
    {
      type: 'ADD_MESSAGE'
      ,message
   }
);

export const removeMessage = message => (
   {
     type: 'REMOVE_MESSAGE'
     ,message
  }
);