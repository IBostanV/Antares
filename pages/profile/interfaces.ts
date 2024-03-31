export interface UserProfile {
    birthday: Date;
    email: string;
    enabled: boolean;
    favoriteCategories: object[];
    name: string;
    occupations: string;
    surname: string;
    theme: string;
    username: string;
}

export default {
    birthday: null,
    email: '',
    enabled: false,
    favoriteCategories: [],
    name: '',
    occupations: '',
    surname: '',
    theme: '',
    username: ''
}