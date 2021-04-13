import { localStorageAPI } from '../api/api';

//Action Types

const ADD_ITEM_SUCCESS = 'main/ADD_ITEM_SUCCESS';
const SET_ITEMS_SUCCESS = 'main/SET_ITEMS_SUCCESS';
const DELETE_ITEMS_SUCCESS = 'main/DELETE_ITEMS_SUCCESS';
const COMPLETE_ITEM_SUCCESS = 'main/COMPLETE_ITEM_SUCCESS';
const UPDATE_ITEM_SUCCESS = 'main/UPDATE_ITEM_SUCCESS';

//Initial State

let initialState = {
    items: [],
};

//Reducer

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEM_SUCCESS: {
            return {
                ...state,
                items: [...state.items, action.item]
            }
        }
        case SET_ITEMS_SUCCESS: {
            return {
                ...state,
                items: [...action.items]
            }
        }
        case DELETE_ITEMS_SUCCESS: {
            return {
                ...state,
                items: state.items.filter(i => i.itemId !== action.itemId)
            }
        }
        case COMPLETE_ITEM_SUCCESS: {
            return {
                ...state,
                items: state.items.map(i => {
                    if (i.itemId === action.itemId) {
                        return {
                            ...i,
                            completed: !i.completed
                        }
                    }
                    return i;
                })
            }
        }
        case UPDATE_ITEM_SUCCESS: {
            return {
                ...state,
                items: state.items.map(i => {
                    if (i.itemId === action.itemId) {
                        return {
                            ...i,
                            name: action.name
                        }
                    }
                    return i;
                })
            }
        }
        default:
            return state;
    }
};

//Action Creators

export const addItemSuccess = (item) => ({ type: ADD_ITEM_SUCCESS, item });

export const setItemsSuccess = (items) => ({ type: SET_ITEMS_SUCCESS, items });

export const deleteItemSuccess = (itemId) => ({ type: DELETE_ITEMS_SUCCESS, itemId });

export const completeItemSuccess = (itemId) => ({ type: COMPLETE_ITEM_SUCCESS, itemId })

export const updateItemSuccess = (itemId, name) => ({ type: UPDATE_ITEM_SUCCESS, itemId, name })

//THUNK

export const addItem = (itemId, name, completed, date) => (dispatch) => {
    const item = {
        itemId: itemId,
        name: name,
        completed: completed,
        date: date
    }
    console.log(item);
    localStorageAPI.setItem(item);
    dispatch(addItemSuccess(item));
}

export const getAllItems = () => (dispatch) => {
    let items = localStorageAPI.getAllItems();
    dispatch(setItemsSuccess(items));
}

export const deleteItem = (itemId) => (dispatch) => {
    localStorageAPI.deleteItem(itemId);
    dispatch(deleteItemSuccess(itemId));
}

export const completeItem = (itemId) => (dispatch) => {
    localStorageAPI.completeItem(itemId);
    dispatch(completeItemSuccess(itemId));
}

export const updateItem = (itemId, name) => (dispatch) => {
    localStorageAPI.updateItem(itemId, name);
    dispatch(updateItemSuccess(itemId, name));
}

export default mainReducer;