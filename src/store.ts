import { PayloadAction, configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { IItem } from './interfaces';
import { search } from './api';
// ...

export interface ISearchState {
    value: {
        items: IItem[];
        metadata: {
            total_hits: number
        }
    }
}

const initialState: ISearchState = {
    value: null,
}

export const getData = createAsyncThunk(
    'get_data',
    async ({searchQuery, page, yearStart, yearEnd}: {searchQuery: string, page: number, yearStart: number, yearEnd: number}) => {
        const response = await search(searchQuery, page, yearStart, yearEnd).then((response)=>{
            console.log(response);
            return response.collection;
        });
        return response;
    }
)

export const searchSlice = createSlice({
name: 'search',
initialState,
reducers: {
},
extraReducers: (builder)=>{
    builder.addCase(getData.fulfilled, (state, action)=>{
        console.log('action', action);
        state.value = action.payload;
        return state;
    })
}
})

export const store = configureStore({
    reducer: {
        search: searchSlice.reducer
    }
})

//export const { setSearchResults } = searchSlice.actions
interface IAppState{
    search: ISearchState 
}
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<IAppState> = useSelector;
export type AppDispatch = typeof store.dispatch;
