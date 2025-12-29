import { getCities } from '@/app/actions/cities';
import CitiesManager from './CitiesManager';

export default async function CitiesPage() {
    const cities = await getCities();

    return <CitiesManager initialCities={cities} />;
}
