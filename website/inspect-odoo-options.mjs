import fs from 'fs';
import path from 'path';
import xmlrpc from 'xmlrpc';

// Manually load .env
const envPath = path.resolve(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf8');
    envConfig.split('\n').forEach(line => {
        const [key, ...values] = line.split('=');
        if (key && values.length > 0) {
            process.env[key.trim()] = values.join('=').trim();
        }
    });
}

async function inspectSelectionOptions() {
    console.log('Connecting to Odoo...');
    const url = new URL(process.env.ODOO_URL);
    const clientOptions = {
        host: url.hostname,
        port: url.port || (url.protocol === 'https:' ? 443 : 80),
        path: '/xmlrpc/2/common',
    };
    const common = url.protocol === 'https:' ? xmlrpc.createSecureClient(clientOptions) : xmlrpc.createClient(clientOptions);

    const uid = await new Promise((resolve, reject) => {
        common.methodCall('authenticate', [process.env.ODOO_DB, process.env.ODOO_USER, process.env.ODOO_PASSWORD, {}], (error, uid) => {
            if (error) reject(error); else resolve(uid);
        });
    });

    const objectPath = '/xmlrpc/2/object';
    const objectOptions = { host: url.hostname, port: url.port || (url.protocol === 'https:' ? 443 : 80), path: objectPath };
    const object = url.protocol === 'https:' ? xmlrpc.createSecureClient(objectOptions) : xmlrpc.createClient(objectOptions);

    console.log('Fetching fields for approval.request...');
    const fields = await new Promise((resolve, reject) => {
        object.methodCall('execute_kw', [
            process.env.ODOO_DB, uid, process.env.ODOO_PASSWORD,
            'approval.request', 'fields_get', [],
            { attributes: ['string', 'type', 'selection'] }
        ], (error, result) => {
            if (error) reject(error); else resolve(result);
        });
    });

    const selectionFields = [
        'x_studio_selection_field_327_1jd32q42b', // Experience
        'x_studio_selection_field_6b_1jd332n35', // When Ready
        'x_studio_selection_field_91l_1jd32uu49'  // Investment Source
    ];

    for (const fieldName of selectionFields) {
        if (fields[fieldName]) {
            console.log(`\nField: ${fields[fieldName].string} (${fieldName})`);
            console.log('Options:', JSON.stringify(fields[fieldName].selection, null, 2));
        }
    }
}

inspectSelectionOptions().catch(console.error);
