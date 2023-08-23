import { ERROR, LOADING, SUCCESS } from '../util/constants';

type ReducerState = {
  loading: boolean;
  error: string | null;
  data: any;
};

type ReducerAction = {
  type: typeof LOADING | typeof SUCCESS | typeof ERROR;
  payload?: any;
};

export const fetchReducer = (state: ReducerState, action: ReducerAction) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case ERROR:
      return {
        loading: false,
        error: action.payload,
        data: null,
      };
    default:
      throw new Error('Invalid action type');
  }
};

export const initialFetchReducerState = {
  loading: false,
  error: null,
  data: null,
};
