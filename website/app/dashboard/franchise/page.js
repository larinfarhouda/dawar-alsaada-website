import { getFranchiseRequests } from '@/app/actions/franchise';
import FranchiseRequestsList from './FranchiseRequestsList';

export default async function FranchisePage() {
    const requests = await getFranchiseRequests();

    return (
        <div>
            <FranchiseRequestsList initialRequests={requests} />
        </div>
    );
}
