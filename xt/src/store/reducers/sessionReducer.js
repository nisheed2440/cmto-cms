import {
  FETCHED_SCHEDULE_INFO,
  FETCHED_FILTER_TAGS,
  CLEAR_APPLIED_FILTERS,
  APPLY_FILTERS
} from "../actions";

let appliedFilters = window.sessionStorage.getItem("wnin.appliedFilters");
appliedFilters = appliedFilters ? appliedFilters.split(",") : [];

function sessionReducer(
  state = { data: [], filters: [], appliedFilters: appliedFilters },
  action
) {
  switch (action.type) {
    case FETCHED_SCHEDULE_INFO:
      return Object.assign({}, state, {
        data: action.value
      });
    case FETCHED_FILTER_TAGS:
      return Object.assign({}, state, {
        filters: action.value
      });
    case CLEAR_APPLIED_FILTERS:
      return Object.assign({}, state, {
        appliedFilters: []
      });
    case APPLY_FILTERS:
      return Object.assign({}, state, {
        appliedFilters: [...action.value]
      });
    default:
      return state;
  }
}

export default sessionReducer;
