import { getApplications } from '@/app/actions/applications';
import ApplicationsList from './ApplicationsList';

export const dynamic = 'force-dynamic';

export default async function ApplicationsPage() {
    const applications = await getApplications();

    return <ApplicationsList initialApplications={applications} />;
}
