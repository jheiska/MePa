const listaReducer = (state = [], action) => {
    
    switch (action.type) {
        case 'LATAA_LISTA':
        return state.concat(action.data)
    }
    return state
  }

  