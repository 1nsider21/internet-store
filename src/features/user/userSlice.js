import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { BASE_URL } from '../../utils/constants'

export const createUser = createAsyncThunk(
  'user/createUser',
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/users`, payload)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, payload)
      const login = await axios.get(`${BASE_URL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${response.data.access_token}`,
        },
      })

      return login.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (payload, thunkAPI) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/users/${payload.id}`,
        payload
      )
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

const addCurrentUser = (state, action) => {
  state.currentUser = action.payload
}

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    cart: [],
    favorites: [],
    isLoading: false,
    formType: 'signup',
    showForm: false,
  },
  reducers: {
    addItemToCart: (state, { payload }) => {
      let newCart = [...state.cart]
      const found = state.cart.find(({ id }) => id === payload.id)

      if (found) {
        newCart = newCart.map((item) => {
          return item.id === payload.id
            ? { ...item, quantity: payload.quantity || item.quantity + 1 }
            : item
        })
      } else {
        newCart.push({ ...payload, quantity: 1 })
      }

      state.cart = newCart
    },
    removeItemFromCart: (state, { payload }) => {
      state.cart = state.cart.filter(({ id }) => id !== payload)
    },
    addItemToFavorites: (state, { payload }) => {
      const found = state.favorites.find((item) => item.id === payload.id)
      if (found) return
      state.favorites.push(payload)
    },
    removeItemFromFavorites: (state, { payload }) => {
      state.favorites = state.favorites.filter(({ id }) => id !== payload)
    },
    toggleForm: (state, { payload }) => {
      state.showForm = payload
    },
    toggleFormType: (state, { payload }) => {
      state.formType = payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.fulfilled, addCurrentUser)
    builder.addCase(loginUser.fulfilled, addCurrentUser)
    builder.addCase(updateUser.fulfilled, addCurrentUser)
  },
})

export const {
  addItemToCart,
  removeItemFromCart,
  toggleForm,
  toggleFormType,
  addItemToFavorites,
  removeItemFromFavorites,
} = userSlice.actions

export default userSlice.reducer
