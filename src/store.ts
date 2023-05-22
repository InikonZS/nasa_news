import { PayloadAction, configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { IItem, ISearchQuery } from './interfaces';
import { search } from './api';
// ...

export interface ISearchState {
    query: ISearchQuery;
    value: {
        items: IItem[];
        metadata: {
            total_hits: number
        }
    }
}

const initialState: ISearchState = {
    value: null,
    query: null
}

export const getData = createAsyncThunk(
    'get_data',
    async ({searchQuery, page, yearStart, yearEnd}: ISearchQuery) => {
        const response = await search(searchQuery, page, yearStart, yearEnd).then((response)=>{
            console.log(response);
            return response.collection;
        });
        return {
            response,
            query: {searchQuery, page, yearStart, yearEnd}
        };
    }
)

export const searchSlice = createSlice({
name: 'search',
initialState,
reducers: {
   /* setSearchQuery:(state, action)=>{
        state.query = action.payload;
        /*if (state.query){
            getData(state.query);
        }*/
    //}*/
},
extraReducers: (builder)=>{
    builder.addCase(getData.fulfilled, (state, action)=>{
        console.log('action', action);
        state.value = action.payload.response;
        state.query = action.payload.query;
        return state;
    })
}
})

export const store = configureStore({
    reducer: {
        search: searchSlice.reducer
    }
})

//export const { setSearchQuery } = searchSlice.actions
interface IAppState{
    search: ISearchState 
}
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<IAppState> = useSelector;
export type AppDispatch = typeof store.dispatch;
