import { History } from '../history.model';

export interface UserHistory extends History {
    user_id: number;
    field_name: string;
    old_value: string;
    new_value: string;
}