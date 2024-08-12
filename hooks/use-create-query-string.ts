import { useSearchParams } from "next/navigation";

export const useCreateQueryString = () => {
    const searchParams = useSearchParams();

    const createQueryString = (name: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        value.length === 0 ? params.delete(name) : params.set(name, value);
        return params.toString();
    };

    return { createQueryString };
};
