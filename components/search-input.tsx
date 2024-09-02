"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "./ui/input";
import { ChangeEvent, useRef } from "react";
import { useCreateQueryString } from "@/hooks/use-create-query-string";
import { useDebouncedCallback } from "use-debounce";
import { Search, X } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import {
    useAdminPaginationApi,
    useAdminPaginationData,
} from "@/providers/admin-pagination-provider";

export const SearchInput = () => {
    const router = useRouter();
    const pathName = usePathname();
    const searchParams = useSearchParams();
    const inputRef = useRef<HTMLInputElement>(null!);

    const { createQueryString } = useCreateQueryString();

    const inputTargetValue = inputRef.current?.value ?? "";

    const searchText = searchParams.get("searchText") ?? "";

    const debouncedSearch = useDebouncedCallback((search: string) => {
        router.replace(
            `${pathName}${"?" + createQueryString("searchText", search)}`
        );
    }, 300);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        debouncedSearch(e.target.value);
    };

    const handleClear = () => {
        debouncedSearch("");
        inputRef.current.value = "";
    };

    return (
        <div className="relative">
            <Search
                size={16}
                className="absolute top-1/2 -translate-y-1/2 left-2 text-muted-foreground"
            />
            <Input
                ref={inputRef}
                className="px-8 h-9"
                placeholder="Search by name, email or role"
                onChange={handleChange}
                defaultValue={searchText}
            />
            <Button
                className={cn(
                    "p-1 absolute top-1/2 -translate-y-1/2 right-2 h-fit",
                    { hidden: 0 === inputTargetValue.length ?? 0 }
                )}
                onClick={handleClear}
            >
                <X size={12} className="text-muted-foreground" />
            </Button>
        </div>
    );
};
