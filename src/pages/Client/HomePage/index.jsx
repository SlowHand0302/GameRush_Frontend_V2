import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { producTypeAPI } from '../../../API';

import Banner from './Banner';
import Section from './Section';
import ProductCard from '../components/ProductCard';
import { formatCash } from '../../../utils/helpers';
// dummydata
import products from '../../../constants/dummyData/products';
import categories from '../../../constants/dummyData/category';
import { homePageBanners, homePageSlider } from '../../../assets/img';

function HomePage(props) {
    const [productsByType, setProductsByType] = useState({});
    const recommendPrices = [20000, 50000, 100000, 200000, 500000, 1000000];
    const colors = ['bg-blue-900', 'bg-blue-300', 'bg-red-600', 'bg-gray-800', 'bg-orange-300', 'bg-gray-400'];
    const mainKeys = ['Làm việc', 'Giải Trí', 'Học Tập', 'Spotify', 'Game Steam', 'Youtube'];
    const fetchData = async () => {
        try {
            const promises = mainKeys.map((key) => producTypeAPI.getProductTypesByFilter({ categories: key }));
            const productTypes = await Promise.all(promises);
            mainKeys.map((key, index) =>
                setProductsByType((prev) => {
                    return { ...prev, [key]: [...productTypes[index]] };
                }),
            );
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className="bg-gray-100 w-full">
            <Banner banners={homePageBanners} sliders={homePageSlider} />
            <Section
                title={'Từ khoá nổi bật'}
                hideBtn={true}
                styles={'grid grid-cols-6 gap-10 sm:grid-cols-3 sm:gap-3 2sm:grid-cols-3 2sm:gap-3'}
            >
                {mainKeys.map((key, index) => {
                    return (
                        <Link
                            key={index}
                            to={'/search/featured'}
                            className={`rounded-xl text-center p-[20px] sm:p-[3px] 2sm:p-[3px] 2sm:text-[10px] text-white ${colors[index]}`}
                        >
                            {key}
                        </Link>
                    );
                })}
            </Section>
            <Section
                title={'Giá phù hợp'}
                hideBtn={true}
                styles={'grid grid-cols-6 gap-10 sm:grid-cols-3 sm:gap-3 2sm:grid-cols-3 2sm:gap-3'}
            >
                {recommendPrices.map((price, index) => {
                    return (
                        <Link
                            to={'/search/featured'}
                            key={index}
                            className="rounded-xl text-center p-[20px] sm:p-[3px] 2sm:p-[3px] 2sm:text-[10px] bg-white border border-black"
                        >
                            {formatCash(price)}
                        </Link>
                    );
                })}
            </Section>
            {Object.entries(productsByType).map(([key, value], index) => {
                return (
                    <Section key={index} title={key} subTitle={''} >
                        {value.map((product, index) => {
                            return (
                                <ProductCard
                                    key={index}
                                    name={product.name}
                                    link={product._id}
                                    originalPrice={product.originalPrice}
                                    sellPrice={product.sellPrice}
                                    img={product.image}
                                    status={product.status}
                                />
                            );
                        })}
                    </Section>
                );
            })}
        </div>
    );
}

export default HomePage;
