import { createReducer, createActions } from 'reduxsauce'; // More informations about reduxsauce in README.MD file
import Immutable from 'seamless-immutable';

/* Types & Action Creators */
// STUDY_NOTE: actionType is created automatically with pattern: function name in uppercase separated by underline. Eg: loadRequest = LOAD_REQUEST
const { Types, Creators } = createActions({
  loadRequest: null,
  loadSuccess: ['data'],
  loadFailure: null,
});

/**
 * STUDY_NOTES:
 *
 * What we have in Types const?
 * Types: { LOAD_REQUEST, LOAD_SUCCESS, LOAD_FAILURE }
 *
 * What we have in Creators const?
 * Creators:
 *  loadRequest: () => ({ type: 'LOAD_REQUEST' })
 *  loadSuccess: ( data ) => ({ type: 'LOAD_SUCCESS', data })
 *  loadFailure: () => ({ type: 'LOAD_SUCCESS' })
 *
 * Note that 'data' parameter of loadSuccess isn't sent in 'payload' arg.
 */

export const PodcastsTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = Immutable({
  data: [],
});
// STUDY_NOTE: Immutable is used to avoid INITIAL_STATE.data be setted with some value

/* Reducers */

/* Reducers to types */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOAD_SUCCESS]: (state, { data }) => state.merge({ data }),
});

/**
 * Example of old reducer implementation:
 *
 * function reducer(state = INITIAL_STATE, action){
 *  switch(action.type) {
 *      case 'LOAD_REQUEST':
 *          return { ...state, loading: true };
 *  }
 * }
 */
