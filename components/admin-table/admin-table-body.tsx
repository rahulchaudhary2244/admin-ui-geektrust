"use client";

import { User } from "@/types";
import {
    UserPen,
    Trash2,
    ChevronsLeft,
    ChevronLeft,
    ChevronsRight,
    ChevronRight,
} from "lucide-react";
import { Button } from "../ui/button";
import { TableBody, TableRow, TableCell, TableFooter } from "../ui/table";
import { useReducer } from "react";
import { useSearchParams } from "next/navigation";
import { Checkbox } from "../ui/checkbox";

type Props = {
    data: User[];
};

type State = {
    users: User[];
    page: number;
};

const ROWS_PER_PAGE = 10;

const reducer = (state: State, newState: Partial<State>) => {
    return { ...state, ...newState };
};

export const AdminTableBody = ({ data }: Props) => {
    const [{ users, page }, setState] = useReducer(reducer, {
        users: data,
        page: 1,
    });

    const searchParams = useSearchParams();
    const searchText = (searchParams.get("searchText") ?? "").toLowerCase();

    const filteredUsers = users.filter(
        ({ email, name, role }) =>
            email.toLowerCase().includes(searchText) ||
            name.toLowerCase().includes(searchText) ||
            role.toLowerCase().includes(searchText)
    );

    const slicedUsers = filteredUsers.slice(
        page * ROWS_PER_PAGE - ROWS_PER_PAGE,
        page * ROWS_PER_PAGE
    );
    const totalPages = getTotalPages(filteredUsers);

    const handleInlineDelete = (id: string) => {
        setState({ users: users.filter((user) => user.id !== id) });
    };

    const pageNavigations = range(totalPages);
    const lastPageNo = pageNavigations[pageNavigations.length - 1];

    const navigationMap = [
        {
            children: <ChevronsLeft size={16} />,
            navigateToPage: 1,
            disabled: page === 1,
        },
        {
            children: <ChevronLeft size={16} />,
            navigateToPage: page - 1,
            disabled: page === 1,
        },
        ...pageNavigations.map((pageNo) => ({
            children: pageNo,
            navigateToPage: pageNo,
            disabled: false,
        })),
        {
            children: <ChevronRight size={16} />,
            navigateToPage: page + 1,
            disabled: page === lastPageNo,
        },
        {
            children: <ChevronsRight size={16} />,
            navigateToPage: lastPageNo,
            disabled: page === lastPageNo,
        },
    ];

    if (slicedUsers.length === 0) return <div>No Table Data</div>;

    return (
        <>
            <TableBody>
                {slicedUsers.map(({ id, email, name, role }) => (
                    <TableRow key={id}>
                        <TableCell className="w-[100px]">
                            <Checkbox />
                        </TableCell>
                        <TableCell>{name}</TableCell>
                        <TableCell>{email}</TableCell>
                        <TableCell>{role}</TableCell>
                        <TableCell className="text-right">
                            <Button variant="outline" size="icon">
                                <UserPen size={16} />
                            </Button>
                            <Button
                                className="ml-3"
                                variant="outline"
                                size="icon"
                                onClick={() => handleInlineDelete(id)}
                            >
                                <Trash2 size={16} />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={100}>
                        <div className="flex items-center gap-2 justify-center w-full">
                            {navigationMap.map(
                                (
                                    { children, navigateToPage, disabled },
                                    idx
                                ) => (
                                    <Button
                                        key={idx}
                                        variant={
                                            children === page
                                                ? "default"
                                                : "outline"
                                        }
                                        size="icon"
                                        disabled={disabled}
                                        onClick={() =>
                                            setState({ page: navigateToPage })
                                        }
                                    >
                                        {children}
                                    </Button>
                                )
                            )}
                        </div>
                    </TableCell>
                </TableRow>
            </TableFooter>
        </>
    );
};

const getTotalPages = (data: unknown[]) =>
    Math.ceil(data.length / ROWS_PER_PAGE);

const range = (length: number) => Array.from({ length }, (_, i) => i + 1);
