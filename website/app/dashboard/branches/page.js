import { getBranches } from '@/app/actions/branches';
import { getCities } from '@/app/actions/cities';
import BranchesManager from './BranchesManager';

export default async function BranchesPage() {
    const branches = await getBranches();
    const cities = await getCities();

    return <BranchesManager initialBranches={branches} initialCities={cities} />;
}
