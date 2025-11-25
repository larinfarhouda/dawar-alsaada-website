import { getApplications } from '@/app/actions/applications';
import ApplicationsList from './ApplicationsList';

export default async function ApplicationsPage() {
    const applications = await getApplications();

    return <ApplicationsList initialApplications={applications} />;
}
