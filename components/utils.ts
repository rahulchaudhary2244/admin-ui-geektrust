import { ROWS_PER_PAGE } from "@/providers/admin-pagination-provider";
import { User } from "@/types";

export const getFilteredUsersBySearchText = (
    data: User[],
    searchText: string
) =>
    data.filter(
        ({ email, name, role }) =>
            email.toLowerCase().includes(searchText) ||
            name.toLowerCase().includes(searchText) ||
            role.toLowerCase().includes(searchText)
    );

export const getTotalPages = (data: unknown[]) =>
    Math.ceil(data.length / ROWS_PER_PAGE);
