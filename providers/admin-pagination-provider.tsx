"use client";

import {
    getFilteredUsersBySearchText,
    getTotalPages,
} from "@/components/utils";
import { User } from "@/types";
import { useSearchParams } from "next/navigation";
import {
    createContext,
    useContext,
    useReducer,
    PropsWithChildren,
} from "react";

export const ROWS_PER_PAGE = 5;

type State = {
    page: number;
    data: User[];
    selectedCheckboxes: Record<User["id"], boolean>;
};

type Action = { payload: Partial<State> };

type Dispatch = (action: Action) => void;

const reducer = (state: State, action: Action) => {
    return { ...state, ...action.payload };
};

const AdminPaginationContextData = createContext<State | undefined>(undefined);

const AdminPaginationContextApi = createContext<Dispatch | undefined>(
    undefined
);

const initialState = {
    page: 1,
    data: [],
    selectedCheckboxes: {},
} satisfies State;

export const AdminPaginationProvider = ({ children }: PropsWithChildren) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AdminPaginationContextData.Provider value={state}>
            <AdminPaginationContextApi.Provider value={dispatch}>
                {children}
            </AdminPaginationContextApi.Provider>
        </AdminPaginationContextData.Provider>
    );
};

export const useAdminPaginationData = () => {
    const state = useContext(AdminPaginationContextData);
    const searchParams = useSearchParams();
    const searchText = searchParams.get("searchText") ?? "";

    if (!state) {
        throw new Error(
            "useAdminPaginationData must be used within an AdminTableProvider"
        );
    }

    const { data, page } = state;

    const filteredData = getFilteredUsersBySearchText(
        data,
        searchText.toLowerCase()
    );

    const currentPageData = filteredData.slice(
        page * ROWS_PER_PAGE - ROWS_PER_PAGE,
        page * ROWS_PER_PAGE
    );

    const totalPages = getTotalPages(filteredData);

    return { ...state, currentPageData, totalPages };
};

export const useAdminPaginationApi = () => {
    const dispatch = useContext(AdminPaginationContextApi);

    if (!dispatch) {
        throw new Error(
            "useAdminPaginationApi must be used within an AdminPaginationProvider"
        );
    }

    const setPagination = (payload: Partial<State>) => {
        dispatch({ payload });
    };

    return { setPagination };
};
