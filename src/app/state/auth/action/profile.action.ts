import { createActionGroup, props } from "@ngrx/store";
import { Profile } from "../../../shared/models/Auth/Profile";

export const ProfileActions = createActionGroup({
    source: 'profile',
    events: {
        'Save Profile': props<{ profile: Profile }>(),
    }
})