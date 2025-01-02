import { Operation } from "../enums/operation.enum";
import { User } from "./user";

export class Category {
    categoryId: number;
    name: string;
    color: string;
    icon: string;
    operation: Operation;
    user: User;
}