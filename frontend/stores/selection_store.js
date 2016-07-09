const AppDispatcher = require('../dispatcher/dispatcher.js');
const Store = require('flux/utils').Store;
const SelectionConstants = require('../constants/selection_constants');

const SelectionStore = new Store(AppDispatcher);

let _selections = [];

SelectionStore.all = function() {
  return _selections.slice();
};

function clearSelections() {
  _selections = [];
}

function setSelections(selections) {
  _selections = selections;
  SelectionStore.__emitChange();
}

SelectionStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case SelectionConstants.SET_SELECTIONS:
    setSelections(payload.selections);
    break;
    case SelectionConstants.CLEAR_SELECTIONS:
    clearSelections();
  }
};

module.exports = SelectionStore;
