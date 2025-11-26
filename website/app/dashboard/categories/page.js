import { getCategories } from '@/app/actions/categories';
import CategoriesManager from './CategoriesManager';

export default async function CategoriesPage() {
    const categories = await getCategories();

    return <CategoriesManager initialCategories={categories} />;
}
