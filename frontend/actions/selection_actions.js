const AppDispatcher = require('../dispatcher/dispatcher');
const SelectionConstants = require('../constants/selection_constants');

const SelectionActions = {
  setSelections(selections) {
    AppDispatcher.dispatch({
      actionType: SelectionConstants.SET_SELECTIONS,
      selections: selections
    });
  },

  clearSelections() {
    AppDispatcher.dispatch({
      actionType: SelectionConstants.CLEAR_SELECTIONS
    });
  }
};

module.exports = SelectionActions;
