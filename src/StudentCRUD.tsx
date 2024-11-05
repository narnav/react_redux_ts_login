// components/StudentCRUD.tsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './app/store';
import { fetchStudents, createStudent, updateStudent, deleteStudent } from './studentSlice';
import { Student } from './models/Student';

const StudentCRUD: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const students = useSelector((state: RootState) => state.students.students);
    const loading = useSelector((state: RootState) => state.students.loading);
    const [newStudent, setNewStudent] = useState<Partial<Student>>({ sName: '', age: 0 });
    const [editingStudent, setEditingStudent] = useState<Partial<Student> | null>(null);

    useEffect(() => {
        dispatch(fetchStudents());
    }, [dispatch]);

    const handleCreateStudent = () => {
        if (newStudent.sName && newStudent.age) {
            dispatch(createStudent(newStudent));
            setNewStudent({ sName: '', age: 0 });
        }
    };

    const handleEditStudent = (student: Student) => {
        setEditingStudent(student);
    };

    const handleUpdateStudent = () => {
        if (editingStudent && editingStudent.id) {
            dispatch(updateStudent(editingStudent as Student));
            setEditingStudent(null);
        }
    };

    const handleDeleteStudent = (id: number) => {
        dispatch(deleteStudent(id));
    };

    return (
        <div>
            <h2>Student Management</h2>

            {/* Loading Indicator */}
            {loading && <p>Loading...</p>}

            {/* Create Student Form */}
            <div>
                <h3>Add New Student</h3>
                <input
                    type="text"
                    placeholder="Name"
                    value={newStudent.sName || ''}
                    onChange={(e) => setNewStudent({ ...newStudent, sName: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Age"
                    value={newStudent.age || ''}
                    onChange={(e) => setNewStudent({ ...newStudent, age: parseFloat(e.target.value) })}
                />
                <button onClick={handleCreateStudent}>Add Student</button>
            </div>

            {/* Edit Student Form */}
            {editingStudent && (
                <div>
                    <h3>Edit Student</h3>
                    <input
                        type="text"
                        placeholder="Name"
                        value={editingStudent.sName || ''}
                        onChange={(e) => setEditingStudent({ ...editingStudent, sName: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Age"
                        value={editingStudent.age || ''}
                        onChange={(e) => setEditingStudent({ ...editingStudent, age: parseFloat(e.target.value) })}
                    />
                    <button onClick={handleUpdateStudent}>Update Student</button>
                    <button onClick={() => setEditingStudent(null)}>Cancel</button>
                </div>
            )}

            {/* Students List */}
            <h3>Students List</h3>
            <ul>
                {students.map(student => (
                    <li key={student.id}>
                        <img src={"http://127.0.0.1:8000/"+ student.image || '/placeholder.png'} alt={student.sName} width="50" />
                        <span>{student.sName} - {student.age}</span>
                        <button onClick={() => handleEditStudent(student)}>Edit</button>
                        <button onClick={() => handleDeleteStudent(student.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StudentCRUD;
