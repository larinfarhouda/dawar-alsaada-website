import { getBranches } from '@/app/actions/branches';
import BranchesManager from './BranchesManager';

export default async function BranchesPage() {
    const branches = await getBranches();

    return <BranchesManager initialBranches={branches} />;
}
