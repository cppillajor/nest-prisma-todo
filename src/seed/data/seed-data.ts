import { Task, User } from '@prisma/client';
interface SeedData {
    users: User[];
    tasks: Task[];
}
export const initialData: SeedData = {
    users: [
        {          
            id: undefined,  
            username: 'cristianpillajo1999@gmail.com',
            password: 'Password',
            role: 'admin',
        },
    ],    
    tasks: [
        {
            id: undefined,  
            name: 'Administrar',
            dueBy: new Date('2023-10-8'),
            userId: 1
        },
    ]
}