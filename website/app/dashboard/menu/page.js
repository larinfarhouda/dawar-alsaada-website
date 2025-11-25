import { getMenuItems } from '@/app/actions/menu';
import MenuManager from './MenuManager';

export default async function MenuPage() {
    const items = await getMenuItems();

    return <MenuManager initialItems={items} />;
}
