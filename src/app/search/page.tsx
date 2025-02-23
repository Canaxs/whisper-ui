import SearchAll from "@/components/Search-All/Search-All";
import { Suspense } from "react";

export default function SearchPage() {
    return (
        <Suspense fallback={null}>
            <SearchAll />
        </Suspense>
    )
}