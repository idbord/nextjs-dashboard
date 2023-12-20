import { Metadata } from "next";
import CustomersTable from "@/app/ui/customers/table";
import { fetchFilteredCustomers } from "@/app/lib/data";
import { Suspense } from "react";
import { TableRowSkeleton } from "@/app/ui/skeletons";
import { lusitana } from '@/app/ui/fonts';
import Search from "@/app/ui/search";

export const metadata: Metadata = {
    title: "Customers",
};

export default async function Page({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        page?: number;
    };
}) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const customers = await fetchFilteredCustomers(query);

    return <div className="w-full">
        <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
            Customers
        </h1>
        <Search placeholder="Search customers..." />
        <Suspense key={query + currentPage} fallback={<TableRowSkeleton />}>
            <CustomersTable customers={customers} />
        </Suspense>
    </div>;
}
