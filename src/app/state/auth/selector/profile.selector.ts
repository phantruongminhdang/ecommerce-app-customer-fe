import { createFeatureSelector } from "@ngrx/store";
import { Profile } from "../../../shared/models/Auth/Profile";

export const selectProfileState = createFeatureSelector<Profile>('profile')
