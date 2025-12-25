# Odoo Integration Setup

This project has been integrated with Odoo to automatically sync Franchise Requests and Job Applications.

## Prerequisites

1. An Odoo instance (v14+ recommended).
2. A user with access to CRM and Recruitment modules.
3. The `xmlrpc` package (already installed).

## Environment Variables

Add the following variables to your `.env` file:

```env
ODOO_URL=https://your-odoo-instance.com
ODOO_DB=your_database_name
ODOO_USER=your_email_or_username
ODOO_PASSWORD=your_password_or_api_key
```

## Data Mapping

### Franchise Requests
Mapped to **Approvals** (`approval.request`) if a category named "Franchise" exists. Otherwise, falls back to **CRM Leads**.

**Approvals Mapping:**
| Website Field | Odoo Field | Notes |
|---|---|---|
| Name | name | "Franchise Request: [Name]" |
| Phone | reference | |
| All Details | description | Full details in description |
| Category | category_id | Searched by name "Franchise" |

**CRM Fallback Mapping:**
| Website Field | Odoo Field | Notes |
|---|---|---|
| Name | contact_name | Also sets Opportunity Name |
| Phone | phone | |
| Email | email_from | |
| City | city | |
| Budget | description | Included in description |
| Experience | description | Included in description |

### Job Applications
Mapped to **Job Applicants** (`hr.applicant`).

| Website Field | Odoo Field | Notes |
|Data Mapping|---|---|
| Name | partner_name | |
| Phone | partner_phone | |
| Email | email_from | |
| Position | name | Job Position Name |
| CV File | ir.attachment | Attached to the applicant record |

## Troubleshooting

- If records are not appearing in Odoo, check the server logs for "Error creating record in ...".
- Ensure the Odoo user has "Create" access rights for `crm.lead` and `hr.applicant`.
- Verify the `ODOO_URL` includes the protocol (http/https).
