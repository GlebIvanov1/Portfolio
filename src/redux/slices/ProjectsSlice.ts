import { createSlice } from "@reduxjs/toolkit";

interface ProjectState {
    ProjectId: number | null,
}

const initialState: ProjectState = {
    ProjectId: null,
}

export const ProjectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        setId: (state, action) => {
            state.ProjectId = action.payload;
        }
    }
})

export const { setId } = ProjectSlice.actions;
export default ProjectSlice.reducer;