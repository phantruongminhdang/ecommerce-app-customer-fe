import { createFeature, createReducer, on } from "@ngrx/store";
import { ProfileActions } from "../action/profile.action";
import { Profile } from "../../../shared/models/Auth/Profile";

// Initial state for products
export const initialState: Profile = {
    username: '',
    email: '',
    role: ''
}

// Reducer for orders (fetched from API)
export const profileFeature = createFeature(
    {
        name: 'profile',
        reducer: createReducer(
            initialState,
            on(ProfileActions.saveProfile, (state, { profile }) => {
                return {
                    ...state,
                    username: profile.username,
                    email: profile.email,
                    role: profile.role
                }
            }),
        ),
    }
)