import { Author } from '../models/author.model';
export declare class AuthorsResolver {
    author(id: number): Promise<string>;
    posts(author: Author): Promise<any>;
}
