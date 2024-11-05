export interface Student {
    image: string | null; // Path to the image, with null allowed
    id: number;           // Primary key, using number for BigAutoField
    sName: string;        // Student name, limited to 20 characters
    age: number;          // Age as a floating-point number
}
