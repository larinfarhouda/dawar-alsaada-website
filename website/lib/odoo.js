import xmlrpc from 'xmlrpc';

const ODOO_URL = process.env.ODOO_URL;
const ODOO_DB = process.env.ODOO_DB;
const ODOO_USER = process.env.ODOO_USER;
const ODOO_PASSWORD = process.env.ODOO_PASSWORD;

async function getUid() {
    if (!ODOO_URL || !ODOO_DB || !ODOO_USER || !ODOO_PASSWORD) {
        console.error("Odoo credentials not found in environment variables.");
        return null;
    }

    const url = new URL(ODOO_URL);
    const clientOptions = {
        host: url.hostname,
        port: url.port || (url.protocol === 'https:' ? 443 : 80),
        path: '/xmlrpc/2/common',
    };

    const common = url.protocol === 'https:'
        ? xmlrpc.createSecureClient(clientOptions)
        : xmlrpc.createClient(clientOptions);

    return new Promise((resolve, reject) => {
        common.methodCall('authenticate', [ODOO_DB, ODOO_USER, ODOO_PASSWORD, {}], (error, uid) => {
            if (error) {
                reject(error);
            } else if (!uid) {
                reject(new Error("Odoo authentication failed."));
            } else {
                resolve(uid);
            }
        });
    });
}

export async function createOdooRecord(model, data) {
    try {
        const uid = await getUid();
        if (!uid) return null;

        const url = new URL(ODOO_URL);
        const clientOptions = {
            host: url.hostname,
            port: url.port || (url.protocol === 'https:' ? 443 : 80),
            path: '/xmlrpc/2/object',
        };

        const object = url.protocol === 'https:'
            ? xmlrpc.createSecureClient(clientOptions)
            : xmlrpc.createClient(clientOptions);

        return new Promise((resolve, reject) => {
            object.methodCall('execute_kw', [
                ODOO_DB,
                uid,
                ODOO_PASSWORD,
                model,
                'create',
                [data]
            ], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    } catch (e) {
        console.error(`Error creating record in ${model}:`, e);
        // We don't throw here to prevent breaking the main flow if Odoo fails
        return null;
    }
}

export async function createOdooAttachment(model, res_id, filename, base64Content) {
    return createOdooRecord('ir.attachment', {
        name: filename,
        type: 'binary',
        datas: base64Content,
        res_model: model,
        res_id: res_id,
    });
}

export async function searchOdooRecord(model, domain, options = {}) {
    try {
        const uid = await getUid();
        if (!uid) return null;

        const url = new URL(ODOO_URL);
        const clientOptions = {
            host: url.hostname,
            port: url.port || (url.protocol === 'https:' ? 443 : 80),
            path: '/xmlrpc/2/object',
        };

        const object = url.protocol === 'https:'
            ? xmlrpc.createSecureClient(clientOptions)
            : xmlrpc.createClient(clientOptions);

        return new Promise((resolve, reject) => {
            object.methodCall('execute_kw', [
                ODOO_DB,
                uid,
                ODOO_PASSWORD,
                model,
                'search_read',
                [domain],
                options
            ], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    } catch (e) {
        console.error(`Error searching record in ${model}:`, e);
        return null;
    }
}
