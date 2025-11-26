# Franchise Request Feature Implementation

## Features Implemented

### 1. **Franchise Form Submission**
- **Functionality**: The franchise form now submits data to the database instead of a mock simulation.
- **Fields Captured**:
  - Name
  - Phone
  - Email
  - Proposed City
  - Investment Budget
  - Experience (Yes/No)
- **Feedback**: Shows success message upon submission and allows resetting the form.

### 2. **Database Schema**
- **New Model**: `FranchiseRequest` added to `prisma/schema.prisma`.
- **Fields**: `id`, `name`, `phone`, `email`, `city`, `budget`, `hasExperience`, `status`, `createdAt`.

### 3. **Dashboard Management**
- **New Page**: `/dashboard/franchise` created to list all franchise requests.
- **List View**: Displays all requests in a table with columns for applicant details, city, budget, experience, date, and status.
- **Status Management**: Admins can update the status of requests (New, Reviewed, Contacted, Approved, Rejected).
- **Navigation**: Added "طلبات الامتياز" (Franchise Requests) to the dashboard sidebar.

## Files Created/Modified

### Created
- `app/actions/franchise.js`: Server actions for creating and fetching requests.
- `app/dashboard/franchise/page.js`: Main dashboard page for franchise requests.
- `app/dashboard/franchise/FranchiseRequestsList.js`: Client component for the requests table.

### Modified
- `prisma/schema.prisma`: Added `FranchiseRequest` model.
- `components/Franchise.js`: Integrated `createFranchiseRequest` server action.
- `app/dashboard/layout.js`: Added navigation link.

## Testing

To test the franchise feature:
1. Go to the website franchise section (#franchise).
2. Fill out the form with sample data.
3. Click "إرسال طلب الامتياز" (Submit Franchise Request).
4. Verify the success message appears.
5. Go to `/dashboard/franchise` to see the new request.
6. Try changing the status of the request.
