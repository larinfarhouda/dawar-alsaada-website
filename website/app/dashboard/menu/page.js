import { getMenuItems } from '@/app/actions/menu';
import { getCategories } from '@/app/actions/categories';
import MenuManager from './MenuManager';

export default async function MenuPage() {
    const items = await getMenuItems();
    const categories = await getCategories();

    return <MenuManager initialItems={items} categories={categories} />;
}
