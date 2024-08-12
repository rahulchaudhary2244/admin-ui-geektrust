"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "./ui/input";
import { ChangeEvent } from "react";
import { useCreateQueryString } from "@/hooks/use-create-query-string";
import { useDebouncedCallback } from "use-debounce";

export const SearchInput = () => {
    const router = useRouter();
    const pathName = usePathname();
    const searchParams = useSearchParams();
    const searchText = searchParams.get("searchText") ?? "";

    const { createQueryString } = useCreateQueryString();

    const debouncedSearch = useDebouncedCallback(
        (search: string) =>
            router.replace(
                `${pathName}${"?" + createQueryString("searchText", search)}`
            ),
        300
    );

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        debouncedSearch(e.target.value);
    };

    return (
        <Input
            placeholder="Search by name, email or role"
            onChange={handleChange}
            defaultValue={searchText}
        />
    );
};
