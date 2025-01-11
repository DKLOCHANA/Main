'use client';
import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import MenuOne from '@/components/Header/Menu/MenuOne';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import Footer from '@/components/Footer/Footer';
import { ProductType } from '@/type/ProductType';
import FetchProducts from '@/context/FetchProducts';
import Product from '@/components/Product/Product';
import HandlePagination from '@/components/Other/HandlePagination';

const SearchResultContent = () => {
    const [searchKeyword, setSearchKeyword] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(0);
    const productsPerPage = 8;

    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get('query') || 'dress'; // Default search query

    const handleSearch = (value: string) => {
        router.push(`/search-result?query=${value}`);
        setSearchKeyword('');
    };

    const handlePageChange = (selected: number) => {
        setCurrentPage(selected);
    };

    return (
        <>
            <div id="header" className="relative w-full">
                <MenuOne props="bg-transparent" />
                <Breadcrumb heading="Search Result" subHeading="Search Result" />
            </div>

            {/* FetchProducts is wrapped here */}
            <FetchProducts
                render={(products: ProductType[]) => {
                    const filteredData = products.filter((product) =>
                        product.name.toLowerCase().includes(query.toLowerCase()) ||
                        product.type.toLowerCase().includes(query.toLowerCase())
                    );

                    const offset = currentPage * productsPerPage;
                    const currentProducts = filteredData.slice(offset, offset + productsPerPage);
                    const pageCount = Math.ceil(filteredData.length / productsPerPage);

                    return (
                        <div className="shop-product breadcrumb1 lg:py-20 md:py-14 py-10">
                            <div className="container">
                                <div className="heading flex flex-col items-center">
                                    <div className="heading4 text-center">
                                        Found {filteredData.length} results for &apos;{query}&apos;
                                    </div>
                                    <div className="input-block lg:w-1/2 sm:w-3/5 w-full md:h-[52px] h-[44px] sm:mt-8 mt-5">
                                        <div className="w-full h-full relative">
                                            <input
                                                type="text"
                                                placeholder="Search..."
                                                className="caption1 w-full h-full pl-4 md:pr-[150px] pr-32 rounded-xl border border-line"
                                                value={searchKeyword}
                                                onChange={(e) => setSearchKeyword(e.target.value)}
                                                onKeyDown={(e) =>
                                                    e.key === 'Enter' && handleSearch(searchKeyword)
                                                }
                                            />
                                            <button
                                                className="button-main absolute top-1 bottom-1 right-1 flex items-center justify-center"
                                                onClick={() => handleSearch(searchKeyword)}
                                            >
                                                Search
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="list-product-block relative md:pt-10 pt-6">
                                    <div className="heading6">Product Search: {query}</div>
                                    <div
                                        className={`list-product hide-product-sold grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 sm:gap-[30px] gap-[20px] mt-5`}
                                    >
                                        {currentProducts.length === 0 ? (
                                            <div className="no-data-product">
                                                No products match the selected criteria.
                                            </div>
                                        ) : (
                                            currentProducts.map((item) => (
                                                <Product key={item.id} data={item} type="grid" />
                                            ))
                                        )}
                                    </div>

                                    {pageCount > 1 && (
                                        <div className="list-pagination flex items-center justify-center md:mt-10 mt-7">
                                            <HandlePagination
                                                pageCount={pageCount}
                                                onPageChange={handlePageChange}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                }}
            />
        </>
    );
};

const SearchResult = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <SearchResultContent />
        <Footer />
    </Suspense>
);

export default SearchResult;
