import { z } from 'zod';
export const ShipmentSchema = z.object({
    id: z.number(),
    customId: z.string(),
    netCustomerCosts: z.number(),
    netCarrierCosts: z.number(),
    netRevenue: z.number(),
    lastUpdatedOn: z.iso.datetime(),
    updated: z.iso.datetime(),
    createdDate: z.iso.datetime(),
    created: z.iso.datetime(),
    status: z.object({
        code: z.object({
            key: z.string(),
            value: z.string(),
        }),
    }),
    customerOrder: z.array(z.object({
        id: z.number(),
        deleted: z.boolean(),
        customer: z.object({
            id: z.number(),
            name: z.string(),
        }),
    })).optional(),
    carrierOrder: z.array(z.object({
        id: z.number(),
        deleted: z.boolean(),
        carrier: z.object({
            id: z.number(),
            name: z.string(),
        }),
    })).optional(),
});
