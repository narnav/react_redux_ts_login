// store/studentSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Student } from './models/Student';

interface StudentState {
    students: Student[];
    loading: boolean;
    error: string | null;
}

const initialState: StudentState = {
    students: [],
    loading: false,
    error: null
};
// http://127.0.0.1:8000/students
// Async actions for CRUD operations
export const fetchStudents = createAsyncThunk('students/fetchStudents', async () => {
    const response = await axios.get<Student[]>('http://127.0.0.1:8000/students');
    return response.data;
});

export const createStudent = createAsyncThunk(
    'students/createStudent',
    async (newStudent: Partial<Student>) => {
        const response = await axios.post<Student>('http://127.0.0.1:8000/add', newStudent);
        return response.data;
    }
);

export const updateStudent = createAsyncThunk(
    'students/updateStudent',
    async (updatedStudent: Student) => {
        const response = await axios.put<Student>(`/api/students/${updatedStudent.id}/`, updatedStudent);
        return response.data;
    }
);

export const deleteStudent = createAsyncThunk(
    'students/deleteStudent',
    async (studentId: number) => {
        await axios.delete(`/api/students/${studentId}/`);
        return studentId;
    }
);

const studentSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Students
            .addCase(fetchStudents.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchStudents.fulfilled, (state, action: PayloadAction<Student[]>) => {
                state.students = action.payload;
                state.loading = false;
            })
            .addCase(fetchStudents.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch students';
            })
            // Create Student
            .addCase(createStudent.fulfilled, (state, action: PayloadAction<Student>) => {
                state.students.push(action.payload);
            })
            // Update Student
            .addCase(updateStudent.fulfilled, (state, action: PayloadAction<Student>) => {
                const index = state.students.findIndex(student => student.id === action.payload.id);
                if (index !== -1) state.students[index] = action.payload;
            })
            // Delete Student
            .addCase(deleteStudent.fulfilled, (state, action: PayloadAction<number>) => {
                state.students = state.students.filter(student => student.id !== action.payload);
            });
    },
});

export default studentSlice.reducer;
